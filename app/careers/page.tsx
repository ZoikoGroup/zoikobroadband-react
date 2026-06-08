import CareerHero from './Components/CareerHero'
import WhyWorkHere from './Components/WhyWorkHere'
import CareerPathways from './Components/CareerPathways'
import EmployeeStories from './Components/EmployeeStories'
import CurrentOpenings from './Components/CurrentOpenings'
import Diversity from './Components/Diversity'
import ReadyToBuild from './Components/ReadyToBuild'
export const metadata = {
  title: "Careers at Zoiko Broadband | Join Our Team Now",
  description:
    "Discover career opportunities at Zoiko Broadband. Join a fast-growing telecom company, explore open roles, and take the next step in your career today.",
};
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
