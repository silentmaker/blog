---
title: 'Redux基础'
date: '2018-07-26'
tags: ['Javascript']
categories: ['编程']
path: '/redux-cheatsheet'
---

### Redux

创建Store

```javascript
import { createStore } from 'redux'
// Reducer
function counter (state = { value: 0 }, action) {
  switch (action.type) {
  case 'INCREMENT':
    return { value: state.value + 1 }
  case 'DECREMENT':
    return { value: state.value - 1 }
  default:
    return state
  }
}
let store = createStore(counter)
// Or Optionally - `initialState` as a second argument
let store = createStore(counter, { value: 0 })
```

使用Store

```javascript
let store = createStore(counter)
// Dispatches an action
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })
// Gets current state
store.getState()
// Subscribe for changes
const unsubscribe = store.subscribe(() => { ... })
// Unsubscribe
unsubscribe()
```

### React Redux

通过Provider注入store

```javascript
import { Provider } from 'react-redux'
React.render(
  <Provider store={store}>
    <App />
  </Provider>, mountNode)
```

状态映射

```javascript
import { connect } from 'react-redux'
// A functional React component
function App ({ message, onMessageClick }) {
  return (
    <div onClick={() => onMessageClick('hello')}>
      {message}
    </div>
  )
}
// Maps `state` to `props`:
// These will be added as props to the component.
function mapState (state) {
  return { message: state.message }
}

// Maps `dispatch` to `props`:
function mapDispatch (dispatch) {
  return {
    onMessageClick (message) {
      dispatch({ type: 'click', message })
    }
  }
}

// Connect them:
export default connect(mapState, mapDispatch)(App)
```

简化版本如下

```javascript
export default connect(
  (state) => ({
    message: state.message
  }),
  (dispatch) => ({
    onMessageClick: (message) => {
      dispatch({ type: 'click', message })
    }
  })
)(App)
```

合并Reducers

```javascript
const reducer = combineReducers({
  counter, user, store
})
```

### Redux Middleware

创建中间件

```javascript
// noop middleware
const logger = store => dispatch => action { dispatch(action) }
const logger = store => {
  // This function runs on createStore().
  // It returns a decorator for dispatch().

  return dispatch => {
    // Runs on createStore(), too.
    // It returns a new dispatch() function

    return action => {
      // Runs on every dispatch()
    }
  }
}
```

应用中间件

```javascript
const enhancer = applyMiddleware(logger, thunk, ...)
const store = createStore(reducer, {}, enhancer)
```

### 其他

[Redux Documentation](https://redux.js.org/)

