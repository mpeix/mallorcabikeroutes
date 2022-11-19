import { useEffect, useState, useContext } from 'react';
import BikeRoutesContext from '../../context/BikeRoutesContext';
import RouteCard from './RouteCard';
import SolidButton from '../Common/solidButtony';
import HollowButton from '../Common/hollowButton';
import { arrayHasItems, isDefined, isTrue, undefined } from '../../utils/utils';


function GPXVisualizer() {
    const bikeRoutes = useContext(BikeRoutesContext);

    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [routesCategories, setRoutesCategories] = useState([]);
    const [routesCollections, setRoutesCollections] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCollection, setSelectedCollection] = useState('');
    
    
    useEffect(() => {
        //Todo adapt method to read from context
        if(arrayHasItems(bikeRoutes)){
            //setRoutesCollections([...new Set(bikeRoutes.map(r => r.Collection))]);
            setRoutesCategories([...new Set(bikeRoutes.map(r => r.Category))]);
        }
    }, [JSON.stringify(bikeRoutes)]);

    useEffect(()=>{
        if(arrayHasItems(bikeRoutes) && undefined(selectedCategory) && undefined(selectedCollection)){
            setFilteredRoutes(bikeRoutes.filter(r=>isTrue(r.Starred)));
        }

        if(arrayHasItems(bikeRoutes) && isDefined(selectedCategory) && undefined(selectedCollection)){
             //TODO: top five and label informing
            setFilteredRoutes(bikeRoutes.filter(r=>r.Category === selectedCategory).slice(0,5));
        }

        if(arrayHasItems(bikeRoutes) && isDefined(selectedCategory) && isDefined(selectedCollection)){
            setFilteredRoutes(bikeRoutes.filter(r=>r.Category === selectedCategory && r.Collection === selectedCollection))
        }
       
    },[selectedCategory, selectedCollection, JSON.stringify(bikeRoutes)])
   
    const onRouteCategoryClick = (categoryName) =>{
        setSelectedCategory(categoryName);
        setSelectedCollection('');
        setRoutesCollections([...new Set(bikeRoutes.filter(r=>r.Category == categoryName).map(r => r.Collection))])
    }
    
    const onCollectionClick = (collectionName)=> {
        setSelectedCollection(collectionName);
    }

    return (
        <div className='py-4 bg-gray-200'>
            <div className='grid grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-6 w-11/12 mx-auto mb-4'>
                {routesCategories.map((c) =>(
                    <div key={c}>
                        {
                            selectedCategory == c ?
                            <SolidButton  Text={c} TailwindColor="themecolor2"
                                      onClick={()=> {onRouteCategoryClick(c)}} MaxFontSize={18}
                                      Style={{minHeight:'60px', maxHeight:'60px'}} />
                            :
                                <HollowButton Text={c} TailwindColor="themecolor2"
                                    onClick={()=> {onRouteCategoryClick(c)}} MaxFontSize={18}
                                    Style={{minHeight:'60px', maxHeight:'60px'}}/>
                        }
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-6 w-11/12 mx-auto'>
                {isDefined(selectedCategory) && routesCollections.map((c) =>(
                    <div>
                        <SolidButton key={c} Text={c} TailwindColor="themecolor3"
                                      onClick={()=> {onCollectionClick(c)}} MaxFontSize={18}
                                      Style={{minHeight:'60px', maxHeight:'60px',minWidth:'100%'}} />
                    </div>
                ))}
            </div>
           
            {
               arrayHasItems(filteredRoutes) && filteredRoutes.map((r) =>  (
                        <RouteCard key={r.Name} {...r} />
                    ))
            }
            {arrayHasItems(bikeRoutes) && isDefined(selectedCategory) && undefined(selectedCollection) &&
                <div className='bg-white rounded w-11/12 mx-auto rounded-2xl shadow-lg my-2.5'>
                    <div className='mx-auto text-gray-700 text-center py-2.5'>
                        Per veure més rutes filtra per col·lecció
                    </div>
                </div>
            }
        </div>
    )

}

export default GPXVisualizer;