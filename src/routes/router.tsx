import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import PublicRouter from './PublicRouter';
import {ROUTES} from './constants';
import { Home, NowPlaying, Popular } from '../pages';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import PrivateRouter from './PrivateRouter';
import Show from '../pages/Show/Show';
import { Favorites } from '../pages/Favorites';
import { Rated } from '../pages/Rated';
import { useAppContext } from '../store/app-context/app-context';

export const AppRouter = () => {
  const { user } = useAppContext();
  const isLoggedIn = Boolean(user);

  const routes: RouteObject[] = [
    {
        path: '/',
        element: isLoggedIn?  <PrivateRouter /> : <Navigate to="/login" />,
        children: [
            { path: ROUTES.HOME.path, element: <Home/>},
            { path: ROUTES.POPULAR.path, element: <Popular/> },
            { path: `${ROUTES.SHOW.path}:id`, element: <Show/> },
            { path: ROUTES.FAVORITES.path, element: <Favorites/> },
            { path: ROUTES.TOP_RATED.path, element: <Rated/> },
            { path: ROUTES.NOW_PLAYING.path, element: <NowPlaying/> }
        ]
    },
    {
        path: '/', 
        element: isLoggedIn? <Navigate to = "/home"/> :<PublicRouter/>,
        children: [
            { path: '*', element: <div> 404 </div>},
            { path: '/login', element: <Login/> },
            { path: '/signup', element: <Signup/> }
        ],
    },
]
  return createBrowserRouter(routes);
}

