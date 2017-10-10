const assert = require('assert');
const anticipatedCall = require('..');

class ExampleClass {
    runDelayedUpdate(value) {
        setTimeout(
            () => this.performUpdate(value),
            1000
        );
    }

    performUpdate(value) {
        this.value = value;
    }
}

describe('Example test suite', function () {
    it('should perform the update', async function () {
        const ex = new ExampleClass();
        ex.performUpdate = anticipatedCall(ex.performUpdate);

        ex.runDelayedUpdate(37);
        await ex.performUpdate.nextCall;
        assert(ex.value === 37, 'ex.value should equal 37');
    });
});
