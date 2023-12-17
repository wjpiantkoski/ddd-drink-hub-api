import CategoryRepository from "../../../../infra/database/sequelize/category/category.repository";
import ListCategoriesUsecase from "./list-categories.usecase";

export default class ListCategoriesUsecaseFactory {
  static create(): ListCategoriesUsecase {
    return new ListCategoriesUsecase(new CategoryRepository())
  }
}