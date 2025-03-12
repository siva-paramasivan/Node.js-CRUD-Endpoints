import { Table, Column, Model, DataType, Sequelize, AllowNull } from 'sequelize-typescript';
import { Customer } from '../interfaces/user';
import { UUID } from 'crypto';

@Table({
  tableName: 'application_users',
  timestamps: false, // Automatically adds createdAt and updatedAt columns
})
export class ApplicationUsers extends Model<ApplicationUsers> {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
      })
      id!: UUID;

  @Column({
    type: DataType.STRING,
    field:'name'
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    field:'password'
  })
  password!: string;


  @Column({
    type: DataType.DATE,
    allowNull:true,
    field:'created_at',
    defaultValue: Sequelize.fn('GETDATE'),
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull:true,
    field:'updated_at',
    defaultValue: Sequelize.fn('GETDATE'),
  })
  updatedAt!: Date;

  @Column({
    type: DataType.STRING,
    allowNull:true,
    field:'created_by'
  })
  created_by!: string;

  @Column({
    type: DataType.STRING,
    allowNull:true,
    field:'updated_by'
  })
  updated_by!: string;

  @Column({
    type: DataType.STRING,
    allowNull:true,
    field:'role'
  })
  role!: string;
}

export default ApplicationUsers;