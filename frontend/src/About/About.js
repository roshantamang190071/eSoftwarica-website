import { Component } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";

class About extends Component {
  render() {
    return (
      <main role="main" class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="content-section">
              <legend class="border-bottom mb-4">About us</legend>
              <p>
                eSoftwarica is an website for the students of Softwarica College
                of IT and E-Commerce. They can register and then login to user
                the website and post their creative thoughts or any other things
                in this website.
              </p>
            </div>

          <div class="content-section1">
              <legend class="border-bottom mb-4">Contact us</legend>

            <div class="body1 mb-3">
              <div class="social-buttons">
                    <a href="https://www.facebook.com/softwarica.nepal/"><i class="fab fa-facebook"></i></a>
                    <a href="https://softwarica.edu.np/"><i class="fa fa-globe"></i></a>
                    <a href="https://www.instagram.com/softwarica.college/"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com/channel/UCKu6Yq5plyEy4Gtfa8jf-uA"><i class="fab fa-youtube"></i></a>
              </div>
            </div>   
          </div>
          
          </div>
          <SideNavbar></SideNavbar>
        </div>
      </main>
    );
  }
}

export default About;
