const { where } = require("sequelize");
const { Book, User, Availability } = require("./model");
const bcrypt = require("bcrypt");
const { default: axios } = require("axios");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
var fs = require("fs");

require("dotenv").config();
api_key = process.env.API_KEY;
const books = [];
var newBooks = [];

module.exports.simpleGetRequest = async (req, res) => {
  console.log("backend route");
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=${api_key}`
  );
  const data = response.data;
  data.items.map((item) => {
    books.push(item.volumeInfo);
  });
  books.map((book) => {
    newBooks.push({
      title: book.title,
      publisher: book.publisher,
      description: book.description,
      category: book.categories,
    });
  });
  fs.writeFile("books.json", JSON.stringify(newBooks), function (err) {
    if (err) {
      console.log(err);
    }
  });
  try {
    const db_books = await Book.bulkCreate(
      newBooks.map((book) => {
        return {
          name: book.title,
          author: book.publisher,
          category: book.category,
          review: 0,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
  res.send("scraping done");
};

module.exports.dbCall = async (req, res) => {
  console.log("db route");
  //res.send(newBooks);
  res.send("testing db done");
};

module.exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const hash = bcrypt.hashSync(password, salt);
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      phoneNumber,
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    users = await User.findAll({
      where: {
        email: email,
      },
    });
    var response = await bcrypt.compare(password, users[0].password);
  } catch (error) {
    console.log(error);
  }
  if (response) {
    res.status(200).send(response);
  } else {
    res.status(404).send("error occurred while fetching data");
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

module.exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.send(books);
  } catch (error) {
    res.status(404).send("error occurred while fetching books");
  }
};

module.exports.addReview = async (req, res) => {
  try {
    const book = await Book.findAll({ where: { id: req.params.bookid } });
    var review = book.review;
    console.log(book);
  } catch (error) {
    res.status(404).send("error occurred while getting book id");
  }
  try {
    await Book.update(
      { review: review + 1 },
      { where: { id: req.params.bookid } }
    );
    res.send("review added successfully");
  } catch (error) {
    res.status(404).send("error occurred while adding review");
    console.log(error);
  }
};

module.exports.addBook = async (req, res) => {
  try {
    const { userid, bookid } = req.body;
    await User.update({ BookId: bookid }, { where: { id: userid } });
    await Book.update({ UserId: userid }, { where: { id: bookid } });
    const availability = await Availability.create({
      type: true,
      leaseDate: new Date(),
    });
    await Book.update(
      { AvailabilityId: availability.id },
      { where: { id: bookid } }
    );
    res.send("all went well");
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
