
import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import SideNavbar from "../SideNavbar/SideNavbar";

class AddPost extends Component {

     state = {
          tag: "",
          content: "",
          full_name: localStorage.getItem("full_name"),
          user_id: localStorage.getItem("id"),

          config: {
               headers: { 'authorization': `Bearer ${localStorage.getItem("token")}` },
          },

     }

     changeState = (e) => {

          this.setState({
               [e.target.name]: e.target.value
          })

     }

     addPost = (e) => {

          e.preventDefault()

          const data = {
               tag: this.state.tag,
               content: this.state.content,
               user_id: this.state.user_id,
               full_name: this.state.full_name
          }

          axios.post("http://localhost:90/addpost", data, this.state.config)
               .then((res) => {
                    alert("Post added!")
                    window.location.href = "/"

               })
               .catch((err) => {
                    alert("dajsd")
                    console.log(err)
               })

     }



     render() {


          return (
               <main role="main" class="container">
                    <div class="row">
                         <div class="col-md-8">
                              <div class="content-section">
                                   <form enctype="multipart/form-data">
                                        <legend class="border-bottom mb-4 mt-4">Add Post</legend>

                                        <p>Tag</p>
                                        <input className="input--style-5" type="text" name="tag"
                                             value={this.state.tag} onChange={this.changeState}></input>

                                        <p>Content</p>
                                        <textarea className="input--style-5" type="text" name="content"
                                             value={this.state.content} onChange={this.changeState}></textarea>

                                        <div class="form-group">
                                             <button class="btn btn-outline-info btn-custom2" type="submit" onClick={this.addPost}>Post</button>
                                             <NavLink class="btn btn-outline-danger btn-custom3 ml-4" type="submit" to="/">Cancel</NavLink>
                                        </div>

                                   </form>

                              </div>

                         </div>
                         <SideNavbar></SideNavbar>
                    </div>
               </main>
          )
     }
}

export default AddPost;