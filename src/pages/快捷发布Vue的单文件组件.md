---
title: '快捷发布Vue的单文件组件'
date: '2018-10-02'
tags: ['Javascript']
categories: ['编程']
path: '/how-to-publish-vue-sfc'
---

SFC，Single File Component，Vue所谓的单文件组件，有时你可能需要快捷地把组件发布到npm给其他人使用，国外有开发者在VueConf分享了一套简便的模板，后来发现Vue Cookbook也已经采纳为一种推荐做法了

项目的地址是：[vue-sfc-rollup](<https://github.com/team-innovation/vue-sfc-rollup>)

Vue Cookbook的相关说明在这里：[Packaging-Components-for-npm](<https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#Packaging-Components-for-npm>)

关键的文件只有以下几个：

- package.json 

关键在于指定几种不同环境下使用的打包文件，比如npm install和script引入等

```json
{
  ...
  "main": "dist/<%-componentName%>.umd.js",
  "module": "dist/<%-componentName%>.esm.js",
  "unpkg": "dist/<%-componentName%>.min.js",
  "browser": {
    "./sfc": "src/<%-componentName%>.vue"
  },

  "files": [
    "dist/*",
    "src/*"
  ],

  "scripts": {
    "build": "npm run build:unpkg & npm run build:es & npm run build:umd",
    "build:umd": "cross-env NODE_ENV=production rollup --config build/rollup.config.js --format umd --file dist/<%-componentName%>.umd.js",
    "build:es": "cross-env NODE_ENV=production rollup --config build/rollup.config.js --format es --file dist/<%-componentName%>.esm.js",
    "build:unpkg": "cross-env NODE_ENV=production rollup --config build/rollup.config.js --format iife --file dist/<%-componentName%>.min.js"
  },
  ...
}
```

- rollup.config.js 

```javascript
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify-es';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const config = {
  input: 'src/entry.js',
  output: {
    name: '<%-componentNamePascal%>',
    exports: 'named',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true,
      },
    }),
    buble(),
  ],
};

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(uglify());
}

export default config;
```

其中buble是babel的一个简化实现包

- entry.js 

```javascript
// Import vue component
import component from './<%-componentName%>.vue';

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('<%-componentNamePascal%>', component);
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install;

// Export component by default
export default component;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
```

这里主要是给组件提供install方法，并且可能的时候自动install

这个项目同时也支持组件库的开发，已经写好了发布到npm用到的scripts，用rollup来打包三方库也更受推荐，打包速度更快，体积也更小，vue项目的打包就是用的rollup

