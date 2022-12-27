import { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import LikeComment from "../Comment/LikeComment";

class MyPosts extends Component {

  state = {

    myposts: [],
    id: localStorage.getItem("id"),
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };

  componentDidMount() {
    axios
      .get("http://localhost:90/mypost/" + this.state.id, this.state.config)
      .then((result) => {
        this.setState({
          myposts: result.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deletePost = (id) => {
    axios
      .delete("http://localhost:90/deletepost/" + id, this.state.config)
      .then(() => {
        alert("deleted");
        window.location.href = "/"
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (

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
              </div>
            </article>
          );
        })}
      </>
      
    );
  }
}

export default MyPosts;
