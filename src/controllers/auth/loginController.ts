import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
import { signAccessToken } from '../../utils/token/jwt'
const createError = require('http-errors')

const loginController = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {


        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            res.status(400).json({
                message: 'user account you are trying to access is likely not registered with us'
            })
            return
        }


        const checkPassword = bcrypt.compareSync(password, user?.password)
        if (!checkPassword) {
            res.status(400).json({ message: "provided email address or password is invalid" })
        }
        const accessToken = await signAccessToken(user)

        res.status(200).json({ user: { ...user, password: undefined }, accessToken })
        return
    } catch (error: any) {
        console.log(error?.message || error)
        res.status(500).json({ message: error?.message || error })
        return
    }
}


export default loginController;