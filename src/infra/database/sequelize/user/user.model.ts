import { AllowNull, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({
  tableName: 'users',
  timestamps: false
})
export class UserModel extends Model {

  @PrimaryKey
  @Column({allowNull: false})
  declare id: string

  @Column({allowNull: false})
  declare name: string

  @AllowNull(false)
  @Unique({ name: 'user_email_unique', msg: 'user email should be unique' })
  @Column({ type: DataType.STRING(100) })
  declare email: string

  @Column({allowNull: false})
  declare password: string
}