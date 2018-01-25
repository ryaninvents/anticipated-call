'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events');

var Anticipated = function (_EventEmitter) {
  _inherits(Anticipated, _EventEmitter);

  function Anticipated() {
    _classCallCheck(this, Anticipated);

    return _possibleConstructorReturn(this, (Anticipated.__proto__ || Object.getPrototypeOf(Anticipated)).apply(this, arguments));
  }

  _createClass(Anticipated, [{
    key: 'nthNextCall',
    value: function nthNextCall(n) {
      var _this2 = this;

      var counter = 0;
      return new Promise(function (ok) {
        var didCall = function didCall() {
          counter += 1;
          if (counter >= n) {
            _this2.removeListener('apply', didCall);
            ok();
          }
        };
        _this2.addListener('apply', didCall);
      });
    }
  }, {
    key: 'nthCallDuring',
    value: function nthCallDuring(n, f) {
      var promise = this.nthNextCall(n);
      f();
      return promise;
    }
  }, {
    key: 'nextCallDuring',
    value: function nextCallDuring(f) {
      return this.nthCallDuring(1, f);
    }
  }, {
    key: 'get',
    value: function get(target, name) {
      if (name in this) {
        return this[name];
      }
      return target[name];
    }
  }, {
    key: 'apply',
    value: function apply(target, thisArg, argumentsList) {
      this.emit('apply', thisArg, argumentsList);
      return target.apply(thisArg, argumentsList);
    }
  }, {
    key: 'nextCall',
    get: function get() {
      return this.nthNextCall(1);
    }
  }]);

  return Anticipated;
}(EventEmitter);

function noop() {}

function anticipateCall() {
  var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

  return new Proxy(fn, new Anticipated());
}

module.exports = anticipateCall;
module.exports.Anticipated = Anticipated;
module.exports.noop = noop;