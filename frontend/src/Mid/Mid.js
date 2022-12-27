import { Component } from "react";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import UpdateProfile from "../Profile/UpdateProfile";
import AddPost from "../Post/AddPost";
import About from "../About/About";
import UpdatePost from "../Post/UpdatePost";
import ViewPost from "../Post/ViewPost";
import Announcement from "../Announcement/Announcement";
import AddAnn from "../Announcement/AddAnn";
import UpdateAnn from "../Announcement/UpdateAnn";
import FAQs from "../FAQs/FAQs";
import Logout from "../Logout/Logout";
import ReportedPosts from "../Post/ReportedPost";

class Mid extends Component {
  render() {
    return (
      <>
      
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/about" component={About}></Route>

        <Route path="/profile/:id" component={Profile} />
        <Route path="/updateprofile/:id" component={UpdateProfile} />
        <Route path="/addpost" component={AddPost}></Route>

        <Route path="/post/:id" component={ViewPost } />
        <Route path="/updatepost/:id" component={UpdatePost}></Route>

        <Route path="/announcement" component = {Announcement}></Route>
        <Route path="/addann" component = { AddAnn }></Route>
        <Route path="/updateann/:id" component= {UpdateAnn}></Route>

        <Route path="/reportedposts" component = {ReportedPosts}></Route>

        <Route path="/FAQs"  component = {FAQs}></Route>
        <Route path="/logout" component = {Logout}></Route>
        
      </>
    );
  }
}
export default Mid;
