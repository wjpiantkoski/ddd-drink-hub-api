export default class InvalidPropertyError extends Error {
  constructor(propertyName: string) {
    super(`${propertyName} is invalid`);
    this.name = 'InvalidPropertyError'
  }
}