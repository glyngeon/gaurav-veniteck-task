import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public shareUserDetails = new Subject<{
    userDetails: any;
    choice: number;
    id: number;
  }>();
  constructor() { }
  // share user details
  public setUserDetails(value) {
    this.shareUserDetails.next(value);
  }
}
