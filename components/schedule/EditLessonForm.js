import { Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton } from "react-bootstrap"
import { LessonsContext } from '../../contexts/LessonsContext';
import { useContext, useState, useEffect } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';


const url = "http://localhost:59575/api/";

const getTeachersFromGroup = async (id) => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    // const response = await fetch(`${url}account/user/teacher?eduProgramId=1`, requestOptions)
    const response = await fetch(`${url}account/user/teacher?groupId=${id}`, requestOptions)
    try {
        const data = await response.json();
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const getSubjects = async (id) => {
    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}subject?teacherId=${id}`, requestOptions)
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

const EditLessonForm = ({ theLesson }) => {

    const { updateLesson } = useContext(LessonsContext);

    const { groups } = useContext(LessonsContext);
    const { periodicity } = useContext(LessonsContext);

    const { errorMessage } = useContext(LessonsContext);

    const [teacherGroups, setTeacherGroups] = useState([])
    const [subjects, setSubjects] = useState([])
    const [rooms, setRooms] = useState([])

    const getTeachersByGroup = async (id) => {
        const result = await getTeachersFromGroup(id);
        setTeacherGroups(result)
    }
    const getSubjectsByTeacher = async (id) => {
        const result = await getSubjects(id);
        setSubjects(result)
    }
    const getStydyRooms = async () => {
        const result = await getRooms();
        setRooms(result)
    }

    const [groupName, setGroupName] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [roomName, setRoomName] = useState("");

    const [updatedLesson, setUpdatedLesson] = useState({
        id: theLesson.id, subjectId: theLesson.subjectId, groupId: theLesson.groupId,
        roomId: theLesson.roomId, teacherId: theLesson.teacherId,
        startTime: theLesson.startTime, endTime: theLesson.endTime,
        periodicityId: theLesson.periodicityId, weekDay: theLesson.weekDay
    })

    const [extendedInf, setExtendedInf] = useState({
        subject: theLesson.subject, group: theLesson.group, room: theLesson.room,
        teacher: theLesson.teacher, periodicity: theLesson.periodicity
    })

    const weekDayName = ["Понедельник", "Вторник", "Среда", "Четверг",
        "Пятница", "Суббота"];

    const { subjectId, groupId, roomId, teacherId, periodicityId, weekDay,
        startTime, endTime } = updatedLesson;

    const { subject, group, room, teacher } = extendedInf;

    const format = 'HH:mm';

    function disabledHours() {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23];
    }

    const onInputChangeStartTime = (e) => {

        let hours = e._d.getHours();
        let minutes = e._d.getMinutes();

        let time;
        if (hours < 10 && minutes < 10) time = `0${hours}:0${minutes}`;
        else if (hours < 10) time = `0${hours}:${minutes}`;
        else if (minutes < 10) time = `${hours}:0${minutes}`;
        else time = `${hours}:${minutes}`;

        setUpdatedLesson({ ...updatedLesson, startTime: time })
    }

    const onInputChangeEndTime = (e) => {

        let hours = e._d.getHours();
        let minutes = e._d.getMinutes();

        let time;
        if (hours < 10 && minutes < 10) time = `0${hours}:0${minutes}`;
        else if (hours < 10) time = `0${hours}:${minutes}`;
        else if (minutes < 10) time = `${hours}:0${minutes}`;
        else time = `${hours}:${minutes}`;
        
        setUpdatedLesson({ ...updatedLesson, endTime: time })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(theLesson)
        updateLesson(updatedLesson);
    }

    const onDropdownButtonChangeSubject = (newValue) => {
        setUpdatedLesson({ ...updatedLesson, subjectId: newValue })
    }
    const onDropdownButtonChangeRoom = (newValue) => {
        setUpdatedLesson({ ...updatedLesson, roomId: newValue })
    }
    const onDropdownButtonChangeTeacher = (newValue) => {
        setUpdatedLesson({ ...updatedLesson, teacherId: newValue })
    }
    const onDropdownButtonChangeWeekDay = (newValue) => {
        setUpdatedLesson({ ...updatedLesson, weekDay: newValue })
    }

    const onToggleButtonGroupChangePeriodicity = (newValue) => {
        setUpdatedLesson({ ...updatedLesson, periodicityId: newValue })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <DropdownButton menuVariant="dark" id="dropdown-basic-button" title={subject.name} onSelect={onDropdownButtonChangeSubject}  >
                    <Dropdown.Item eventKey={1} href="#/action-1">Математика</Dropdown.Item>
                    <Dropdown.Item eventKey={2} href="#/action-2">Физика</Dropdown.Item>
                    <Dropdown.Item eventKey={3} href="#/action-3">Черчение</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title={room.name} onSelect={onDropdownButtonChangeRoom}  >
                    <Dropdown.Item eventKey={1} href="#/action-1">к. 245</Dropdown.Item>
                    <Dropdown.Item eventKey={2} href="#/action-2">к. 9</Dropdown.Item>
                    <Dropdown.Item eventKey={3} href="#/action-3">Малый зал</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title={teacher.name} onSelect={onDropdownButtonChangeTeacher}  >
                    <Dropdown.Item eventKey={1} href="#/action-1">Иванов И.С.</Dropdown.Item>
                    <Dropdown.Item eventKey={2} href="#/action-2">Петров В.С.</Dropdown.Item>
                    <Dropdown.Item eventKey={3} href="#/action-3">Василькова Д.Ю.</Dropdown.Item>
                </DropdownButton>

                Периодичность
                <ToggleButtonGroup type="radio" name="categoryId" defaultValue={periodicityId} className="mb-2" onChange={onToggleButtonGroupChangePeriodicity}>
                    <ToggleButton id="tbg-check-1" value={1}>
                        Четные
                    </ToggleButton>
                    <ToggleButton id="tbg-check-2" value={2}>
                        Нечетные
                    </ToggleButton>
                    <ToggleButton id="tbg-check-3" value={3}>
                        Каждую неделю
                    </ToggleButton>
                </ToggleButtonGroup>

                <DropdownButton id="dropdown-basic-button" title={weekDayName[weekDay]} onSelect={onDropdownButtonChangeWeekDay} valu >
                    <Dropdown.Item eventKey={1} href="#/action-1">Понедельник</Dropdown.Item>
                    <Dropdown.Item eventKey={2} href="#/action-2">Вторник</Dropdown.Item>
                    <Dropdown.Item eventKey={3} href="#/action-3">Среда</Dropdown.Item>
                </DropdownButton>
            </Form.Group>

            ОТ &nbsp;<TimePicker defaultValue={moment(startTime, format)} inputReadOnly={false} disabledHours={disabledHours} hideDisabledOptions={true} minuteStep={5} placeholder="Время начала" showSecond={false} onChange={(e) => onInputChangeStartTime(e)} />
            &nbsp; ДО <TimePicker defaultValue={moment(endTime, format)} inputReadOnly={false} disabledHours={disabledHours} hideDisabledOptions={true} minuteStep={5} placeholder="Время окончания" showSecond={false} onChange={(e) => onInputChangeEndTime(e)} />

            <br /><br />
            <Button variant="success" type="submit" block>
                Редактировать занятие
            </Button>
        </Form>

    )
}

export default EditLessonForm;
