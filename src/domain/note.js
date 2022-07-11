import dbClient from '../utils/dbClient.js'

export default class Note {
  static fromDb(note) {
    return new Note(
      note.content,
      note.teacherId,
      note.studentId,
      note.isEdited,
      note.id,
      note.createdAt,
      note.updatedAt
    )
  }

  static async fromJson(json) {
    const { content, teacherId, studentId, isEdited, createdAt, updatedAt } =
      json
    return new Note(
      content,
      teacherId,
      studentId,
      isEdited,
      createdAt,
      updatedAt
    )
  }

  constructor(
    content,
    teacherId,
    studentId,
    isEdited,
    id,
    createdAt,
    updatedAt
  ) {
    this.content = content
    this.teacherId = teacherId
    this.studentId = studentId
    this.isEdited = isEdited
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  async save() {
    const createdNote = await dbClient.Note.create({
      data: {
        content: this.content,
        teacherId: this.teacherId,
        studentId: this.studentId,
        isEdited: this.isEdited,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
    })
    return Note.fromDb(createdNote)
  }

  static async findAll({ whereData }) {
    return Note._findMany({ whereData })
  }

  static async _findMany({ whereData }) {
    const foundNotes = await dbClient.Note.findMany({
      orderBy: { createdAt: 'desc' },
      where: { ...whereData }
    })
    return foundNotes.map((note) => Note.fromDb(note))
  }

  static async delete(foundId) {
    await dbClient.Note.delete({
      where: {
        id: foundId
      }
    })
  }

  toJSON() {
    return {
      note: {
        id: this.id,
        content: this.content,
        teacherId: this.teacherId,
        studentId: this.studentId,
        isEdited: this.isEdited,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
    }
  }

  static async findById(noteId) {
    return Note._findUnique(noteId)
  }

  static async _findUnique(noteId) {
    const foundNote = await dbClient.Note.findUnique({
      where: {
        id: noteId
      },
      rejectOnNotFound: true
    })
    return Note.fromDb(foundNote)
  }

  async update() {
    const findNote = await dbClient.note.findUnique({
      where: { id: this.id },
      rejectOnNotFound: true
    })
    const updatedNote = await dbClient.note.update({
      where: {
        id: this.id
      },
      data: {
        content: this.content,
        isEdited: findNote.isEdited ? undefined : true
      }
    })
    return Note.fromDb(updatedNote)
  }
}
