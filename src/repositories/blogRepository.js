import { prisma } from '../config/prisma.js';

async function create(blogData) {
    return prisma.blog.create({
        data: blogData
    });
}

async function findAll() {
    return prisma.blog.findMany();
}

async function findById(id) {
    return prisma.blog.findUnique({
        where: {
            id: Number(id)
        }
    });
}
const blogRepository = {
    create,
    findAll, 
    findById
};

export default blogRepository;