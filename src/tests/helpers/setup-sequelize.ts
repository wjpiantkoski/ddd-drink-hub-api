import { Sequelize } from "sequelize-typescript";
import { UserModel } from "../../infra/database/sequelize/user/user.model";
import CategoryModel from "../../infra/database/sequelize/category/category.model";
import BeverageModel from "../../infra/database/sequelize/beverage/beverage.model";
import BookmarkModel from "../../infra/database/sequelize/bookmark/bookmark.model";

export default async (): Promise<Sequelize> => {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })

  await sequelize.addModels([ 
    UserModel,
    CategoryModel,
    BeverageModel,
    BookmarkModel
  ])

  await sequelize.sync({force: true})

  return sequelize
}