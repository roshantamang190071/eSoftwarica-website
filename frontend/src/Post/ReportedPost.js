
import { Component } from "react";
import axios from "axios";
import SideNavbar from "../SideNavbar/SideNavbar"

class ReportedPosts extends Component {
  state = {
    reported_posts: [],

    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };

  componentDidMount() {
    axios
      .get("http://localhost:90/reportedpost/showall", this.state.config)
      .then((result) => {
        this.setState({
          reported_posts: result.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("error happen");
      });
  }

  deletePost = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this post?"
    )
    if (confirmBox === true) {
      alert(id)
        axios
        .delete("http://localhost:90/deleteReportedpost/" + id, this.state.config)
        .then(() => { 
          alert("The post has been deleted.")
          window.location.href = "/reportedposts"
        })
        .catch((err) => {
          console.log(err)
        });
      
        axios
        .delete("http://localhost:90/removereported_post/" + id, this.state.config)
        .then(() => {
          alert("The post has been removed.")
          window.location.href = "/reportedposts"
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }

  removePost = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to remove this post from reported post?"
    )
    if (confirmBox === true) {
      axios
        .delete("http://localhost:90/removereported_post/" + id, this.state.config)
        .then(() => {
          alert("The post has been removed.")
          window.location.href = "/reportedposts"

        })
        .catch((err) => {
          console.log(err)
        });
    }
  }

  render() {
    return (
      <>
        <main role="main" class="container">
          <div class="row">
            <div class="col-md-8 rpcon">
              <legend class="border-bottom mb-4">Reported posts</legend>
              {this.state.reported_posts.reverse().map((post) => {
                return (
                  <article class="media content-section1">
                    <div class="media-body">
                      <div class="article-metadata">
                        <a class="mr-2" to={"/profile/" + post.user_id}>
                          {post.user_full_name}
                        </a>
                        <small class="text-muted">{post.date}</small>
                        <div>
                          <small class="text-muted mr-2">Reported by</small>
                          <a class="mr-2">
                            {post.reported_by_full_name}
                          </a>
                        </div>
                      </div>

                      <h2>
                        <a class="article-title">
                          {post.tag}
                        </a>
                      </h2>
                      <p class="article-content">{post.content}</p>
                    </div>

                    <div>

                      <a class="mr-2 fa fa-times-circle w3-large w3-text-red" data-toggle="tooltip" data-placement="top" title="Remove" onClick={() => this.removePost(post.reported_post_id)}></a>
                      <a class="mr-2 fa fa-trash w3-large w3-text-red" data-toggle="tooltip" data-placement="top" title="Delete" onClick={() => this.deletePost(post.reported_post_id)}> </a>

                    </div>
                  </article>
                );
              })}
            </div>

            <SideNavbar></SideNavbar>

          </div>
        </main>

      </>
    );
  }
}

export default ReportedPosts;
