const Sequelize = require("sequelize");

module.exports = class Other extends Sequelize.Model {
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
                    unique: true,
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                wallet: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                correction_point: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pool: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                cursus: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                achievement: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                project: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Other",
                tableName: "others",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
};
