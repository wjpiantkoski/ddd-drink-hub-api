import BeverageRepository from "../../../../infra/database/sequelize/beverage/beverage.repository";
import CategoryRepository from "../../../../infra/database/sequelize/category/category.repository";
import RemoveBeverageImageService from "../../services/remove-beverage-image/remove-beverage-image.service";
import UpdateBeverageUsecase from "./update-beverage.usecase";

export default class UpdateBeverageUsecaseFactory {
  static create(): UpdateBeverageUsecase {
    return new UpdateBeverageUsecase(
      new BeverageRepository(),
      new CategoryRepository(),
      new RemoveBeverageImageService()
    )
  }
}