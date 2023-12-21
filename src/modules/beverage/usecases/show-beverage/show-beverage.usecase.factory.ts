import BeverageRepository from "../../../../infra/database/sequelize/beverage/beverage.repository";
import ShowBeverageUsecase from "./show-beverage.usecase";

export default class ShowBeverageUsecaseFactory {
  static create(): ShowBeverageUsecase {
    return new ShowBeverageUsecase(new BeverageRepository())
  }
}