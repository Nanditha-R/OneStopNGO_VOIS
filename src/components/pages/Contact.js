import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faGithub,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";


const FORM_ENDPOINT = "https://public.herotofu.com/v1/84789930-39c5-11ed-8ff6-d1ee553f3964"; 

const Contact= () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <h2 style={{"color":"black"}}>Thank you!</h2>
        <div style={{"color":"black"}}>We'll be in touch soon.</div>
      </>
    );
  }

  return (
    <>
    <h1>CONTACT US</h1>
    <form 
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      target="_blank"
    >
      <div>
        <input style={{"width":"100%","padding": "12px 20px","margin": "8px 0","color":"black"}} type="text" placeholder="Your name" name="name" required />
      </div>
      <div>
        <input style={{"width":"100%","padding": "12px 20px","margin": "8px 0","color":"black"}} type="email" placeholder="Email" name="email" required />
      </div>
      <div>
        <textarea style={{"width":"100%","padding": "12px 20px","margin": "8px 0","color":"black"}} placeholder="Your message" name="message" required />
      </div>
      <div>
        <button style={{"width":"100%","padding": "12px 20px","margin": "8px 0", "backgroundColor":"#0C2340","color":"white"}} type="submit"> Send a message </button>
      </div>
    </form>
    <footer >
    
            <div style={{"padding":"5px","flex":"1","display":"inline-block","boxSizing":"10px","color":"black"}}> 
            
                
                <a  class = "fab fa-react fa-2x"
                    text="Github:"
                    href="https://github.com/"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>

            <div style={{"padding":"5px","flex":"1","display":"inline-block","boxSizing":"10px","color":"black"}}> 
                <a  class = "fab fa-react fa-2x"
                    href="https://www.instagram.com/"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
            </div>
            <div style={{"padding":"5px","flex":"1","display":"inline-block","boxSizing":"10px","color":"black"}}> 

                <a  class = "fab fa-react fa-2x"
                    href="https://www.youtube.com/"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
            </div>
      
        </footer>
    </>
  );
};

export default Contact;