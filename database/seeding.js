const sequelize = require("./sequelize");
const Admin = require("../models/Admin")
const Book = require('../models/Book');
const Category = require('../models/Category');
const Author = require('../models/Author');

const { Categories, Authors, Books } = require("./seeds");


(async function () {
    await sequelize.sync({ force: true });
    await Admin.create({
        name: "admin",
        email: "admin@library.com",
        password: "admin"
    })

    for (const cat of Categories) {
        await Category.create({ name: cat })
    }

    for (const A of Authors) {
        await Author.create(A)
    }
    for (const B of Books) {
        const categories = B.genere
        B.genere = undefined
        const book = await Book.create(B)
        await book.addCategories(categories)

    }

})()