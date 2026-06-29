import { Component, signal } from '@angular/core';
import { Xelsawyo } from '../xelsawyo';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile {
  constructor(
    public service: Xelsawyo,
    public cookie: CookieService,
    public router: Router,
  ) {
    this.userInfo();
  }

  myInfo = signal<any>(undefined);

  formInfo: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('+995', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });

  userInfo() {
    this.service.getUserData().subscribe({
      next: (data: any) => {
        this.myInfo.set(data);
        this.formInfo.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          address: data.address,
          phone: data.phone,
          zipcode: data.zipcode,
          avatar: data.avatar,
          gender: data.gender,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateUser() {
    this.service.updateUserInfo(this.formInfo.value).subscribe({
      next: (data: any) => {
        alert('profile has been updated');
        this.cookie.delete('user');
        this.router.navigate(['/']);
      },
      error: (cudii: any) => {
        console.log(cudii);
      },
    });
  }

  LogOut() {
    this.cookie.delete('user');
    this.router.navigate([`/signup`]);
    alert('you sucsessfully logged out');
  }
}
