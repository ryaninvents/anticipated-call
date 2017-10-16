const EventEmitter = require('events');

if (typeof Proxy === 'undefined') {
  require('harmony-reflect');
}

class Anticipated extends EventEmitter {
  nthNextCall(n) {
    let counter = 0;
    return new Promise((ok) => {
      const didCall = () => {
        counter += 1;
        if (counter >= n) {
          this.removeListener('apply', didCall);
          ok();
        }
      };
      this.addListener('apply', didCall);
    });
  }
  
  get nextCall() {
    return this.nthNextCall(1);
  }
  
  get(target, name) {
    if (name in this) {
      return this[name];
    }
    return target[name];
  }
  
  apply(target, thisArg, argumentsList) {
    this.emit('apply', thisArg, argumentsList);
    return target.apply(thisArg, argumentsList);
  }
}

function noop() {}

function anticipateCall(fn = noop) {
  return new Proxy(fn, new Anticipated());
}

module.exports = anticipateCall;