import dbClient from '../utils/dbClient.js'

export default class Note {
  static fromDb(note) {
    return new Note(
      note.content,
      note.teacherId,
      note.studentId,
      note.isEditted,
      note.id
    )
  }

  static async fromJson(json) {
    const { content, teacherId, studentId, isEditted } = json
    return new Note(content, teacherId, studentId, isEditted)
  }

  constructor(content, teacherId, studentId, isEditted, id) {
    this.content = content
    this.teacherId = teacherId
    this.studentId = studentId
    this.isEditted = isEditted
    this.id = id
  }

  async save() {
    const createdNote = await dbClient.Note.create({
      data: {
        content: this.content,
        teacherId: this.teacherId,
        studentId: this.studentId,
        isEditted: this.isEditted
      }
    })
    return Note.fromDb(createdNote)
  }

  static async findAll() {
    return Note._findMany()
  }
}
