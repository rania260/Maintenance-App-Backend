
import './home.css'
import Footer from '../Footer/index';
import Pricing from "../Pricing/index";
import Team from "../Team/index";
import About from "../About1/index";
import Brand from "../Brand/index";
import Contact from "../Contact/index";
import Hero from "../../Hero/index";
import Offers from "../Offers/index";

function Home() {

  return (
    <>   
     
        <Hero />
        <Offers/>
        <Team/> 
        <Brand/>    
        <About/>
        <Pricing/>
        <Contact/>
        <Footer/>
     
        </>
  )
}

export default Home
