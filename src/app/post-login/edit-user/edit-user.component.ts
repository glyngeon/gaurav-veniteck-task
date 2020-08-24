import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { HttpHandlerService } from '../../providers/http-handler.service';
import { ShareService } from 'src/app/providers/share.service';
import { UserDetails } from '../../modals/interfaces';
import { UserList } from '../../../assets/Data/userList';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public submitted: boolean;
  public errorMessage: string;
  private choice: number;
  private index: number;
  private updateUser: UserDetails = {
    id: null,
    firstName: null,
    lastName: null,
    gender: null,
    mobile: null,
    email: null,
    salary: null

  }
  constructor(private router: Router, private fb: FormBuilder, private httpHandler: HttpHandlerService, private shareService: ShareService, private location: Location) { }

  public newUserForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['Male', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    salary: ['', Validators.required],
  });

  ngOnInit(): void {
    this.submitted = false;
    this.shareService.shareUserDetails.subscribe((value) => {
      console.log(value);
      this.choice = value && value.choice;
      this.index = value && value.userDetails ? value.userDetails.id : null;
      if (this.choice === 1) {
        // set value for update user details
        this.newUserForm.patchValue({
          firstName: value.userDetails.firstName,
          lastName: value.userDetails.lastName,
          gender: value.userDetails.gender,
          mobile: value.userDetails.mobile,
          email: value.userDetails.email,
          salary: value.userDetails.salary,
        });
      }
    });
  }

  get f() {
    return this.newUserForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newUserForm.invalid) {
      return;
    } else {
      this.updateUser.firstName = this.newUserForm.controls.firstName.value;
      this.updateUser.lastName = this.newUserForm.controls.lastName.value;
      this.updateUser.gender = this.newUserForm.controls.gender.value;
      this.updateUser.mobile = this.newUserForm.controls.mobile.value;
      this.updateUser.email = this.newUserForm.controls.email.value;
      this.updateUser.salary = this.newUserForm.controls.salary.value;
      // for store data in dummy user list ( temp purpose)
      if (this.choice === 1) { // update user
        this.updateUser.id = this.index;
        UserList[this.index] = this.updateUser;
        this.router.navigate(['users']);
      } else if (this.choice !== 1) { // add new user
        this.updateUser.id = UserList.length + 1;
        UserList.push(this.updateUser);
        this.router.navigate(['users']);
      }
    }
  }
  public back() {
    this.location.back();
  }
}
