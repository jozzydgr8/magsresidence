import { reason } from "../../../data"

const iconStyle={
    fontSize:"1.5rem", color:"var(--teal)",
    background:'var(--transparent-gold)', borderRadius:'80%',
    width:'fit-content',
    padding:'2px 15px'};
export const Choose = ()=>{

    return(
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <p className="homeBadge">why choose us</p>
                        <br/>
                        <h2 className="subheading" style={{color:'var(--teal)'}}>The Mags Residence Difference</h2>
                        <br/>
                        <p className="sub-topic">
                            We don't just offer a room — we provide a complete living experience. From the moment you arrive, everything is ready: fresh linens, fast WiFi, a fully stocked kitchen, and a space that feels like yours.
                        </p>
                        {
                            reason.map((data, index)=>(
                                <div key={index} style={{display:"flex", alignItems:'center', gap:"10px"}}>
                                    <div style={iconStyle}>
                                        {data.id}
                                    </div>
                                    <div>
                                        <h4 className="subheading">
                                            {data.title}
                                        </h4>
                                        <p>
                                        {data.description}
                                        </p>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}