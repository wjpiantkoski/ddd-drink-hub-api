import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import ICategoryRepository from "../../repository/category.repository.interface";

export default class ListCategoriesUsecase implements IUsecase {

  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<UsecaseResponse> {
    try {
      const categories = await this.categoryRepository.findAll()

      return {
        status: 200,
        data: categories
      }
    } catch {
      return {
        status: 200,
        data: []
      }
    }
  }
}