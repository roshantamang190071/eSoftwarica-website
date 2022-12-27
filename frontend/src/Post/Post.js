
import { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Post extends Component {

  state = {
    myposts: [],
    myann: [],

    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };

  componentDidMount() {
    axios
      .get("http://localhost:90/post/showall", this.state.config)
      .then((result) => {
        this.setState({
          myposts: result.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:90/ann/showall", this.state.config)
      .then((result) => {
        // console.log(result.data.data);

        this.setState({
          myann: result.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

    if (localStorage.getItem("user_type") === "user") {
      var user =
        <>
          {this.state.myposts.reverse().map((post) => {
            return (
              <article class="media content-section1">

                <div class="media-body">
                  <div class="article-metadata">
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

                  <div>
                    <div class="bg-white">
                      <div class="like-comment d-flex flex-row fs-12">
                        <div class="like p-2 cursor">
                          <i class="like-button fa fa-thumbs-up" ></i>
                          <span class="ml-1">Like</span>
                        </div>
                        <div class="like p-2 cursor">
                          <i class="fa fa-commenting"></i>
                          <NavLink class="ml-1" to={"/post/" + post._id}>Comment</NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </>
    }

    if (localStorage.getItem("user_type") === "admin") {
      var admin =
        <>
          {this.state.myann.reverse().map((ann) => {
            return (
              <article class="media content-section1">

                <div class="media-body">
                  <div class="article-metadata">
                   
                    <a class="mr-2" to="">
                      Admin
                    </a>
                    <small class="text-muted">{ann.date}</small>
                  </div>
                  <h2>
                    <NavLink class="article-title" to={"/ann/" + ann._id}>
                      {ann.tag}
                    </NavLink>
                  </h2>
                  <p class="article-content">{ann.content}</p>
                </div>

                <div>
                  <NavLink
                    class="mr-2 fa fa-edit w3-large w3-text-green mr-3"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Update"
                    to={"updateann/" + ann._id}
                  ></NavLink>
                  <a
                    class="mr-2 fa fa-trash w3-large w3-text-red"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"

                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Do you really want to delete?"
                      )
                      if (confirmBox === true) {
                        this.deleteAnn(ann._id)
                      }
                    }}
                  >
                  </a>
                </div>
              </article>
            );
          })}
        </>
    }

    return (
      <>
      
        {user}
        {admin}

      </>
    );
  }
}

export default Post;
