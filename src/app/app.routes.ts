import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Faq } from './components/faq/faq';
import { Downloads } from './components/downloads/downloads';
import { Blog } from './components/blog/blog';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },    
    {
        path: 'blog',
        component: Blog
    },
    {
        path: 'faq',
        component: Faq
    },
    {
        path: 'downloads',
        component: Downloads
    }
];
