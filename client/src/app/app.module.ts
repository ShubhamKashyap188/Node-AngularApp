import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { AppRoutingModule } from './app.routing';
import { FileSelectDirective } from 'ng2-file-upload';
import { TruncateModule } from 'ng2-truncate';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { AuthGuard } from './guards/auth.guard';
import { PostsComponent } from './posts/posts.component';
import { AddComponent } from './posts/add/add.component';
import { EditComponent } from './posts/edit/edit.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { UiSwitchModule } from 'angular2-ui-switch'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PostsComponent,
    AddComponent,
    EditComponent,
    PostsListComponent,
    FileSelectDirective,
  FileSelectDirective,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule,
    AppRoutingModule,
    UiSwitchModule,
    TruncateModule,
    NgxPaginationModule
  ],
  providers: [UserService, AuthGuard, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
