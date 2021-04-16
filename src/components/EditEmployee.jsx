import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import validate from '../validation/validateEmployee'
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    FormGroup,
    Label,
    CardBody,
    Button
} from 'reactstrap'
import { AuthApi } from '../utils/api';
import { toast } from 'react-toastify';

export default function EditEmployee(props) {

    const { id } = useParams();

    const getEditEmployee = async () => {
        const getEmployeeResponse = await AuthApi.get(`/singleviewdata.php?id=${id}`);
        console.log(getEmployeeResponse);
        const { data } = getEmployeeResponse;
        if( data.status == 1 && data.data !== undefined){
            const employee = data.data[0];
            for (let [key] of Object.entries(formInputObj)){
                formInputObj[key] = employee[key];
            }
            setValues({ ...formInputObj });
        }
    }

    const formInputObj = {
        id: "",
        name: "",
        email: "",
        mobile: "",
        designation: ""
    }

    const [values, setValues] = useState(formInputObj);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: (!value.trim().length) ? value.trim() : value
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);
    }

    const submit = async () => {
        const editResponse = await AuthApi.put(`/update.php/${id}`, values);
        console.log(editResponse);
        const { status, data } = editResponse;
        if( status === 200){
            toast.success(`Plan update successfully`);
            props.history.push("/employee-list");
        }    
    }

    
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit){
            submit();
        }
        getEditEmployee()
    }, [errors]);
    

    return (
        <Container className="themed-container container-margin" fluid="md">
            <Row>
                <Col md="10" className="headingStyle">Edit Employee</Col>
                <Col md="2">
                    <Link to="/employee-list">
                        <Button color="success" className="employeeListbtn">Employee List</Button>
                    </Link>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit} noValidate>
                        <FormGroup>
                            <Label for="exampleName">Name</Label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                id="exampleName"
                                placeholder="Enter your name"
                            />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                id="exampleEmail"
                                placeholder="Enter your email"
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleMobile">Mobile</Label>
                            <input
                                className="form-control"
                                type="text"
                                name="mobile"
                                value={values.mobile}
                                onChange={handleChange}
                                id="exampleMobile"
                                placeholder="Enter your mobile no"
                            />
                            {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDesignation">Designation</Label>
                            <input
                                className="form-control"
                                type="text"
                                name="designation"
                                value={values.designation}
                                onChange={handleChange}
                                id="exampleDesignation"
                                placeholder="Enter your designation"
                            />
                            {errors.designation && <small className="text-danger">{errors.designation}</small>}
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary">Update</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}
