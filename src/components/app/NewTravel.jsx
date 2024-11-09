import Contact from "../contact"
import OurClients from "../our-clients"
import OurService from "../our-service"
import logoImg from "../../assets/logo.png"
import Travel from "../contact/Travel"
import "./app.scss"

function NewTravel() {

  return (
    <div className="app">
     <div className="container">
      <div className="logo">
        <img src={logoImg} alt="limsa" />
      </div>
      <div className="banner">
        <OurService/>
        <Travel/>
      </div>
      <OurClients/>
     </div>
    </div>
  )
}

export default NewTravel
