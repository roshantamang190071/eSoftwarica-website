
import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";

class Register extends Component {
     state = {
          college_id: "",
          full_name: "",
          batch: "",
          password: "",
          password1: ""
     }

     register = (e) => {
          this.setState({
               [e.target.name]: e.target.value
          })
     }

     registerUser = (e) => {
          e.preventDefault()
          if (this.state.college_id === "" ||
               this.state.full_name === "" ||
               this.state.password === "" || this.state.batch === "") {
               alert("Please fill all of the informations!")
          }
          else {
               if (this.state.password === this.state.password1) {
                    const data = {
                         college_id: this.state.college_id,
                         full_name: this.state.full_name,
                         password: this.state.password,
                         batch: this.state.batch
                    }

                    axios.post("http://localhost:90/register/user", data)
                    alert("Registration successful!")
                    window.location.href = "/login"
               } else {
                    alert("Password does not match!")
               }
          }
     }

     render() {
          return (
               <>
                    <main role="main" class="container">
                         <div class="row">
                              <div class="col-md-8">
                                   <div class="content-section">
                                        <form>
                                             <legend class="border-bottom mb-4">Join Today</legend>

                                             <p>College ID</p>
                                             <input className="input--style-5" type="text" name="college_id"
                                                  value={this.state.college_id} onChange={this.register} />

                                             <p>Full name</p>
                                             <input className="input--style-5" type="text" name="full_name"
                                                  value={this.state.full_name} onChange={this.register} />

                                             <div>Batch</div>
                                             <div class="value mt-2">
                                                  <div class="input-group">
                                                       <div class="rs-select2 js-select-simple select--no-search">
                                                            <select value={this.state.batch} onChange={this.register} name="batch">
                                                                 <option selected="selected">Choose option</option>
                                                                 <option value="Batch 1">Batch 1</option>
                                                                 <option value="Batch 2">Batch 2</option>
                                                                 <option value="Batch 3">Batch 3</option>
                                                            </select>
                                                       </div>
                                                  </div>
                                             </div>

                                             <p>Password</p>
                                             <input className="input--style-5" type="password" name="password"
                                                  value={this.state.password} onChange={this.register} />

                                             <p>Confirm Password</p>
                                             <input className="input--style-5" type="password" name="password1"
                                                  value={this.state.password1} onChange={this.register} />

                                             <div class="form-group">
                                                  <button class="btn btn-outline-info btn-custom2" type="submit" onClick={this.registerUser}>Sign Up</button>
                                             </div>
                                        </form>

                                        <div class="border-top pt-3">
                                             <small class="text-muted">
                                                  Already Have An Account? <NavLink class="ml-2" to="/login">Log In</NavLink>
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

export default Register;