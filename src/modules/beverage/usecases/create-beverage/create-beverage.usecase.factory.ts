import BeverageRepository from "../../../../infra/database/sequelize/beverage/beverage.repository";
import CategoryRepository from "../../../../infra/database/sequelize/category/category.repository";
import RemoveBeverageImageService from "../../services/remove-beverage-image/remove-beverage-image.service";
import CreateBeverageUsecase from "./create-beverage.usecase";

export default class CreateBeverageUsecaseFactory {
  static create(): CreateBeverageUsecase {
    return new CreateBeverageUsecase(
      new BeverageRepository(),
      new CategoryRepository(),
      new RemoveBeverageImageService()
    )
  }
}