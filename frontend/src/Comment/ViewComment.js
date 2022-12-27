import axios from "axios";
import { Component } from "react";

class ViewComment extends Component {
     state = {
          comments: [],
          
     };

     componentDidMount() {
          axios
               .get("http://localhost:90/comments/" + localStorage.getItem("post_id"))
               .then((result) => {
                    console.log(result.data.data);
                    this.setState({
                         comments: result.data.data,
                    });
               });
     }
     render() {
          return (
               <>
                    
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
               </>
          );
     }
}

export default ViewComment;
