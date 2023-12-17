import ValueObject from "./value-object.interface";
import {v4 as uuidV4} from 'uuid'

export default class Id implements ValueObject {
  private _id: string

  constructor(id?: string) {
    this._id = id || uuidV4()
  }

  get value(): string {
    return this._id
  }
}