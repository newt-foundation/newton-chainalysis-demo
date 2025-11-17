/**
 * BigInt Serialization Polyfill
 * 
 * Solely for getting past codesandbox error when logging BigInt values
 */

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

if (typeof BigInt !== 'undefined' && !BigInt.prototype.toJSON) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
}

export {};

