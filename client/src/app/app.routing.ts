import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { AddComponent } from './posts/add/add.component';
import { EditComponent } from './posts/edit/edit.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes =[
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'posts', component: PostsComponent, canActivate: [AuthGuard], children: [
        { path: 'add', component: AddComponent },
        { path: 'edit/:id', component: EditComponent },
        { path: '', component: PostsListComponent }
      ]
    }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
