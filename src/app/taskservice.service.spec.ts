import { TestBed, getTestBed } from '@angular/core/testing';

import { TaskserviceService } from './taskservice.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject } from '@angular/core';
import { TaskVO } from './task';

describe('TaskserviceService', () => {
  let injector: TestBed;
  let service: TaskserviceService;
  let httpMock: HttpTestingController;

  beforeEach(async() => TestBed.configureTestingModule({
    providers: [TaskserviceService],
    imports: [HttpClientTestingModule],
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(TaskserviceService);
    httpMock = injector.get(HttpTestingController);
  });

  const dummyTasks: TaskVO[] = [
    new TaskVO(),
    new TaskVO()
  ];
  
  it('should return an observable',()=>{
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
    });
  
    const req = httpMock.expectOne(`http://localhost:8081/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);  
  });

  afterEach(()=>{
    httpMock.verify();
  });
});
