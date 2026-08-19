import { useParams } from "react-router-dom";
import { UseDataContext } from "../../context/UseDataContext";
import { ApartmentHero } from "./component/ApartmentHero";
import { SingleAmenities } from "./component/SingleAmenities";
import { ApartmentDisplay } from "./component/ApartmentDisplay";
import { AboutApartment } from "./component/AboutApartment";
import { Footer } from "../homePage/homeComponent/Footer";
export const SingleApartment = ()=>{
    const {id} = useParams();
    const {Apartments} = UseDataContext();

    const currentApartment = Apartments?.find((apartment)=> apartment._id === id);
    if(!currentApartment){
        return(
            <section style={{padding:'2rem', textAlign:'center'}}>
                <h2 className="sub-heading">Apartment Listing not found</h2>
            </section>
        )
    }
    return(
        <>
        
            <ApartmentHero currentApartment={currentApartment}/>
            <SingleAmenities />
            <ApartmentDisplay images={currentApartment.images}/>
            <AboutApartment currentApartment={currentApartment}/>
            <Footer/>
        </>
    )
}