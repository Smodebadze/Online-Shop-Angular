import { Component, ElementRef, ViewChild } from '@angular/core';
import { Xelsawyo } from '../xelsawyo';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  constructor(
    public service: Xelsawyo,
    public cookie: CookieService,
    private router: Router,
  ) {}

  formInfo: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('+995', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    avatar: new FormControl(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/3840px-User-avatar.svg.png',
      [Validators.required],
    ),
    gender: new FormControl('', [Validators.required]),
  });

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  register() {
    const { email, password } = this.formInfo.value;

    this.service.signUp(this.formInfo.value).subscribe({
      next: () => {
        this.service.signIn({ email, password }).subscribe({
          next: (data: any) => {
            this.cookie.set('user', data.access_token);
            setTimeout(() => {
              alert(`please verify the Email`);
            }, 100);
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 12000);
          },
          error: (err: any) => console.log(err),
        });
      },
      error: (err: any) => console.log(err),
    });
  }

  @ViewChild('sms') loginSMS!: ElementRef;

  login() {
    this.service.signIn(this.loginForm.value).subscribe({
      next: (data: any) => {
        this.cookie.set('user', data.access_token);

        this.loginSMS.nativeElement.innerText = 'ავტორიზაცია წარმატებულია';
        this.loginSMS.nativeElement.style.color = 'green';

        setTimeout(() => {
          this.loginSMS.nativeElement.innerText = '';
          this.router.navigate(['/']);
        }, 800);
      },
      error: (err: any) => {
        this.loginSMS.nativeElement.innerText = 'ავტორიზაცია ვერ მოხერხდა';
        this.loginSMS.nativeElement.style.color = 'red';
        console.log(err);
        setTimeout(() => {
          this.loginSMS.nativeElement.innerText = '';
        }, 1000);
      },
    });
  }
}
