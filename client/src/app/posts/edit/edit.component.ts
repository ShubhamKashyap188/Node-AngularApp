import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  postId: any;
  post: any;
  editForm: FormGroup;
  err = '';
  editFormErrors = {
    title: '',
    body: ''
  };
  editvalidationMessages = {
    title: {
      required: 'title is required.'
    },
    body: {
      required: 'Detail is required.'
    }
  };
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      title: [null, [Validators.required]],
      _id: [null, [Validators.required]],
      body: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
    this.editForm.valueChanges.subscribe(data => this.onValueChangededit(data));
    this.onValueChangededit();
    this.activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
    });
    this.postService.getPostById(this.postId).subscribe(
      data => {
        if (data.success) {
          this.editForm.patchValue(data.message);
        } else {
          // tslint:disable-next-line:max-line-length
          $.notify(
            { icon: 'notifications', message: 'err' },
            {
              type: 'danger',
              timer: 4000,
              placement: { from: 'bottom', align: 'right' }
            }
          );
        }
      },
      err => {
        // tslint:disable-next-line:max-line-length
        $.notify(
          { icon: 'notifications', message: 'Something worng' },
          {
            type: 'danger',
            timer: 4000,
            placement: { from: 'bottom', align: 'right' }
          }
        );
      }
    );
  }
  edit(){
     this.postService.editPost(this.editForm.value).subscribe(data => {
         this.editForm = this.fb.group({ title: [null], body: [null] });
         if (data.success) {
           // tslint:disable-next-line:max-line-length
           $.notify({ icon: 'notifications', message: data.message }, { type: 'success', timer: 4000, placement: { from: 'bottom', align: 'right' } });

           this.router.navigate(['posts']);
         } else {
           this.err = data.message;
           // tslint:disable-next-line:max-line-length
           $.notify({ icon: 'notifications', message: this.err }, { type: 'danger', timer: 4000, placement: { from: 'bottom', align: 'right' } });
           this.router.navigate(['posts']);
         }
       }, err => {
         $.notify({ icon: 'notifications', message: err }, { type: 'danger', timer: 4000, placement: { from: 'bottom', align: 'right' } });
         this.router.navigate(['']);
       });
  }

  onValueChangededit(data?: any) {
    if (!this.editForm) {
      return;
    }
    const form = this.editForm;

    // tslint:disable-next-line:forin
    for (const field in this.editFormErrors) {
      this.editFormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.editvalidationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.editFormErrors[field] += messages[key] + '';
        }
      }
    }
  }
}
