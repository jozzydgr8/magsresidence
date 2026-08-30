
import { features } from "../../../data";



const iconStyle = {
  fontSize: "2.0rem",
  color: "var(--light-gold)",
  background: "var(--transparent-gold)",
  borderRadius: "5px",
  padding: "10px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "58px",
  height: "58px",
};
export const FeatureList = ()=>{
  
    return(
        <section id="features" >
            <div className="container-fluid">
                <p className="homeBadge text-center">Our features</p>

                <h2 className="subheading text-center">
                Enjoy Our Premium features
                </h2>

                <br/>
                <div className="row g-2">
                    {
                        features && features.map((data, index)=>(
                            <div key={index} className="col-md-4 mb-2 d-flex">
                                
                                    <div className=" animate-up features-content h-100 w-100">
                                        <div style={iconStyle}>{data.icon}</div>
                                    <br/><br/>
                                    <h3 className="subheading">{data.label}</h3>
                                    {/* <p style={{color:'var(--offWhite)'}}>{data.description}</p> */}
                                    </div>
                                    
                                
                            </div>
                        ))
                    }
                </div>
                <br/>
              
            </div>
        </section>
    )
}