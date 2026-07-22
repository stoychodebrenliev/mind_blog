import { prisma } from '../config/prisma.js';

async function create(userData) {
    return prisma.user.create({
        data: userData
    });
}

async function findByEmail(email) {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
}

const userRepository = {
    create,
    findByEmail
};

export default userRepository;