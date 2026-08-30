
import { NavLink } from "react-router-dom";
import { UseDataContext } from "../../../context/UseDataContext";



const iconStyle={
    fontSize:"1.5rem", color:"var(--light-gold)",
    background:'var(--transparent-gold)', borderRadius:'5px',
    padding:'10px'};
export const Offering = ()=>{
    const {Amenities} = UseDataContext();
    return(
        <section id="amenities" >
            <div className="container-fluid">
                <p className="homeBadge text-center">Our Amenities</p>

                <h2 className="subheading text-center">
                Enjoy Our Premium Amenities
                </h2>

                <br/>
                <div className="row justify-content-center g-2">
                    {
                        Amenities && Amenities.map((data, index)=>(
                            <div key={index} className="col-md-6 mb-2 d-flex">
                                <NavLink to={`/amenity/${data._id}`} className=" animate-up h-100 w-100"
                                style={{
                                    backgroundImage:`url(${data.images[0]?.url})`,
                                    backgroundSize:"cover",
                                    backgroundRepeat:'no-repeat',backgroundPosition:"center",
                                    borderRadius:'10px'
                                }}>
                                    <div className="amenities-content h-100 w-100">
                                    <br/><br/>
                                    <h3 className="subheading">{data.title}</h3>
                                    {/* <p style={{color:'var(--offWhite)'}}>{data.description}</p> */}
                                    </div>
                                    
                                </NavLink>
                            </div>
                        ))
                    }
                </div>
                <br/>
              
            </div>
        </section>
    )
}