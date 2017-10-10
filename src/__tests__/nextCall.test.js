const anticipatedCall = require('..');

describe('nextCall', () => {
    test('should delay resolution until first call', () => {
        const myFn = anticipatedCall(jest.fn());

        const promise = myFn.nextCall
            .then(() => {
                expect(myFn).toHaveBeenCalledTimes(1);
            });
        expect(myFn).not.toHaveBeenCalled();
        myFn();
        expect(myFn).toHaveBeenCalledTimes(1);
    });
    test('should return a new Promise', () => {
        const myFn = anticipatedCall();
        const promise1 = myFn.nextCall;
        const promise2 = myFn.nextCall;
        expect(promise1).not.toBe(promise2);
    });
    test('should handle subsequent calls as expected', () => {
        const myFn = anticipatedCall(jest.fn());

        const promise1 = myFn.nextCall;

        myFn();

        return promise1.then(() => {
            expect(myFn).toHaveBeenCalledTimes(1);

            const promise2 = myFn.nextCall;
            myFn();
            return promise2;
        }).then(() => {
            expect(myFn).toHaveBeenCalledTimes(2);
        })
    })
})