const Sequelize = require("sequelize");

module.exports = class Project extends Sequelize.Model {
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
                modelName: "Project",
                tableName: "projects",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
};
