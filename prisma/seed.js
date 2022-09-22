import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function seed() {
  const password = await bcrypt.hash('123', 8)

  const users = []
  const cohorts = []
  const profileImages = [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1686&q=80',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
    'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80',
    'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1829&q=80',
    'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
    'https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    'https://images.unsplash.com/photo-1506891536236-3e07892564b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
    'https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    'https://images.unsplash.com/photo-1572252821143-035a024857ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80'
  ]

  for (let i = 0; i <= 9; i++) {
    if (i <= 3) {
      const cohort = await prisma.cohort.create({
        data: {}
      })

      cohorts.push(cohort)
    }

    const user = await prisma.user.create({
      data: {
        email: `${i}test@test.com`,
        password,
        cohortId: cohorts[0].id,
        profile: {
          create: {
            firstName: `${i}name`,
            lastName: `${i}surname`,
            profileImageUrl: profileImages[i]
          }
        }
      }
    })
    users.push(user)
  }

  const createdUser = await prisma.user.create({
    data: {
      email: 'notmyrealemail@email.com',
      password,
      cohortId: cohorts[2].id
    }
  })

  const userProfile = await prisma.profile.create({
    data: {
      userId: createdUser.id,
      firstName: 'Test',
      lastName: 'Test',
      profileImageUrl:
        'https://images.unsplash.com/photo-1542652735873-fb2825bac6e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    }
  })

  const teacherUser = await prisma.user.create({
    data: {
      email: 'teacher@teacher.com',
      password,
      role: 'TEACHER'
    }
  })

  const teacherProfile = await prisma.profile.create({
    data: {
      userId: teacherUser.id,
      firstName: 'Teacher',
      lastName: 'Boolean',
      profileImageUrl:
        'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=972&q=80'
    }
  })

  users.push(createdUser, teacherUser)

  console.log(cohorts, users, userProfile, teacherProfile)

  const createdPost = await prisma.post.create({
    data: {
      content: "I'm losing my patience creating a DB",
      userId: createdUser.id
    }
  })

  const posts = []
  const content = [
    'Give me a break!',
    'Woah! Next week they are going to shuffle the groups!',
    "Is it a problem if I'm using normal HTML tags instead of MUI?",
    'In love with MUI!'
  ]

  for (let i = 0; i < content.length; i++) {
    const post = await prisma.post.create({
      data: {
        content: content[i],
        userId: users[i].id
      }
    })

    posts.push(post)
  }

  const teacherPost = await prisma.post.create({
    data: {
      content: 'This students are driving me crazy!',
      userId: teacherUser.id
    }
  })

  const teacherSecondPost = await prisma.post.create({
    data: {
      content: 'Please always do a git pull!',
      userId: teacherUser.id
    }
  })

  console.log('posts created', posts, teacherPost, teacherSecondPost)

  const likes = []

  for (let i = 0; i <= 9; i++) {
    const like = await prisma.like.create({
      data: {
        userId: users[i].id,
        postId: teacherPost.id
      }
    })

    likes.push(like)
  }

  console.log('likes created', likes)

  const createdComments = await prisma.comment.createMany({
    data: [
      {
        content: 'I really like it!',
        userId: createdUser.id,
        postId: createdPost.id
      },
      {
        content: 'Yeah, its really interestng',
        userId: createdUser.id,
        postId: createdPost.id
      }
    ]
  })
  console.log('created comments', { createdComments })

  const createFirstComment = await prisma.comment.create({
    data: {
      content: 'Hi there',
      userId: createdUser.id,
      postId: createdPost.id
    }
  })
  console.log('first comment', createFirstComment)
}

seed().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
