import { CtaForm } from "./CtaForm"

export const Cta = ()=>{
    return(
        <section className="text-center">
            <div className="container-fluid">
                <p className="homeBadge ">Get in touch</p>
                <h2 className="subheading " style={{color:'var(--teal)'}}>
                    Ready to Experience Mags Residence?
                </h2>
             
                <p className="sub-topic">Tell us about your stay, and we'll get back to you with availability, rates, and a personalized recommendation.</p>
                <CtaForm/>

            </div>
        </section>
    )
}