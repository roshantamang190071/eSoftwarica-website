import { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import MyPosts from "../Post/MyPosts";
import LikeComment from "../Comment/LikeComment";
import SideNavbar from "../SideNavbar/SideNavbar";

class Profile extends Component {
  state = {
    full_name: "",
    college_id: "",
    id: this.props.match.params.id,
    batch: "",
    image: null,
    myposts: [],
  };

  componentDidMount() {
    if (localStorage.getItem("user_type") === "admin") {
      axios
        .get("http://localhost:90/admin/" + this.props.match.params.id)
        .then((result) => {
          console.log(result.data);
          this.setState({
            college_id: result.data.college_id,
            full_name: result.data.full_name,
            image: result.data.profile_pic,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      axios
        .get("http://localhost:90/user/" + this.props.match.params.id)
        .then((result) => {
          this.setState({
            college_id: result.data.college_id,
            full_name: result.data.full_name,
            batch: result.data.batch,
            image: result.data.profile_pic,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    axios
      .get("http://localhost:90/mypost/" + this.props.match.params.id)
      .then((result) => {
        this.setState({
          myposts: result.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        
      });
  }

  render() {
    if(localStorage.getItem("user_type")==="admin"){
      var profile2 = (
        <>
          <div class="content-section">
            <div class="media">
              <img
                class="rounded-circle account-img"
                alt=""
                src={"http://localhost:90/" + this.state.image}
              />
              <div class="media-body">
                <h2 class="account-heading">{this.state.full_name}</h2>
                <p class="text-secondary">{this.state.college_id}</p>
                <p class="text-secondary">{this.state.batch}</p>
                <div>
                  <NavLink
                    class="btn btn-outline-info btn-custom"
                    to={"/updateprofile/" + this.state.id}
                  >
                    Update Profile
                  </NavLink>
                </div>
                <br />      
              </div>
            </div>
          </div>
        </>
      )} else{

    if (localStorage.getItem("id") === this.state.id) {
      var profile = (
        <>
          <div class="content-section">
            <div class="media">
              <img
                class="rounded-circle account-img"
                alt=""
                src={"http://localhost:90/" + this.state.image}
              />
              <div class="media-body">
                <h2 class="account-heading">{this.state.full_name}</h2>
                <p class="text-secondary">{this.state.college_id}</p>
                <p class="text-secondary">{this.state.batch}</p>
                <div>
                  <NavLink
                    class="btn btn-outline-info btn-custom"
                    to={"/updateprofile/" + this.state.id}
                  >
                    Update Profile
                  </NavLink>
                </div>
                <br />
                <NavLink class="btn btn-outline-info btn-custom" to="/addpost">
                  Add Post
                </NavLink>
              </div>
            </div>
          </div>

          <MyPosts></MyPosts>
        </>
      );
    } else {
      var profile1 = (
        <>
          <div class="content-section">
            <div class="media">
              <img
                class="rounded-circle account-img"
                alt=""
                src={"http://localhost:90/" + this.state.image}
              />
              <div class="media-body">
                <h2 class="account-heading">{this.state.full_name}</h2>
                <p class="text-secondary">{this.state.college_id}</p>
                <p class="text-secondary">Batch</p>
                <div>
                  <NavLink class="btn btn-outline-info btn-custom" to={""}>
                    Add Friend
                  </NavLink>
                </div>
                <br />
                <NavLink class="btn btn-outline-info btn-custom" to="">
                  Message
                </NavLink>
              </div>
            </div>
          </div>

          {this.state.myposts.reverse().map((post) => {
            return (
              <article class="media content-section1">
                <div class="media-body">
                  <div class="article-metadata">
                    <img
                      class="post-img rounded-circle"
                      src={"http://localhost:90/" + this.state.image}
                    />
                    <NavLink class="mr-2" to={"/profile/" + post.user_id}>
                      {post.user_full_name}
                    </NavLink>
                    <small class="text-muted">{post.date}</small>
                  </div>
                  <h2>
                    <NavLink class="article-title" to={"/post/" + post._id}>
                      {post.tag}
                    </NavLink>
                  </h2>
                  <p class="article-content">{post.content}</p>

                  <LikeComment></LikeComment>
                </div>
              </article>
            );
          })}

        </>
      );
    }
  }
    return (
      <>
        <main role="main" class="container">
          <div class="row">
            <div class="col-md-8">
              {profile}
              {profile1}
              {profile2}
            </div>
            <SideNavbar></SideNavbar>
          </div>
        </main>
      </>
    );
  }
}

export default Profile;
