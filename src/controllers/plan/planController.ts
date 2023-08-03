import { messages } from '../../constants/messages'
import { getPrisma } from '../../prisma';
import { logTransaction } from '../../services/transactions/logTransaction.service';
import { TransactionAction } from '../../types/@types';

const prisma = getPrisma();


export const createPlan = async (req: any, res: any) => {
    const { title, price, duration, addons } = req.body

    try {
        const startDate = new Date()
        const endDate = new Date(startDate);

        if (duration === "WEEKLY") {
            endDate.setDate(startDate.getDate() + 7);
        }
        if (duration === 'MONTHLY') {
            endDate.setMonth(startDate.getMonth() + 1);
        }
        if (duration === 'QUARTERLY') {
            endDate.setMonth(startDate.getMonth() + 3);
        }
        if (duration === 'HALF_YEARLY') {
            endDate.setMonth(startDate.getMonth() + 6);
        }
        if (duration === 'YEARLY') {
            endDate.setFullYear(startDate.getFullYear() + 1);
        }
        console.log("user", req?.user.payload)

        const plan = await prisma.plan.create({
            data: {
                title,
                price,
                duration,
                startDate,
                endDate,
                User: { connect: { id: req?.user.payload.id } }
            }
        })

        const transaction = await logTransaction({
            userId: req?.user.payload.id,
            paymentMethod: "CARD",
            transactionType: TransactionAction.PolicyPurchase,
            details: `${req?.user.payload.firstName} ${req?.user.payload.lastName}  bought a  ${title} for the duration ${duration}`,
            amount: price
        })
        res.status(200).json({
            message: messages.createPolicy.success,
            data: { transaction, plan }
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: messages.createPolicy.fail,
            error
        })
    }
}


export const getUserPlans = async (req: any, res: any) => {
    try {
        const plans = await prisma.plan.findMany({
            where: {
                userId: req?.user.payload.id
            },
            include: {
                addons: true,
            }
        })
        res.status(200).json({
            message: messages.getPolicy.success,
            data: plans
        })
    } catch (error) {
        res.status(500).json({
            message: messages.getPolicy.fail,
            error
        })
    }

}

export const getPlanById = async (req: any, res: any) => {
    const { id } = req.params
    try {
        const plan = await prisma.plan.findUnique({
            where: {
                id
            },
            include: {
                addons: true,
            },
        })
        res.status(200).json({
            message: messages.getPolicy.success,
            data : plan
        })
    } catch (error) {
        res.status(500).json({
            message: messages.getPolicy.fail,
            error
        })
    }

}

export const updatePlan = async (req: any, res: any) => {
    const { id } = req.params
    const { title, description, price, banner, coverages, icon } = req.body
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
                coverages,
                icon
            }
        })
        res.status(200).json({
            message: messages.updatePolicy.success,
            policy
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: messages.updatePolicy.fail,
            error
        })
    }

}
