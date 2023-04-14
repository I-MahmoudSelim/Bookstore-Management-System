const fs = require("fs")
const https = require("https")

const app = require("./app")
const PORT = process.env.PORT
// const option = {
//     key: fs.readFileSync("./cert/key.pem"),
//     cert: fs.readFileSync("./cert/cert.pem")
// }

// https.createServer(option, app).listen(PORT, () => console.log("Try to master"))
app.listen(PORT, () => {
    console.log("Try to master ", PORT)
})