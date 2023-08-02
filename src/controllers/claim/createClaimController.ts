import { messages } from '../../constants/messages'
import { getPrisma } from '../../prisma';

const prisma = getPrisma();

const createClaimController = async (req: any, res: any) => {

    const {
        claimTypeId,
        description,
        costEstimation,
        proofOfDamage,
        otherDocument,
        userId
    } = req.body

    try {
        const claim = await prisma.claim.create({
            data: {
                claimTypeId,
                description,
                costEstimation,
                proofOfDamage,
                otherDocument,
                userId
            }
        })

        return res.status(201).json({
            message: messages.createClaim.success,
            data: claim
        })

    } catch (error) {
        return res.status(500).json({ message: `Error: ${messages.fetchClaimCategory.fail} ${error}` })
    }

}





export default createClaimController;