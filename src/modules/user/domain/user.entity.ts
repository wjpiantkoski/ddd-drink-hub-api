import validator from "validator"
import InvalidPropertyError from "../../../@shared/domain/errors/invalid-property.error"
import RequiredPropertyError from "../../../@shared/domain/errors/required-property.error"
import Id from "../../../@shared/domain/value-objects/id.value-object"

export default class User {
  private _id: Id
  private _name: string
  private _email: string
  private _password: string

  constructor(name: string, email: string, password: string, id?: string) {
    this._id = new Id(id)
    this._name = name
    this._email = email
    this._password = password

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

  get email(): string {
    return this._email
  }

  set email(email: string) {
    this._email = email
    this.validate()
  }

  get password(): string {
    return this._password
  }

  private validate() {
    if (!this._name) {
      throw new RequiredPropertyError('name')
    }

    if (this._name.length < 3 || this._name.length > 100) {
      throw new InvalidPropertyError('name')
    }

    if (!this._email) {
      throw new RequiredPropertyError('email')
    }

    if (this._email.length > 150) {
      throw new InvalidPropertyError('email')
    }

    if (!validator.isEmail(this._email)) {
      throw new InvalidPropertyError('email')
    }

    if (!this._password) {
      throw new RequiredPropertyError('password')
    }
  }
}