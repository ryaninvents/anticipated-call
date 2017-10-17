const anticipatedCall = require('../no-proxy');

describe('no-proxy', () => {
    describe('nextCall', () => {
        test('should delay resolution until first call', () => {
            const myFn = anticipatedCall(jest.fn());

            const promise = myFn.anticipated.nextCall
                .then(() => {
                    expect(myFn.original).toHaveBeenCalledTimes(1);
                });
            expect(myFn.original).not.toHaveBeenCalled();
            myFn();
            expect(myFn.original).toHaveBeenCalledTimes(1);
        });
        test('should return a new Promise', () => {
            const myFn = anticipatedCall();
            const promise1 = myFn.anticipated.nextCall;
            const promise2 = myFn.anticipated.nextCall;
            expect(promise1).not.toBe(promise2);
        });
        test('should handle subsequent calls as expected', () => {
            const myFn = anticipatedCall(jest.fn());

            const promise1 = myFn.anticipated.nextCall;

            myFn();

            return promise1.then(() => {
                expect(myFn.original).toHaveBeenCalledTimes(1);

                const promise2 = myFn.anticipated.nextCall;
                myFn();
                return promise2;
            }).then(() => {
                expect(myFn.original).toHaveBeenCalledTimes(2);
            })
        })
    })
})