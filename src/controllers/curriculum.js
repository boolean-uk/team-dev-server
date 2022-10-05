import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import dbClient from '../utils/dbClient.js'
import { myEmitter } from '../eventEmitter/index.js'
import { ServerErrorEvent } from '../eventEmitter/utils.js'

export const createCurriculum = async (req, res) => {
  try {
    if (!req.body.name) {
      return sendDataResponse(res, 400, 'missing curriculum name')
    }

    if (!req.body.description) {
      return sendDataResponse(res, 400, 'missing curriculum description')
    }
    const newCurriculum = await dbClient.curriculum(req.body.name)
    // myEmitter.emit('create-cohort', createdCohort, req.user)

    return sendDataResponse(res, 201, newCurriculum)
  } catch (err) {
    const error = new ServerErrorEvent(
      req.user,
      'create-curriculum',
      'Unable to create cohort'
    )
    myEmitter.emit('error', error)
    sendMessageResponse(res, error.code, error.message)
    throw err
  }
}
