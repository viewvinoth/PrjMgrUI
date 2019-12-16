import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskserviceService } from '../taskservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { project } from '../project';
import { user } from '../user';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  addProjectForm: FormGroup;
  addflag: boolean = true;
  projects: Array<project> = [];
  validationMsg: boolean;
  aProject: project = new project();
  updatingProject: project = new project();
  manager: user = new user();
  managerSelectionStr: string = "";
  managerFullName = "";
  searchUser: string = "";
  searchStr: string = "";
  validationerrorflag: boolean = false;
  validationErrorMsg: string = ""; 
  users: Array<user> = [];
  constructor(private taskService: TaskserviceService, private route: ActivatedRoute, private router: Router) {
    this.initform();
    this.getProjects();
    this.getUsers();
  }

  ngOnInit() {
  }

  initform() {
    this.addProjectForm = new FormGroup({
      iProject: new FormControl(),
      iStartDate: new FormControl(),
      iEndDate: new FormControl(),
      iPriority: new FormControl(),
      iManager: new FormControl(),
      iDatesChkBx: new FormControl()
    });
    this.addProjectForm.get("iPriority").setValue(15);
  }

  getProjects() {
    this.taskService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  onSubmit() {
    this.validate();
    if (!this.validationerrorflag) {
      if (this.addflag) {
        this.addProject();
      } else {
        this.updateProject();
      }
    }
  }

  validate() {
    console.log(this.addProjectForm.get("iProject").value);
    console.log(this.addProjectForm.get("iPriority").value);
    console.log(this.managerFullName);

    if (this.addProjectForm.get("iProject").value == "" || this.managerFullName == "") {
      this.validationErrorMsg = "Please add all mandatory fields";
      this.validationerrorflag = true;
    }
    let element = <HTMLInputElement>document.getElementById("iDatesChkBx");
    if (element.checked == true) {
      if (new Date(this.addProjectForm.get("iStartDate").value).getTime() >= new Date(this.addProjectForm.get("iEndDate").value).getTime()) {
        this.validationErrorMsg = "End Date should be greater than the start date";
        this.validationerrorflag = true;
      }
    }
  }

  addProject() {
    this.aProject.project = this.addProjectForm.get("iProject").value;
    this.aProject.startDate = this.addProjectForm.get("iStartDate").value;
    this.aProject.endDate = this.addProjectForm.get("iEndDate").value;
    this.aProject.priority = this.addProjectForm.get("iPriority").value;
    // this.aProject.project = this.addProjectForm.get("iManager").value;
    this.aProject.user_id = this.manager.userId;
    this.aProject.noOfTasks = 0;
    this.aProject.noOfCompletedTasks = 0;
    console.log(this.aProject);
    this.taskService.addProject(this.aProject).subscribe((data) => {
      console.log("Added Project");
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  updateProject() {
    this.updatingProject.project = this.addProjectForm.get("iProject").value;
    this.updatingProject.startDate = this.addProjectForm.get("iStartDate").value;
    this.updatingProject.endDate = this.addProjectForm.get("iEndDate").value;
    this.updatingProject.priority = this.addProjectForm.get("iPriority").value;
    this.updatingProject.user_id = this.manager.userId;
    console.log("the updating project is " + this.updatingProject)
    this.taskService.updateProject(this.updatingProject).subscribe((data) => {
      console.log("Updated Project");
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  switchToUpdate(uProject: project) {
    this.updatingProject = uProject;
    this.addflag = false;
    this.addProjectForm.get("iProject").setValue(this.updatingProject.project);
    this.addProjectForm.get("iStartDate").setValue(this.updatingProject.startDate);
    this.addProjectForm.get("iEndDate").setValue(this.updatingProject.endDate);
    this.addProjectForm.get("iPriority").setValue(this.updatingProject.priority);

    this.taskService.getUserById(this.updatingProject.user_id).subscribe((data) => {
      this.manager = data;
      this.managerFullName = this.manager.firstName + " , " + this.manager.lastName;
    });

  }

  getUsers() {
    console.log("Calling get Users...")
    this.users = [];
    this.taskService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }

  selectManager(u: user) {
    this.manager = u;
    this.managerFullName = this.manager.firstName + " , " + this.manager.lastName;
    this.managerSelectionStr = u.firstName + " " + u.lastName + " - is selected. Please click the close button to exit!"
  }

  populateDates() {
    let element = <HTMLInputElement>document.getElementById("iDatesChkBx");
    if (element.checked == true) {
      this.addProjectForm.get("iStartDate").enable();
      this.addProjectForm.get("iEndDate").enable();
      let currentDate = new Date();
      this.addProjectForm.get("iStartDate").setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
      currentDate.setDate(currentDate.getDate() + parseInt("1"));
      this.addProjectForm.get("iEndDate").setValue(formatDate(currentDate, 'yyyy-MM-dd', 'en'));
    } else {
      this.addProjectForm.get("iStartDate").setValue("");
      this.addProjectForm.get("iStartDate").disable();
      this.addProjectForm.get("iEndDate").setValue("");
      this.addProjectForm.get("iEndDate").disable();
    }
  }

  reset() {
    this.initform();
  }

  sortByStartDate() {
    this.projects.sort((a, b) => { return (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) });
  }

  sortByEndDate() {
    this.projects.sort((a, b) => { return (new Date(a.endDate).getTime() - new Date(b.endDate).getTime()) });
  }

  sortByPriority() {
    this.projects.sort((a, b) => { return a.priority - b.priority });
  }

  sortByCompleted() {
    this.projects.sort((a, b) => { return a.noOfCompletedTasks - b.noOfCompletedTasks });
  }
}
