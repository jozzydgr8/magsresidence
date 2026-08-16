import { amenities } from "../../../data";
import { FlatButton } from "../../../shared/FlatButton";
import {RightOutlined} from '@ant-design/icons'


const iconStyle={
    fontSize:"1.5rem", color:"var(--light-gold)",
    background:'var(--transparent-gold)', borderRadius:'5px',
    padding:'10px'};
export const Offering = ()=>{
    return(
        <section id="offering" >
            <div className="container-fluid">
                <p className='homeBadge text-center'>What we offer</p>
                <h2 className='subheading text-center'>Everything You Need for a Comfortable Stay</h2>
                <br/>
                <div className="row">
                    {
                        amenities.map((data, index)=>(
                            <div key={index} className="col-md-3 mb-2 d-flex">
                                <div className="amenities-content animate-up h-100 w-100">
                                    <data.icon style={iconStyle}/>
                                    <br/><br/>
                                    <h3 className="subheading">{data.title}</h3>
                                    <p style={{color:'var(--offWhite)'}}>{data.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <br/>
                <div className="text-center">
                    <FlatButton title="Explore All Amenities" className="animate-up borderlessbtn" icon={<RightOutlined/>}/>
                </div>
            </div>
        </section>
    )
}