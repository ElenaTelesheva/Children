import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const url = "http://localhost:59575/api/";

const getGroups = async () => {

    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}group`, requestOptions)
    try {
        const data = await response.json();
        //alert(data);
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const add = async (newGroup) => {
    const body = JSON.stringify(newGroup)

    const requestOptions = {
        method: 'POST',
        body: body,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    try {
        const response = await fetch(`${url}group`, requestOptions)
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

const edit = async (updatedGroup) => {
    const body = JSON.stringify(updatedGroup)

    const requestOptions = {
        method: 'PUT',
        body: body,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    try {
        const response = await fetch(`${url}group`, requestOptions)
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
        const response = await fetch(`${url}group/${id}`, requestOptions)
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
};

const getPrograms = async () => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}education/program`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const getHeadTeachers = async (id) => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}account/user/teacher?eduProgramId=${id}`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

export const GroupsContext = createContext()

const GroupsContextProvider = (props) => {

    const [groups, setGroups] = useState([])

    const [programs, setPrograms] = useState([])
    const [headTeachers, setHeadTeachers] = useState([])

    const loadGroups = async () => {
        const resultGroups = await getGroups();
        setGroups(resultGroups.map(group => ({ ...group })))
    }

    const loadPrograms = async () => {
        const result = await getPrograms();

        const sortedPrograms = result.sort((a, b) => (a.name < b.name ? -1 : 1));
        setPrograms(sortedPrograms)
    }
    const loadHeadTeachers = async () => {
        const result = await getHeadTeachers();

        const sortedTeachers = result.sort((a, b) => (a.fio < b.fio ? -1 : 1));
        setHeadTeachers(sortedTeachers)
    }

    useEffect(() => {
        loadGroups();
        loadPrograms();
        //setGroups(JSON.parse(localStorage.getItem('groups')))
    }, [])

    // useEffect(() => {
    //     localStorage.setItem('groups', JSON.stringify(groups));
    // })

    const sortedGroups = groups;
    // if (childs != {}) {
    //     const sortedChildren = childs.sort((a, b) => (a.name < b.name ? -1 : 1));
    // }

    const addGroup = async (newGroup) => {

        const resultAdd = await add(newGroup);

        //загрузить заново
        const resultGroups = await getGroups();
        setGroups(resultGroups)

    }

    const updateGroup = async (updatedGroup) => {
        const resultEdit = await edit(updatedGroup);

        //загрузить заново
        const resultGroups = await getGroups();
        setGroups(resultGroups)
    }

    const deleteGroup = async(id) => {
        const resultDelete = await remove(id);

        //загрузить заново
        const resultGroups = await getGroups();
        setGroups(resultGroups)

        // setGroups(groups.filter(group => group.id !== id))
    }

    const getTeachersByProgram = async(id) => {
        const result = await getHeadTeachers(id);
        console.log(result)
        setHeadTeachers(result)
    }

    return (
        <GroupsContext.Provider value={{ sortedGroups, addGroup, deleteGroup, updateGroup, programs, headTeachers, getTeachersByProgram }}>
            {props.children}
        </GroupsContext.Provider>
    )
}

export default GroupsContextProvider;