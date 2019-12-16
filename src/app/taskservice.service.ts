import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'
import { TaskVO } from './task';
import { user } from './user';
import { project } from './project';
import { parenttask } from './parenttask';


//const endpoint = 'http://localhost:8082/ProjectManager/';

const endpoint = 'http://localhost:8082/';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class TaskserviceService {


  constructor(public http: HttpClient) {

  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  getTasks(project_id: number): Observable<any> {
    return this.http.get(endpoint + "tasks/byproject/" + project_id).pipe(map(this.extractData));
  }

  getTask(id: number): Observable<any> {
    return this.http.get(endpoint + "tasks/" + id).pipe(map(this.extractData));
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(endpoint + 'task/' + id).pipe(tap(_ => console.log('deleted task id=${id}')), catchError(this.handleError<any>('deleteTask')));
  }

  updateTask(task: TaskVO): Observable<any> {
    console.log("updating into Task table");
    console.log(task);
    return this.http.put<any>(endpoint + 'tasks', JSON.stringify(task), httpOptions).pipe(tap(_ => console.log('updated task id=${id}')), catchError(this.handleError<any>('updateTask')));
  }

  addTask(task: TaskVO): Observable<any> {
    console.log("Adding into Task table");
    console.log(task);
    return this.http.post<any>(endpoint + 'tasks', JSON.stringify(task), httpOptions).pipe(tap((task) => console.log('added task id=${task.task_id}')), catchError(this.handleError<any>('addTask')));
  }


  //-------------User Services--------------------------//

  addUser(aUser: user): Observable<any> {
    return this.http.post<any>(endpoint + 'users', JSON.stringify(aUser), httpOptions).pipe(tap((user) => console.log('added user id=${user.user_id}')), catchError(this.handleError<any>('addUser')));
  }

  updateUser(aUser: user): Observable<any> {
    return this.http.put<any>(endpoint + 'users', JSON.stringify(aUser), httpOptions).pipe(tap((user) => console.log('updated user id=${user.user_id}')), catchError(this.handleError<any>('updateUser')));
  }

  deleteUser(userId: number) {
    return this.http.delete(endpoint + 'users/' + userId);
  }

  getUsers(): Observable<any> {
    return this.http.get(endpoint + "users").pipe(map(this.extractData));
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(endpoint + "users/" + id).pipe(map(this.extractData));
  }

  //--------------------Project Services-----------------------//

  addProject(aProject: project): Observable<any> {
    return this.http.post<any>(endpoint + 'projects', JSON.stringify(aProject), httpOptions).pipe(tap((project) => console.log('added project id=${project.project_id}')), catchError(this.handleError<any>('addProject')));
  }

  updateProject(uProject: project): Observable<any> {
    return this.http.put<any>(endpoint + 'projects', JSON.stringify(uProject), httpOptions).pipe(tap((project) => console.log('updated project id=${project.project_id}')), catchError(this.handleError<any>('updateProject')));
  }

  getProjects(): Observable<any> {
    return this.http.get(endpoint + "projects").pipe(map(this.extractData));
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(endpoint + "projects/" + id).pipe(map(this.extractData));
  }

  //-----------------Parent Task Services------------------------///

  getParentTasks(): Observable<any> {
    return this.http.get(endpoint + "parenttasks").pipe(map(this.extractData));
  }

  addParentTask(pTask: parenttask): Observable<any> {
    return this.http.post<any>(endpoint + 'parenttasks', JSON.stringify(pTask), httpOptions).pipe(tap((parenttask) => console.log('added parent Task id=${parenttask.parent_id}')), catchError(this.handleError<any>('addParentTask')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log('${operation} failed: ${error.message}');
      return of(result as T);
    };
  }

}
