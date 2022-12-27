import { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SideNavbar from "../SideNavbar/SideNavbar";

class Announcement extends Component {
  state = {
    announcement: [],

    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };

  componentDidMount() {

    axios
      .get("http://localhost:90/ann/showall", this.state.config)
      .then((result) => {

        this.setState({
          announcement: result.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log("error happen");
      });
  }

  add = (e) => {
    window.location.href("/addann");
  };

  deleteAnn = (id) => {
    axios
      .delete("http://localhost:90/deleteann/" + id, this.state.config)
      .then(() => {
        alert("The announcement has been deleted!");
        window.location.href = "/"
      })
      .catch((err) => {
        alert("Someething went wrong!");
        console.log(err);
      });
  };

  render() {
    if (localStorage.getItem("user_type") === "admin") {
      var admin =
        <>
          <div class="col-md-8">
            <div class="form-group">
              <NavLink class="btn btn-outline-info btn-custom1" type="submit" to="/addann">Add Announcement</NavLink>
            </div>
            {this.state.announcement.reverse().map((announcement) => {
              return (
                <article class="media content-section1">
                  <div class="media-body">
                    <div class="article-metadata">
                    <a class="mr-2" to="">
                      Admin
                    </a>
                    <small class="text-muted">{announcement.date}</small>
                    </div>
                    <h2>
                      <p
                        class="article-title"
                      >
                        {announcement.tag}
                      </p>
                    </h2>
                    <p class="article-content">{announcement.content}</p>
                  </div>

                  <div>

                    <NavLink class="mr-2 fa fa-edit w3-large w3-text-green" data-toggle="tooltip" data-placement="top" title="Update" to={"updateann/" + announcement._id}></NavLink>
                    <a class="mr-2 fa fa-trash w3-large w3-text-red" data-toggle="tooltip" data-placement="top" title="Delete" onClick={() => {
                      const confirmBox = window.confirm(
                        "Do you really want to delete this announcement?"
                      )
                      if (confirmBox === true) {
                        this.deleteAnn(announcement._id)
                      }
                    }}></a>



                    {admin}

                  </div>
                </article>
              );
            })}
          </div>

        </>
    } else {
      var user =

        <>

          <div class="col-md-8 rpcon">
            <legend class="border-bottom mb-4">Announcements</legend>
            {this.state.announcement.reverse().map((announcement) => {
              return (
                <article class="media content-section1">
                  <div class="media-body">
                    <div class="article-metadata">
                      <a class="mr-2">Admin</a>
                      <small class="text-muted">{announcement.date}</small>
                    </div>
                    <h2>
                      <p
                        class="article-title"
                      >
                        {announcement.tag}
                      </p>
                    </h2>
                    <p class="article-content">{announcement.content}</p>
                  </div>

                  <div>

                  </div>
                </article>
              );
            })}
          </div>
        </>
    }

    return (
      <>
        <main role="main" class="container">
          <div class="row">



            {admin}
            {user}


            <SideNavbar></SideNavbar>
          </div>
        </main>
      </>
    );
  }
}

export default Announcement;
