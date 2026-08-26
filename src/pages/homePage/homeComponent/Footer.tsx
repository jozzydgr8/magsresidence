import {PhoneOutlined,FacebookOutlined,WhatsAppOutlined,InstagramOutlined,
        MailOutlined,
       ClockCircleOutlined,
        EnvironmentOutlined} from '@ant-design/icons';

import businessLogo from '../../../asset/businessLogo.png'
import { handleRequest } from '../../../shared/handleRequest';
import LocationMap from './LocationMap';
import { NavLink } from 'react-router-dom';
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
                            <a href="https://www.facebook.com/share/1DfUK7KcGK/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                                <FacebookOutlined style={{ padding:"10px", borderRadius:"12px", fontSize: '30px', background: 'rgba(184, 134, 11, 0.2)', color:"#E6C76A" }} />
                            </a>
                            <a href="https://wa.me/message/4WNVMK2V5RBZE1" target="_blank" rel="noopener noreferrer">
                                <WhatsAppOutlined style={{ padding:"10px", borderRadius:"12px", fontSize: '30px', background: 'rgba(184, 134, 11, 0.2)', color:"#E6C76A" }} />
                            </a>
                            <a href="https://www.instagram.com/mags_residence?igsh=MXM1aHhvdmEzZ3dwcw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                                <InstagramOutlined style={{ padding:"10px", borderRadius:"12px", fontSize: '30px', background: 'rgba(184, 134, 11, 0.2)', color:"#E6C76A" }} />
                            </a>
                        </div>
                    </div>

                    <div className="col-md-3 mb-2">
                        <h3>Quick Links </h3>
                        <br/>
                        <a href="/#about" >About Us</a>
                        <a href="/#apartments" >Apartments</a>
                  
                        <NavLink to="/gallery">Gallery</NavLink>
                        <a href="/#apartments" >Rate & Booking</a>
                    </div>


                    
                    <div className="col-md-3 mb-2">
                        <h3>More Info</h3>
                        <br/>
                        <a href="/#amenities" >Amenities</a>

                        <p>Guest Reviews</p>
                        
                        <p onClick={()=>handleRequest('Hello I will like to make some enquiries about Mag residence')}>Contact Us</p>
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
               <LocationMap
                    address="Mags Residence, No. 172B Niyi Street, Osubi, Warri, Delta State, Nigeria"
                />
                <p>Copyright © {new Date().getFullYear()} Mags Residence. All rights reserved.</p>
                <small>
                    <a href="https://jozzycodes.com" target="_blank" rel="noopener noreferrer" style={{ color: "#008080" }}>
                    Website created by jozzycodes
                </a>
                </small>
            </div>
        </footer>
    )
}