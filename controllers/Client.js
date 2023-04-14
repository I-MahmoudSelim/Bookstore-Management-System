const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const MyError = require("../utils/MyError")

const SECRET = process.env.SECRET

const Client = require("../models/Client")
const Book = require("../models/Book")
const Category = require("../models/Category")
const Author = require("../models/Author")
const Review = require("../models/Review")
const { buyEMial, wellcomMail, cancelEmail } = require("../mail/sendgrid")
const { sendWellcomeMail, sendbyeMail, recipeMail } = require("../mail/email")


exports.logIn = async (req, res) => {
    const { email, password } = req.body.client
    const client = await Client.findOne({ where: { email } })

    if (!client) {
        throw new MyError(400, "wrong email or password")
    }

    if (client.blocked) {
        throw new MyError(403, "You are forbidden as you are blocked")
    }

    if (!await bcrypt.compare(password, client.password)) {
        throw new MyError(400, "wrong email or password")
    }
    client.password = undefined

    const token = jwt.sign({ pk: client.id, isAdmin: false }, SECRET)
    res.status(200).send({ client, token })
}

exports.signUp = async (req, res) => {
    const body = req.body.client;
    const client = await Client.create(body);

    const token = jwt.sign({ pk: client.id, isAdmin: false }, SECRET)
    // wellcomMail(client.email, client.name)
    sendWellcomeMail(client.email, client.name)
    res.status(201).send({ client, token })
}

exports.logOut = async (req, res) => {
    res.status(200).send({ succes: true, msg: "You log out successfully" })
}

exports.getProfile = async (req, res) => {
    let client = req.client.toJSON()
    if (!client) { throw new MyError(500, "Something wrong is happened") }
    client = Client.display(client)
    res.status(200).send({ client })
}

exports.editProfile = async (req, res) => {
    const { name, email, password } = req.body.client
    let client = req.client
    if (!client) { throw new MyError(500, "Something wrong is happened") }
    client = await client.update({ name, email, password })
    client = Client.display(client)
    res.status(200).send({ client })
}

exports.deleteProfile = async (req, res) => {
    let client = req.client
    if (!client) { throw new MyError(500, "Something wrong is happened") }
    await client.destroy()
    // cancelEmail(client.email, client.name)
    sendbyeMail(client.email, client.name)
    res.redirect("/logout")
}

exports.addBookToCart = async (req, res) => {
    let client = req.client
    const book = await Book.findByPk(req.params.isbn)

    let cart = await client.getCart()
    if (!cart) {
        cart = await client.createCart()
    }
    await cart.addBooks(book, { through: { quantity: 1 } })
    res.status(200).send({ client, cart })
}

exports.viewCart = async (req, res) => {
    const client = req.client
    const cart = await client.getCart()
    const books = await cart.getBooks()
    res.status(200).send({ client, cart, books })
}

exports.deleteBookfromCart = async (req, res) => {
    const ISBN = req.params.isbn
    const client = req.client
    const cart = await client.getCart()
    const [book] = await cart.getBooks({ where: { ISBN } })
    await book.cart_books.destroy()
    res.status(200).send({ succes: true, msg: "book is deleted successfully" })
}

exports.getBooks = async (req, res) => {
    const { Op } = require("sequelize")

    const include = [
        { model: Category, attributes: ["name"], through: { attributes: [] } },
        { model: Author, attributes: ["name"] },
        { model: Review, attributes: { exclude: ["bookISBN"] } },
    ];

    // Query parameters
    let where = { featured: true }

    if (req.query.title) {
        where.title = req.query.title
    }

    if (req.query.price) {
        const range = req.query.price.split("-")

        where.price = { [Op.between]: [parseInt(range[0]), parseInt(range[1])] }
    }

    if (req.query.category) {
        include[0].where = { name: req.query.category }
    }

    if (req.query.author) {
        include[1].where = { name: req.query.author }
    }


    // Limits and Pagination
    const limit = req.query.limit || 5
    const offset = req.query.offset || 1
    // sorting resault
    let order;
    if (req.query.sortBy) {
        const sortBy = req.query.sortBy.split(":")
        order = [sortBy]
        if (req.query.sortBy2) {
            const sortBy2 = req.query.sortBy2.split(":")
            order.push(sortBy2)
        }
    }

    const attributes = { exclude: ["authorId"] }

    const books = await Book.findAll({ where, attributes, order, limit, offset, include })

    res.status(200).send({ books })
}

exports.getBook = async (req, res) => {
    const isbn = req.params.isbn

    const include = [
        { model: Category, through: { attributes: [] } },
        { model: Review, attributes: { exclude: ["bookISBN"] } },
        { model: Author, attributes: ["name", "id"] }
    ]

    const book = await Book.findByPk(isbn, { include, attributes: { exclude: ["authorId"] } })
    res.status(200).send({ book })
}

exports.orderCart = async (req, res) => {
    const client = req.client;
    const cart = await client.getCart()
    const books = await cart.getBooks()

    const order = await client.createOrder()

    await order.addBooks(books.map(book => {
        book.orderBook = { quantity: book.cartBook.quantity, price: book.cartBook.quantity * book.price }
        return book
    }))
    // await buyEMial(client.email, client.name, books)
    await recipeMail(client.email, client.name, books)
    await cart.setBooks(null)
    res.status(200).send({ order })
}

exports.reviewBook = async (req, res) => {
    const client = req.client

    const rating = req.body.rating
    const comment = req.body.comment

    const ISBN = req.params.isbn
    console.log(ISBN)

    const book = await Book.findByPk(ISBN)

    console.log(book)

    const data = await client.addBooks(book, { through: { rating, comment } })

    res.status(201).send({ data })
}
//still
exports.requestBook = async (req, res) => {
    const client = req.client;
    let request = req.body;
    request = await client.createRequest(request)
    res.status(201).send({ request })
}