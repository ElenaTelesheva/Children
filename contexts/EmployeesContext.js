import { createContext, useEffect, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const url = "http://localhost:59575/api/";

const getUsers = async () => {

    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}account/user`, requestOptions)
    try {
        const data = await response.json();
        //alert(data);
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const add = async (newEmployee) => {
    const body = JSON.stringify(newEmployee)

    const requestOptions = {
        method: 'POST',
        body: body,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    try {
        const response = await fetch(`${url}account/user`, requestOptions)
        const data = await response.json();
        return data;

    }
    catch (e) {
        alert(e.message);
    }

    // update the state
    //setUser(response);
};

const edit = async (updatedEmployee) => {
    const body = JSON.stringify(updatedEmployee)

    const requestOptions = {
        method: 'PUT',
        body: body,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    try {
        const response = await fetch(`${url}account/user`, requestOptions)
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
};

const remove = async (id) => {

    const requestOptions = {
        method: 'DELETE',

        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    try {
        const response = await fetch(`${url}account/user/${id}`, requestOptions)
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
};

const getRoles = async () => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}account/role`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}
const getCategories = async () => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}account/category`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}
const getDirections = async () => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}account/educationaldirection`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}
const filter = async (params) => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}account/user?` + params, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

export const EmployeesContext = createContext()

const EmployeesContextProvider = (props) => {

    const [employees, setEmployees] = useState([])
    const [roles, setRoles] = useState([])
    const [categories, setCategories] = useState([])
    const [directions, setDirections] = useState([])

    const [errorMessage, setErrorMessage] = useState("")

    const loadEmployees = async () => {
        const resultEmployees = await getUsers();
        setEmployees(resultEmployees.map(user => ({ ...user })))
    }

    const loadRoles = async () => {
        const result = await getRoles();
        setRoles(result)
    }
    const loadCategories = async () => {
        const result = await getCategories();
        setCategories(result)
    }
    const loadDirections = async () => {
        const result = await getDirections();
        setDirections(result)
    }

    useEffect(() => {
        loadEmployees();
        loadRoles();
        loadCategories();
        loadDirections();
    }, [])

    // useEffect(() => {
    //     localStorage.setItem('employees', JSON.stringify(employees));
    // })

    const sortedEmployees = employees;
    // if (employees != {}) {
    //     const sortedEmployees = employees.sort((a, b) => (a.name < b.name ? -1 : 1));
    // }

    const addEmployee = async (newEmployee) => {

        const resultAdd = await add(newEmployee);

        if (resultAdd.message != null) {
            setErrorMessage(resultAdd.message);
        } else {
            //загрузить заново
            const resultUsers = await getUsers();
            setEmployees(resultUsers);
            setErrorMessage("");
        }

        // setEmployees(employees => [...employees, {
        //     id: uuidv4(), surname, name, patronymic, email, password,
        //     login, gender, birthDate, isActive,
        //     avatar, role, employee, teacher
        // }])

    }

    const updateEmployee = async (updatedEmployee) => {

        const resultEdit = await edit(updatedEmployee);

        if (resultEdit.message != null) {
            setErrorMessage(resultEdit.message);
        } else {
            //загрузить заново
            const resultUsers = await getUsers();
            setEmployees(resultUsers);
            setErrorMessage("");
        }

        //setEmployees(employees.map((employee) => employee.id === id ? updatedEmployee : employee))
    }

    const deleteEmployee = async (id) => {
        const resultDelete = await remove(id);

        //загрузить заново
        const resultUsers = await getUsers();
        setEmployees(resultUsers)

        // setEmployees(employees.filter(employee => employee.id !== id))
    }

    const filterEmployee = async (params) => {
        const resultFilter = await filter(params);

        setEmployees(resultFilter)
    }

    const sortEmployee = async (params) => {
        const resultSort = await filter(params);

        setEmployees(resultSort)
    }

    return (
        <EmployeesContext.Provider value={{ sortedEmployees, addEmployee, deleteEmployee, updateEmployee, roles, categories, directions, errorMessage, filterEmployee, sortEmployee }}>
            {props.children}
        </EmployeesContext.Provider>
    )
}

export default EmployeesContextProvider;