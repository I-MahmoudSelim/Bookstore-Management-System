const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const MyError = require("../utils/MyError")

const SECRET = process.env.SECRET

const Admin = require("../models/Admin")
const Author = require("../models/Author")
const Category = require("../models/Category")
const Book = require("../models/Book")
const Client = require("../models/Client")


async function findBooks(Books) {
    return await Promise.all(Books.map(async (title) => {
        return await Book.find({ where: { title } })
    }))
}

async function findCategories(categories) {
    return await Promise.all(categories.map(async (c) => {
        return await Category.find({ where: { name: c } })
    }))
}

exports.logIn = async (req, res) => {
    const { email, password } = req.body.admin
    const admin = await Admin.findOne({ where: { email } })

    if (!admin) {
        throw new MyError(401, "wrong email or password")
    }

    if (!await bcrypt.compare(password, admin.password)) {
        throw new MyError(401, "wrong email or password")
    }

    const token = jwt.sign({ pk: admin.admin_Id, isAdmin: true }, SECRET)
    res.status(200).send({ token })
}

exports.addAuthor = async (req, res) => {
    const author = await Author.create(req.body.author)
    res.status(201).send({ author })
}

exports.editAuthor = async (req, res) => {
    const id = req.params.id
    const body = req.body.author

    let author = await Author.findByPk(id)

    if (!author) {
        throw new MyError(400, "There is no author with id")
    }

    author = await author.update(body)

    if (!author) {
        throw new MyError(400, "There is no author with id")
    }

    res.status(200).send({ author })
}

exports.deleteAuthor = async (req, res) => {
    const id = req.params.id

    const author = await Author.findByPk(id)

    if (!author) {
        throw new MyError(400, "There is no author with id")
    }

    await author.destroy()

    res.status(200).send({ succes: true, msg: "author is deleted successfully" })
}

exports.createBook = async (req, res) => {

    const name = req.body.author
    let book = req.body.book
    const categories = await findCategories(req.body.categories)
    const author = await Author.findOne({ where: { name } })
    if (!author) {
        throw new MyError(400, "There is no author with id")
    }
    book = await author.createBook(book)
    await book.addCategories(categories)

    res.status(201).send({ book })
}

exports.editBook = async (req, res) => {
    let body = req.body.book
    const isbn = req.params.isbn

    const categories = await Category.findAll({ where: { "name": req.body.categories } })

    let book = await Book.findByPk(isbn)
    book = await book.update(body)

    await book.setCategories(categories)

    res.status(200).send({ book })
}

exports.deleteBook = async (req, res) => {
    const isbn = req.params.isbn

    const book = await Book.findByPk(isbn)
    await book.destroy()

    res.status(200).send({ succes: true, msg: "book is deleted successfully" })

}

exports.addCategory = async (req, res) => {
    const { name } = req.body.category
    const category = await Category.findOrCreate({ where: { name } })
    if (!category) {
        throw new MyError(500, "something wrong is happened")
    }
    res.status(201).send({ category })
}

exports.editCategory = async (req, res) => {
    const id = req.params.id

    const category = await Category.findByPk(id);
    category.name = req.body.category.name


    await category.save()
    res.status(200).send({ category })
}

exports.deleteCategory = async (req, res) => {
    const id = req.params.id

    const category = await Category.findByPk(id);
    await category.destroy()
    res.status(200).send({ succes: true, msg: "category is deleted successfully" })
}

exports.blockClient = async (req, res) => {
    let client = await Client.findByPk(req.params.clientId)
    client = await client.update({ active: false, blocked: true })
    res.status(200).send({ client })
}

exports.detailsBook = async (req, res) => {
    const include = [
        { model: order },
        { model: cart },
        { model: Category, through: { attributes: [] } },
        { model: Review, attributes: { exclude: ["bookISBN"] } },
        { model: Author, attributes: ["name", "id"] }
    ]
    const book = await Book.findByPk(req.params.isbn, { include })
    const ordersDetails = await book.countOrders()
    cosole.log(book)
    res.status(200).send({ book, summery })
}

exports.hideBook = async (req, res) => {
    let book = await Book.findByPk(req.params.isbn)
    book = await book.update({ featured: false })
    res.status(200).send({ book })
}
//still

