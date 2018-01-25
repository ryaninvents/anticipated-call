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

describe('Method demos', function () {
  describe('nextCallDuring', function () {
    it('should respond as expected', async () => {
      let counter = 0;

      const increment = anticipatedCall(() => {
          counter = counter + 1;
      });

      return increment.nextCallDuring(() => {
        counter = 5;
        increment();
      }).then(() => {
        expect(`counter value is ${counter}`).toEqual('counter value is 6');
      });
    })
  })
})

describe('usage note', () => {
  test('counterintuitive case', () => {
    let counter = 0;

    const increment = anticipatedCall(() => {
        counter = counter + 1;
    });

    increment.nextCallDuring(() => {
        increment();
        increment();
        increment();
    }).then(() => {
      expect(`counter value is ${counter}`).toEqual('counter value is 3');
    });
  })
  test('async usage', () => {
    let counter = 0;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const increment = anticipatedCall(() => {
        counter = counter + 1;
    });

    increment.nextCallDuring(async () => {
        increment();
        await delay(0);
        increment();
        await delay(0);
        increment();
    }).then(() => {
      expect(`counter value is ${counter}`).toEqual('counter value is 1');
    });
  })
})
