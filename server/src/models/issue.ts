import { Sequelize, Model, DataTypes } from "sequelize";
import path from "path";
import Series from "./series";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "..", "data", "Comics.db"),
  define: { freezeTableName: true, timestamps: false, underscored: true },
});

class Issue extends Model {}
Issue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    seriesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    issue_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_variant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    variant_info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cover_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_collected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    purchase_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  { sequelize, modelName: "issue" }
);

(async () => {
  await sequelize.sync();
  Issue.belongsTo(Series);
})();
export default Issue;
