import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() =>{
        getAllEmployees()
    },[])

    function getAllEmployees(){
        listEmployees().then((response) =>{
            setEmployees(response.data);
        }).catch(error =>{
            console.error(error);
        });
    }
   
    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        deleteEmployee(id).then((response) =>{
            getAllEmployees();
        }).catch(error =>{
            console.log(error);
        });
    }

  return (
    <div className='container'>
      <h2 className='text-center '>List of Employee</h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
      <table className='table table-striped table-bordered table-responsive table-hover'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>LAST NAME</th>
                <th>E-MAIL</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                employees.map(employye => 
                    <tr key={employye.id}>
                        <td>{employye.id}</td>
                        <td>{employye.firstName}</td>
                        <td>{employye.lastName}</td>
                        <td>{employye.email}</td>
                        <td>
                            <div className='d-flex justify-content-around'>
                                <button className='btn btn-info' onClick={() => updateEmployee(employye.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employye.id)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                    )
            }
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployeeComponent
