import express, { Request, Response } from 'express';
import { getPrisma } from '../../prisma';

const prisma = getPrisma();

const confirmTokenController = async (req: Request, res: Response) => {
    try {
        const { token  } = req.params;

        // Find user with the provided confirmation token
        const user = await prisma.user.findUnique({
            where: {
                confirmationToken: token,
            },
        });

        if (!user) {
            return res.send('Confirmation token is invalid');
        }

        // Update user's confirmation status in the database
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                emailVerified: true,
                confirmationToken: "", // Clear the confirmation token
            },
        });

        res.send('Account confirmed successfully' );
    } catch (error) {
        console.error('Error confirming account:', error);
        res.send('Account confirmation failed');
    }
};


export default confirmTokenController






