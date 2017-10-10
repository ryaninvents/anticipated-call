# anticipated-call

🔜 ☎️  Get a Promise that resolves when your function is called.

[![Build Status](https://travis-ci.org/r24y/anticipated-call.svg?branch=develop)](https://travis-ci.org/r24y/anticipated-call)
[![GitHub last commit](https://img.shields.io/github/last-commit/r24y/anticipated-call.svg)](https://github.com/r24y/anticipated-call/graphs/commit-activity)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/github/license/r24y/anticipated-call.svg)](https://github.com/r24y/anticipated-call/blob/develop/LICENSE.md)

## Requirements

`anticipated-call` intercepts function calls with [Proxy], and returns a [Promise]. To do this, the `Proxy` and `Promise` constructors must be available as globals.

If you're running Node 8, these are included in core, so you don't have to do anything. Similarly, if you're using `babel-polyfill` or similar, this is handled for you.

## API

```js
import anticipatedCall from 'anticipated-call';
```

### anticipatedCall(fn)

Wrap the given function to provide the `anticipated-call` methods.

```js
function foo(a, b) {
    return a + b;
}

const wrappedFoo = anticipatedCall(foo);

wrappedFoo.nextCall.then(() => console.log('foo was called!'));
```

If you wish, you may call it with no arguments if you simply need a hook for resolving a promise.

```js
const hook = anticipatedCall();

hook.nextCall.then(() => console.log('hook was called!'));

hook();
```

### nextCall

Wait for the next call of the given function.

```js
function foo(a, b) {
    return a + b;
}

const wrappedFoo = anticipatedCall(foo);

wrappedFoo.nextCall.then(() => console.log('foo was called!'));
```

### nthNextCall(n)

Like `nextCall`, but wait for the function to be called `n` times.

```js
let counter = 0;

const increment = anticipatedCall(() => {
    counter = counter + 1;
});

increment.nthNextCall(3).then(() => console.log(`counter value is ${counter}`));

increment();
increment();
increment();

// Prints `counter value is 3` since it waits for the 3rd call before resolving the Promise.
```

## Contributing

This project uses [ESLint-style commit messages](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-eslint/convention.md).