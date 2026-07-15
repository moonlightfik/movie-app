import "./layout.css";


const Footer = () => {

  return (

    <footer className="footer">

      <h3>
        CineStream
      </h3>


      <div className="footer-links">

        Privacy Policy

        &nbsp;&nbsp;

        Terms of Service

        &nbsp;&nbsp;

        Contact Support

        &nbsp;&nbsp;

        Press Kit

      </div>


      <p>
        © {new Date().getFullYear()} CineStream. All rights reserved.
      </p>


    </footer>

  );

};


export default Footer;