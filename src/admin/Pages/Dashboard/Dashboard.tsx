import { ApartmentListed } from "./dashComponent/ApartmentListed"

export const Dashboard = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <h2 className="subheading">Dashboard</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <ApartmentListed/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}