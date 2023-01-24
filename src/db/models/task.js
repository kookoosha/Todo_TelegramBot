const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
