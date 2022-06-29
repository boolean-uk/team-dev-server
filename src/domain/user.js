import dbClient from '../utils/dbClient.js'
import bcrypt from 'bcrypt'

const defaultProfileUrl =
  'https://dottorato.dimes.unical.it/wp-content/uploads/2015/09/Unknown.jpg'

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
      user.profile.profileUrl,
      user.password,
      user.role
    )
  }

  static async fromJson(json) {
    // eslint-disable-next-line camelcase
    const {
      first_name,
      last_name,
      email,
      biography,
      github_url,
      password,
      profile_url
    } = json

    let passwordHash
    if (password) {
      passwordHash = await bcrypt.hash(password, 8)
    }

    return new User(
      null,
      null,
      first_name,
      last_name,
      email,
      biography,
      github_url,
      profile_url || defaultProfileUrl,
      passwordHash
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
    profileUrl,
    passwordHash,
    role = 'STUDENT'
  ) {
    this.id = id
    this.cohortId = cohortId
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.bio = bio
    this.githubUrl = githubUrl
    this.profileUrl = profileUrl
    this.passwordHash = passwordHash
    this.role = role
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
        github_url: this.githubUrl,
        profile_url: this.profileUrl
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
            profileUrl: this.profileUrl
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
        password: this.passwordHash,
        cohortId: this.cohortId,
        role: this.role,
        profile: {
          update: {
            firstName: this.firstName,
            lastName: this.lastName,
            bio: this.bio,
            githubUrl: this.githubUrl,
            profileUrl: this.profileUrl
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
}
