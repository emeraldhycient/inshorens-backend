//Use req.ip or req.ips in the usual way
const express = require("express")
const app = express()
require('dotenv').config()
import { getPrisma, disconnectPrisma } from './prisma';

import authRoute from "./routes/auth"
import clainRoute from "./routes/claim"
import policyRoute from "./routes/policy"
import coverageRoute from "./routes/coverage"
import planRoute from "./routes/plan/"
import auth from './middlewares/auth';

async function main() {
    // Connect the client
    const prisma = getPrisma();

    // Your application logic here...

    // Gracefully disconnect the Prisma Client instance when the application exits
    process.on('beforeExit', async () => {
        await disconnectPrisma();
    });
    
    app.set('trust proxy', true)
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static("public"))
    // app.set("view engine", "ejs")
    // app.set("views", "./views")
    app.get("/api/v1/", (req: any, res: any) => {
        res.send(req.ip)
        res.status(200)
        return
    })

    app.use("/api/v1", authRoute)
    app.use("/api/v1",auth, clainRoute )
    app.use("/api/v1",auth, policyRoute )
    app.use("/api/v1",auth, coverageRoute )
    app.use("/api/v1",auth, planRoute )

    const port = process.env.PORT || 10000
    app.listen(port, (error: unknown) => {
        error ? console.log(error) : console.log(`connected on http://localhost:${port}/ and the endpoint for your request is http://localhost:${port}/api/v1`);
    })
}

main()
    .catch(async (e) => {
        console.error(e)
        await disconnectPrisma();
        // process.exit(1)
    })
