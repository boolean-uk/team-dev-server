import dbClient from '../utils/dbClient.js'

export default class Note {
  static fromDb(note) {
    return new Note(
      note.content,
      note.teacherId,
      note.studentId,
      note.isEdited,
      note.id
    )
  }

  static async fromJson(json) {
    const { content, teacherId, studentId, isEdited } = json
    return new Note(content, teacherId, studentId, isEdited)
  }

  constructor(content, teacherId, studentId, isEdited, id) {
    this.content = content
    this.teacherId = teacherId
    this.studentId = studentId
    this.isEdited = isEdited
    this.id = id
  }

  async save() {
    const createdNote = await dbClient.Note.create({
      data: {
        content: this.content,
        teacherId: this.teacherId,
        studentId: this.studentId,
        isEdited: this.isEdited
      }
    })
    return Note.fromDb(createdNote)
  }

  static async findAll() {
    return Note._findMany()
  }
}
