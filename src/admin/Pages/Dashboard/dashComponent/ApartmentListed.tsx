import { NavLink } from "react-router-dom"
import { FlatButton } from "../../../../shared/FlatButton"
import styles from '../../../admin.module.css'
import {PlusOutlined} from '@ant-design/icons'
import Marquee from "react-fast-marquee"
import { UseDataContext } from "../../../../context/UseDataContext"
const Style = {
    apartmentbackground:{
        backgroundRepeat:'no-repeat', 
        backgroundSize:'contain',
        height:'100px'
    }
}
export const ApartmentListed = ()=>{
    const {Apartments} = UseDataContext();
    return(
        <>
        <Marquee speed={50} pauseOnHover={true} gradient={false} >
            
            {
            Apartments && Apartments.map(apartment=>(
                <div key={apartment._id} >
                    <div className={styles.apartmentcontainer}>
                        <div style={{background:`url(${apartment.images[0].url})`, ...Style.apartmentbackground }} >

                        </div>
                        <strong>
                            {apartment.title}
                        </strong>
                        <div>
                            <NavLink to={`/admin_jctbdil1$/apartment/${apartment._id}`}><FlatButton title="View Apartment" className="btn btnPrimary"/></NavLink>
                        </div>
                    </div>
                   
                </div>
            ))
            }

        </Marquee>
        {Apartments?.length===0 && <small style={{color:"gray"}}>apartments uploaded will be here...</small>}
        
        <div>
            <NavLink to={'/admin_jctbdil1$/apartment/addapartment'}>
            <FlatButton className=" btn btnPrimary" icon={<PlusOutlined/>} title="Add New apartment"/>
                
    
            </NavLink>
        </div>
        </>
    )
}