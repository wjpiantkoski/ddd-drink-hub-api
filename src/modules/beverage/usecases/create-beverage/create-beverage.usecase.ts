import IService from "../../../../@shared/domain/service/service.interface";
import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import Beverage from "../../domain/beverage/beverage.entity";
import IBeverageRepository from "../../repository/beverage.repository.interface";
import ICategoryRepository from "../../repository/category.repository.interface";

export interface CreateBeverageUsecaseInput {
  name: string
  userId: string
  categoryId: string
  description: string,
  image: any
}

export default class CreateBeverageUsecase implements IUsecase {

  constructor(
    private beverageRepository: IBeverageRepository,
    private categoryRepository: ICategoryRepository,
    private removeBeverageImage: IService
  ) {}

  async execute(input: CreateBeverageUsecaseInput): Promise<UsecaseResponse> {
    const category = await this.categoryRepository.findById(input.categoryId)

    if (!category) {
      await this.removeBeverageImage.run(input.image)

      return {
        status: 400,
        data: { 
          message: 'Invalid category'
        }
      }
    }

    const beverage = new Beverage({
      category,
      name: input.name,
      image: input.image,
      userId: input.userId,
      description: input.description
    })

    try {
      await this.beverageRepository.create(beverage)

      return {
        data: null,
        status: 201
      }
    } catch {
      await this.removeBeverageImage.run(input.image)

      return {
        data: null,
        status: 400
      }
    }
  }
}