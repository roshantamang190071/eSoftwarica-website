import { Component } from "react";
import axios from "axios";
import SideNavbar from "../SideNavbar/SideNavbar";
import { NavLink } from "react-router-dom";

class AddAnn extends Component {

     state = {
          tag: "",
          content: "",

          config: {
               headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          },

     }

     changeState = (e) => {

          this.setState({
               [e.target.name]: e.target.value
          })

     }

     addAnn = (e) => {
          const data = {
               tag: this.state.tag,
               content: this.state.content,
          }

          axios.post("http://localhost:90/addann", data, this.state.config)
               .then((res) => {
                    alert("Announcement added!")
                    window.location.href = "/announcement"
               })
               .catch((err) => {
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
                                        <legend class="border-bottom mb-4">Add Announcement</legend>

                                        <p>Tag</p>
                                        <input className="input--style-5" type="text" name="tag"
                                             value={this.state.tag} onChange={this.changeState}></input>

                                        <p>Content</p>
                                        <textarea className="input--style-5 textarea" type="text" name="content"
                                             value={this.state.content} onChange={this.changeState}></textarea>

                                        <div class="form-group">
                                             <button class="btn btn-outline-info btn-custom2" type="submit" onClick={this.addAnn}>Add</button>
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

export default AddAnn;