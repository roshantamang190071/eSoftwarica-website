import { Component } from "react";

class Footer extends Component {
     render() {
          return (
               <>
                    <footer id="footer">

                         <div class="footer-top">
                              <div class="container">
                                   <div class="row">


                                        <div class="col-lg-3 col-md-6 footer-contact">
                                             <h4>Contact Us</h4>
                                             <p>Maitri Marg, <br />Dillibazar, Kathmandu<br /> Nepal <br /><br /> <strong>Phone:</strong> 01-4541577, 01-4525661<br /> <strong>Email:</strong> hello@softwarica.edu.np<br /> </p>
                                        </div>

                                   </div>
                                   <div class="body2 mb-3">
                                        <div class="social-buttons">
                                             <a href="https://www.facebook.com/softwarica.nepal/"><i class="fab fa-facebook"></i></a>
                                             <a href="https://softwarica.edu.np/"><i class="fa fa-globe"></i></a>
                                             <a href="https://www.instagram.com/softwarica.college/"><i class="fab fa-instagram"></i></a>
                                             <a href="https://www.youtube.com/channel/UCKu6Yq5plyEy4Gtfa8jf-uA"><i class="fab fa-youtube"></i></a>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div class="container">
                              <div class="copyright"> © 2021 Copyright <strong><span>Softwarica College of IT & E-commerce</span></strong>. All Rights Reserved </div>
                              <div class="credits"> Designed by <a href="#">Roshan Tamang</a> </div>
                         </div>
                    </footer>
               </>

          )
     }
}

export default Footer;