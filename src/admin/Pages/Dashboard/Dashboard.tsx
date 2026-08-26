import { AmenityListed } from "./dashComponent/AmenityListing"
import { ApartmentListed } from "./dashComponent/ApartmentListed"
import { BookingListed } from "./dashComponent/BookingListed"
import { GalleriesListed } from "./dashComponent/GalleryListing"

export const Dashboard = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <h2 className="subheading">Dashboard</h2>
                <div className="row">
                    <div className="col-12 mb-4">
                        <div>
                            <ApartmentListed/>
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <div>
                            <AmenityListed/>
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <div>
                           <GalleriesListed/>
                        </div>
                    </div>
                    <div className="col-12">
                        <BookingListed/>
                    </div>
                </div>
            </div>
        </section>
    )
}