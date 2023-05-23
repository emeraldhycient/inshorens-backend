import { PrismaClient } from '@prisma/client'
const nodemailer = require("nodemailer");
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
import { signAccessToken } from '../../utils/token/jwt'
import { messages } from '../../constants/messages';
import { getIpServiceInfo } from '../../services/ipservice/Ipwhois.service';
import crypto from 'crypto';

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

    const confirmationToken = crypto.randomBytes(20).toString('hex');

    try {
        const location = await getIpServiceInfo(ip)

        console.log(location)

        const salt = bcrypt.genSaltSync(10);

        data.password = bcrypt.hashSync(data.password, salt);

        const user = await prisma.user.create({
            data: { ...data, profileImage: "https://picsum.photos/200", location, confirmationToken },
        })
        const accessToken = await signAccessToken(user)

        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"inshorens" <foo@example.com>', // sender address
            to: `${data.email}`, // list of receivers
            subject: "Email confirmation from inshorens ✅✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<p>Please click the following link to confirm your account: 
        ${req.protocol}://${req.get('host')}/api/v1/confirm/${confirmationToken}</p>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

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