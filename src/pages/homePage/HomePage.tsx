import { Apartments } from "./homeComponent/Apartments"
import { Hero } from "./homeComponent/Hero"
import { OverLapHeroCard } from "./homeComponent/OverLapHeroCard"
import { Welcome } from "./homeComponent/Welcome"

export const HomePage = ()=>{
    return(
        <>
        <Hero/>
        <OverLapHeroCard/>
        <Welcome/>
        <Apartments/>
        </>
    )
}