const anticipatedCall = require('../no-proxy');

describe('no-proxy', () => {
    describe('nextCall', () => {
        test('should delay resolution until first call', () => {
            const spy = jest.fn();
            const myFn = anticipatedCall(spy);

            const promise = myFn.anticipated.nextCall
                .then(() => {
                    expect(spy).toHaveBeenCalledTimes(1);
                });
            expect(spy).not.toHaveBeenCalled();
            myFn();
            expect(spy).toHaveBeenCalledTimes(1);
        });
        test('should return a new Promise', () => {
            const myFn = anticipatedCall();
            const promise1 = myFn.anticipated.nextCall;
            const promise2 = myFn.anticipated.nextCall;
            expect(promise1).not.toBe(promise2);
        });
        test('should handle subsequent calls as expected', () => {
            const spy = jest.fn();
            const myFn = anticipatedCall(spy);

            const promise1 = myFn.anticipated.nextCall;

            myFn();

            return promise1.then(() => {
                expect(spy).toHaveBeenCalledTimes(1);

                const promise2 = myFn.anticipated.nextCall;
                myFn();
                return promise2;
            }).then(() => {
                expect(spy).toHaveBeenCalledTimes(2);
            })
        })
    })
})