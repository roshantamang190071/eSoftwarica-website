import { Component } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";

class FAQs extends Component {
  render() {
    return (
      <main role="main" class="container">
        <div class="row">
          <div class="Faq col-md-8">
          <legend class="border-bottom mb-4">Frequently Asked Questions</legend>
            <article class="media content-section1">
              <div class="media-body">
                <h2>
                  <p class="article-title">What is eSoftwarica?</p>
                </h2>
                <p class="article-content">eSoftwarica is an website for the students of Softwarica College of IT and E-Commerce.</p>
              </div>
            </article>

            <article class="media content-section1">
              <div class="media-body">
                <h2>
                  <p class="article-title">How can I change my profile picture?</p>
                </h2>
                <p class="article-content">First you should go to your profile. Then click the "Update profile" button and select the image you want to upload and then press update button. Your profile picture will be updated.</p>
              </div>
            </article>


          </div> <SideNavbar></SideNavbar>
        </div>
      
      </main>
    );
  }
}

export default FAQs;
