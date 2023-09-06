const { DataTypes } = require("sequelize");
const { sequelize } = require("./config");
const validate = require("validator");

const User = sequelize.define("Users", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.BIGINT,
  },
});
const Admin = sequelize.define("Admins", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idNumber: {
    type: DataTypes.BIGINT,
    unique: true,
  },
});
const Book = sequelize.define("Books", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  review: {
    type: DataTypes.BIGINT,
    validate: {
      isInt: true,
    },
  },
});
const Availability = sequelize.define("Availability", {
  type: {
    type: DataTypes.BOOLEAN,
  },
  leaseDate: {
    type: DataTypes.DATE,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

//Associations
User.hasMany(Book);
User.belongsTo(Book);
Book.belongsTo(Availability);
module.exports = { User, Admin, Book, Availability };
