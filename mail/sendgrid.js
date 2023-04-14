const client = require("@sendgrid/mail")

client.setApiKey(process.env.SENDGRID_API_KEY)
exports.wellcomMail = async function (emial, name) {

    const message = {
        personalizations: [
            {
                to: {
                    email: "me.mahmoudselim@gamil.com",
                    name: "Mahmoud Selim"
                },
                cc: {
                    email: "i.mahmoudselim@outlook.com",
                    name: "Mahmoud Selim"
                }, bcc: {
                    email: "mahmoud.selim1995@yahoo.com",
                    name: "Mahmoud Selim"
                }
            }
        ],
        from: {
            email: "i.mahmoudselim@outlook.com",
            name: "library mangement"
        },
        subject: 'Wellcom E-mail',
        content: [
            {
                type: 'text/html',
                value: `
            <p><strong>Hello from Selim Library!</strong></p>
            <p> Dear Mahmoud Selim
            Thank you for joining our beloved family,
            and we hope that our books could fullfil
            your reading eager</p>`
            }
        ],
    }

    await client.send(message)
}

exports.buyEMial = async function (emial, name, books) {
    const recipe = function (books) {
        const order = books.reduce((reduced, least) => {
            reduced.concat(`
       ${least.orderBook.quantity} of ${least.title} book and cost ${least.orderBook.price}`)
        })
        const total = books.reduce((reduced, least) => reduced += least.orderBook.quantity * least.orderBook.price)
        return `${order}
         and total cost is ${total}$`
    }
    const message = {
        personalizations: [
            {
                to: {
                    email: "me.mahmoudselim@gamil.com",
                    name: "Mahmoud Selim"
                },
                cc: {
                    email: "i.mahmoudselim@outlook.com",
                    name: "Mahmoud Selim"
                }, bcc: {
                    email: "mahmoud.selim1995@yahoo.com",
                    name: "Mahmoud Selim"
                }
            }
        ],
        from: {
            email: "i.mahmoudselim@outlook.com",
            name: "library mangement"
        },
        subject: 'Thanking email',
        content: [
            {
                type: 'text/html',
                value: `
            <p><strong>Thank you from Selim Library!</strong></p>
            <p> Dear Mahmoud Selim
            Thank you for trusting us and our books,
            and we hope that our books could fullfil
            your reading eager.
            Your order is:
            ${recipe(books)}.
            </p>`
            }
        ],
    }

    await client.send(message)
}
exports.cancelEmail = async function (emial, name) {

    const message = {
        personalizations: [
            {
                to: {
                    email: "me.mahmoudselim@gamil.com",
                    name: "Mahmoud Selim"
                },
                cc: {
                    email: "i.mahmoudselim@outlook.com",
                    name: "Mahmoud Selim"
                }, bcc: {
                    email: "mahmoud.selim1995@yahoo.com",
                    name: "Mahmoud Selim"
                }
            }
        ],
        from: {
            email: "i.mahmoudselim@outlook.com",
            name: "library mangement"
        },
        subject: 'Thanking email',
        content: [
            {
                type: 'text/html',
                value: `<strong>
                Dear ${name}, 
                Goob Bye.  
                Best regards
                </strong>`
            }
        ],
    }

    await client.send(message)
}
