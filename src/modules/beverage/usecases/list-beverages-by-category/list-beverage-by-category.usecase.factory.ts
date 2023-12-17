import BeverageRepository from "../../../../infra/database/sequelize/beverage/beverage.repository";
import ListBeverageByCategoryUsecase from "./list-beverage-by-category.usecase";

export default class ListBeverageByCategoryUsecaseFactory {
  static create(): ListBeverageByCategoryUsecase {
    return new ListBeverageByCategoryUsecase(new BeverageRepository())
  }
}