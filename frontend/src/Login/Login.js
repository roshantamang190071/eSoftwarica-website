import { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";

class Login extends Component {

     state = {
          college_id: "",
          password: ""
     }

     login = (e) => {
          this.setState({
               [e.target.name]: e.target.value
          })
     }

     loginUser = (e) => {
          e.preventDefault()
          const data = {
               college_id: this.state.college_id,
               password: this.state.password
          }

          if(this.state.college_id==="" || this.state.password===""){
               alert("Please fill all of the informations!")
          }else{
          if (this.state.college_id === "admin") {
               axios.post("http://localhost:90/login/admin", data)
                    .then((res) => {

                         localStorage.setItem("token", res.data.token)
                         localStorage.setItem("id", res.data.data._id)
                         localStorage.setItem("full_name", res.data.data.full_name)
                         localStorage.setItem("user_type", res.data.data.user_type)


                         alert("Logged in successfully")
                         window.location.href = "/"
                    })

                    .catch((err) => {
                         console.log(err)
                         alert("Invalid credentails")
                    })

          } else {

               axios.post("http://localhost:90/login/user", data)
                    .then((res) => {

                         localStorage.setItem("token", res.data.token)
                         localStorage.setItem("id", res.data.data._id)
                         localStorage.setItem("full_name", res.data.data.full_name)
                         localStorage.setItem("user_type", res.data.data.user_type)

                         alert("Logged in successfully")
                         window.location.href = "/"
                    })
                    .catch((err) => {
                         console.log(err)
                         alert("Invalid credentails")
                    })

          }
     }
     }

     render() {
          if (localStorage.getItem("token")) {
               return <Redirect to="/"></Redirect>
          }
          return (
               <>
                    <main role="main" class="container">
                         <div class="row">
                              <div class="col-md-8">
                                   <div class="content-section">
                                        <form>
                                             <legend class="border-bottom mb-4">Log In</legend>

                                             <p>College ID</p>
                                             <input className="input--style-5" type="text" name="college_id"
                                                  value={this.state.college_id} onChange={this.login} />

                                             <p>Password</p>
                                             <input className="input--style-5" type="password" name="password"
                                                  value={this.state.password} onChange={this.login} />

                                             <div class="form-group">
                                                  <button class="btn btn-outline-info btn-custom2" type="submit" onClick={this.loginUser}>Login</button>
                                             </div>

                                        </form>
                                        <div class="border-top pt-3">
                                             <small class="text-muted">
                                                  Need An Account? <NavLink class="ml-2" to="/register">Register Now</NavLink>
                                             </small>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </main>
               </>
          )
     }
}

export default Login;