import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskVO } from '../task';
import { TaskserviceService } from '../taskservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { project } from '../project';
import { parenttask } from '../parenttask';
import { user } from '../user';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  addTaskForm: FormGroup;
  aTask = new TaskVO();
  aParentTask = new parenttask();
  projectName: string = "";
  searchStr: string = "";
  selectedProject: project = new project();
  projectSelectionStr: string = "";
  projects: Array<project> = [];
  parenttaskName: string = "";
  parenttaskSelectionStr: string = "";
  parenttasks: Array<parenttask> = [];
  selectedParentTask: parenttask = new parenttask();
  selectedUser: user = new user();
  users: Array<user> = [];
  userSelectionStr: string = "";
  userName: string = "";
  projectFlag: boolean = true;
  userFlag: boolean = false;
  parenttaskFlag: boolean = false;
  addParentTaskFlag: boolean = false;
  validationerrorflag: boolean = false;
  validationErrorMsg: string = "";
  constructor(private taskService: TaskserviceService, private route: ActivatedRoute, private router: Router) {
    this.initForm();
    this.getProjects();
    this.getParentTasks();
    this.getUsers();
    this.addParentTaskFlag = false;
  }

  ngOnInit() {
  }

  triggerProjectModel() {
    this.projectFlag = true;
    this.userFlag = false;
    this.parenttaskFlag = false;
  }

  triggerParentTaskModel() {
    this.projectFlag = false;
    this.userFlag = false;
    this.parenttaskFlag = true;
  }

  triggerUserModal() {
    this.projectFlag = false;
    this.userFlag = true;
    this.parenttaskFlag = false;
  }

  initForm() {
    this.addTaskForm = new FormGroup({
      project: new FormControl(),
      task: new FormControl(),
      iParentTaskChkBx: new FormControl(),
      priority: new FormControl(),
      parenttask: new FormControl(),
      startdate: new FormControl(),
      enddate: new FormControl(),
      user: new FormControl()
    });
    this.addTaskForm.get("priority").setValue(15);
  }

  getProjects() {
    this.taskService.getProjects().subscribe((data) => { this.projects = data });
  }

  getParentTasks() {
    console.log("Calling get parent tasks...");
    this.taskService.getParentTasks().subscribe((data) => {
      this.parenttasks = data;
      console.log(data);
    });
  }

  getUsers() {
    this.users = [];
    this.taskService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
    //console.log("Fetched users are: " + this.users)
  }

  onSubmit() {
    this.validate();
    if (!this.validationerrorflag) {
      console.log("submitted!")
      if (this.addParentTaskFlag) {
        this.addParentTask();
      } else {
        this.addTask();
      }
    }
  }

  validate() {

    let element = <HTMLInputElement>document.getElementById("iParentTaskChkBx");
    if (element.checked == true) {
      if (this.addTaskForm.get("task").value == "") {
        this.validationErrorMsg = "Task can not be blank!!!";
        this.validationerrorflag = true;
      }
    } else {
      if (this.addTaskForm.get("task").value == "" ||
        this.projectName == "" ||
        this.parenttaskName == "" ||
        this.userName == "") {
        this.validationErrorMsg = "Please enter all mandatory fields!"
        this.validationerrorflag = true;
      }
    }

  }

  addTask() {
    this.aTask.parent_id = this.selectedParentTask.parent_id;
    this.aTask.project_id = this.selectedProject.project_id;
    this.aTask.userId = this.selectedUser.userId;
    this.aTask.task = this.addTaskForm.get("task").value;
    this.aTask.priority = this.addTaskForm.get("priority").value;
    this.aTask.start_date = this.addTaskForm.get("startdate").value;
    this.aTask.end_date = "";
    this.aTask.status = "open";
    this.aTask.parenttask = this.selectedParentTask.parent_task;

    console.log(this.aTask);
    this.taskService.addTask(this.aTask).subscribe((data) => {
      console.log(data);
      window.location.reload();
    }, (err) => {
      console.log(err)
    });
  }

  addParentTask() {
    this.aParentTask.parent_task = this.addTaskForm.get("task").value
    console.log("Parent Task Creating...")
    this.taskService.addParentTask(this.aParentTask).subscribe((data) => {
      console.log("Added Parent Task...");
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  reset() {
    this.initForm();
  }

  altParentTaskFields() {
    let element = <HTMLInputElement>document.getElementById("iParentTaskChkBx");
    if (element.checked == false) {
      this.addParentTaskFlag = false;
      this.addTaskForm.get("priority").enable();
      this.addTaskForm.get("parenttask").enable();
      this.addTaskForm.get("startdate").enable();
      this.addTaskForm.get("enddate").enable();
      this.addTaskForm.get("user").enable();
      let currentDate = new Date();
      this.addTaskForm.get("startdate").setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
      currentDate.setDate(currentDate.getDate() + parseInt("1"));
      this.addTaskForm.get("enddate").setValue(formatDate(currentDate, 'yyyy-MM-dd', 'en'));
    } else {
      this.addParentTaskFlag = true;
      this.addTaskForm.get("priority").disable();
      this.addTaskForm.get("parenttask").disable();
      this.addTaskForm.get("startdate").disable();
      this.addTaskForm.get("enddate").disable();
      this.addTaskForm.get("user").disable();
      this.addTaskForm.get("priority").setValue("");
      this.addTaskForm.get("parenttask").setValue("");
      this.addTaskForm.get("startdate").setValue("");
      this.addTaskForm.get("enddate").setValue("");
      this.addTaskForm.get("user").setValue("");
    }
  }

  selectProject(p: project) {
    this.selectedProject = p;
    this.projectName = p.project;
    this.projectSelectionStr = this.projectName + " - is selected. Please click the close button to exit!";
  }

  selectParentTask(pt: parenttask) {
    this.selectedParentTask = pt;
    this.parenttaskName = pt.parent_task;
    this.parenttaskSelectionStr = this.parenttaskName + " - is selected. Please click the close button to exit!";
  }

  selectUser(u: user) {
    this.selectedUser = u;
    this.userName = u.firstName + " , " + u.lastName;
    this.userSelectionStr = this.userName + " - is selected. Please click the close button to exit!";
  }
}
