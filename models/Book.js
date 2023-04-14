const sequelize = require("../database/sequelize")
const Sequelize = require("sequelize")

const Book = sequelize.define("book", {
    ISBN: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    describtion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    published: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
})

Book.display = function (...books) {
    if (books.length === 1) {
        const book = books[0]
        return book
    }
    else {
        for (const book of books) {

        }
        return books;
    }
}
module.exports = Book;