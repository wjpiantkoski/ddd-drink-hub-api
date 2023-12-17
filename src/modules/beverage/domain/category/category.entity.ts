import InvalidPropertyError from "../../../../@shared/domain/errors/invalid-property.error";
import RequiredPropertyError from "../../../../@shared/domain/errors/required-property.error";
import Id from "../../../../@shared/domain/value-objects/id.value-object";

export default class Category {

  private _id: Id
  private _name: string

  constructor(name: string, id?: string) {
    this._name = name;
    this._id = new Id(id)

    this.validate()
  }

  get id(): string {
    return this._id.value
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name
    this.validate()
  }

  private validate() {
    if (!this._name) {
      throw new RequiredPropertyError('name')
    }

    if (this._name.length > 50) {
      throw new InvalidPropertyError('name')
    }
  }

}