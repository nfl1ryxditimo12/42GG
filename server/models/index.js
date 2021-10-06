const Sequelize = require("sequelize");

const Token = require("./token");
const UserList = require("./userList");
const Cadet = require("./cadet");
const Blackhole = require("./blackhole");
const Pisciner = require("./pisciner");
const Other = require("./other");
const Project = require("./project");
const Achievement = require("./achievement");
const ProjectUser = require("./projectUser");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Cadet = Cadet;
db.ProjectUser = ProjectUser;

Token.init(sequelize);
UserList.init(sequelize);
Cadet.init(sequelize);
Blackhole.init(sequelize);
Pisciner.init(sequelize);
Other.init(sequelize);
Project.init(sequelize);
Achievement.init(sequelize);
ProjectUser.init(sequelize);

Cadet.associate(db);
ProjectUser.associate(db);

module.exports = db;
