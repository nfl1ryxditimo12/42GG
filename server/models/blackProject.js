const Sequelize = require("sequelize");

module.exports = class BlackProject extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                login: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                libft: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                get_next_line: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                ft_printf: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                netwhat: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                Born2beroot: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                push_swap: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                minitalk: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                pipex: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                so_long: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                FDF: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                fract_ol: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                ft_server: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                ft_services: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                webserv: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                ft_irc: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                cub3d: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                miniRT: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                libasm: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                ft_container: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                minishell: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                Philosophers: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                NetPractice: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                CPP_Module_00: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                CPP_Module_01: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                CPP_Module_02: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                CPP_Module_03: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                CPP_Module_04: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                CPP_Module_05: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                CPP_Module_06: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                CPP_Module_07: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                CPP_Module_08: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                Inception: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                CPP_Module_00: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                ft_transcendence: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                Exam00: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                Exam01: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                Exam02: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                Exam03: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                Exam04: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                Exam05: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                Exam06: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "BlackProject",
                tableName: "blackProjects",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.BlackProject.belongsTo(db.Blackhole, {
            foreignKey: "user_id",
            target: "id",
        });
    }
};
