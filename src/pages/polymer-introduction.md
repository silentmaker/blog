---
title: Ploymer Quick Start
date: "2018-07-26"
tags: ['polymer', 'javascript']
categories: ['dev']
path: '/polymer-introduction'
---



> Everything is an element.

### Concepts

Polymer lets you build encapsulated, reusable [Web Components](https://www.webcomponents.org/introduction) that work just like standard HTML elements.

Web Components are now implemented natively on Safari and Chrome, and run well on Firefox, Edge, and IE11 using polyfills. :smile:

### Basics

#### scripts

load webcomponents-loader.js to check and load any polyfills your browser needs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
    <script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
  </head>
  <body>
    <custom-element></custom-element>
  </body>
</html>
```

#### basic Polymer element definition

Note: ==LiteElement== is the successor to PolymerElement now.

```javascript
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// Define the element's API using an ES2015 class
class XCustom extends PolymerElement {
  constructor() {
    super();
    this.greeting = 'Hello!';
  }
  // Define optional shadow DOM template
  // Data bindings in shadow DOM
  static get template() { 
    return html`
      <style>
        /* scoped CSS rules for your element */
      </style>
      <div>[[greeting]]</div> 
    `;
  }
  // Declare properties for the element's public API
  static get properties() {
    return {
      greeting: {
        type: String
      }
    }
  }
  // Add methods to the element's public API
  greetMe() {
    console.log(this.greeting);
  }
}

// Register the x-custom element with the browser
customElements.define('x-custom', XCustom);
```

#### element composition

```javascript
import {PolymerElement, html} from "@polymer/polymer/polymer-element.js"

class PictureFrame extends PolymerElement {
  static get template() {
    return html`
    <!-- scoped CSS for this element -->
    <style>
      div {
        display: inline-block;
        background-color: #ccc;
        border-radius: 8px;
        padding: 4px;
      }
    </style>
    <div>
      <!-- any children are rendered here -->
      <slot></slot>
    </div>
    `;
  }
}

customElements.define('picture-frame', PictureFrame);

```

#### data binding

```javascript
import {PolymerElement, html} from "@polymer/polymer/polymer-element.js"

class NameTag extends PolymerElement {
  constructor() {
    super();
    this.owner = 'Daniel';
  }
  static get template() {
    return html`
      <!-- bind to the "owner" property -->
      This is <b>{{owner}}</b>'s name-tag element.
    `;
  }
}

customElements.define('name-tag', NameTag);
```

#### declare properties

```javascript
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js'

class ConfigurableNameTag extends PolymerElement {
  static get properties () {
    return {
      owner: {
        type: String,
        value: 'Daniel',
      }
    };
  }
  static get template () {
    return html`
      This is <b>[[owner]]</b>'s name-tag element.
    `;
  }
}

customElements.define('configurable-name-tag', ConfigurableNameTag);
```

#### two-way binding

```html
<!-- non-Polymer element -->
<!-- target-prop="{{hostProp::target-change-event}}" -->
<input value="{{hostValue::input}}">
<input type="checkbox" checked="{{hostChecked::change}}">
<video url="..." current-time="{{hostTime::timeupdate}}">
    
<!-- Polymer element, with default event -->
<my-element value="{{hostValue::value-changed}}">
<my-element value="{{hostValue}}">
```

#### array to list

use ```<dom-repeat>```

```javascript
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js'
import '@polymer/polymer/lib/elements/dom-repeat.js'

class EmployeeList extends PolymerElement {
  constructor() {
    super();
    this.employees = [
      {first: 'Bob', last: 'Li'},
      {first: 'Ayesha', last: 'Johnson'},
      {first: 'Fatma', last: 'Kumari'},
      {first: 'Tony', last: 'Mori'}
    ];
  }
  static get template () {
    return html`
    <div> Employee list: </div>
    <template is="dom-repeat" items="{{employees}}">
        <div>First name: <span>{{item.first}}</span></div>
        <div>Last name: <span>{{item.last}}</span></div>
    </template>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
```

### Setup

```bash
npm i -g polymer-cli
mkdir myapp && cd myapp
ploymer init # select temmtplate on prompt
ploymer serve
```

### Development

#### create new page

Edit ==src/my-new-view.js==

```javascript
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class MyNewView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>New View</h1>
        <p>New view!</p>
      </div>
    `;
  }
}

window.customElements.define('my-new-view', MyNewView);
```

Edit ==src/my-app.js==

```<iron-pages>``` is bound to the page variable that change with the route, and select the active page.

```html
<iron-pages
    selected="[[page]]"
    attr-for-selected="name"
    role="main">
  <my-view1 name="view1"></my-view1>
  <my-view2 name="view2"></my-view2>
  <my-view3 name="view3"></my-view3>
  <my-new-view name="new-view"></my-new-view>
  <my-view404 name="view404"></my-view404>
</iron-pages>
```

Modify route

```javascript
_routePageChanged(page) {
  if (!page) {
    this.page = 'view1';
  } else if (['view1', 'view2', 'view3', 'new-view'].indexOf(page) !== -1) {
    this.page = page;
  } else {
    this.page = 'view404';
  }
  ...
}
```

Import new page dynamically

```javascript
// Note: `polymer build` doesn't like string concatenation in import statements
_pageChanged(page) {
  switch(page) {
    case 'view1':
      import('./my-view1.js');
      break;
    case 'view2':
      import('./my-view2.js');
      break;
    case 'view3':
      import('./my-view3.js');
      break;
    case 'new-view':
      import('./my-new-view.js');
      break;
    case 'view404':
      import('./my-view404.js');
      break;
  }
}
```

Add navigation menu item

```html
<app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
  <app-toolbar>Menu</app-toolbar>
  <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
    <a name="view1" href="[[rootPath]]view1">View One</a>
    <a name="view2" href="[[rootPath]]view2">View Two</a>
    <a name="view3" href="[[rootPath]]view3">View Three</a>
    <a name="new-view" href="[[rootPath]]new-view">New View</a>
  </iron-selector>
</app-drawer>
```

#### create new component

Using existed web component:

```html
<!-- Import a component -->
<script src="https://unpkg.com/@polymer/paper-checkbox@next/paper-checkbox.js?module" type="module" ></script>

<!-- Use it like any other HTML element -->
<paper-checkbox>Web Components!</paper-checkbox>
```

First,

```bash
npm i @polymer/polymer
```

Then,

```html
<script src="node_modules/@webcomponents/webcomponents-loader.js"></script>
  <script type="module">
    import {PolymerElement, html} from '@polymer/polymer';

    class MyElement extends PolymerElement {
      static get properties() { return { mood: String }}
      static get template() {
        return html`
          <style> .mood { color: green; } </style>
          Web Components are <span class="mood">[[mood]]</span>!
        `;
      }
    }

    customElements.define('my-element', MyElement);
  </script>

  <my-element mood="happy"></my-element>
```



### More

Find out more at [ploymer-project.org](https://www.polymer-project.org)

