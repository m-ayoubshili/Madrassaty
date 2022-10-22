import { Injectable } from '@angular/core';
import { Classroom } from 'src/app/models//classroom';
import { Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';






@Injectable()
export class ClassroomService {

  private classroomsUrl = environment.CLASSROOM_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken
    })
  };

  classroomIdSource = new  BehaviorSubject<number>(0);
  classroomIdData: any;
  constructor(private http: HttpClient) {
    this.classroomIdData= this.classroomIdSource.asObservable();
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
  }

  getClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.classroomsUrl,this.httpOptions)
  }
  getClassroom(id): Observable<Classroom> {
    if (id === -1) {
      return of(this.initializeClassroom());
    }
    return this.http.get<Classroom>(this.classroomsUrl+id,this.httpOptions)
  }

  createClassroom(classroom: Classroom): Observable<Classroom> {

    return this.http.post<Classroom>(this.classroomsUrl, classroom,this.httpOptions)
  }
  updateClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>(this.classroomsUrl+classroom.Id, classroom, this.httpOptions)
  }
  deleteClassroom(id:number): Observable<Classroom> {
    return this.http.delete<Classroom>(this.classroomsUrl+id, this.httpOptions)
  }
  changeClassroomId(classroomId: number){
    this.classroomIdSource.next(classroomId);
}
  private initializeClassroom(): Classroom {
    return {
      Id: 0,
      Wording:null,
      NumberProjector:null,
      NumberDesk:null,
      NumberChair:null
    };
  }

}
