import { PrismaClient } from '@prisma/client'
import { messages } from '../../constants/messages'


const prisma = new PrismaClient()

export const createCoverage = async (req: any, res: any) => {
    const { title, description, price, banner, policyId } = req.body
    const exist = await prisma.coverage.findUnique({
        where: {
            title
        }

    }
    )
    if (exist) return res.status(400).json({ message: `${messages?.claimCategory?.fail}, Title already exist` })
    try {
        const coverage = policyId ? await prisma.coverage.create({
            data: {
                Policy: {
                    connect: {
                        id: policyId
                    }
                },
                title,
                description,
                price,
                banner
            }
        }) : await prisma.coverage.create({
            data: {
                title,
                description,
                price,
                banner
            }
        }
        )

        res.status(200).json({
            message: messages.createPolicy.success,
            coverage
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: messages.createPolicy.fail,
            error
        })
    }
}


export const getAllCoverage = async (req: any, res: any) => {
    try {
        const coverage = await prisma.coverage.findMany({
            include: {
                Policy: true,
            },
        })
        res.status(200).json({
            message: messages.getPolicy.success,
            coverage
        })
    } catch (error) {
        res.status(500).json({
            message: messages.getPolicy.fail,
            error
        })
    }

}

export const getCoverageById = async (req: any, res: any) => {
    const { id } = req.params
    try {
        const coverage = await prisma.coverage.findUnique({
            where: {
                id
            },
            include: {
                Policy: true,
            },
        })
        res.status(200).json({
            message: messages.getPolicy.success,
            coverage
        })
    } catch (error) {
        res.status(500).json({
            message: messages.getPolicy.fail,
            error
        })
    }

}

export const updateCoverage = async (req: any, res: any) => {
    const { id } = req.params
    const { title, description, price, banner, coverages } = req.body
    try {
        const coverage = await prisma.coverage.update({
            where: {
                id
            },
            data: {
                title,
                description,
                price,
                banner
            }
        })
        res.status(200).json({
            message: messages.updatePolicy.success,
            coverage
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: messages.updatePolicy.fail,
            error
        })
    }

}
