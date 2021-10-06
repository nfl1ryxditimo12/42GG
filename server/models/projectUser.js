const Sequelize = require("sequelize");

module.exports = class ProjectUser extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                project: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "ProjectUser",
                tableName: "projectUsers",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.ProjectUser.belongsTo(db.Cadet, {
            foreignKey: "user_id",
            sourceKey: "id",
        });
    }
};
