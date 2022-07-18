import React, { useState } from 'react'
import Axios from 'axios';

const Form = () => {

    
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    function createNew() {                                          // to insert the data into database

        const newEntry = { name, age, role, gender, email, mobile };

        console.log(newEntry);

        Axios.post('https://mern-crud-n.herokuapp.com/create', newEntry)
            .then(function (response) {
                console.log(response);
                window.location.reload();

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (

    <>

        <button type="button" class="btn button-1 round" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create New Entry</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* form content */}
            <div class="modal-body">
                <form className="row g-3">

                    <div class="col-md-6">
                        <label for="Name" className="form-label">Name</label>
                        <input type="text" class="form-control" aria-label="Name" 
                        onChange={(e) => (setName(e.target.value))} />
                    </div>

                    <div class="col-md-6">
                        <label for="Role" className="form-label">Role</label>
                        <input type="text" class="form-control" aria-label="Role" 
                        onChange={(e) => (setRole(e.target.value))} />
                    </div>            

                    <div className="col-md-6">
                        <label for="age" className="form-label">Age</label>
                        <input type="number" className="form-control" 
                        onChange={(e) => (setAge(e.target.value))} />
                    </div>
                   
                    <div className="col-md-6">
                        <label for="mobile" className="form-label">Mobile</label>
                        <input type="text" className="form-control" 
                        onChange={(e)=> (setMobile(e.target.value))} />
                    </div>
                                
                    <div className="col-md-6" onChange={(e) => setGender(e.target.value)} >
                        <label for="gender" className="form-label" >Gender</label>
                        <br></br>
                        <div class="form-check form-check-inline"  >
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="Male" />
                            <label class="form-check-label" for="male">Male</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="Female" />
                            <label class="form-check-label" for="female">Female</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <label for="email" className="form-label">Email</label>
                        <input type="Email" className="form-control" 
                        onChange={(e) => (setEmail(e.target.value))} />
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button className="btn button-1" onClick={createNew}>Submit</button>
                <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
        </div>
    </>

    )
}
export default Form;


