
import axios from "axios"
import { Component } from "react"

class UpdatePost extends Component {

     state = {

          tag: "",
          content: "",
          id: this.props.match.params.id,

          config: {
               headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          },

     }

     componentDidMount() {
          axios.get("http://localhost:90/post/" + this.state.id, this.state.config)
               .then((result) => {
                    this.setState({
                         tag: result.data.tag,
                         content: result.data.content
                    })
               })
               .catch((err) => {
                    console.log(err)
               })
     }

     changeState1 = (e) => {
          this.setState({
               [e.target.name]: e.target.value
          })
     }


     updatePost = (e) => {
          e.preventDefault()
          const data = {
               tag: this.state.tag,
               content: this.state.content,
          }

          axios.put("http://localhost:90/updatepost/" + this.state.id, data, this.state.config)
               .then((res) => {
                    console.log("success")
                    alert("The post has been updated!")
                    window.location.href = "/"
               })
               .catch((err) => {
                    alert("Something went wrong!")
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
                                        <legend class="border-bottom mb-4">Update Post</legend>

                                        <p>Tag</p>
                                        <input className="input--style-5" name="tag"
                                             value={this.state.tag} onChange={this.changeState1}></input>

                                        <p>Content</p>
                                        <textarea className="input--style-5" name="content"
                                             value={this.state.content} onChange={this.changeState1}></textarea>

                                        <div class="form-group">
                                             <button class="btn btn-outline-info btn-custom2" type="submit" onClick={this.updatePost}>Update</button>
                                        </div>

                                   </form>
                              </div>
                         </div>
                    </div>
               </main>

          )
     }
}

export default UpdatePost;