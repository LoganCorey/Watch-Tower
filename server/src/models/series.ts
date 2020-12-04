import { Sequelize, Model, DataTypes } from "sequelize";
import Publisher from "./publisher";
import Issue from "./issue";
import path from "path";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "..", "data", "Comics.db"),
  define: { freezeTableName: true, timestamps: false, underscored: true },
});

class Series extends Model {}
Series.init(
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
    total_issues: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year_began: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year_ended: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    publisherId: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "series" }
);

(async () => {
  await sequelize.sync();

  Series.belongsTo(Publisher);
  Series.hasMany(Issue);
})();
export default Series;
