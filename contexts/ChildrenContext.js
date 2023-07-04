import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const url = "http://localhost:59575/api/";

const getChildren = async () => {

    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}child`, requestOptions)
    try {
        const data = await response.json();
        //alert(data);
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const add = async (newChild) => {
    const body = JSON.stringify(newChild)

    const requestOptions = {
        method: 'POST',
        body: body,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    try {
        const response = await fetch(`${url}child`, requestOptions)
        const data = await response.json();
        //alert(data);
        return data;
    }
    catch (e) {
        alert(e.message);
    }

    // update the state
    //setUser(response);
};

const edit = async (updatedChild) => {
    const body = JSON.stringify(updatedChild)

    const requestOptions = {
        method: 'PUT',
        body: body,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    try {
        const response = await fetch(`${url}child`, requestOptions)
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
};

// const remove = async (id) => {

//     const requestOptions = {
//         method: 'DELETE',

//         credentials: "include",
//         headers: {
//             "content-type": "application/json"
//         }
//     };

//     try {
//         const response = await fetch(`${url}group/${id}`, requestOptions)
//         const data = await response.json();
//         return data;
//     }
//     catch (e) {
//         alert(e.message);
//     }
// };

const getGroups = async () => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}group`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const getHealthGroups = async () => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}child/healthgroup`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const getRelationships = async () => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}child/relationship`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

export const ChildrenContext = createContext()

const ChildrenContextProvider = (props) => {

    const [children, setChildren] = useState([])

    const [groups, setGroups] = useState([])
    const [healthGroups, setHealthGroups] = useState([])
    const [relationships, setRelationships] = useState([])

    const loadChildren = async () => {
        const resultChildren = await getChildren();
        setChildren(resultChildren.map(child => ({ ...child })))
    }

    const loadGroups = async () => {
        const result = await getGroups();

        const sortedGroups = result.sort((a, b) => (a.name < b.name ? -1 : 1));
        setGroups(sortedGroups)
    }
    const loadHealthGroups = async () => {
        const result = await getHealthGroups();
        setHealthGroups(result)
    }
    const loadRelationships = async () => {
        const result = await getRelationships();
        setRelationships(result)
    }

    useEffect(() => {
        loadChildren();
        loadGroups();
        loadHealthGroups();
        loadRelationships();
        //setChildren(JSON.parse(localStorage.getItem('children')))
    }, [])

    // useEffect(() => {
    //     localStorage.setItem('children', JSON.stringify(children));
    // })

    const sortedChildren = children;
    // if (childs != {}) {
    //     const sortedChildren = childs.sort((a, b) => (a.name < b.name ? -1 : 1));
    // }

    const addChild = async (newChild) => {

        const resultAdd = await add(newChild);

        //загрузить заново
        const resultChildren = await getChildren();
        setChildren(resultChildren)

        // setChildren(children => [...children, {
        //     id: uuidv4(), surname, name, patronymic, email, gender,
        //     birthDate, avatar, group, address,
        //     healthGroup, healthNote, parents
        // }])

    }

    const deleteChild = (id) => {
        setChildren(children.filter(child => child.id !== id))
    }

    const updateChild = async (updatedChild) => {

        const resultEdit = await edit(updatedChild);

        //загрузить заново
        const resultChildren = await getChildren();
        setChildren(resultChildren)

        // setChildren(children.map((child) => child.id === id ? updatedEmployee : child))
    }

    return (
        <ChildrenContext.Provider value={{ sortedChildren, addChild, deleteChild, updateChild, groups, healthGroups, relationships }}>
            {props.children}
        </ChildrenContext.Provider>
    )
}

export default ChildrenContextProvider;