import IUsecase from "../../../../@shared/domain/usercase/usecase.interface";
import Category from "../../domain/category/category.entity";
import ICategoryRepository from "../../repository/category.repository.interface";

export default class ListCategoriesUsecase implements IUsecase {

  constructor(private categoryRepository: ICategoryRepository) {}

  execute(): Promise<Category[]> {
    return this.categoryRepository.findAll()
  }
}