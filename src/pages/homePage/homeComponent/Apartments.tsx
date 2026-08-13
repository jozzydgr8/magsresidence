import { UseDataContext } from "../../../context/UseDataContext"
import { FlatButton } from "../../../shared/FlatButton";
export const Apartments = ()=>{
    const {Apartments} = UseDataContext();
    return(
        <section id="apartments">
        <div className="container-fluid">
            <div className="text-center">
            <p className="homeBadge">Our Apartments</p>
            <h2 className="sub-heading"style={{color:'var(--teal)'}}>Find Your Perfect Space</h2>
            <p className=" subtopic">Thoughtfully designed apartments for every kind of stay — from solo business trips to family relocations.</p>
           
           
            <div className="row">

            
            {
                Apartments?.map(data=>(
                    <div className="col-md-4 mt-4 animate-up" key={data._id}>
                        <div className="apartment-card h-100 text-start ">
                            <div style={{backgroundImage:`url(${data.images[0].url})`,
                         backgroundSize:'cover', height:'300px', backgroundPosition:'center center', borderTopRightRadius:"10px", borderTopLeftRadius:"10px"}}></div>
                        <div style={{padding:'30px'}}>
                            <h3 className="sub-heading">{data.title}</h3>
                            <p>{data.description}</p>
                        </div>
                        </div>
                    </div>
                ))
            }



            </div>


            <FlatButton title="View all apartment" className="animate-up btn btnSuccess mt-4 btn-lg"/>
            </div>

        </div>
        </section>
    )
}