import { Component } from "react";

class LikeComment extends Component {
     render() {
          return (
               <>
                    <div class="bg-white">
                         <div class="like-comment d-flex flex-row fs-12">
                              <div class="like p-2 cursor">
                                   <i class="fa fa-thumbs-up"></i>
                                   <span class="ml-1">Like</span>
                              </div>
                              <div class="like p-2 cursor">
                                   <i class="fa fa-commenting"></i>
                                   <span class="ml-1">Comment</span>
                              </div>
                         </div>
                    </div>
               </>
          );
     }
}

export default LikeComment;