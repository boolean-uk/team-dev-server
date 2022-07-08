import dbClient from '../utils/dbClient.js'

export async function getCourses() {
  console.log('Surprise me')
  const Courses = await dbClient.course.findMany({
    include: {
      module: { include: { unit: { include: { exercise: true } } } }
    }
  })

  return Courses
}

// export default class Course {
//   constructor(id = null, name) {
//     this.id = id
//     this.name = name
//   }

//   toJSON() {
//     return {
//       course: {
//         id: this.id,
//         cohort_name: this.name
//       }
//     }
//   }

//   static fromDb(course) {
//     return new Course(course.id, course.exerciseName)
//   }
// }
