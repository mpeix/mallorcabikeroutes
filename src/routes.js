import Home from './components/Home/home';
import Information from './components/Information/information';
import GPXVisualizer from './components/GPXVisualizer/GPXVisualizer';
import AboutUs from './components/About/about';

const routes = 
     [{
        path: "/",
        element: <Home />
    },
    {
        path: "routes",
        element: <GPXVisualizer />
      },
      {
        path: "about",
        element: <AboutUs />
      },
      {
        path: "info",
        element: <Information />
      }
]


export {
    routes
}