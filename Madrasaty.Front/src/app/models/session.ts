import { Member } from './member';
import { DisciplineLevel } from './DisciplineLevel';
import { RecitationSessionModel } from './recitation-session-model';

export class Session extends RecitationSessionModel {
    DisciplineName :string;
    TeacherName :string;
    RecitationDisciplineLevels :DisciplineLevel[]
    TauxRemplissage:number;
    NbStudents: number;
    LevelIds: number[];
    Students:Member[]
}
