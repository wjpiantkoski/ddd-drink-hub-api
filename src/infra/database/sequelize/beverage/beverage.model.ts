import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript"
import CategoryModel from "../category/category.model"
import { UserModel } from "../user/user.model"
import Category from "../../../../modules/beverage/domain/category/category.entity"
import BookmarkModel from "../bookmark/bookmark.model"
import Bookmark from "../../../../modules/beverage/domain/bookmark/bookmark.entity"

@Table({
  tableName: 'beverages',
  timestamps: false
})
export default class BeverageModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @AllowNull(false)
  @Unique({ name: 'bev_name_unique', msg: 'beverage name should be unique' })
  @Column({ type: DataType.STRING(100) })
  declare name: string

  @Column({ allowNull: false })
  declare description: string

  @Column({ allowNull: false })
  declare image: string

  @ForeignKey(() => CategoryModel)
  @Column({ allowNull: false })
  declare categoryId: string

  @BelongsTo(() => CategoryModel)
  declare category: Category

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  declare userId: string

  @HasMany(() => BookmarkModel)
  declare bookmarks: Bookmark[]
}