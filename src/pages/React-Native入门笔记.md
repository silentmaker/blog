---
title: 'React-Native入门'
date: '2017-06-26'
tags: ['Javascript']
categories: ['编程']
path: '/react-native-intro'
---

- 脚手架工具：

```bash
npm install -g create-react-native-app
create-react-native-app MyProject
cd MyProject && npm start
```

- 组件案例：

```javascript
import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Blink text='I love to blink' />
        <Blink text='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' />
      </View>
    );
  }
}

AppRegistry.registerComponent('BlinkApp', () => BlinkApp);
```

prop和state的使用方法和React一致，所有的样式都通过style注入，只把应用作为一个整体注册一次，而不是每个组件/模块都注册

```javascript
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigblue}>just bigblue</Text>
        <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
        <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

AppRegistry.registerComponent('LotsOfStyles', () => LotsOfStyles);
```

另外，React Native中的尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点

- 常用的View组件和List组件：

View, ScrollView, ListView 

FlatList (并不立即渲染所有元素，而是优先渲染屏幕上可见的元素) ，SectionList (渲染按逻辑分段的数据集合)

- 网络请求

RN使用Fetch API或者standard XMLHttpRequest API ( 安全机制与网页环境有所不同：在应用中可以访问任何网站，没有跨域的限制) 

RN也支持 websocket 

- 导航组件

一般可以用成熟的三方库来做，比如 react-navigation：

```bash
yarn add react-navigation
```

```javascript
import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  Main: {screen: MainScreen},
  Profile: {screen: ProfileScreen},
});
```

- 状态管理

和React一样可以 Redux 等成熟的框架













