export class RecitationSessionModel {
  Id: number;
  Title: string;
  IsSaved: boolean;
  TeacherId: string;
  ClassroomId: number;
  Description: string;
  StartDate: Date;
  EndTime: Date;
  DivisionParam: number;
  CreatedOn: Date;
  ModifiedOn: Date;
  RecurrenceId: number;
  DisciplineId: number;
  IdStudents: string[];
  TypeEvaluation: string;
  Jour: string;
  T1: Date;
  T2: Date;
  T3: Date;
}
