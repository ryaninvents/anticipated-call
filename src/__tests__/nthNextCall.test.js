const anticipatedCall = require('..');

describe('nthNextCall', () => {
    test('should return a Promise', () => {
        const myFn = anticipatedCall();
        expect(myFn.nthNextCall(1)).toBeInstanceOf(Promise);
    });
    describe('n === 1', () => {
        test('should delay resolution until first call', () => {
            const myFn = anticipatedCall(jest.fn());

            const promise = myFn.nthNextCall(1)
                .then(() => {
                    expect(myFn).toHaveBeenCalledTimes(1);
                });
            expect(myFn).not.toHaveBeenCalled();
            myFn();
            expect(myFn).toHaveBeenCalledTimes(1);
            return promise;
        });
    });
    describe('n === 2', () => {
        test('should delay resolution until second call', () => {
            const myFn = anticipatedCall(jest.fn());

            const promise = myFn.nthNextCall(2)
                .then(() => {
                    expect(myFn).toHaveBeenCalledTimes(2);
                });
            expect(myFn).not.toHaveBeenCalled();
            myFn();
            expect(myFn).toHaveBeenCalledTimes(1);
            myFn();
            expect(myFn).toHaveBeenCalledTimes(2);
            return promise;
        });
    });
});