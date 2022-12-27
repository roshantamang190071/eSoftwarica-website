import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CommentBox from "../Comment/CommentBox";
import LikeComment from "../Comment/LikeComment";
import SideNavbar from "../SideNavbar/SideNavbar";
import ViewComment from "../Comment/ViewComment";

class ViewPost extends Component {

  state = {
    tag: "",
    content: "",
    user_id: "",
    user_full_name: "",
    date: "",
    id: this.props.match.params.id,
    comments: [],
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },

  };

  componentDidMount() {
    axios
      .get("http://localhost:90/post/" + this.state.id, this.state.config)
      .then((result) => {
        //localStorage.setItem("post_id", this.state.id)
        this.setState({
          tag: result.data.tag,
          content: result.data.content,
          user_id: result.data.user_id,
          user_full_name: result.data.user_full_name,
          date: result.data.date,
        });
      })
      .catch((err) => {
        alert("Something went wrong")
        console.log(err);
      });

      axios
      .get("http://localhost:90/comments/" + this.state.id)
      .then((result) => {
           console.log(result.data.data);
           this.setState({
                comments: result.data.data,
           });
      });
  }

  deletePost = (id) => {
    axios
      .delete("http://localhost:90/deletepost/" + id, this.state.config)
      .then(() => {
        alert("The post has been deleted!")
        window.location.href = "/"
      })
      .catch((err) => {
        alert("Something went wrong!")
        console.log(err)
      });

    axios
      .delete("http://localhost:90/deletecomment/" + id, this.state.config)
      .then(() => {
        console.log("comments deleted!")
      })
      .catch((err) => {
        
        console.log(err)
      });
  };

  report = (e) => {

    const confirmBox = window.confirm(
      "Do you really want to report this post?"
    )
    if (confirmBox === true) {
      const data =
      {
        reported_post_id: this.state.id,
        tag: this.state.tag,
        content: this.state.content,
        user_full_name: this.state.user_full_name,
        date: this.state.date
      }
      axios.post("http://localhost:90/addreported_post", data, this.state.config)
        .then((res) => {
          alert("The post has been reported!")
        })
        .catch((err) => {
          alert("Something went wrong!")
          console.log(err)
        })
    }
  }


  render() {

    if (this.state.user_id === localStorage.getItem("id")) {
      var option =
        <div>
          <NavLink class="mr-3 fa fa-edit w3-large w3-text-green" data-toggle="tooltip" data-placement="top" title="Update" to={"/updatepost/" + this.state.id}></NavLink>
          <a class="mr-2 fa fa-trash w3-large w3-text-red" data-toggle="tooltip" data-placement="top" title="Delete" onClick={() => {
            const confirmBox = window.confirm(
              "Do you really want to delete this post?"
            )
            if (confirmBox === true) {
              this.deletePost(this.state.id)
            }
          }}> </a>
        </div>

    } else {
      var option1 =
        <div>
          <a class="mr-2 fa fa-flag w3-large w3-text-red" data-toggle="tooltip" data-placement="top" title="Report" onClick={this.report}> </a>
        </div>
    }
    return (
      <main role="main" class="container">
        <div class="row">
          <div class="col-md-8">
            <article class="media content-section">
              <div class="media-body">
                <div class="article-metadata">

                  <NavLink class="mr-2" to={"/profile/" + this.state.user_id}>
                    {this.state.user_full_name}
                  </NavLink>
                  <small class="text-muted">{this.state.date}</small>
                </div>
                <h2>
                  <a class="article-title">{this.state.tag}</a>
                </h2>
                <p class="article-content">{this.state.content}</p>

                <LikeComment></LikeComment>
                <CommentBox></CommentBox>
                {this.state.comments.reverse().map((comments) => {
                         return (
                              <div class="all-comments bg-light p-2">
                              <div class="d-flex flex-row p-3">
                                   {" "}
                                   
                                   <div class="w-100">
                                        <div class="d-flex justify-content-between align-items-center">
                                             <div class="d-flex flex-row align-items-center">
                                                  {" "}
                                                  <h3 class="mr-2 mt-0">{comments.user_full_name}</h3>{" "}
                                                   <small mt-0>{comments.date}</small>
                                             </div>{" "}
                                            
                                        </div>
                                        <p class="text-justify comment-text mt-1 mb-3">
                                             {comments.comment}
                                        </p>

                         
                                   </div>
                              </div>
                              </div>
                         );
                    })}

              </div>

              {option}
              {option1}

            </article>
          </div>
          <SideNavbar></SideNavbar>
        </div>
      </main>
    );
  }
}

export default ViewPost;
