import axios from "axios";
import { Component } from "react";

class CommentBox extends Component {

     state = {
          comment : "",
          config: {
               headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
             },
          
     }

     commentState=(e)=>{

         this.setState ({
              [e.target.name] : e.target.value
          })
     }

     addComment=(e)=>{

          const data = {
               comment : this.state.comment,
               post_id : localStorage.getItem("post_id")
          }
         
          axios.post("http://localhost:90/addcomment", data, this.state.config)
          .then(()=>{
               alert("comment added")
          })
          .catch((err)=>{
               alert("errot")
               console.log(err)
          })
          localStorage.removeItem("post_id")
          window.location.href= "/"
     }

     calncel=()=>{
          this.setState({
               comment : ""
          })
     }


     render() {

          
          return (
               <>
                    <div class="bg-light p-2">
                         <div class="d-flex flex-row align-items-start">
                              
                              <textarea class="form-control ml-1 shadow-none textarea" name="comment"onChange={this.commentState}></textarea>
                         </div>
                         <div class="mt-2 text-right">
                              <button class="btn btn-primary btn-sm shadow-none" type="button" onClick={this.addComment}>
                                   Post comment
                              </button>
                              <button
                                   class="btn btn-outline-primary btn-sm ml-1 shadow-none"
                                   type="button" onClick={this.cancel}
                              >
                                   Cancel
                              </button>
                         </div>
                    </div>
               </>
          );
     }
}

export default CommentBox;
