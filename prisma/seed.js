const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const user = await createUser();
    const posts = await createPosts();
    process.exit(0);

    async function createUser() {
        const user = await prisma.user.create({
            data: {
                email: 'pdsmart6@gmail.com',
                password: 'password'
            },
            include: {
                posts: true
            }
        })
        return user
    }

    async function createPosts() {
        const posts = await prisma.post.create({
            data: {
                content: "first",
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })
        return posts
    }

    process.exit(0);
}

seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));


