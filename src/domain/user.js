import dbClient from '../utils/dbClient.js'
import bcrypt from 'bcrypt'

/**
 * This class handles translating a user representation between View and Model
 */
class User {
  constructor(dbUser) {
    this.dbUser = dbUser
    this.id = dbUser.id
    this.cohortId = dbUser.cohortId
    this.email = dbUser.email
    this.role = dbUser.role
    this.passwordHash = dbUser.password
    this.firstName = dbUser.profile.firstName
    this.lastName = dbUser.profile.lastName
    this.bio = dbUser.profile.bio
    this.githubUrl = dbUser.profile.githubUrl
  }

  toJSON() {
    return {
      user: {
        id: this.id,
        cohort_id: this.cohortId,
        role: this.role,
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        biography: this.bio,
        github_url: this.githubUrl
      }
    }
  }
}

/**
 * This is JSDoc - a way for us to tell other developers what types functions/methods
 * take as inputs, what types they return, and other useful information that JS doesn't have built in
 * @tutorial https://www.valentinog.com/blog/jsdoc
 *
 * @returns {User}
 *  A user instance containing an ID, representing the user data created in the database
 */
export async function saveUser(user) {
  const createdUser = await dbClient.user.create({
    data: {
      email: user.email,
      password: user.passwordHash,
      cohortId: user.cohortId,
      role: user.role,
      profile: {
        create: {
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
          githubUrl: user.githubUrl
        }
      }
    },
    include: {
      profile: true
    }
  })

  return new User(createdUser)
}

export async function hydrateUserFromJSON(json) {
  // eslint-disable-next-line camelcase
  const { first_name, last_name, email, biography, github_url, password } = json

  const objectToHydrate = {
    email,
    profile: {
      firstName: first_name,
      lastName: last_name,
      bio: biography,
      githubUrl: github_url
    }
  }

  if (password) {
    objectToHydrate.password = await bcrypt.hash(password, 8)
  }

  return new User(objectToHydrate)
}

export async function findUserByEmail(email) {
  return await findUserByUniqueKey('email', email)
}

export async function findUserById(id) {
  return await findUserByUniqueKey('id', id)
}

export async function findUsersByFirstName(firstName) {
  return await findManyUsersByKeyValue('firstName', firstName)
}

export async function findAllUsers() {
  return await findManyUsersByKeyValue()
}

async function findUserByUniqueKey(key, value) {
  const foundUser = await dbClient.user.findUnique({
    where: {
      [key]: value
    },
    include: {
      profile: true
    }
  })

  if (foundUser) {
    return new User(foundUser)
  }

  return null
}

async function findManyUsersByKeyValue(key = null, value = null) {
  const query = {
    include: {
      profile: true
    }
  }

  if (key !== null) {
    query.where = {
      profile: {
        [key]: value
      }
    }
  }

  const foundUsers = await dbClient.user.findMany(query)

  return foundUsers.map((user) => new User(user))
}
