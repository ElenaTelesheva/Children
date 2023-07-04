import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const url = "http://localhost:59575/api/";

const getEvents = async () => {

    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}event`, requestOptions)
    try {
        const data = await response.json();
        //alert(data);
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

const getRooms = async () => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}Property/room?isStudy=true`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

export const EventsContext = createContext()

const EventsContextProvider = (props) => {

    const [events, setEvents] = useState([])

    const [directions, setDirections] = useState([])
    const [teachers, setTeachers] = useState([])
    const [rooms, setRooms] = useState([])

    const loadEvents = async () => {
        const resultEvents = await getEvents();
        setEvents(resultEvents.map(event => ({ ...event })))
    }

    const LoadDirections = async () => {
        const result = await getDirections();

        const sortedDirections = result.sort((a, b) => (a.name < b.name ? -1 : 1));
        setDirections(sortedDirections)
    }
    const loadTeachers = async () => {
        const result = await getTeachers();

        const sortedTeachers = result.sort((a, b) => (a.fio < b.fio ? -1 : 1));
        setTeachers(sortedTeachers)
    }
    const loadRooms = async () => {
        const result = await getRooms();
        setRooms(result)
    }

    useEffect(() => {
        loadEvents();
        LoadDirections();
        loadTeachers();
        loadRooms();

    }, [])

    const sortedEvents = events;

    return (
        <EventsContext.Provider value={{ sortedEvents, directions, teachers, rooms }}>
            {props.children}
        </EventsContext.Provider>
    )
}

export default EventsContextProvider;