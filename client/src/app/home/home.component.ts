import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostService } from './../services/post.service';

declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[];
  constructor(
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postService.getPost().subscribe(
      data => {
        if (data.success) {
          this.posts = data.message;
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
}
