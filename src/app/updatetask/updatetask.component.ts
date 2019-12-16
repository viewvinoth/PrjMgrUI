import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskVO } from '../task';
import { FormGroup, FormControl } from '@angular/forms';
import { parenttask } from '../parenttask';
import { project } from '../project';
import { user } from '../user';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  editTaskForm: FormGroup;
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
  task_id: number;
  constructor(private taskService: TaskserviceService, private route: ActivatedRoute, private router: Router) {
    this.initForm();
    this.getProjects();
    this.getParentTasks();
    this.getUsers();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.task_id = params['id'];
    });
    this.updateFormFields();
  }

  updateFormFields() {
    this.taskService.getTask(this.task_id).subscribe((data) => {
      console.log("Task:" + data);
      this.aTask = data;
      this.taskService.getProjectById(this.aTask.project_id).subscribe((data) => {
        console.log("Project: " + data);
        this.selectedProject = data;
        this.projectName = this.selectedProject.project;
      });
      this.taskService.getUserById(this.aTask.userId).subscribe((data) => {
        console.log("User: " + user);
        this.selectedUser = data;
        this.userName = this.selectedUser.firstName + " , " + this.selectedUser.lastName;
      });
     /*this.editTaskForm = new FormGroup({
        project: new FormControl(),
        task: new FormControl(),
        iParentTaskChkBx: new FormControl(),
        priority: new FormControl(),
        parenttask: new FormControl(),
        startdate: new FormControl(),
        enddate: new FormControl(),
        user: new FormControl()*/
      this.editTaskForm.get("task").setValue(this.aTask.task);
      this.editTaskForm.get("priority").setValue(this.aTask.priority);
      this.editTaskForm.get("startdate").setValue(this.aTask.start_date);
      this.editTaskForm.get("enddate").setValue(this.aTask.end_date);
      this.parenttaskName = this.aTask.parenttask;
    });
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
    this.editTaskForm = new FormGroup({
      project: new FormControl(),
      task: new FormControl(),
      iParentTaskChkBx: new FormControl(),
      priority: new FormControl(),
      parenttask: new FormControl(),
      startdate: new FormControl(),
      enddate: new FormControl(),
      user: new FormControl()
    });
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
    console.log("submitted!")
    this.updateTask();
  }

  updateTask() {
    this.aTask.parent_id = this.selectedParentTask.parent_id;
    this.aTask.project_id = this.selectedProject.project_id;
    this.aTask.userId = this.selectedUser.userId;
    this.aTask.task = this.editTaskForm.get("task").value;
    this.aTask.priority = this.editTaskForm.get("priority").value;
    this.aTask.start_date = this.editTaskForm.get("startdate").value;
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

  reset() {
    this.initForm();
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
