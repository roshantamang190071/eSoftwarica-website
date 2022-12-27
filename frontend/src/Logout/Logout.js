import { Component } from "react";
import { NavLink } from "react-router-dom";



class Logout extends Component {
     render() {
          return (
               <main role="main" class="logout container">
                    <div class="row">
                         <div class="col-md-8">
                              <div class="content-section1 mb-5">

                                   <h2>You have been logged out.</h2>
                                   <div class="border-top pt-3">
                                        <small class="text-muted">
                                             <NavLink to="/login">Log In Again</NavLink>
                                        </small>
                                   </div>
                              </div>
                         </div>
                    </div>
               </main>
          )
     }
}

export default Logout;