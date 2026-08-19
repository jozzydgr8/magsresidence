import { amenities } from "../../../data"
import { ApartmentForm } from "./ApartmentForm"
import { CalendarDisplay } from "./Calendar.Display"
import { Apartment } from "../../../types"

type apartmentProp ={
    currentApartment:Apartment,
}
export const AboutApartment = ({currentApartment}:apartmentProp)=>{
    return(
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <span className="homeBadge">
                            About the residence
                        </span>
                        <h2 className="subheading">
                            Designed to feel like your own place in the city.
                        </h2>
                        <p className="subtopic">
                            Mags Residence is made for staying a little longer. Warm, understated and quietly considered, with tactile materials, soft linen curtains and a calm neutral palette that gives the space an easy, residential feel. Morning light moves through the room, harbour views open from the balcony, and the sofa invites you to settle in with a book and stay awhile.
                            <br/><br/>
                            It’s less like a hotel room, more like a place that’s yours — a slower, lighter home with the city just beyond the glass.
                        </p>
                        <br/>
                        <div className="row mt-4">
                            {
                                amenities.slice(0,4).map((data, index)=>(
                                    <div key={index} className="col-6  mb-3">
                                        <div className="apartment-card h-100 w-100">
                                           
                                            <strong className="subheading  ">{data.title}</strong>
                                             
                                           
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
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
                </div>
            </div>
        </section>
    )
}