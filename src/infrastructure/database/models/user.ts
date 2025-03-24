
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/config';

class User extends Model { }

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Users',
    tableName: 'users'
});
export default User;