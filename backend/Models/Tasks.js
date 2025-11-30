import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Task = sequelize.define('Tasks', {
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
 description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
   status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,   
  }
}, {
  tableName: 'Tasks',
  timestamps: true,     
});

export default Task;