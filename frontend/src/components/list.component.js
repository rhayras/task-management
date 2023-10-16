import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';


export default function List() {

    const [tasks, setTasks] = useState([])
    
    useEffect(()=>{
        fetchTasks("") 
    },[])

    const fetchTasks = async (key) => {

        const formData = new FormData()

        formData.append('key', key)

        await axios.post(`http://localhost:8000/api/task/fetch/`,formData).then(({data})=>{
            setTasks(data)
        })
    }

    const deleteTask = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://localhost:8000/api/task/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchTasks("")
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <div className='float-start'>
                    <Form.Group controlId="Name">
                        <Form.Control type="text" placeholder="Search task here..." onChange={(event)=>{
                            fetchTasks(event.target.value)
                        }}/>
                    </Form.Group>
                </div>
                <div className='float-end'>
                    <Link className='btn btn-primary mb-2 float-end' to={"/task/create"}>
                        Add New Task
                    </Link>
                </div>
                <div className='clearfix'></div>
            </div>
            <div className="col-12">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped mb-0 text-center">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.length > 0 ? (
                                    tasks.map((row, key)=>(
                                        <tr key={key}>
                                            <td>{row.task}</td>
                                            <td>{moment(row.created_at).format('MMM D YYYY h:mm a') }</td>
                                            <td>
                                                <Link to={`/task/edit/${row.id}`} className='btn btn-success btn-sm me-2'>
                                                    Edit
                                                </Link>
                                                <Button variant="danger" onClick={()=>deleteTask(row.id)} className='btn-sm'>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : <tr><td colSpan={3}>No data found.</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
      </div>
    )
}