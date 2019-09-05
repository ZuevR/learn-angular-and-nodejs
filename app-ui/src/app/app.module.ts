import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './auth.interceptor';
import { CreatePostPageComponent } from './pages/create-post-page/create-post-page.component';
import { PostComponent } from './components/post/post.component';
import { MyPostsPageComponent } from './pages/my-posts-page/my-posts-page.component';
import { FriendsPostsPageComponent } from './pages/friends-posts-page/friends-posts-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    CreatePostPageComponent,
    PostComponent,
    MyPostsPageComponent,
    FriendsPostsPageComponent,
    UsersPageComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
