import React, { useEffect } from 'react';
import {createBrowserRouter, createRoutesFromChildren, Route, RouterProvider} from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/homePage/HomePage';
import { ToastContainer } from 'react-toastify';
import { UseDataContext } from './context/UseDataContext';
import { UseAuthContext } from './context/UseAuthContext';
import { Loading } from './shared/Loading';


function App() {
  const {dispatch, loading} = UseDataContext();
  const {dispatch:handle, loading:authLoading, user} = UseAuthContext();

  //useeffect to fetch apartments from the backend and dispatch to the context
  useEffect(()=>{
    dispatch({type:"loading", payload:true});
    const fetchData = async ()=>{
      try{
        const response = await fetch('https://magsresidenceserver.vercel.app/apartments');
        if(!response.ok){
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        console.log('apartment', json);
        dispatch({type:'getApartments',payload:json});
      }catch(error){
        console.error('Error fetching data', error)
      }finally{
        dispatch({type:'loading', payload:false})
      }
    }

    fetchData()
    
  },[dispatch]);

    if(loading || authLoading){
    return <Loading/>
  }
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
