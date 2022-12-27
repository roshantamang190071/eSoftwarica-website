import { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {

     logout = (e) => {
          const confirmBox = window.confirm(
               "Do you really want to log out?"
          )
          if (confirmBox === true) {

               localStorage.removeItem("token")
               localStorage.clear()
               
               window.location.href = "/logout"
          }
     }

     render() {

          if (localStorage.getItem("token")) {
               var headerLogin =
                    <div>
                         <nav class="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
                              <div class="container">
                                   <a class="navbar-brand mr-4">eSoftwarica</a>
                                   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                   </button>
                                   <div class="collapse navbar-collapse" id="navbarToggle">
                                        <div class="navbar-nav mr-auto">
                                             <NavLink class="nav-item nav-link" to="/">Home</NavLink>
                                             <NavLink class="nav-item nav-link" to="/about">About</NavLink>
                                        </div>
                                        <div class="navbar-nav">
                                             <NavLink class="nav-item nav-link" to={"/profile/" + localStorage.getItem("id")}>Profile</NavLink>
                                             <a class="nav-item nav-link" onClick={this.logout}>Logout</a>
                                        </div>
                                   </div>
                              </div>
                         </nav>
                    </div>
          } else {

               var headerLogout =
                    <div>
                         <nav class="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
                              <div class="container">
                                   <a class="navbar-brand mr-4" to="/">eSoftwarica</a>
                                   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                   </button>
                                   <div class="collapse navbar-collapse" id="navbarToggle">
                                        <div class="navbar-nav mr-auto">

                                        </div>
                                        <div class="navbar-nav">
                                             <NavLink class="nav-item nav-link" to="/login">Login</NavLink>
                                             <NavLink class="nav-item nav-link" to="/register">Register</NavLink>
                                        </div>
                                   </div>
                              </div>
                         </nav>
                    </div>
          }

          return (

               <>
                    {headerLogin}
                    {headerLogout}
               </>

          )
     }
}

export default Header;