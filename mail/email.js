const sendInBlue = require("sib-api-v3-sdk")

sendInBlue.ApiClient.instance.authentications['api-key'].apiKey = process.env.SIB_API_KEY;

exports.sendWellcomeMail = async function (email, name) {
    const emailApi = new sendInBlue.TransactionalEmailsApi();
    await emailApi.sendTransacEmail({
        sender: { email: 'me.mahmoudselim@gmail.com', name: 'library system' },
        subject: 'Welcome to library!',
        htmlContent:
            `<!DOCTYPE html><html><body><p><strong>Hello from Selim Library!</strong></p><br>
            <p> Dear ${name}<br>
            Thank you for joining our beloved family,<br>
            and we hope that our books could fullfil<br>
            your reading eager</p></body></html>`,
        to: [{ email }],
    });
}

exports.recipeMail = async function (email, name, books) {
    const recipe = function (books) {
        const order = books.reduce((reduced, least) => { reduced.concat(`${least.orderBook.quantity} of ${least.title} book and cost ${least.orderBook.price}<br>`) })
        const total = books.reduce((reduced, least) => reduced += least.orderBook.quantity * least.orderBook.price)
        console.log(order, total)
        return `${order}and total cost is <strong>${total}$</strong>`
    }

    const emailApi = new sendInBlue.TransactionalEmailsApi();
    await emailApi.sendTransacEmail({
        sender: { email: 'me.mahmoudselim@gmail.com', name: 'library system' },
        subject: 'confirm order',
        htmlContent:
            `<!DOCTYPE html><html><body><p><strong>Hello from Selim Library!</strong></p><br>
            <p> Dear ${name}<br>
            Thank you for trusting us and our books,<br>
            and we hope that our books could fullfil<br>
            your reading eager.<br>
            Your order is:<br>
            ${recipe(books)}.
            </p></body></html>`,
        to: [{ email }],
    });
}

exports.sendbyeMail = async function (email, name) {
    const emailApi = new sendInBlue.TransactionalEmailsApi();
    await emailApi.sendTransacEmail({
        sender: { email: 'me.mahmoudselim@gmail.com', name: 'library system' },
        subject: 'Good bye!',
        htmlContent:
            `<!DOCTYPE html><html><body><p><strong>Hello from Selim Library!</strong></p><br>
            <p> Dear ${name}<br>
            < strong >
                Goob Bye.<br>  
                Best regards
                </strong ></body></html>`,
        to: [{ email }],
    });
}