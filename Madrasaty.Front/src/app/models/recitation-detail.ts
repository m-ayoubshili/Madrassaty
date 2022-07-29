import { RecitationSessionModel } from './recitation-session-model'
import { Member } from './member'

export class RecitationDetail {
    Id: number
    RecitationId: number
    RecitationSession: RecitationSessionModel
    StudentId: string
    Student: Member
    Surah: number
    VerseDebut: number
    VerseFin: number
    Rating: number
    Remarques: string
    DateEvaluation: Date
}

