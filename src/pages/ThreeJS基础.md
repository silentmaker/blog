---
title: 'ThreeJS基础'
date: '2018-06-04'
tags: ['Javascript']
categories: ['编程']
path: '/three-js-intro'
---

ThreeJS是一个优秀的webGL开源库，它简化了浏览器3D编程，对复杂的webGL语法进行了封装,使得开发者可以直接使用JavaScript在浏览器中创建复杂多变的全景3D场景.

使用ThreeJS的核心步骤是：

- 设置渲染器renderer
- 设置摄像机camera
- 设置场景scene
- 设置光源light
- 设置物体object，添加网格mesh和材质material
- 执行渲染操作.

在 Web 中，实现 3D 的场景有很多方法，css 是最简单的，另外还有 Canvas、webGL，WebVR 等，但复杂的 3D 场景必须好好利用 GPU，虽然 CSS transfrom3d 也有GPU加速，不过考虑到灵活性，webGL 应该是第一选择

以下是一个地球效果的Demo代码：

```javascript
  init() {
      const container = document.getElementById('container');
      const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer();
      const group = new THREE.Group();
      camera.position.z = 500;
      scene.background = new THREE.Color( 0xffffff );
      scene.add(group);
      const texture = new THREE.TextureLoader().load(earthTexture);
      const geometry = new THREE.SphereBufferGeometry( 200, 20, 20 );
      const material = new THREE.MeshBasicMaterial( { map: texture, overdrwa: 0.5 } );
      const mesh = new THREE.Mesh( geometry, material );
      group.add(mesh)
      
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const context = canvas.getContext('2d');
      const gradient = context.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2
      );
      gradient.addColorStop(0.1, 'rgba(210,210,210,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,1)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild(renderer.domElement);
      const animate = () => {
        requestAnimationFrame(animate);
        camera.position.x += ( this.mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - this.mouseY - camera.position.y ) * 0.05;
				camera.lookAt( scene.position );
				group.rotation.y -= 0.005;
				renderer.render(scene, camera);
      }
      animate();
    },
```




