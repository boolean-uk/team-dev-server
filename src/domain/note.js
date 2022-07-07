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
        isEdited: this.isEdited
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
      }
    })
    return Note.fromDb(foundNote)
  }

  async update() {
    const findNote = await dbClient.note.findUnique({
      where: { id: this.id }
    })
    console.log(findNote)
    const updatedNote = await dbClient.note.update({
      where: {
        id: this.id
      },
      data: {
        content: this.content,
        isEdited: findNote.isEdited ? undefined : true
      }
    })
    console.log(updatedNote)
    return Note.fromDb(updatedNote)
  }
}
