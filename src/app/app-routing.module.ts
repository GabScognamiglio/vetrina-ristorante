import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { MenuComponent } from './components/menu/menu.component';
import { MappaTavoliComponent } from './components/mappa-tavoli/mappa-tavoli.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'jobs',
    component: JobsComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },

  {
    path: 'prenota',
    component: MappaTavoliComponent,
  },
  
  {
    path: '**',
    component: HomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
