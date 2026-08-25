import { NavLink } from "react-router-dom";
import { UseDataContext } from "../../../context/UseDataContext"
import {TeamOutlined} from '@ant-design/icons';
import { FlatButton } from "../../../shared/FlatButton";
export const Apartments = ()=>{
    const {Apartments} = UseDataContext();
    return(
        <section id="apartments">
        <div className="container-fluid">
            <div className="text-center">
            <p className="homeBadge">Our Apartments</p>

            <h2 className="sub-heading" style={{ color: 'var(--teal)' }}>
            Find Your Perfect Apartment
            </h2>

            <p className="subtopic">
            Explore our comfortable and thoughtfully designed apartments, perfect for a relaxing and memorable stay.
            </p>


           
            <div className="row">

            
            {
                Apartments?.map(data=>(
                    <div className="col-md-4 mt-4 animate-up " key={data._id}>
                        <NavLink to={`/apartment/${data._id}`}>
                        <div className="home-apartment-card h-100 text-start d-flex flex-column">

                            <div
                            style={{
                                backgroundImage: `url(${data.images[0].url})`,
                                backgroundSize: "cover",
                                height: "300px",
                                backgroundPosition: "center center",
                                borderTopRightRadius: "10px",
                                borderTopLeftRadius: "10px",
                            }}
                            />

                            <div
                            style={{
                                padding: "30px",
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                            }}
                            >
                            <strong className="homeBadge">
                                <TeamOutlined /> 1 - {data.capacity} guests
                            </strong>

                            <h3 className="sub-heading">
                                {data.title}
                            </h3>

                            <p>
                                {data.description.slice(0, 70)}...
                            </p>

                            {/* Pushes button to bottom */}
                            <div className="mt-auto">
                                <FlatButton
                                title="Book now"
                                className="btn btnSuccess w-100"
                                />
                            </div>
                            </div>

                        </div>
                        </NavLink>

                    </div>
                ))
            }



            </div>



            </div>

        </div>
        </section>
    )
}