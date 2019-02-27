---
date: '2018-11-22'
tags: ['Vue']
categories: ['编程']
path: '/vue-beyond-html'
---

之前看VueConf，有一个Lightning Talk的内容挺有趣的，基本思路大概就是，Vue组件不一定要用来渲染HTML，或者说用组件这种声明式的写法可以做一些别的事情

下面提到的在Github上可以找到对应的项目：[vue-motion](https://github.com/posva/vue-motion/)、[vue-promised](https://github.com/posva/vue-promised/)

### 图形/动画组件 

计算速度变化，绘制SVG动画或者控制音视频

```html
<Motion tag="g" :values="initValues">
    <template slot-scope="values">
        <g v-for="y in values" class="bars">
            <rect :x ="y * 10" :y="y" />
        </g>
    </template>
</Motion>

<Motion :values="targetValue">
	<Sound slot-scope="{ value }"
           source="test.mp3"
           :rate="value"/>
</Motion>
```

声明式的Three.js组件

```html
<Renderer>
    <Scene>
        <Camera :postion="camPos"></Camera>
        <Cube v-for="cube in cubes"
              :key="cube.id"
              :position="cube.position">
        <Ground></Ground>
    </Scene>
</Renderer>
```

### 流程组件

把promise的三种状态映射到slot上来控制显示逻辑

```html
<Promised :promise="promise">
    <h1 slot="pending">
        loading
    </h1>
    <h1 slot="fulfilled" slot-scope="data">
        Success: {{ data }}
    </h1>
    <h1 slot="rejected" slot-scope="error">
        Error: {{ error }}
    </h1>
</Promised>
```

具体的实现可以去看源码，主要是一些对于 Scoped Slots、Render Function 和 Inject/Provide 的灵活使用，我觉得最厉害的地方还是在于思维的启发性，能够去发现和利用技术的通性

