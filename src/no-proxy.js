const {Anticipated, noop} = require('./index');

function anticipateCallWithoutProxy(fn) {
    const anticipated = new Anticipated();
    function proxiedCall(...args) {
        return anticipated.apply(fn, this, args);
    }
    proxiedCall.anticipated = anticipated;
    return proxiedCall;
}

module.exports = anticipateCallWithoutProxy;