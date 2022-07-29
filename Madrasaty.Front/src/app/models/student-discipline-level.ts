import { Member } from './member'
import { Discipline } from './discipline'
import { DisciplineLevel } from './DisciplineLevel'

export class StudentDisciplineLevel {
    StudentId: string
    Student: Member
    DisciplineId: number
    Discipline: Discipline
    DisciplineLevelId: number
    DisciplineLevel: DisciplineLevel
}
