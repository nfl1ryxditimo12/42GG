const Sequelize = require("sequelize");

module.exports = class Achievement extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                achivement: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Achivement",
                tableName: "achivements",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
};
