const anticipatedCall = require('..');

describe('nextCallDuring', () => {
    test('should resolve when called inside callback', () => {
        const myFn = anticipatedCall(jest.fn());
        const counterFn = jest.fn();
        return myFn.nextCallDuring(() => {
          myFn();
        }).then(() => {
          expect(myFn).toHaveBeenCalledTimes(1);
        });
    });
})
