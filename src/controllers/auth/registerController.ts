import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
import { signAccessToken } from '../../utils/token/jwt'
import { messages } from '../../constants/messages';
import { getIpServiceInfo } from '../../services/ipservice/Ipwhois.service';
import { create } from 'domain';

const registerController = async (req: any, res: any) => {
    const data = req.body;
    const ip = req?.ip;

    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if (existingUser) {
        res.status(400).json({
            message: messages.accountCreation?.emailExist
        })
        return
    }

    try {
        const location = await getIpServiceInfo(ip)

        console.log(location)

        const salt = bcrypt.genSaltSync(10);

        data.password = bcrypt.hashSync(data.password, salt);

        const user = await prisma.user.create({
            data: { ...data, profileImage: "https://picsum.photos/200", location},
        })
        const accessToken = await signAccessToken(user)

        res.status(201).json({
            message: messages?.accountCreation.success,
            accessToken,
            user: {

                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
        return
    }





    // return data;
    // console.log(data);
    // console.log(data.password);
    // data.password = bcrypt.hashSync(data.password, 8);
    // console.log(data.password);
    // const user = await prisma.user.create({
    //     data
    // })
    // const accessToken = await signAccessToken(user)

}


export default registerController;