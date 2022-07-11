import dbClient from '../utils/dbClient.js'

export async function getCourses() {
  const Courses = await dbClient.course.findMany({
    include: {
      modules: { include: { units: { include: { exercises: true } } } }
    }
  })

  return Courses
}
