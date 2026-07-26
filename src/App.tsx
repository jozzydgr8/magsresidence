import React from 'react';
import {createBrowserRouter, createRoutesFromChildren, Route, RouterProvider} from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/homePage/HomePage';

function App() {
  const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />

    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
