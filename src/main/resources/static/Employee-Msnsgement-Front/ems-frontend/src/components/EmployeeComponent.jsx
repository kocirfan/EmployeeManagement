import React, {useEffect, useState} from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
    const navigator = useNavigate();
    const {id} = useParams();

    function pageTitle(){
        if(id){
            return  <h2 className='text-center'>Update Employee </h2>
        }else{
            return  <h2 className='text-center'>Add Employee </h2>
        }
    }
   
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({
        firstName : '',
        lastName : '',
        email : ''
    })

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error =>{
                navigator('*')
                console.log(error);
            })
        }
    }, [id])



    

    function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){
            const employee = {firstName, lastName, email}
            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/emplooyes');
                }).catch(eror =>{
                    console.log(eror);
                });
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/emplooyes');
                }).catch(eror =>{
                    console.log(eror);
                });
            }
            
        }
    }

    function validateForm(){
        let valid = true;
        const errorCopy = {... errors}

        if(firstName.trim()){
            errorCopy.firstName = '';
        }else{
            errorCopy.firstName = 'First Name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorCopy.lastName = '';
        }else{
            errorCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if(email.trim()){
            errorCopy.email = '';
        }else{
            errorCopy.email = 'Email  is required';
            valid = false;
        }

        setErrors(errorCopy);
        return valid;
    }

    return (
    <div className='container'>
        <div className='row'>
            <div className='card mt-5'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input type="text" placeholder='Enter First Name' name='firstName' value={firstName} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}  onChange={(e) => setFirstName(e.target.value)} />
                            { errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input type="text" placeholder='Enter Last Name' name='lastName' value={lastName} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}  onChange={(e) => setLastName(e.target.value)} />
                            { errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input type="text" placeholder='Enter Email' name='email' value={email} className={`form-control ${errors.email ? 'is-invalid' : ''}`}  onChange={(e) => setEmail(e.target.value)} />
                            { errors.email && <div className='invalid-feedback'> {errors.email} </div> }
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent
