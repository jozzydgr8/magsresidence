import {StarFilled, TeamOutlined, ClockCircleOutlined, SafetyOutlined} from '@ant-design/icons';
import { useEffect } from 'react';
import {FlatButton} from '../../../shared/FlatButton';
export const Hero =()=>{
    useEffect(() => {
    const headerText = document.querySelector('.heroWrite');
    headerText?.classList.add('sectionAnimationLeft');

    const headerBottom = document.querySelector('.heroBottom');
    headerBottom?.classList.add('sectionAnimationUp');

    const headerButton = document.querySelector('.heroButton');
    headerButton?.classList.add('sectionAnimationUp');

    const heroBadge = document.querySelector('.heroBadge');
    heroBadge?.classList.add('sectionAnimationDown');
    }, []);

    return(
        <section id="hero">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                    <div className=' heroBadge homeBadgeParent'><StarFilled /> <StarFilled /> <StarFilled /> <StarFilled /> <StarFilled />  Premium Serviced Apartment
                     </div>
                     <br/>
                    <h1>
                        A <span style={{ color: 'var(--burnished-gold)' }}>Home Of</span><br/>
                        Comfort
                    </h1>
                    <br/>
                    <p className='subtopic heroWrite'>
                        Fully furnished serviced apartments designed for comfort and
                         convenience. Whether for business, leisure, or an extended stay
                          — arrive, settle in, and feel at home.
                    </p>
                    <div className='row heroBottom'>
                        <div className="col-md-4 col-sm-6 mb-2 ">
                            <small style={{display:"flex", gap:'12px'}}><SafetyOutlined/> 24/7 Guest Support</small>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-2 ">
                            <small style={{display:"flex", gap:'12px'}}><ClockCircleOutlined/> Flexible Stays</small>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-2 ">
                            <small style={{display:"flex", gap:'12px'}}><TeamOutlined/> 200+ Happy Guests</small>
                        </div>
                        

                    </div>
                    <br/>

                    
                    <div className='heroButton'>
                    <FlatButton className=" btn btn-xl btnPrimary " title="Book Now"/> 
                    <FlatButton className=" btn btn-xl btnAlternate " title="View Apartments"/>
                    </div>
                </div>
                </div>










                
            </div>

            
        </section>
    )
}