import React from 'react';
import {createBrowserRouter, createRoutesFromChildren, Route, RouterProvider} from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/homePage/HomePage';
import { ToastContainer } from 'react-toastify';


function App() {
  const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />

    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
