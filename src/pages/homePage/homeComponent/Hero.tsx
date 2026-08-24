import {StarFilled, TeamOutlined, ClockCircleOutlined, SafetyOutlined} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {FlatButton} from '../../../shared/FlatButton';
import { backgroundImages } from '../../../data';
export const Hero =()=>{
     const [currentIndex, setCurrentIndex] = useState(0);
       const [fade, setFade] = useState(true);

     useEffect(() => {
  const interval = setInterval(() => {
    setFade(false);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
      setFade(true);
    }, 1000);

  }, 5000);

  return () => clearInterval(interval);
}, []);


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


    const currentBackground = backgroundImages[currentIndex].background;

    return(
        <section id="hero" 
        style={{
            backgroundImage: `
          linear-gradient(to right, var(--teal) 0%, transparent 100%),
          url(${currentBackground})
        `,
        }}>
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
                    <a href='/#apartments'><FlatButton className=" btn btn-xl btnPrimary " title="Book Now"/> </a>
                    <a href='/#apartments'><FlatButton className=" btn btn-xl btnAlternate " title="View Apartments"/></a>
                    </div>
                </div>
                </div>










                
            </div>

            
        </section>
    )
}