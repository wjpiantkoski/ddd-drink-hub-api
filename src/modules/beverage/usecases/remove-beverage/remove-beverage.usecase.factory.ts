import BeverageRepository from "../../../../infra/database/sequelize/beverage/beverage.repository";
import RemoveBeverageUsecase from "./remove-beverage.usecase";

export default class RemoveBeverageUsecaseFactory {
  static create(): RemoveBeverageUsecase {
    return new RemoveBeverageUsecase(new BeverageRepository())
  }
}