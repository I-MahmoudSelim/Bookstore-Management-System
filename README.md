# Bookstore Management System Project

## Describtion

This is a Bookstore Mangagement System made by Mahmoud Selim, it is focusing on the solution of all the problems related to the paperwork for different reasons. It provides a facility to handle all the activities in one place. With the help of this application, the admin can perform a different kinds of operations at the same time and place. Bookstore management System has the ability to keep records safe related to Books. We provide the best service on our website or focus on user choice. We will improve the new feat so users can easily understand and trust our system.

## Table of Contents

- [Bookstore Management System Project](#bookstore-management-system-project)
  - [Describtion](#describtion)
  - [Table of Contents](#table-of-contents)
  - [Scope of Project](#scope-of-project)
  - [Applicability of Project](#applicability-of-project)
  - [Requirement Specification](#requirement-specification)
  - [Functionalities of Admin](#functionalities-of-admin)
  - [Functionalities of Client](#functionalities-of-client)
  - [Database Design \& Structure Design](#database-design--structure-design)
    - [Various tables used in the System are as follows](#various-tables-used-in-the-system-are-as-follows)
  - [Requirements](#requirements)
  - [Getting started](#getting-started)
  - [Project Structure](#project-structure)
  - [Conclusion](#conclusion)
    - [Limitation of system](#limitation-of-system)
    - [Future Scope of the System](#future-scope-of-the-system)

## Scope of Project

- The intentions of the Bookstore Management System are to reduce overtime pay and increase the number of records that can be treated accurately; Requirements statements in this document are both functional and non-functional.
- Correct and Accurate Searching provides the result by applying the search operation.
- Customers can book a book with just a few clicks.
- Give flexibility to admin to use the database effectively and utilize the word, not pad, and calculator Unambiguous and understandable by all level facilities effectively.
- Unambiguous and understandable at all levels.

## Applicability of Project

- For customers who want to buy books anywhere or anytime.
- Admin is applicable for insert books, list of books.
- The database is used for storing and fetching data from or to the database so both users and admin can fetch or read data.

## Requirement Specification

As per the Bookstore Management System Requirements, it contains two (2) Modules:

1. Admin
2. Client

## Functionalities of Admin

This Module includes the mainly following tasks:

- Entry of Category.
- Category List.
- Add a New Book.
- View Book.
- View Client's profile and thier privious purchases.

## Functionalities of Client

This Module includes the mainly following tasks:

- View Books.
- Add books to Cart.
- Search Books.
- View Cart.
- Like Books
- Reveiw Books

## Database Design & Structure Design

### Various tables used in the System are as follows

- Admin
- Client
- Category
- Book
- Cart
- Order
- Review

## Requirements

- Node.js v18.14.2.
- Database: MySQL

## Getting started

- Install dependencies

  ```console
  cd /BookstoreManagementSystem
  npm install
  ```

- Build and run the project

  ```console
  npm start
  ```

- Navigate to: <http://localhost:3000>

## Project Structure

The folder structure of this app is explained below:

| node_modules | Contains all npm dependencies                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------- |
| cert         | Contains the TSL certification and its key.                                                       |
| node_modules | Contains all npm dependencies.                                                                    |
| config       | Application configuration including environment-specific configs.                                 |
| controllers  | Controllers define functions to serve various express routes.                                     |
| database     | Create database server and relations between deferent models.                                     |
| mail         | Contains sending email functions.                                                                 |
| middlewares  | Express middlewares which process the incoming requests before handling them down to the routes.  |
| routes       | Contain all express routes.                                                                       |
| models       | Models define schemas that will be used in storing and retrieving data from Application database. |
| test         | Contains test cases.                                                                              |
| utils        | Contains help functions.                                                                          |
| app.js       | Contains application core.                                                                        |
| index.js     | Entry point to express app.                                                                       |
| package.json | Contains npm dependencies as well as build scripts.                                               |

## Conclusion

- At first look, we can say that Bookstore Management System is a perfect system but it has many limitations that are as follow :
- This is also used to list the category and books also manage the customer and books of the Bookstore.
- The Bookstore Management System is used to give information about the Books to the customer.
- We faced problems like Database creation, the Flow of our system, designing back-end tools, coding, etc.
- We learn new technologies :
  - SQl database: MySQl.
  - ORM: Sequelize.
- We enhance our old skills like:
  - language: JavaScript
  - JavaScript runtime environment: Node.js.
  - Node framework: Express.js.
  - Unit test: Jest.

### Limitation of system

- #### Help

Currently, the help feature is not available. Using this functionality users can get help with the system.

- #### Payment

Currently, the feature of online payment is not available. Users cannot give payment online.

- #### Multilingual

Multilingualism is not supported in our system. Therefore users cannot work in different languages.

- #### Backup & Recovery

Users cannot take the backup or recover the data in this system.

Many More Others.

### Future Scope of the System

- #### Help module

Using this module users can get help on how to access the system. All functionalities of the system are described in this module. And user can easily access the entire module using this feature.

- #### Online payment module

User can do their payment online using this functionality. In the future, we will add an online payment to make payment easier for the user.

- #### Adding multilingual

In this system we will add the multilingual therefore users can work in different languages and understand easily.
