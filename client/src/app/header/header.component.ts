import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../services/user.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  signupForm: FormGroup;
  loginForm: FormGroup;
  loginerr = '';
  signuperr = '';
  emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|'((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?')@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  loginformErrors = {
    email: '',
    password: ''
  };
  signupformErrors = {
    email: '',
    password: ''
  };

  loginvalidationMessages = {
    email: {
      required: 'Email is required.',
      pattern: 'Email is not valid.'
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password should contain 6 characters'
    }
  };
  signupvalidationMessages = {
    email: {
      required: 'Email is required.',
      pattern: 'Email is not valid.'
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password should contain 6 characters'
    }
  };
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(this.emailp)]],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(this.emailp)]],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
    this.signupForm.valueChanges.subscribe(data =>
      this.onValueChangedSignup(data)
    );
    this.loginForm.valueChanges.subscribe(data =>
      this.onValueChangedLogin(data)
    );
    this.onValueChangedSignup();
    this.onValueChangedLogin();
  }
  signup() {
    $('#signupModal').modal('hide');
    this.userService.addUser(this.signupForm.value).subscribe(
      data => {
        this.signupForm = this.fb.group({
          email: [null],
          password: [null]
        });
        if (data.success) {
          $.notify(
            {
              icon: 'notifications',
              message: data.message
            },
            {
              type: 'success',
              timer: 4000,
              placement: {
                from: 'bottom',
                align: 'right'
              }
            }
          );

          this.router.navigate(['']);
        } else {
          this.signuperr = 'Email already exist.';
          $.notify(
            { icon: 'notifications', message: this.signuperr },
            {
              type: 'danger',
              timer: 4000,
              placement: {
                from: 'bottom',
                align: 'right'
              }
            }
          );
          this.router.navigate(['']);
        }
      },
      err => {
        $.notify(
          {
            icon: 'notifications',
            message: err
          },
          {
            type: 'danger',
            timer: 4000,
            placement: {
              from: 'bottom',
              align: 'right'
            }
          }
        );
        this.router.navigate(['']);
      }
    );
  }
  login() {
    $('#loginModal').modal('hide');
    this.userService.userLogin(this.loginForm.value).subscribe(
      data => {
        this.loginForm = this.fb.group({
          email: [null],
          password: [null]
        });
        if (data.success) {
          data.message['token'] = data.token;
          this.userService.storeUserData(data.token, data.message);
          $.notify(
            {
              icon: 'notifications',
              message: 'User Logged in Successfully.'
            },
            {
              type: 'success',
              timer: 2000,
              placement: {
                from: 'bottom',
                align: 'right'
              }
            }
          );
          this.router.navigate(['posts']);
        } else {
          $.notify(
            {
              icon: 'notifications',
              message: data.message
            },
            {
              type: 'danger',
              timer: 2000,
              placement: {
                from: 'bottom',
                align: 'right'
              }
            }
          );
          this.router.navigate(['']);
        }
      },
      err => {
        $.notify(
          {
            icon: 'notifications',
            message: 'Something Worng, Try again.'
          },
          {
            type: 'danger',
            timer: 4000,
            placement: {
              from: 'bottom',
              align: 'right'
            }
          }
        );
        this.router.navigate(['']);
      }
    );
  }
  logout() {
    this.userService.logout();
    $.notify(
      {
        icon: 'notifications',
        message: 'User Logout Successfully.'
      },
      {
        type: 'success',
        timer: 2000,
        placement: {
          from: 'bottom',
          align: 'right'
        }
      }
    );
    this.router.navigate(['']);
    return false;
  }
  onValueChangedSignup(data?: any) {
    if (!this.signupForm) {
      return;
    }
    const form = this.signupForm;

    // tslint:disable-next-line:forin
    for (const field in this.signupformErrors) {
      this.signupformErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.signupvalidationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.signupformErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  onValueChangedLogin(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;

    // tslint:disable-next-line:forin
    for (const field in this.loginformErrors) {
      this.loginformErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.loginvalidationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.loginformErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
