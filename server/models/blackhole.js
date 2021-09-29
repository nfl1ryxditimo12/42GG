const Sequelize = require("sequelize");

module.exports = class Blackhole extends Sequelize.Model {
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
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                correctionPoint: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                wallet: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                coalition: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                coalitionScore: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                coalitionRank: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                blackholedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Blackhole",
                tableName: "blackholes",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Blackhole.hasMany(db.BlackProject, {
            foreignKey: "user_id",
            sourceKey: "id",
        });
    }
};
