import { transactionLog } from "../../types/@types";
import { getPrisma } from '../../prisma';

const prisma = getPrisma();

async function logTransaction({ userId, transactionType, details, amount, paymentMethod } : transactionLog) {
    const transaction = await prisma.transactionLog.create({
        data: {
            transactionType,
            details,
            amount,
            paymentMethod,
            user: {
                connect :{id: userId}
            }
        },
    });

    console.log('Transaction log created:', transaction);
}