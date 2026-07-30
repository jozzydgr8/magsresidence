import { FlatButton } from "../../../shared/FlatButton"
import {RightOutlined, EnvironmentOutlined, CoffeeOutlined, PlaySquareOutlined} from '@ant-design/icons'
import parlourImage from '../../../asset/livingRoom2.png'
const iconStyle={
    fontSize:"1.1rem", color:"var(--teal)",
    background:'var(--transparent-gold)', borderRadius:'80%',
    padding:'10px'};
const tag = {
    display:'flex',gap:'10px',whiteSpace:'nowrap' , alignItems:'center'
}
export const Welcome = ()=>{
    return(
        <section id='welcome'>
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-6 mb-2">
                        <div className="welcomeImage animate-left" style={{boxShadow: '0 10px 30px var(--secondary)', backgroundImage:`url(${parlourImage})`, backgroundSize:'cover', backgroundPosition:'center',  borderRadius:'10px'}}>

                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <p className="homeBadge">WELCOME TO MAGS RESIDENCE</p>
                        <h2 className="sub-heading" style={{color:'var(--teal)'}}>More Than Just a Place to Stay</h2><br/>
                        <p className="animate-right">
                            At Mags Residence, we believe that where you stay should feel like home — not a hotel room. Our fully furnished serviced apartments combine the space and privacy of a residence with hotel-like convenience and service.
                            <br/><br/>
                            Every apartment is thoughtfully designed with modern interiors, premium amenities, and warm, welcoming touches. Whether you're visiting for a weekend, a month, or longer — you'll find a space that's ready for you to live, work, and relax.
                        </p>

                        <div>
                            <div className="row">
                                <div className="col-md-4 mb-2 animate-up">
                                    <div style={tag}>
                                        <EnvironmentOutlined style={iconStyle}/>
                                        <small>Prime Location</small>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2 animate-up">
                                    <div style={tag}>
                                        <CoffeeOutlined style={iconStyle}/>
                                        <small>Premium Amenities</small>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2 animate-up">
                                    <div style={tag}>
                                        <PlaySquareOutlined style={iconStyle}/>
                                        <small>Smart Entertainment</small>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <FlatButton className='borderlessbtn animate-up' title="Learn More About Us" icon={<RightOutlined />}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}