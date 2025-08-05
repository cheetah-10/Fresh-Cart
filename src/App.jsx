import { useState } from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands'
import WishList from './components/WishList/WishList'
import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from 'react-router-dom'
import AuthContextProvider from './Context/AuthContext'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Payment from './components/Payment/Payment'
import { Offline } from 'react-detect-offline'
import WishListContextProvider from './Context/WishListContext'
import PasswordContextProvider from './Context/PasswordContext'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetCode from './components/ResetCode/ResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import AllOrders from './components/AllOrders.jsx/AllOrders'
import UserProfileContextProvider from './Context/UserProfileContext'




let routing = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'Register', element: <Register></Register> },
      { path: 'login', element: <Login></Login> },
      { path: 'Products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'Categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'WishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'Payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
      { path: 'Home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'AllOrders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'ForgetPassword', element: <ForgetPassword /> },
      { path: 'ResetCode', element: <ResetCode /> },
      { path: 'ResetPassword', element: <ResetPassword /> },
      { path: `ProductDetails/:id`, element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
      { path: '*', element: <Notfound></Notfound> },
    ]
  }
])
const reactQueryConfig = new QueryClient();
function App() {


  return (
    <>
      <PasswordContextProvider>
        <AuthContextProvider>
          <UserProfileContextProvider>
            <CartContextProvider>
              <WishListContextProvider>
                <QueryClientProvider client={reactQueryConfig}>
                  <RouterProvider router={routing} />
                  <Toaster
                   
                    toastOptions={{
                      duration: 750,
                      style: {
                        zIndex: 99999,
                      },
                    }} />
                  <Offline>
                    <div className="bg-black text-white text-center  fixed bottom-5  left-5"> internet corrupted</div>
                  </Offline>
                </QueryClientProvider>
              </WishListContextProvider>

            </CartContextProvider>
          </UserProfileContextProvider>
        </AuthContextProvider>

      </PasswordContextProvider>


    </>
  )
}

export default App
