import { Injectable } from '@angular/core';
import { School } from 'src/app/models/school';
import { Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class SchoolService {

  private schoolsUrl = environment.SCHOOL_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken,
    })
  };

  schoolIdSource = new  BehaviorSubject<number>(0);
  schoolIdData: any;
  constructor(private http: HttpClient) {
    this.schoolIdData= this.schoolIdSource.asObservable();
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
  }
  public getCountries(){
    return this.http.get("../../../assets/files/countries.json");
  }
  getCountryTest(){
    return this.http.get("../../../assets/files/countries.json");
  }
  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.schoolsUrl,this.httpOptions)
  }
  getSchool(id): Observable<School> {
    if (id === -1) {
      return of(this.initializeSchool());
    }
    return this.http.get<School>(this.schoolsUrl+id,this.httpOptions)
  }
  GetSchoolPhotoPath(photo: string) {
    var photoPath = environment.SCHOOL_PHOTO_PATH;
    if (photo != "" && photo != null && photo!="0.jpg"  && photo!="0") {
      photoPath = photoPath + photo + '?' + new Date().getTime();
    }
    else {
      photoPath = photoPath + "madrasaty_logo.png";
    }

    return photoPath;
  }
  createSchool(school): Observable<School> {

    return this.http.post<School>(this.schoolsUrl, school,this.httpOptions)

  }
  updateSchool(school): Observable<School> {

    return this.http.put<School>(this.schoolsUrl+school.School.Id, school, this.httpOptions)

  }
  deleteSchool(id:number): Observable<School> {
    return this.http.delete<School>(this.schoolsUrl+id, this.httpOptions)
      .pipe(
        tap(data => console.log('deleteSchool: ' + id),
            error=> console.log(error))
      );
  }
  changeSchoolId(schoolId: number){
    this.schoolIdSource.next(schoolId);
}
  private initializeSchool(): School {
    return {
      Id: 0,
      Name: '',
      Street: '',
      ZipCode: '',
      City: '',
      Country: '',
      Photo: '',
      SocietyName:'',
      SiretCode:'',
      NumTVA:'',
      PhotoPath:''
    };
  }

}




