import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
    Container,
    Row,
    Col,
    Button,
    Table
} from 'reactstrap'
import { AuthApi } from '../utils/api';
import { toast } from 'react-toastify';

export default function List(props) {
    
    const [ employess, setEmployess] = useState([]);
    let history = useHistory();
        
    const getEmployees = async () => {
        const listResponce = await AuthApi.get(`/view.php`);
        const { data } = listResponce;
        if (data.status === 1 && data.employess !== undefined){
            setEmployess(data.employess);
        }
    }

    const deleteEmployee = async (id) => {
        const deleteResponse = await AuthApi.post(`/delete.php`, id);
        const { status, data } = deleteResponse;
        if( status === 200){
            toast.success(`Employee delted successfully`);
            getEmployees();
        }
        console.log(deleteResponse);
    }

    useEffect(() => {
        getEmployees()
    }, []);

    return (
        <Container className="themed-container container-margin" fluid="md">
            <Row>
                <Col md="9" className="headingStyle">Employee List</Col>
                <Col md="3">
                    <Link to="/">
                        <Button color="success" className="employeeListbtn float-right">Add Employee</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Designation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employess && employess.map((employee, i) => (
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.designation}</td>
                                <td style={{ width:'11rem'}}>
                                        <Link to={`employee-edit/${employee.id}`}>
                                        <Button outline color="success">Edit</Button>
                                    </Link>&nbsp;&nbsp;
                                    <Button onClick={() => deleteEmployee(employee.id)} value={employee.id} outline color="danger">Delete</Button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}
