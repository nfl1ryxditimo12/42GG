const Sequelize = require("sequelize");

module.exports = class Token extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                accessToken: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                expiresIn: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                },
                createdAt: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Token",
                tableName: "token",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
};
