import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class UserServiceService {
    private previousPath: string;
    constructor(private activatedRoute: ActivatedRoute, private location: Location, private router: Router) {}

    getUser(): any {
        const outputObj = localStorage.getItem('currentUser');
        if (outputObj) {
            return JSON.parse(outputObj);
        } else {
            // this.logout();
            return null;
        }
    }

    setUser(currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    userlogout() {
        localStorage.removeItem('currentUser');
    }

    authGuardActivate(route): boolean {
        // route is the route where gard is working/ where user wants to go
        const user = this.getUserForAuthGuard();
        if (user) {
            if (route.url.toString() === 'login') {
                if (this.previousPath === 'users') {
                    this.location.back();
                } else {
                    this.router.navigate(['users']);
                }
                return false;
            } else {
                return true;
            }
        } else {
            if (route.url.toString() === 'login') {
                return true;
            } else if (route.url.toString() === 'post') {
                this.router.navigate(['login']);
            } else {
                this.location.back();
                return false;
            }
        }
    }

    getUserForAuthGuard(): any {
        const outputObj = localStorage.getItem('currentUser');
        if (outputObj) {
            return JSON.parse(outputObj);
        } else {
            return null;
        }
    }
}
