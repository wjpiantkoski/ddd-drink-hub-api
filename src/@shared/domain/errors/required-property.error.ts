export default class RequiredPropertyError extends Error {
  constructor(propertyName: string) {
    super(`${propertyName} is required`);
    this.name = 'RequiredPropertyError'
  }
}