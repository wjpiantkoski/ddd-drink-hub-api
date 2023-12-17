import IUsecase from "../../../../@shared/domain/usercase/usecase.interface";
import Beverage from "../../domain/beverage/beverage.entity";
import IBeverageRepository from "../../repository/beverage.repository.interface";
import ICategoryRepository from "../../repository/category.repository.interface";

export interface CreateBeverageUsecaseInput {
  name: string
  userId: string
  categoryId: string
  description: string
}

export default class CreateBeverageUsecase implements IUsecase {

  constructor(
    private beverageRepository: IBeverageRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(input: CreateBeverageUsecaseInput): Promise<void> {
    const category = await this.categoryRepository.findById(input.categoryId)

    if (!category) {
      throw new Error('Category not found')
    }

    const beverage = new Beverage({
      category,
      name: input.name,
      userId: input.userId,
      description: input.description
    })

    await this.beverageRepository.create(beverage)
  }
}