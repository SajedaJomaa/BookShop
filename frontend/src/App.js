import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/Error';
import BookDetail from './pages/BookDetail.js';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import SignupAuthPage, { signupAction as signAuthAction } from './pages/SignupAuth.js';
import AuthenticationPage, { action as authAction } from './pages/Authentication';
import PrivateRoute from './pages/PrivateRoute.js';
import Purchased from './components/PurchasedBooks/Purchased.js';
import { action as logoutAction } from './pages/Logout';
import {
  // checkAuthLoader,
  tokenLoader
} from './util/auth';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: 'book/:id',
        element: <PrivateRoute element={<BookDetail />} />,

      }
      ,

      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: 'signup',
        element: <SignupAuthPage />,
        action: signAuthAction
      },
      {
        path: 'purchasedBooks',
        element: <Purchased />,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
