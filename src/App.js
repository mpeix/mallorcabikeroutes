import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { createBrowserRouter,  RouterProvider} from "react-router-dom";
import {BikeRoutesProvider} from './context/BikeRoutesContext';
import {routes} from './routes';
import Header from './components/Common/header';

function App() {
  const [bikeRoutes, setBikeRoutes] = useState([]);
  
  useEffect(()=>{
    //TODO: Read config file and place it in the context
    axios.get('./assets/routeConfig.json')
    .then(({data}) => setBikeRoutes(data))
    .catch(err => console.log(err));
  },[]);

  const router = createBrowserRouter(routes);

  return (
    <BikeRoutesProvider value={bikeRoutes}>
      <main class="dark:bg-gray-800 bg-white relative overflow-hidden min-h-screen">
        <Header />
        <RouterProvider router={router} />
      </main>
    </BikeRoutesProvider>
  );
}

export default App;
