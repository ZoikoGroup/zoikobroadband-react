import CareerHero from './Components/CareerHero'
import WhyWorkHere from './Components/WhyWorkHere'
import CareerPathways from './Components/CareerPathways'
import EmployeeStories from './Components/EmployeeStories'
import CurrentOpenings from './Components/CurrentOpenings'
import Diversity from './Components/Diversity'
import ReadyToBuild from './Components/ReadyToBuild'

export default function page() {
  return (
    <div className="dark:bg-gray-950">
    <CareerHero/>
    <WhyWorkHere/>
    <CareerPathways/>
    <EmployeeStories/>
    <CurrentOpenings/>
    <Diversity/>
    <ReadyToBuild/>
    </div>
  )
}
