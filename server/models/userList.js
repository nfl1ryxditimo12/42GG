const Sequelize = require("sequelize");

module.exports = class UserList extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                },
                login: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                status: {
                    type: Sequelize.STRING(20),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "UserList",
                tableName: "userList",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
};
