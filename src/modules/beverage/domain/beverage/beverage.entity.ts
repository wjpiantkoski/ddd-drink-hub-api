import validator from "validator";
import Category from "../category/category.entity";
import Id from "../../../../@shared/domain/value-objects/id.value-object";
import RequiredPropertyError from "../../../../@shared/domain/errors/required-property.error";
import InvalidPropertyError from "../../../../@shared/domain/errors/invalid-property.error";

export type BeverageProps = {
  id?: string
  name: string
  userId: string
  category: Category
  description: string
}

export default class Beverage {

  private _id: Id
  private _name: string
  private _description: string
  private _category: Category
  private _userId: string;

  constructor(props: BeverageProps) {
    this._name = props.name
    this._id = new Id(props.id)
    this._category = props.category
    this._description = props.description
    this._userId = props.userId

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

  get description(): string {
    return this._description
  }

  set description(description: string) {
    this._description = description
    this.validate()
  }

  get category(): Category {
    return this._category
  }

  set category(category: Category) {
    this._category = category
    this.validate()
  }

  get userId(): string {
    return this._userId
  }

  set userId(userId: string) {
    this._userId = userId
  }

  private validate() {
    if (!this._name) {
      throw new RequiredPropertyError('name')
    }

    if (this._name.length < 3 || this._name.length > 50) {
      throw new InvalidPropertyError('name')
    }

    if (!this._description) {
      throw new RequiredPropertyError('description')
    }

    if (this._description.length < 3 || this._description.length > 150) {
      throw new InvalidPropertyError('description')
    }

    if (!this._userId) {
      throw new RequiredPropertyError('userId')
    }

    if (!validator.isUUID(this._userId)) {
      throw new InvalidPropertyError('userId')
    }
  }

}