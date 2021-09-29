const Sequelize = require("sequelize");
const Token = require("./token");
const Campus = require("./campus");
const User = require("./user");
const Project = require("./project");
const Profile = require("./profile");
const UserProject = require("./userProject");
const Blackhole = require("./blackhole");
const BlackProject = require("./blackProject");
const Test = require("./test");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Profile = Profile;
db.UserProject = UserProject;

db.Blackhole = Blackhole;
db.BlackProject = BlackProject;

Token.init(sequelize);
Campus.init(sequelize);
User.init(sequelize);
Project.init(sequelize);
Profile.init(sequelize);
UserProject.init(sequelize);
Blackhole.init(sequelize);
BlackProject.init(sequelize);
Test.init(sequelize);

Profile.associate(db);
UserProject.associate(db);

Blackhole.associate(db);
BlackProject.associate(db);

module.exports = db;
