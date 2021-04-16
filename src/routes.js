import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import List from './components/List';

const routes = [
    { path: '/', exact: true, name: "Add Employee", component: AddEmployee },
    { path: '/employee-list', exact: true, name: "Employee List", component: List },
    { path: '/employee-edit/:id', exact: true, name: "Employee Edit", component: EditEmployee }
];

export default routes;