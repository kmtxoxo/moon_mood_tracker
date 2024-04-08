import { Routes } from '@angular/router';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { SettingsScreenComponent } from './pages/settings-screen/settings-screen.component';
import { CalenderScreenComponent } from './pages/calender-screen/calender-screen.component';

export const routes: Routes = [
    { path: 'home', component: HomeScreenComponent },
    { path: 'settings', component: SettingsScreenComponent },
  { path: 'calendar', component: CalenderScreenComponent },
  { path: '**', redirectTo: '/home' }
];
