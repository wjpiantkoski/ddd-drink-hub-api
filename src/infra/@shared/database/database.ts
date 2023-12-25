import { Sequelize } from "sequelize-typescript";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER
} from '../../../env'
import { UserModel } from "../../database/sequelize/user/user.model";
import CategoryModel from "../../database/sequelize/category/category.model";
import BeverageModel from "../../database/sequelize/beverage/beverage.model";
import BookmarkModel from "../../database/sequelize/bookmark/bookmark.model";

export default class Database {

  dbInstance: Sequelize
  

  async connect(): Promise<void> {
    this.dbInstance = new Sequelize(
      DATABASE_NAME,
      DATABASE_USER,
      DATABASE_PASSWORD,
      {
        host: DATABASE_HOST,
        dialect: 'mysql'
      }
    )

    this.dbInstance.addModels([
      UserModel,
      CategoryModel,
      BeverageModel,
      BookmarkModel
    ])

    await this.dbInstance.sync({alter: true})
  }

  async disconnect(): Promise<void> {
    await this.dbInstance.close()
  }

}