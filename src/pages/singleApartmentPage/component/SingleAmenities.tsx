import { singleAmenities } from "../../../data"

export const SingleAmenities = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <div className="row">
                    {singleAmenities.map((data,index)=>(
                        <div className="col-md-2 mb-3" key={index}>
                            <div className="apartment-card animate-up"style={{padding:'10px'}}>
                                {data.icon} {data.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}