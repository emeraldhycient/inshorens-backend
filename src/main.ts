//Use req.ip or req.ips in the usual way
const express = require("express")
const app = express()
import { PrismaClient } from '@prisma/client'
require('dotenv').config()
const prisma = new PrismaClient({
    log: ["query"]
})
import authRoute from "./routes/auth"
import clainRoute from "./routes/claim"

async function main() {
    // Connect the client
    await prisma.$connect()
    app.set('trust proxy', true)
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static("public"))
    // app.set("view engine", "ejs")
    // app.set("views", "./views")
    // app.use(express.static("public"))
    app.get("/api/v1/", (req: any, res: any) => {
        res.send(req.ip)
        return
    })

    app.use("/api/v1", authRoute)
    app.use("/api/v1", clainRoute )

    const port = process.env.PORT || 10000
    app.listen(port, (error: unknown) => {
        error ? console.log(error) : console.log(`connected on http://localhost:${port}/ and the endpoint for your request is http://localhost:${port}/api/v1`);
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        // process.exit(1)
    })
