const Author = require("../models/Author");
const Book = require("../models/Book");
const Client = require("../models/Client");
const Cart = require("../models/Cart");
const Category = require("../models/Category");
const Cart_Book = require("../models/Cart_Book");
const Order = require("../models/Order");
const OrderBook = require("../models/Order_Book");
const Review = require("../models/Review");
const Request = require("../models/Request");


Author.hasMany(Book)
Book.belongsTo(Author)

Book.belongsToMany(Category, { through: "books_categories" });
Category.belongsToMany(Book, { through: "books_categories" });

Client.hasOne(Cart)
Client.hasMany(Order)
Order.belongsTo(Client)

Book.belongsToMany(Cart, { through: Cart_Book });
Cart.belongsToMany(Book, { through: Cart_Book });

Order.belongsToMany(Book, { through: OrderBook })
Book.belongsToMany(Order, { through: OrderBook })


// Client.belongsToMany(Book, { through: Review })
// Book.belongsToMany(Client, { through: Review })
Client.belongsToMany(Book, { through: { model: Review, unique: true }, onDelete: "CASCADE" })
Book.belongsToMany(Client, { through: { model: Review, unique: true }, onDelete: "CASCADE" })

Book.hasMany(Review)
Review.belongsTo(Book)

Client.hasMany(Review)
Review.belongsTo(Client)

Client.hasMany(Request)
Request.belongsTo(Client)