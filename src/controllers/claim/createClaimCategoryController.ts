import { PrismaClient } from '@prisma/client'
import { messages } from '../../constants/messages'


const createClaimCategoryController = async (req: any, res: any) => {
    const prisma = new PrismaClient()
    const { title } = req.body
    if (!title) return res.status(400).json({ message: `${messages?.claimCategory?.fail}, Title is required` })
    try {
        const claimCategory = await prisma.claimType.create({
            data: {
                title
            }
        })
        res.status(200).json({ message: messages?.claimCategory?.success, data:claimCategory })
        return
    }
    catch (err:any) {
        res.status(400).json({ message: err?.message })
        return
    }
    
}
    

    
 

export default createClaimCategoryController;