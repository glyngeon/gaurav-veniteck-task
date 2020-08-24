import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShareService } from 'src/app/providers/share.service';
import { UserList } from '../../../assets/Data/userList';
import { UserDetails } from '../../modals/interfaces';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    public usersResponse: UserDetails[];
    public showActionFlag: boolean;
    public currentTab: number;
    public currentChildTab: number;
    constructor(private router: Router, private shareService: ShareService) { }

    ngOnInit(): void {
        this.userList();
    }

    // show user list
    public userList() {
        this.showActionFlag = false;
        this.currentTab = 1;
        this.usersResponse = UserList;
    }
    // open employee tab
    public employee() {
        this.showActionFlag = true;
        this.currentTab = 2;
        this.currentChildTab = 1;
    }
    // open employee attachement tab
    public employeeAttechment() {
        this.currentChildTab = 2;
    }
    // edit user function
    public editUser(index: number) {
        const tempUserDetails: UserDetails = {
            id: this.usersResponse[index].id,
            firstName: this.usersResponse[index].firstName,
            lastName: this.usersResponse[index].lastName,
            gender: this.usersResponse[index].gender,
            mobile: this.usersResponse[index].mobile,
            email: this.usersResponse[index].email,
            salary: this.usersResponse[index].salary
        };
        this.shareService.setUserDetails({ userDetails: tempUserDetails, choice: 1, id: null });
        this.router.navigate(['updateUser']);
    }
    // delete user
    public deleteUser(index: number) {
        this.usersResponse.splice(index, 1);
    }
    // add new user
    public addUser() {
        this.shareService.setUserDetails({ userDetails: null, choice: 2, id: null });
        this.router.navigate(['updateUser']);
    }
}
