import { PrismaClient } from '@prisma/client'
import { messages } from '../../constants/messages'


const prisma = new PrismaClient()

export const createPolicy = async (req: any, res: any) => {
    const { title, description, price, banner, coverages } = req.body
    const exist = await prisma.policy.findUnique({
        where: {
            title
        }

    }
    )
    if (exist) return res.status(400).json({ message: `${messages?.claimCategory?.fail}, Title already exist` })
    try {
        const policy = await prisma.policy.create({
            data: {
                title,
                description,
                price,
                banner,
                coverages
            }
        })
        res.status(200).json({
            message: messages.createPolicy.success,
            policy
        })
    } catch (error) {
        res.status(500).json({
            message: messages.createPolicy.fail,
            error
        })
    }
}


export const getAllPolicy = async (req: any, res: any) => {
    try {
        const policy = await prisma.policy.findMany()
        res.status(200).json({
            message: messages.getPolicy.success,
            policy
        })
    } catch (error) {
        res.status(500).json({
            message: messages.getPolicy.fail,
            error
        })
    }

}

export const getPolicyById = async (req: any, res: any) => {
    const { id } = req.params
    try {
        const policy = await prisma.policy.findUnique({
            where: {
                id
            }
        })
        res.status(200).json({
            message: messages.getPolicy.success,
            policy
        })
    } catch (error) {
        res.status(500).json({
            message: messages.getPolicy.fail,
            error
        })
    }

}

export const updatePolicy = async (req: any, res: any) => {
    const { id } = req.params
    const { title, description, price, banner, coverages } = req.body
    try {
        const policy = await prisma.policy.update({
            where: {
                id
            },
            data: {
                title,
                description,
                price,
                banner,
                coverages
            }
        })
        res.status(200).json({
            message: messages.updatePolicy.success,
            policy
        })
    } catch (error) {
        res.status(500).json({
            message: messages.updatePolicy.fail,
            error
        })
    }

}
