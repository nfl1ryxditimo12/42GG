const Sequelize = require("sequelize");

module.exports = class Cadet extends Sequelize.Model {
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
                modelName: "Cadet",
                tableName: "cadets",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Cadet.hasMany(db.ProjectUser, {
            foreignKey: "user_id",
            sourceKey: "id",
        });
    }
};
