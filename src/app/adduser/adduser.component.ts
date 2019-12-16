import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { user } from '../user';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  addUserForm: FormGroup;
  aUser = new user();
  searchStr: String = "";
  users: Array<user> = [];
  addflag: boolean = true;
  updatingUser = new user();
  validationMsg: boolean = false;

  constructor(private taskService: TaskserviceService, private route: ActivatedRoute, private router: Router) {
    this.initform();
    this.getUsers();
  }

  ngOnInit() {
  }

  initform() {
    this.addUserForm = new FormGroup({
      ifirstname: new FormControl(),
      ilastname: new FormControl(),
      iemployeeid: new FormControl(),
    });
  }

  onSubmit() {
    if (this.addUserForm.get("ifirstname").status == "INVALID" || this.addUserForm.get("ilastname").status == "INVALID" || this.addUserForm.get("iemployeeid").status == "INVALID") {
      this.validationMsg = true;
    } else {
      this.validationMsg = false;
      if (this.addflag) {
        this.addUser();
      } else {
        this.updateUser();
      }
    }
  }

  reset() {
    this.addflag = true;
    this.initform();
  }

  addUser() {
    console.log("Add User Form submitted!")
    console.log(this.addUserForm.get("ifirstname").value)
    this.aUser.firstName = this.addUserForm.get("ifirstname").value
    this.aUser.lastName = this.addUserForm.get("ilastname").value
    this.aUser.employeeId = this.addUserForm.get("iemployeeid").value
    console.log(this.aUser);
    this.taskService.addUser(this.aUser).subscribe((data) => {
      console.log("Added user");
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  updateUser() {
    this.updatingUser.firstName = this.addUserForm.get("ifirstname").value
    this.updatingUser.lastName = this.addUserForm.get("ilastname").value
    this.updatingUser.employeeId = this.addUserForm.get("iemployeeid").value
    this.taskService.updateUser(this.updatingUser).subscribe((data) => {
      console.log("Updated User" + data);
      this.initform();
    }, (err) => {
      console.log(err);
    });
  }

  switchToUpdate(u: user) {
    this.updatingUser = u;
    this.addflag = false;
    this.validationMsg = false;
    this.addUserForm.get("ifirstname").setValue(this.updatingUser.firstName);
    this.addUserForm.get("ilastname").setValue(this.updatingUser.lastName);
    this.addUserForm.get("iemployeeid").setValue(this.updatingUser.employeeId);
  }

  deleteUser(userId: number) {
    this.taskService.deleteUser(userId).subscribe(() => {
      console.log("Deleted the user");
      window.location.reload();
    }, (err) => {
      console.log(err);
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

  sortByFirstName() {
    this.users.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  sortByLastName() {
    this.users.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  sortByEmployeeId() {
    this.users.sort((a, b) => a.employeeId.localeCompare(b.employeeId));
  }
}
