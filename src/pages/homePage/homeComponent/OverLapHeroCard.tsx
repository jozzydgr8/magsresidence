import {SafetyOutlined, HomeOutlined, WifiOutlined} from '@ant-design/icons'
export const OverLapHeroCard =()=>{
    return(
        <section className="card-row" >
            <div className="container">
                
                <div className='row'>
                <div className="col-md-4 d-flex">
                    <div className="hero-cards animate-up" >
                        <div className="hero-card-icon"><HomeOutlined /></div>
                        <h3 className="sub-heading">
                            Fully Furnished
                        </h3>
                        <p>
                            Modern interiors with premium furnishings, fully equipped kitchens, and hotel-quality linens.
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex">
                    <div className="hero-cards animate-up" >
                        <div className="hero-card-icon"><WifiOutlined /></div>
                        <h3 className="sub-heading">
                            Work & Stay Ready
                        </h3>
                        <p>
                            High-speed WiFi, dedicated workspaces, and smart TVs in every apartment.
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex">
                    <div className="hero-cards animate-up" >
                        <div className="hero-card-icon"><SafetyOutlined /></div>
                        <h3 className="sub-heading">
                            Secure & Private
                        </h3>
                        <p>
                            24/7 security, private entrances, and the comfort of your own space.
                        </p>
                    </div>
                </div>

            </div>
            
            </div>
        </section>
    )
}