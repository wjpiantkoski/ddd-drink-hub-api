import validator from "validator"
import Id from "../../../../@shared/domain/value-objects/id.value-object"
import Beverage from "../beverage/beverage.entity"
import InvalidPropertyError from "../../../../@shared/domain/errors/invalid-property.error"

export default class Bookmark {

  private _id: Id
  private _userId: string
  private _beverage: Beverage

  constructor(userId: string, beverage: Beverage, id?: string) {
    this._id = new Id(id)
    this._userId = userId
    this._beverage = beverage

    this.validate()
  }

  get id(): string {
    return this._id.value
  }

  get userId(): string {
    return this._userId
  }

  get beverage(): Beverage {
    return this._beverage
  }

  private validate() {
    if (!validator.isUUID(this._userId)) {
      throw new InvalidPropertyError('userId')
    }

    if(this._beverage.userId !== this._userId) {
      throw new InvalidPropertyError('userId')
    }
  }

}