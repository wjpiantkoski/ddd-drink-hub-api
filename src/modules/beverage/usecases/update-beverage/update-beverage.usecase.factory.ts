import BeverageRepository from "../../../../infra/database/sequelize/beverage/beverage.repository";
import CategoryRepository from "../../../../infra/database/sequelize/category/category.repository";
import UpdateBeverageUsecase from "./update-beverage.usecase";

export default class UpdateBeverageUsecaseFactory {
  static create(): UpdateBeverageUsecase {
    return new UpdateBeverageUsecase(
      new BeverageRepository(),
      new CategoryRepository()
    )
  }
}