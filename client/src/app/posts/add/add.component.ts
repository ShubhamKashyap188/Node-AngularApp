import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../../services/user.service';
import { PostService } from './../../services/post.service';
declare var $: any;

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  err = "";
  addFormErrors = {
    title: "",
    body: ""
  };
  addvalidationMessages = {
    title: {
      required: "title is required."
    },
    body: {
      required: "Detail is required."
    }
  };
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.addForm = this.fb.group({
      title: [null, [Validators.required]],
      body: [null, [Validators.required]],
      status: [true, ],
    });
    this.addForm.valueChanges.subscribe(data => this.onValueChangedadd(data));
    this.onValueChangedadd();
  }
  add() {
    console.log(this.addForm.value);
    this.postService.addPost(this.addForm.value).subscribe(
      data => {
        this.addForm = this.fb.group({
          title: [null],
          body: [null]
        });
        if (data.success) {
          $.notify(
            {
              icon: "notifications",
              message: data.message
            },
            {
              type: "success",
              timer: 4000,
              placement: {
                from: "bottom",
                align: "right"
              }
            }
          );

          this.router.navigate(["posts"]);
        } else {
          this.err = 'else';
          $.notify(
            { icon: "notifications", message: this.err },
            {
              type: "danger",
              timer: 4000,
              placement: {
                from: "bottom",
                align: "right"
              }
            }
          );
          this.router.navigate(["posts"]);
        }
      },
      err => {
        $.notify(
          {
            icon: "notifications",
            message: 'err'
          },
          {
            type: "danger",
            timer: 4000,
            placement: {
              from: "bottom",
              align: "right"
            }
          }
        );
        this.router.navigate([""]);
      }
    );
  }
  onValueChangedadd(data?: any) {
    if (!this.addForm) {
      return;
    }
    const form = this.addForm;

    // tslint:disable-next-line:forin
    for (const field in this.addFormErrors) {
      this.addFormErrors[field] = "";
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.addvalidationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.addFormErrors[field] += messages[key] + "";
        }
      }
    }
  }
}
