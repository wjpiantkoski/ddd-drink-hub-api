import CategoryRepository from "../../../../infra/database/sequelize/category/category.repository";
import PopulateCategoriesService from "./populate-categories.service";

export default class PopulateCategoriesServiceFactory {
  static create(): PopulateCategoriesService {
    return new PopulateCategoriesService(new CategoryRepository())
  }
}