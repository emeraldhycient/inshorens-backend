import { PrismaClient } from '@prisma/client'
import { messages } from '../../constants/messages'


const prisma = new PrismaClient()

export const createCoverage = async (req: any, res: any) => {
    const { title, description, price, banner, policyId } = req.body
    try {
        const coverage =  await prisma.coverage.create({
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
        })

        res.status(200).json({
            message: messages.createCoverage.success,
            coverage
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: messages.createCoverage.fail,
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
            message: messages.getCoverage.success,
            coverage
        })
    } catch (error) {
        res.status(500).json({
            message: messages.getCoverage.fail,
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
            message: messages.getCoverage.success,
            coverage
        })
    } catch (error) {
        res.status(500).json({
            message: messages.getCoverage.fail,
            error
        })
    }

}

export const updateCoverage = async (req: any, res: any) => {
    const { id } = req.params
    const { title, description, price, banner, policyId } = req.body
    try {
        const coverage = policyId ? await prisma.coverage.update({
            where: {
                id
            },
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
        }) : 
            await prisma.coverage.update({
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
            message: messages.updateCoverage.success,
            coverage
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: messages.updateCoverage.fail,
            error
        })
    }

}
