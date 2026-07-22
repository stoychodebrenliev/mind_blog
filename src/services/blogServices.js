import blogRepository from "../repositories/blogRepository.js";

export async function create(blogData, ownerId) {
    const createdBlog = await blogRepository.create({
        title: blogData.title,
        image: blogData.image,
        content: blogData.content,
        category: blogData.category,
        ownerId: ownerId

    });
    return createdBlog
}

export async function getAll() {
    return blogRepository.findAll();
}

export async function getById(id) {
    return blogRepository.findById(id)
}

const blogService = {
    create,
    getAll,
    getById
};

export default blogService