import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from './../../services/post.service';
declare var $: any;


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: any[];
  constructor(private postService: PostService, private router: Router) {
    this.postService.getUserPost().subscribe(
      data => {
        if (data.success) {
          this.posts = data.message.posts;
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

  ngOnInit() {}
  onChange(status: boolean,id: any[],)
  {
    var msg;
    let body = {
      status: status,
      _id: id
    }
    this.postService.editPost(body).subscribe(data => {
      if (data.success) {
        // tslint:disable-next-line:max-line-length\
        if(body.status == true)
        {
          msg = 'Post enable successfully';
        }
        else{
          msg = 'Post disable successfully';
        }
        // tslint:disable-next-line:max-line-length
        $.notify({ icon: 'notifications', message: msg }, { type: 'success', delay: 1000, timer: 1000, placement: { from: 'bottom', align: 'right' } });
        this.router.navigate(['posts']);
      } else {
        // tslint:disable-next-line:max-line-length
        $.notify({ icon: 'notifications', message: 'while err Post disable '  }, { type: 'danger', delay: 1000, timer: 4000, placement: { from: 'bottom', align: 'right' } });
        this.router.navigate(['posts']);
      }
    }, err => {
      // tslint:disable-next-line:max-line-length
      $.notify({ icon: 'notifications', message: 'something worng' }, { type: 'danger', delay: 1000, timer: 4000, placement: { from: 'bottom', align: 'right' } });
      this.router.navigate(['']);
    });
  }
  delete(id) {
        this.postService.deletePost(id).subscribe(data => {
if(data.success){
  // tslint:disable-next-line:max-line-length
  $.notify({ icon: 'notifications', message: data.message }, { type: 'success', delay: 1000, timer: 4000, placement: { from: 'bottom', align: 'right' } });
    this.postService.getPost().subscribe(data => {
        if (data.success) {
          this.posts = data.message;
        } else {
          // tslint:disable-next-line:max-line-length
          $.notify({ icon: 'notifications', message: 'err' }, { type: 'danger', delay: 1000, timer: 4000, placement: { from: 'bottom', align: 'right' } });
        }
      }, err => {
        // tslint:disable-next-line:max-line-length
        $.notify({ icon: 'notifications', message: 'Something worng' }, { type: 'danger', delay: 1000, timer: 4000, placement: { from: 'bottom', align: 'right' } });
      });
}

         });
    }
}
