import { Component } from "react";
import axios from "axios";
import SideNavbar from "../SideNavbar/SideNavbar";
import { NavLink, Redirect } from "react-router-dom";
import Post from "../Post/Post";

class Home extends Component {

  render() {

    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />
    }

    if (localStorage.getItem("user_type") === "admin") {
      var button =
        <div class="form-group">
          <NavLink class="btn btn-outline-info btn-custom1" type="submit" to="/addann">Add Announcement</NavLink>
        </div>


    } else {
      var button =
        <div class="form-group">
          <NavLink class="btn btn-outline-info btn-custom1" type="submit" to="/addpost">Add Post</NavLink>
        </div>
    }

    return (
      <div>


        <main role="main" class="container">
          <div class="row">
            <div class="col-md-8">
              {button}
              <Post></Post>

            </div>
            <SideNavbar></SideNavbar>
          </div>
        </main>
      </div>

    )
  }
}

export default Home;
