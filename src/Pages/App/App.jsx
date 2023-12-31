import { useContext } from 'react';
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom';
import { ShoppingCartProvider, initializeStorage, ShoppingCartContext } from '../../context';
import Home from '../Home/Home';
import MyAccount from '../MyAccount/MyAccount';
import MyOrder from '../MyOrder/MyOrder';
import MyOrders from '../MyOrders/MyOrders';
import NotFound from '../NotFound/NotFound';
import SignIn from '../SignIn/SignIn';
import Navbar from '../../components/navbar/navbar.components';
import CheckoutSideMenu from '../../components/checkout-side-menu/checkout-side-menu.components';
import './App.css';
// ... (import statements)

const AppRoutes = () => {
  const { signOut, account } = useContext(ShoppingCartContext);

  const localAccount = localStorage.getItem('account');
  const parsedAccount = JSON.parse(localAccount);

  const localSignOut = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(localSignOut);

  const noAccountStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountState = Object.keys(account).length === 0;
  const hasUserAnAccount = !noAccountStorage || !noAccountState;
  const isUserSignOut = signOut || parsedSignOut;

  const shouldRedirectToSignIn = hasUserAnAccount && !isUserSignOut;

  let routes = useRoutes([
    { path: '/', element: shouldRedirectToSignIn ? <Navigate replace to={'/sign-in'} /> : <Home /> },
    { path: '/:category', element: shouldRedirectToSignIn ? <Navigate replace to={'/sign-in'} /> : <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '*', element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  initializeStorage();
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;