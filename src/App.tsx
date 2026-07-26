import React from 'react';
import {createBrowserRouter, createRoutesFromChildren, Route, RouterProvider} from 'react-router-dom';
import { Layout } from './Layout';

function App() {
  const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
      <Route index />

    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
