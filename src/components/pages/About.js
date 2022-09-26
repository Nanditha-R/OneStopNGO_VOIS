import React from "react";
import logo from './logo.jpeg';
import "./about.css";

function About() {
  return (
    <React.Fragment>

      <h1>ABOUT US</h1>
      <div>
       <img src={logo} alt="onestopngo" height="300" weight="400"/>
       </div>
       <div style={{"backgroundColor":"teal","width":"640px","borderRadius":"20px","padding":"20px"}}>
       <p style={{"color":"black","textAlign":"center"}}>
       One Stop NGO is a centralized platform that allows NGOs and it's representatives from colleges and societies to build a community that encourages students and the community, as a whole, to participate in multiple fields that can benefit the society. This platform hopes to build a community that looks forward to be of help to those in need, by organizing numerous events and drives. We hope to bridge the communication gap between the NGOs and people.
       </p>
       </div>
  
           
        
         
     
   
      


    </React.Fragment>
  );
}

export default About;