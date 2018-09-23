---
title: 'OpenConnectSever搭建VPN总结'
date: '2018-01-26'
tags: ['vpn']
categories: ['dev']
path: '/ocserv-letsencrypt-vpn'
---

首先需要购置一台VPN用主机和自用域名，将域名 DOMAIN 的 A/AAAA 记录指向该主机，安装nginx并启动，主机推荐腾讯云香港区域的S1系列（CentOS）

### Let's Encrypt

为了内容传输的隐密性，可以采用 Let’s Encrypt 来获取合法的服务器证书，自建 CA 并签发服务器证书固然是可行方案，但需要在每台设备上都信任该自建 CA，较为麻烦且不安全

TLS/SSL 协议的允许连接双方都对端做身份认证，对服务器端认证一般采用证书认证的，客户端认证一般采用用户名+密码的认证，也可以采用证书认证的方式

**获取证书**

测试时建议加上 --test-cert 以免用完 Let’s Encrypt 的证书获取速率限制

```bash
yum install letsencrypt
letsencrypt certonly // 为DOMAIN申请证书
```

**自动更新证书**

添加以下 cron 脚本至 /etc/cron.monthly/certbot，实现每月自动更新

```bash
#!/bin/bash
WD="/root/certbot"
LOG="${WD}/cron.log"
mkdir -p $WD
date >> $LOG
certbot renew >> $LOG
```

**生成用户证书**

用户证书只需 ocserv 信任 CA 即可，因此可以使用自建 CA 签发证书，将以下脚本保存到 /etc/ocserv/certs/，然后运行 ```./ocm generate USERNAME``` 即可直接生成用户证书 USERNAME.p12

```bash
#!/bin/bash

init() {
    WORK="./work"
    CA_TMPL="${WORK}/ca.tmpl"
    CA_KEY="${WORK}/ca-key.pem"
    CA_CERT="./ca.pem"
    USER="$1"
    USER_TMPL="${WORK}/${USER}.tmpl"
    USER_KEY="${WORK}/${USER}-key.pem"
    USER_CERT="${WORK}/${USER}.pem"
    USER_P12="./${USER}.p12"
    REVOKED_CERT="${WORK}/revoked.pem"
    CRL_TMPL="${WORK}/crl.tmpl"
    CRL_CERT="./crl.pem"

    # Ensure working directory
    [[ -d $WORK ]] || mkdir -p $WORK

    # CA Template
    [[ -f $CA_TMPL ]] || cat << _EOF_ > $CA_TMPL
cn = "VPN CA"
serial = 1
expiration_days = 3650
ca
signing_key
cert_signing_key
crl_signing_key
_EOF_

    # CA Private Key
    [[ -f $CA_KEY ]] || certtool --generate-privkey --outfile $CA_KEY

    # CA Certificate
    [[ -f $CA_CERT ]] || certtool --generate-self-signed --load-privkey $CA_KEY --template $CA_TMPL --outfile $CA_CERT
}

generate() {
    # User Template
    cat << _EOF_ > $USER_TMPL
cn = "$USER"
expiration_days = 3650
signing_key
tls_www_client
_EOF_

    # User Private Key
    certtool --generate-privkey --outfile $USER_KEY

    # User Certificate
    certtool --generate-certificate --load-privkey $USER_KEY --load-ca-certificate $CA_CERT --load-ca-privkey $CA_KEY --template $USER_TMPL --outfile $USER_CERT

    # Export User Certificate
    certtool --to-p12 --pkcs-cipher 3des-pkcs12 --load-privkey $USER_KEY --load-certificate $USER_CERT --outfile $USER_P12 --outder
}

revoke() {
    # Copy User Certificate to Revoked Certificate
    cat $USER_CERT >> $REVOKED_CERT

    # CRL Template
    [[ -f $CRL_TMPL ]] || cat << _EOF_ > $CRL_TMPL
crl_next_update = 3650
crl_number = 1
_EOF_

    # CRL Certificate
    certtool --generate-crl --load-certificate $REVOKED_CERT --load-ca-privkey $CA_KEY --load-ca-certificate $CA_CERT --template $CRL_TMPL --outfile $CRL_CERT
}

case $1 in
    generate)
        init $2
        generate
        ;;
    revoke)
        init $2
        revoke
        ;;
    *)
        echo "\
Usage:
    $0 generate USER
    $0 revoke USER
"
esac
```

### ocserv

**安装 & 配置**

```bash
yum install ocserv
```

复制配置文件：cp /opt/ocserv-${VERSION}/doc/sample.config /etc/ocserv/ocserv.conf
并修改以下项：

```bash
# 打开 PMTUD
try-mtu-discovery = true

# 以 CN 为用户 ID。（用户证书认证）
cert-user-oid = 2.5.4.3

# 服务器证书与密钥（Let's Encrypt）
server-cert = /etc/letsencrypt/live/DOMAIN/fullchain.pem
server-key = /etc/letsencrypt/live/DOMAIN/privkey.pem

# 如有需要，可修改 VPN 端口
tcp-port = 443
udp-port = 443

# 修改 VPN 子网网段（避免和常用内网网段相同）
ipv4-network = 192.168.111/24

# 修改 DNS
dns = 8.8.8.8
dns = 8.8.4.4

# 注释掉所有的 route，让服务器成为 gateway
# route = 192.168.1.0/255.255.255.0
```

配置防火墙和 IP Forwarding：

```bash
iptables -t nat -A POSTROUTING -s 10.12.0.0/24 -o eth0 -j MASQUERADE
iptables -A FORWARD -s 10.12.0.0/24 -j ACCEPT

f （net.ipv4.ip_forward=1）
sysctl -p /etc/sysctl.conf
```

**测试连接**

修改 ocserv.conf 中的```auth = "plain[passwd=/etc/ocserv/passwd]"```，并通过 ocpasswd 创建用户

```bash
ocpasswd -c /etc/ocserv/passwd your-username
```


运行``` ocserv ocserv -f -d 1```，在手机上通过 AnyConnect 尝试连接。

**配置证书认证**

修改 /etc/ocserv/ocserv.conf 中的以下项：

```bash
auth = "certificate"
ca-cert = /etc/ocserv/certs/ca-cert.pem
```

重新测试连接

**安装用户证书**

1. 将生成的用户证书 USER.p12 复制到 nginx 的 WEBROOT
2. 打开 AnyConnect 客户端，切换到 Diagnostics - Certificates - Import User Certiticate…
3. 输入 http://DOMAIN/USER.p12，然后输入密码
4. 新建连接即可，地址为DOMAIN:443