import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { User } from '../interfaces/user';

@Table({
    tableName: 'users',
    timestamps: false,
})
export class Users extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically increments the ID
      })
      id!: number;

    @Column({
        type: DataType.STRING,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
    })
    password!: string;
    @Column({
        type: DataType.STRING,
    })
    firstname!: string;

    @Column({
        type: DataType.STRING,
    })
    lastname!: string;


}

export default Users;