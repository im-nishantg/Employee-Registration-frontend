import React, { useState } from 'react';
import { useEffect } from 'react';
import Axios from "axios";

let updateId;

const Table = () => {

  let count = 0;
  let url = 'https://mern-crud-n.herokuapp.com';
  const [getdata, setdata] = useState([]);

  function loadData() {

    Axios.get(url + '/get')
      .then((response) => {
        setdata(response.data)
        console.log(getdata)
      })
  }

  useEffect(() => { loadData() }, [])      // to fetch the data on page visit

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  function handleEdit(employee) {

    updateId = employee._id;
    setName(employee.name);
    setRole(employee.role);
    setAge(employee.age);
    setMobile(employee.mobile);
    setGender(employee.gender);
    setEmail(employee.email);
    const Gender = employee.gender;
    if(Gender === "Male")
      document.getElementById('male').setAttribute("checked", true);
    else
      document.getElementById('female').setAttribute("checked", true);

  }

  function deleteEntry(id){

    const confirm = window.confirm("Are you sure you want to delete this?");

    if (confirm === true) {
      Axios.delete( url +'/delete/' + id).then((response) => {
        loadData();
      })
    }
  }

  function updateData() {
    const newEntry = { name, age, role, gender, email, mobile };
    const id = updateId;
    console.log(updateId);
    Axios.patch(url + '/update/' + id, newEntry).then((response) => {
      window.location.reload();
    })
  }

  return (
    <>
      <div className='container '>
        <h1 className='text-center mt-5'> Employee Details</h1>
        <div className='table-responsive'>
          <table class="table mt-5">
            <thead>
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Role</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {getdata.map(function (employee) {
                count++;
                return (
                  <tr key={employee._id}>
                    <th scope="row">{count}</th>
                    <td> {employee.name}</td>
                    <td> {employee.age}</td>
                    <td> {employee.role}</td>
                    <td> {employee.gender}</td>
                    <td> {employee.email}</td>
                    <td> {employee.mobile}</td>

                    <td> <button><i className="bi bi-pen " data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { handleEdit(employee) }}></i></button></td>
                    <td> <button><i className="bi bi-trash" onClick={() => { deleteEntry(employee._id) }}></i></button></td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>

      <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Existing Entry</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* form content */}
            <div class="modal-body">
              <form className="row g-3">

                <div class="col-md-6">
                  <label for="Name" className="form-label">Name</label>
                  <input type="text" class="form-control" aria-label="Name" id="name" value={name}
                    onChange={(e) => (setName(e.target.value))} />
                </div>

                <div class="col-md-6">
                  <label for="Role" className="form-label">Role</label>
                  <input type="text" class="form-control" aria-label="Role" id='role' value={role}
                    onChange={(e) => (setRole(e.target.value))} />
                </div>

                <div className="col-md-6">
                  <label for="age" className="form-label">Age</label>
                  <input type="number" className="form-control" id="age" value={age}
                    onChange={(e) => (setAge(e.target.value))} />
                </div>

                <div className="col-md-6">
                  <label for="mobile" className="form-label">Mobile</label>
                  <input type="text" className="form-control" id="mobile" value={mobile}
                    onChange={(e) => (setMobile(e.target.value))} />
                </div>

                <div className="col-md-6" onChange={(e) => setGender(e.target.value)} value={gender} >
                  <label for="gender" className="form-label" >Gender</label>
                  <br></br>
                  <div class="form-check form-check-inline"  >
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="male" value="Male" />
                    <label class="form-check-label" for="male">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="female" value="Female" />
                    <label class="form-check-label" for="female">Female</label>
                  </div>
                </div>

                <div className="col-12">
                  <label for="email" className="form-label">Email</label>
                  <input type="Email" className="form-control" id="email" value={email}
                    onChange={(e) => (setEmail(e.target.value))} />
                </div>
              </form>
            </div>

            <div class="modal-footer">
              <button className="btn button-1" onClick={updateData}>Update</button>
              <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Table