import { messages } from '../../constants/messages'
import { getPrisma } from '../../prisma';

const prisma = getPrisma();

export const getClaimsByUserIdController = async (req: any, res: any)=>{

    try{
        const {userId} = req.params
        const claims = await prisma.claim.findMany({
            where: {
                userId
            }
        })
        res.status(200).json({
            message :  messages.fetchClaimCategory.success,
            data:claims
        })
    }catch(err){
        res.status(500).json({message: err})
    }

     
}
 
export const getAllClaimsController = async (req: any, res: any) => {
    try{
        const claims = await prisma.claim.findMany()
        res.status(200).json({message :messages.fetchClaimCategory.success, data:claims})
    }catch(err){
        res.status(500).json({message: `Error: ${messages.fetchClaimCategory.fail} ${err}`})
    }
}


export const getClaimByIdController = async (req: any, res: any) => {
    try{
        const {id} = req.params
        const claim = await prisma.claim.findUnique({
            where: {
                id
            }
        })
        res.status(200).json({message :messages.fetchClaimCategory.success, data:claim})
    }catch(err){
        res.status(500).json({message: `Error: ${messages.fetchClaimCategory.fail} ${err}`})
    }
}


export const getAllClaimsCategoryController = async (req: any, res: any) => {
    try{
        const claims = await prisma.claimType.findMany()
        res.status(200).json({message :messages.fetchClaimCategory.success, data:claims})
    }catch(err){
        res.status(500).json({message: `Error: ${messages.fetchClaimCategory.fail} ${err}`})
    }
}

