import { Apartment } from '../../../types'; 
import {EnvironmentOutlined, StarFilled} from '@ant-design/icons';


type apartmentProp ={
    currentApartment:Apartment,
}
export const ApartmentHero = ({currentApartment}:apartmentProp)=>{
    return(
        <section style={{color:"white",minHeight:"80vh",backgroundImage: `
          linear-gradient(to top, var(--teal) 0%, transparent 50%),
          url(${currentApartment.images[0].url})
        `, backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:"center center"}}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <div className=' heroBadge homeBadgeParent'><StarFilled /> <StarFilled /> <StarFilled /> <StarFilled /> <StarFilled />  Premium Serviced Apartment
                                             </div>
                        <h1>
                            {currentApartment.title}
                        </h1>
                        <br/>
                        <p className='subtopic'>
                            <EnvironmentOutlined/> No.172B Niyi street, Osubi, Warri, Delta State
                            <br/><br/>
                            A comfortable serviced apartment in Osubi, Warri, 
                            designed for relaxed stays and productive days.
                             Mags Residence combines the privacy of home with the convenience of a serviced stay, making it well suited for business trips, short visits, and extended stays.
                        </p>

                    </div>
                </div>
            </div>
        </section>
    )
}