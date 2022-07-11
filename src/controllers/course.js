import { getCourses } from '../domain/course.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const courses = async (req, res) => {
  try {
    const courses = await getCourses()

    return sendDataResponse(res, 201, courses)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get Courses')
  }
}
