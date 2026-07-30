import { Apartments } from "./homeComponent/Apartments"
import { Choose } from "./homeComponent/Choose"
import { Cta } from "./homeComponent/Cta"
import { Hero } from "./homeComponent/Hero"
import { Offering } from "./homeComponent/Offering"
import { OverLapHeroCard } from "./homeComponent/OverLapHeroCard"
import { Welcome } from "./homeComponent/Welcome"

export const HomePage = ()=>{
    return(
        <>
        <Hero/>
        <OverLapHeroCard/>
        <Welcome/>
        <Apartments/>
        <Offering/>
        <Choose/>
        <Cta/>
        </>
    )
}