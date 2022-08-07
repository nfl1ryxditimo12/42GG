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
                achievements: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                coalition: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
                project: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                anonymize_date: {
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
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Blackhole.hasMany(db.UserProject, {
            foreignKey: "user_id",
            sourceKey: "id",
        });
    }
};
