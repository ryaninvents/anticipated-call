const anticipatedCall = require('..');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('nthCallDuring', () => {
    test('should resolve when called inside callback', () => {
        const myFn = anticipatedCall(jest.fn());
        return myFn.nthCallDuring(2, () => {
          myFn();
          myFn();
        }).then(() => {
          expect(myFn).toHaveBeenCalledTimes(2);
        });
    });
    test('should resolve when called inside async callback', () => {
        const myFn = anticipatedCall(jest.fn());
        return myFn.nthCallDuring(2, async () => {
          myFn();
          await delay(0);
          myFn();
          await delay(0);
          myFn();
        }).then(() => {
          expect(myFn).toHaveBeenCalledTimes(2);
        });
    });
})
