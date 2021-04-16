export default function validateEmployee(values) {
    let errors = {};
    if(!values.name){
        errors.name = "Name is required";
    }
    if(!values.email) {
        errors.email = "Email is required";
    }
    if(!values.mobile) {
        errors.mobile = "Mobile is required";
    }
    if(!values.designation) {
        errors.designation = "Designation is required";
    }
    return errors;
}