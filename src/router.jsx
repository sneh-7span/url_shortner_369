import { createBrowserRouter } from 'react-router';
import UrlDashboard from './pages/url-dashboard.jsx';
import RedirectLink from './pages/redirect-link.jsx';
import Auth from './pages/auth.jsx';
import Link from './pages/link.jsx';
import AppLayout from './layouts/app-layout.jsx';
import LandingPage from './pages/landing.jsx';

const routes = [
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <LandingPage/>
            },
            {
                path: '/url-dashboard',
                element: <UrlDashboard/>
            },
            {
                path: '/auth',
                element: <Auth/>
            },
            {
                path: '/:code',
                element: <RedirectLink/>
            },
        ]
    }
];
export const router = createBrowserRouter(routes);