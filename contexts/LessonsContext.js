import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const url = "http://localhost:59575/api/";

const getLessons = async () => {

    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}schedule/lesson`, requestOptions)
    try {
        if (response.status != 200) {
            alert(response.message)
            return;
        }
        const data = await response.json();
        //alert(data);
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const add = async (newLesson) => {
    const body = JSON.stringify(newLesson)

    const requestOptions = {
        method: 'POST',
        body: body,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    try {
        const response = await fetch(`${url}schedule/lesson`, requestOptions)
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

const edit = async (updatedLesson) => {
    const body = JSON.stringify(updatedLesson)

    const requestOptions = {
        method: 'PUT',
        body: body,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(`${url}schedule/lesson`, requestOptions)
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

const remove = async (id) => {

    const requestOptions = {
        method: 'DELETE',
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    try {
        const response = await fetch(`${url}schedule/lesson/${id}`, requestOptions)
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

const getTeachers = async () => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}account/user/teacher`, requestOptions)
    // const response = await fetch(`${url}account/user/teacher?eduProgramId=${id}`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const getPeriodicity = async () => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}schedule/periodicity`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

export const LessonsContext = createContext()

const LessonsContextProvider = (props) => {

    const [lessons, setLessons] = useState([])

    const [groups, setGroups] = useState([])
    const [teachers, setTeachers] = useState([])

    const [errorMessage, setErrorMessage] = useState("")

    const [periodicity, setPeriodicity] = useState([])

    const loadLessons = async () => {
        const resultLessons = await getLessons();
        setLessons(resultLessons.map(lesson => ({ ...lesson, color: '' })))
    }

    const loadGroups = async () => {
        const result = await getGroups();

        const sortedGroups = result.sort((a, b) => (a.name < b.name ? -1 : 1));
        setGroups(sortedGroups)
    }

    const loadTeachers = async () => {
        const result = await getTeachers();

        const sortedTeachers = result.sort((a, b) => (a.fio < b.fio ? -1 : 1));
        setTeachers(sortedTeachers)
    }

    const loadPeriodicity = async () => {
        const result = await getPeriodicity();
        setPeriodicity(result)
    }

    useEffect(() => {
        loadLessons();
        loadGroups();
        loadTeachers();
        loadPeriodicity();
    }, [])

    // useEffect(() => {
    //     localStorage.setItem('lessons', JSON.stringify(lessons));
    // })

    // if (childs != {}) {
    //     const sortedChildren = childs.sort((a, b) => (a.name < b.name ? -1 : 1));
    // }

    const addLesson = async (newLesson) => {
        const resultAdd = await add(newLesson);

        if (resultAdd.message != null) {
            setErrorMessage(resultAdd.message);
        } else {
            //загрузить заново
            const resultLessons = await getLessons();
            setLessons(resultLessons.map(lesson => ({ ...lesson, color: '' })))
            setErrorMessage("");
        }

    }

    const updateLesson = async (updatedLesson) => {
        const resultEdit = await edit(updatedLesson);

        if (resultEdit.message != null) {
            setErrorMessage(resultEdit.message);
        } else {
            //загрузить заново
            const resultLessons = await getLessons();
            setLessons(resultLessons.map(lesson => ({ ...lesson, color: '' })));
            setErrorMessage("");
        }

        //setLessons(lessons.map((group) => group.id === id ? updatedLesson : group))
    }

    const deleteLesson = async (id) => {
        const resultDelete = await remove(id);

        //загрузить заново
        const resultLessons = await getLessons();
        setLessons(resultLessons.map(lesson => ({ ...lesson, color: '' })))
    }



    return (
        <LessonsContext.Provider value={{ lessons, addLesson, deleteLesson, updateLesson, groups, teachers, periodicity, errorMessage }}>
            {props.children}
        </LessonsContext.Provider>
    )
}

export default LessonsContextProvider;