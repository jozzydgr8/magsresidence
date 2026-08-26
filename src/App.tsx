import React, { useEffect } from 'react';
import {createBrowserRouter, createRoutesFromChildren, Outlet, Route, RouterProvider, Navigate} from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/homePage/HomePage';
import { ToastContainer } from 'react-toastify';
import { UseDataContext } from './context/UseDataContext';
import { UseAuthContext } from './context/UseAuthContext';
import { Loading } from './shared/Loading';
import { AdminLayout } from './admin/AdminLayout';
import { Dashboard } from './admin/Pages/Dashboard/Dashboard';
import { ProtectedRoutes } from './shared/ProtectedRoutes';
import { AddApartment } from './admin/Pages/apartment/AddApartment';
import { GuestRoutes } from './shared/GuestRoutes';
import Session from './admin/Pages/Session';
import { SingleAdminApartment } from './admin/Pages/apartment/SingleAdminApartment';
import { SingleApartment } from './pages/singleApartmentPage/SingleApartment';
import { Gallery } from './pages/galleryPage/Gallery';
import { AddGallery } from './admin/Pages/gallery/AddGallery';
import { SingleAdminAmenity } from './admin/Pages/amenity/singleAdminAmenity';
import { AddAmenity } from './admin/Pages/amenity/addAmenity';


function App() {
  const {dispatch, loading} = UseDataContext();
  const {dispatch:handle, loading:authLoading, user} = UseAuthContext();

  //useeffect to fetch apartments from the backend and dispatch to the context
  useEffect(()=>{
    dispatch({type:"loading", payload:true});
    const fetchData = async ()=>{
      try{
        const response = await fetch('https://magsresidenceserver.vercel.app/apartment');
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

  //useffect to fetch galleries
  useEffect(()=>{
    const fetchGalleries = async ()=>{
    dispatch({type:'loading', payload:true});
    try{
      const response = await fetch('https://magsresidenceserver.vercel.app/gallery');
      const json = await response.json();
      if(!response.ok){
        throw Error('error fetching galleries',json)
      }
      dispatch({type:'getGalleries', payload:json});
      console.log('galleries',json)
    }
    catch(error){
      console.error(error)
    }finally{
        dispatch({type:'loading', payload:false})
      }
  };
  fetchGalleries();
  },[dispatch, user]);

  //useEffect to detch amenitites
  useEffect(()=>{
    const fetchAmenities = async ()=>{
      try{
        const response = await fetch('https://magsresidenceserver.vercel.app/amenity');
        const json = await response.json();
        if(!response.ok){
          throw Error ('error fetching amenities', json);
        }
        dispatch({type:"getAmenities", payload:json});
        console.log('amenities', json);
      }catch(error){
        console.error(error)
      }finally{
        dispatch({type:'loading', payload:false});
      }
    }
    fetchAmenities()
  },[dispatch])

  //useEffect to fetch bookings
  useEffect(()=>{
    const fetchBookings = async ()=>{
      dispatch({type:'loading', payload:true})
      try{
        const response = await fetch('https://magsresidenceserver.vercel.app/bookings',{
          headers:{
            'Authorization':`Bearer ${user?.token}`
          }
        })
        if(!response.ok){
          throw Error('error fetching bookings')
        }
        const json = await response.json();
        console.log('bookings',json);
        dispatch({type:'getBookings', payload:json})
      }catch(error){
        console.error('error fetching booking',error)
      }finally{
        dispatch({type:'loading', payload:false})
      }
    }
    fetchBookings();
  },[dispatch, user])

  
  //useffect for authentication
useEffect(() => {
  handle({ type: 'loading', payload: true });

  const data = localStorage.getItem('user');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      const now = new Date().getTime();
      const expiryDays = 3;
      const expiryTime = expiryDays * 24 * 60 * 60 * 1000; // days to ms

      if (now - parsed.savedAt < expiryTime) {
        // Not expired
        handle({ type: 'getUser', payload: parsed.user });
      } else {
        // Expired
        localStorage.removeItem('user');
      }
    } catch (e) {
      console.error('Failed to parse user data:', e);
      localStorage.removeItem('user');
    }
  }

  handle({ type: 'loading', payload: false });
}, [handle]);

    if(loading || authLoading){
    return <Loading/>
  }
  const router = createBrowserRouter(createRoutesFromChildren(
    <>
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />
     
      <Route path='apartment/:id' element={<SingleApartment/>}/>
      <Route path='gallery' element={<Gallery/>}/>
      
     <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
    <Route path='/admin_jctbdil1$' element={<AdminLayout/>}>
      <Route index element={<ProtectedRoutes user={user}><Dashboard/></ProtectedRoutes>}/>
      <Route path='apartments' element={<ProtectedRoutes user={user}><Outlet/></ProtectedRoutes>}>
        <Route path='addapartments' element={<AddApartment/>} />
        <Route path=':id' element={<SingleAdminApartment/>}/>
      </Route>
      <Route path='gallery' element={<ProtectedRoutes user={user}><Outlet/></ProtectedRoutes>}>
        <Route path='addgallery' element={<AddGallery/>}/>
      </Route>
      <Route path='amenities' element={<ProtectedRoutes user={user}><Outlet/></ProtectedRoutes>} >
        <Route path='addamenity' element={<AddAmenity/>}/>
        <Route path=':id' element={<SingleAdminAmenity/>}/>
      </Route>


         <Route path='session' element={<GuestRoutes user={user}><Session/></GuestRoutes>}/>
          <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
    </>
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
