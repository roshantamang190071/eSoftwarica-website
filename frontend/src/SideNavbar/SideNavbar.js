import { Component } from "react";
import {NavLink}from "react-router-dom"


class SideNavbar extends Component{
     render(){
          
          if(localStorage.getItem("user_type")==="admin"){
               
               var admin = 
               <>
                    <NavLink class="list-group-item list-group-item-light" to="/reportedposts">
                              Reported Posts
                    </NavLink>
               </>
               
          }
          else{
               var user = 
               <>
                    <NavLink class="list-group-item list-group-item-light" to="/">
                                   Latest Posts
                    </NavLink>
               </>
          }
          return(
          <>
          
          <div class="col-md-4">
                    <div class="content-section">
                         <h3>Side Navbar</h3>
                         <p class="text-muted">
                              
                              <ul class="list-group">
                              {user}
                              <NavLink class="list-group-item list-group-item-light" to="/announcement">
                                   Announcements
                              </NavLink>
                              <NavLink class="list-group-item list-group-item-light" to="/FAQs">
                                   FAQs
                              </NavLink>
                              
                              {admin}
                              </ul>
                         </p>
                    </div>
               </div>
               </>
          )
     }
}

export default SideNavbar;