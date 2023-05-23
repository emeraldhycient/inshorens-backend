import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express';

const prisma = new PrismaClient()

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
            return res.status(404).json({ message: 'Confirmation token is invalid' });
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

        res.status(200).json({ message: 'Account confirmed successfully' });
    } catch (error) {
        console.error('Error confirming account:', error);
        res.status(500).json({ message: 'Account confirmation failed' });
    }
};


export default confirmTokenController






