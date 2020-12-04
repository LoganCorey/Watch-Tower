import { Sequelize, Model, DataTypes } from "sequelize";
import path from "path";
import Series from "./Series";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "..", "data", "Comics.db"),
  define: { freezeTableName: true, timestamps: false, underscored: true },
});

class Publisher extends Model {}
Publisher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher_image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { sequelize, modelName: "publisher" }
);

(async () => {
  await sequelize.sync();
  Publisher.hasMany(Series);
})();

export default Publisher;
