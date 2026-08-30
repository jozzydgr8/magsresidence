import { amenities } from "../../../data"
import { ApartmentForm } from "./ApartmentForm"
import { CalendarDisplay } from "./Calendar.Display"
import { Apartment } from "../../../types"

type apartmentProp ={
    currentApartment:Apartment,
}
export const AboutApartment = ({currentApartment}:apartmentProp)=>{
    return(
        <section id="book">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        
                        
                        <h2 className="text-center subheading mt-3" style={{color:'var(--burnished-gold)'}}>Check Availability</h2>
                        <div className="apartment-card mt-3">
                            <CalendarDisplay currentApartment={currentApartment}/>
                        </div>
                    </div>
                    <div className="col-md-4">
                         <h2 className="text-center subheading mt-3" style={{color:'var(--burnished-gold)'}}>Book Your Stay</h2>
                        <div className="apartment-card mt-4">
                            
                            <ApartmentForm currentApartment = {currentApartment}/>
                        </div>
                    </div>
                    <div className="col-md-8 mt-4">
                        <span className="homeBadge">
                            About the residence
                        </span>
                        <h2 className="subheading">
                            Designed to feel like your own place in the city.
                        </h2>
                        <p className="subtopic">
                            Mags Residence is made for staying a little longer. Warm, understated and calm, with soft linen curtains, tactile materials and a neutral palette. Morning light fills the room, harbour views open from the balcony, and the sofa invites you to settle in.
                            <br/><br/>
                            Less like a hotel room, more like a home — with the city just beyond the glass.
                        </p>
                        <br/>
                        <div className="row mt-4">
                            {
                                amenities.slice(0,4).map((data, index)=>(
                                    <div key={index} className="col-6  mb-3">
                                        <div className="apartment-card h-100 w-100">
                                           
                                            <b className="subheading  ">{data.title}</b>
                                             
                                           
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}