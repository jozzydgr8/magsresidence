import { reason } from "../../../data"
import roomImage from '../../../asset/room1.png'
import roomImage2 from '../../../asset/room2.jpg'
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


                    <div
    className="col-md-6"
    style={{
        position: 'relative',
        paddingBottom: '50px'
    }}
>
    <div
    className="chooseImage"
        style={{
            backgroundImage: `url(${roomImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
            borderRadius: '10px',
            boxShadow: '0 10px 30px var(--secondary)'
        }}
    />

    <div
    className="chooseImageTwo"
        style={{
            position: 'absolute',
            backgroundImage:`url(${roomImage2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            bottom: '0',
            left: '0',
            width: '50%',
            
            zIndex: 2,
            borderRadius:"10px",
            boxShadow: '0 10px 30px var(--secondary)'
        }}
    />
</div>
                </div>
            </div>
        </section>
    )
}