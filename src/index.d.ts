export type AnticipatedFunction<T extends (...args: Array<any>) => any> = T & {
  nextCall: Promise<void>;
  nthNextCall: (numberOfCalls: number) => Promise<void>;
  nextCallDuring: (callback: () => void) => Promise<void>;
  nthNextCallDuring: (
    numberOfCalls: number,
    callback: () => void,
  ) => Promise<void>;
};

export default function anticipateCall<T extends (...args: Array<any>) => any>(
  fn: T,
): AnticipatedFunction<T>;
