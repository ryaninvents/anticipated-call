const {Anticipated, noop} = require('./index');

function anticipateCallWithoutProxy(fn) {
    const anticipated = new Anticipated();
    function proxiedCall(...args) {
        return anticipated.apply(fn, this, args);
    }
    proxiedCall.anticipated = anticipated;
    proxiedCall.original = fn;
    return proxiedCall;
}

module.exports = anticipateCallWithoutProxy;