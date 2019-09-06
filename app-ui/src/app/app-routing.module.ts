import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePostPageComponent } from './pages/create-post-page/create-post-page.component';
import { MyPostsPageComponent } from './pages/my-posts-page/my-posts-page.component';
import { FriendsPostsPageComponent } from './pages/friends-posts-page/friends-posts-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { AuthGuard } from './shared/auth.guard';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomePageComponent },
      { path: 'my-posts', component: MyPostsPageComponent, canActivate: [AuthGuard] },
      { path: 'friends-posts', component: FriendsPostsPageComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersPageComponent, canActivate: [AuthGuard] },
      { path: 'create-post', component: CreatePostPageComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
