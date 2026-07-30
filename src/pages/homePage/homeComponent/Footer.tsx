import {PhoneOutlined,FacebookOutlined,WhatsAppOutlined,InstagramOutlined,
        MailOutlined,
       ClockCircleOutlined,
        EnvironmentOutlined} from '@ant-design/icons';

import businessLogo from '../../../asset/businessLogo.png'
import { handleRequest } from '../../../shared/handleRequest';
export const Footer = ()=>{
    return(
        <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mb-2">
                        <img src={businessLogo} alt='magresidence-logo'/>
                        <br/>
                        <p>
                            Premium serviced apartments offering a comfortable, stylish home away from home for business, leisure, and extended stays.
                        </p>
                        <div  style={{display:'flex', flexDirection:"row", gap:"10px"}}>
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <FacebookOutlined style={{ padding:"10px", borderRadius:"12px", fontSize: '30px', background: 'rgba(184, 134, 11, 0.2)', color:"#E6C76A" }} />
                            </a>
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <WhatsAppOutlined style={{ padding:"10px", borderRadius:"12px", fontSize: '30px', background: 'rgba(184, 134, 11, 0.2)', color:"#E6C76A" }} />
                            </a>
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <InstagramOutlined style={{ padding:"10px", borderRadius:"12px", fontSize: '30px', background: 'rgba(184, 134, 11, 0.2)', color:"#E6C76A" }} />
                            </a>
                        </div>
                    </div>

                    <div className="col-md-3 mb-2">
                        <h3>Quick Links </h3>
                        <br/>
                        <a href="/" target="_blank" rel="noopener noreferrer">About Us</a>
                        <a href="/apartments" target="_blank" rel="noopener noreferrer">Apartments</a>
                        <a href="/gallery" target="_blank" rel="noopener noreferrer">Amenities</a>
                        <a href="/gallery" target="_blank" rel="noopener noreferrer">Gallery</a>
                        <a href="/apartments" target="_blank" rel="noopener noreferrer">Rate & Booking</a>
                    </div>


                    
                    <div className="col-md-3 mb-2">
                        <h3>More Info</h3>
                        <br/>
                        <p>Services</p>
                        <p>Guest Reviews</p>
                        <p>Corporate Bookings</p>
                        <p onClick={()=>handleRequest('Hello I will likw to make some enquiries about Mag residence')}>Contact Us</p>
                    </div>


                    <div className="col-md-3 mb-2">
                        <h3>Contact</h3>
                        <br/>
                        <p><PhoneOutlined style={{fontSize:"20px", color:"#008080", paddingRight:"10px"}} />  +234 806 2326 630</p>
                        <p><MailOutlined style={{fontSize:"20px", color:"#008080", paddingRight:"10px"}} />  info@magresidence.com</p>
                        <p><ClockCircleOutlined style={{fontSize:"20px", color:"#008080", paddingRight:"10px"}}/> 24/7 Guest Support</p>
                        <p><EnvironmentOutlined style={{fontSize:"20px", color:"#008080", paddingRight:"10px"}}/> No.172B Niyi street, Osubi, Warri, Delta State</p>
                        
                    </div>
                </div>
                <hr/>
                <p>Copyright © {new Date().getFullYear()} Seun Ogunsanya. All rights reserved.</p>
                <small>
                    <a href="https://jozzycodes.com" target="_blank" rel="noopener noreferrer" style={{ color: "#008080" }}>
                    Website created by jozzycodes
                </a>
                </small>
            </div>
        </footer>
    )
}