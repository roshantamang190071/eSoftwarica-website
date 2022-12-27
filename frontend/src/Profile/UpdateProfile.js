
import axios from "axios";
import { Component } from "react";

class UpdateProfile extends Component {

     state = {
          college_id: "",
          full_name: "",
          id: this.props.match.params.id,
          batch: "",
          image: null
     }

     componentDidMount() {
          console.log(this.state.id)
          axios.get("http://localhost:90/user/" + this.state.id)
               .then((result) => {
                    this.setState({
                         college_id: result.data.college_id,
                         full_name: result.data.full_name,
                         batch: result.data.batch,
                    })

               })
               .catch((err) => {
                    console.log(err)
               })
     

          axios.get("http://localhost:90/admin/" + this.state.id)
               .then((result) => {
                    
                    this.setState({
                         college_id: result.data.college_id,
                         full_name: result.data.full_name,
                         batch: result.data.batch,
                    })

               })
               .catch((err) => {
                    console.log(err)
               })
     }

     changeFileHandler = (e) => {
          this.setState({
               image: e.target.files[0]
          })
     }

     updateOnChange = (e) => {
          this.setState({
               [e.target.name]: e.target.value
          })
     }

     update = (e) => {
          e.preventDefault()
          if (localStorage.getItem("user_type") === "user") {
               const data = new FormData();
               data.append("college_id", this.state.college_id)
               data.append("full_name", this.state.full_name)
               data.append("batch", this.state.batch)
               data.append("image", this.state.image)

               axios.put("http://localhost:90/update/user/" + this.state.id, data)
                    .then((res) => {
                         alert("Your Profile has been updated successfully!")
                    })
                    .catch((err) => {
                         alert("Something went wrong!!")
                         console.log(err)
                    })
          }

          else {
               const data = new FormData();

               data.append("college_id", this.state.college_id)
               data.append("full_name", this.state.full_name)
               data.append("image", this.state.image)

               axios.put("http://localhost:90/update/admin/" + this.state.id, data)
                    .then((res) => {
                         alert("Your Profile has been updated successfully!")
                    })
                    .catch((err) => {
                         alert("Something went wrong!")
                         console.log(err)
                    })
          }
     }

     render() {
          if (localStorage.getItem("user_type") === "user") {

               var batch =
                    <>
                         <div>Batch</div>
                         <div class="value mt-2">
                              <div class="input-group">
                                   <div class="rs-select2 js-select-simple select--no-search ">
                                        <select name="batch" value={this.state.batch} onChange={this.updateOnChange}>
                                             <option disabled="disabled" selected="selected">Choose option</option>
                                             <option value="Batch 1">Batch 1</option>
                                             <option value="Batch 2">Batch 2</option>
                                             <option value="Batch 3">Batch 3</option>
                                        </select>
                                   </div>
                              </div>
                         </div>
                    </>
          }
          return (

               <main role="main" class="container">
                    <div class="row">
                         <div class="col-md-8">
                              <div class="content-section">
                                   <form enctype="multipart/form-data">
                                        <legend class="border-bottom mb-4">Profile Info</legend>

                                        <p>College ID</p>
                                        <input className="input--style-5" name="college_id" value={this.state.college_id} onChange={this.updateOnChange}></input>

                                        <p>Full name</p>
                                        <input className="input--style-5" name="full_name" value={this.state.full_name} onChange={this.updateOnChange}></input>

                                        {batch}

                                        <div>
                                             <br />
                                             <label for="img">Select image:</label>
                                             <br />
                                             <input type="file" id="image" name="image" accept="image/jpg, image/gif, image/jpeg, image/png" onChange={this.changeFileHandler} />
                                             <br />

                                        </div>

                                        <div class="form-group">
                                             <button id="update-button" class="btn btn-outline-info btn-custom2" type="submit" onClick={this.update}>Update</button>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </div>
               </main>

          )
     }
}

export default UpdateProfile;