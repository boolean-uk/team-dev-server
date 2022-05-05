import dbClient from '../utils/dbClient.js'
import bcrypt from 'bcrypt'

export default class User {
  /**
   * This is JSDoc - a way for us to tell other developers what types functions/methods
   * take as inputs, what types they return, and other useful information that JS doesn't have built in
   * @tutorial https://www.valentinog.com/blog/jsdoc
   *
   * @param { { id: int, cohortId: int, email: string, profile: { firstName: string, lastName: string, bio: string, githubUrl: string } } } user
   * @returns {User}
   */
  static fromDb(user) {
    return new User(
      user.id,
      user.cohortId,
      user.profile.firstName,
      user.profile.lastName,
      user.email,
      user.profile.bio,
      user.profile.githubUrl,
      user.password,
      user.role,
      user.profile.profileImgUrl
    )
  }

  static async fromJson(json) {
    const { email, biography, password, role, profileImgUrl} = json
    const firstName = json.first_name
    const lastName = json.last_name
    const githubUrl = json.github_url
    const passwordHash = await bcrypt.hash(password, 8)
    return new User(
      null,
      null,
      firstName,
      lastName,
      email,
      biography,
      githubUrl,
      passwordHash,
      role,
      profileImgUrl
    )
  }

  constructor(
    id,
    cohortId,
    firstName,
    lastName,
    email,
    bio,
    githubUrl,
    passwordHash = null,
    role = 'STUDENT',
    profileImgUrl = 'https://www.shareicon.net/data/256x256/2016/02/19/721756_people_512x512.png',
  ) {
    this.id = id
    this.cohortId = cohortId
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.bio = bio
    this.githubUrl = githubUrl
    this.passwordHash = passwordHash
    this.role = role
    this.profileImgUrl = profileImgUrl
  }

  toJSON() {
    return {
      user: {
        id: this.id,
        cohort_id: this.cohortId,
        role: this.role,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        biography: this.bio,
        githubUrl: this.githubUrl,
        profileImgUrl: this.profileImgUrl,
      }
    }
  }

  /**
   * @returns {User}
   *  A user instance containing an ID, representing the user data created in the database
   */
  async save() {
    const createdUser = await dbClient.user.create({
      data: {
        email: this.email,
        password: this.passwordHash,
        cohortId: this.cohortId,
        role: this.role,
        profile: {
          create: {
            firstName: this.firstName,
            lastName: this.lastName,
            bio: this.bio,
            githubUrl: this.githubUrl,
            profileImgUrl: this.profileImgUrl
          }
        }
      },
      include: {
        profile: true
      }
    })

    return User.fromDb(createdUser)
  }

  async update() {
    const updatedUser = await dbClient.user.update({
      where: {
        id: this.id
      },
      data: {
        email: this.email,
        cohortId: this.cohortId,
        role: this.role,
        profile: {
          update: {
            firstName: this.firstName,
            lastName: this.lastName,
            bio: this.bio,
            githubUrl: this.githubUrl,
            profileImgUrl: this.profileImgUrl,
          }
        }
      },
      include: {
        profile: true
      }
    })
    return User.fromDb(updatedUser)
  }

  static async findByEmail(email) {
    return User._findByUnique('email', email)
  }

  static async findById(id) {
    return User._findByUnique('id', id)
  }

  static async findManyByFirstName(firstName) {
    return User._findMany('firstName', firstName)
  }

  static async findAll() {
    return User._findMany()
  }

  static async _findByUnique(key, value) {
    const foundUser = await dbClient.user.findUnique({
      where: {
        [key]: value
      },
      include: {
        profile: true
      }
    })

    if (foundUser) {
      return User.fromDb(foundUser)
    }

    return null
  }

  static async _findMany(key, value) {
    const query = {
      include: {
        profile: true
      }
    }

    if (key !== undefined && value !== undefined) {
      query.where = {
        profile: {
          [key]: value
        }
      }
    }

    const foundUsers = await dbClient.user.findMany(query)

    return foundUsers.map((user) => User.fromDb(user))
  }

  static async findManyStudentsByCohort(cohortId) {
    if (cohortId != null) {
      cohortId = parseInt(cohortId)
    }
    const userWithoutCohortId = await dbClient.user.findMany({
      where: {
        role: 'STUDENT',
        cohortId: cohortId
      },
      include: {
        profile: true
      }
    })
    return userWithoutCohortId.map((user) => User.fromDb(user))
  }
}
