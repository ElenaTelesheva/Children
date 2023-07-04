import { Alert, Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton } from "react-bootstrap"
import { LessonsContext } from '../../contexts/LessonsContext';
import { useContext, useState, useEffect } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import styles from '../../styles/schedule.module.css'
import FeedbackIcon from '@mui/icons-material/Feedback';
import { ContentPasteSearchOutlined } from "@mui/icons-material";

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

const AddLessonForm = ({ }) => {

    const { addLesson } = useContext(LessonsContext);

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

    const [newLesson, setNewLesson] = useState({
        subjectId: 0, groupId: 0, roomId: 0, teacherId: 0,
        startTime: "13:00", endTime: "13:45", periodicityId: 0,
        weekDay: 0
    })

    const { subjectId, groupId, roomId, teacherId, periodicityId, weekDay,
        startTime, endTime } = newLesson;

    const format = 'HH:mm';

    const weekDayName = ["Понедельник", "Вторник", "Среда", "Четверг",
        "Пятница", "Суббота"];

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

        setNewLesson({ ...newLesson, startTime: time })
    }

    const onInputChangeEndTime = (e) => {

        let hours = e._d.getHours();
        let minutes = e._d.getMinutes();

        let time;
        if (hours < 10 && minutes < 10) time = `0${hours}:0${minutes}`;
        else if (hours < 10) time = `0${hours}:${minutes}`;
        else if (minutes < 10) time = `${hours}:0${minutes}`;
        else time = `${hours}:${minutes}`;

        setNewLesson({ ...newLesson, endTime: time })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (groupId == 0) {
            setShowAlertGroup(true);
            return;
        }
        if (teacherId == 0) {
            setShowAlertTeacher(true);
            return;
        }
        if (subjectId == 0) {
            setShowAlertSubject(true);
            return;
        }
        if (roomId == 0) {
            setShowAlertRoom(true);
            return;
        }

        addLesson(newLesson);
    }

    const onDropdownButtonChangeGroup = (newValue) => {
        setNewLesson({ ...newLesson, groupId: Number(newValue) })
        getTeachersByGroup(newValue);
        setShowAlertGroup(false);

        setShowTeachers(true)
        setShowSubjects(false)
        setShowRooms(false)

        // setTeacherGroups([]);
        setSubjects([]);
        setRooms([]);
        setTeacherName("");
        setSubjectName("");
        setRoomName("");
        groups.map(group => {
            if (group.id == newValue) {
                setGroupName(group.name);
            }
        })
    }
    const onDropdownButtonChangeTeacher = (newValue) => {
        setNewLesson({ ...newLesson, teacherId: Number(newValue) })
        getSubjectsByTeacher(newValue);
        teacherGroups.map(teacher => {
            if (teacher.id == newValue) {
                setTeacherName(teacher.fio);
            }
        })
        setShowAlertTeacher(false);
        setShowSubjects(true)
        setShowRooms(false)
        setSubjectName("");
        setRoomName("");
    }
    const onDropdownButtonChangeSubject = (newValue) => {
        setNewLesson({ ...newLesson, subjectId: Number(newValue) })
        getStydyRooms();
        subjects.map(subject => {
            if (subject.id == newValue) {
                setSubjectName(subject.name);
            }
        })
        setShowAlertSubject(false);
        setShowRooms(true);
        setRoomName("");
    }
    const onDropdownButtonChangeRoom = (newValue) => {
        setNewLesson({ ...newLesson, roomId: Number(newValue) })
        rooms.map(room => {
            if (room.id == newValue) {
                setRoomName(room.number);
            }
        })
        setShowAlertRoom(false);
    }
    const onDropdownButtonChangeWeekDay = (newValue) => {
        setNewLesson({ ...newLesson, weekDay: Number(newValue) + 1 })
    }

    const onToggleButtonGroupChangePeriodicity = (newValue) => {
        setNewLesson({ ...newLesson, periodicityId: newValue })
    }

    const defaultStartTime = "13:00"
    const defaultEndTime = "13:45"

    const [showAlertGroup, setShowAlertGroup] = useState(false);
    const [showAlertTeacher, setShowAlertTeacher] = useState(false);
    const [showAlertSubject, setShowAlertSubject] = useState(false);
    const [showAlertRoom, setShowAlertRoom] = useState(false);

    const [showTeachers, setShowTeachers] = useState(false);
    const [showSubjects, setShowSubjects] = useState(false);
    const [showRooms, setShowRooms] = useState(false);


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                Группа
                <DropdownButton id="dropdown-basic-button" title={groupName == "" ? "Выберите группу" : groupName} onSelect={onDropdownButtonChangeGroup}  >
                    {
                        groups.map(group => (
                            <Dropdown.Item eventKey={group.id} href={`#/action-${group.id}`}>{group.name}</Dropdown.Item>
                        ))
                    }
                </DropdownButton>

                {showTeachers &&
                    <>
                        {teacherGroups.length != 0 ?
                            <>
                                <label>Педагог</label>
                                <DropdownButton id="dropdown-basic-button" title={teacherName == "" ? "Выберите педагога" : teacherName} onSelect={onDropdownButtonChangeTeacher}  >
                                    {
                                        teacherGroups.map(teacher => (
                                            <Dropdown.Item eventKey={teacher.id} href={`#/action-${teacher.id}`}>{teacher.fio}</Dropdown.Item>
                                        ))
                                    }
                                </DropdownButton>
                            </>
                            : <>
                                <br />
                                <Alert variant="secondary">
                                    <p>
                                        <FeedbackIcon className={styles.orange_feedback} /> Не найдено ни одного подходящего педагога!
                                        Выберите, пожалуйста, другие параметры занятия.
                                    </p>
                                </Alert>
                            </>
                        }
                    </>
                }

                {showSubjects &&
                    <>
                        {subjects.length != 0 ?
                            <>
                                <label>Предмет</label>
                                <DropdownButton id="dropdown-basic-button" title={subjectName == "" ? "Выберите предмет" : subjectName} onSelect={onDropdownButtonChangeSubject}  >
                                    {
                                        subjects.map(subject => (
                                            <Dropdown.Item eventKey={subject.id} href={`#/action-${subject.id}`}>{subject.name}</Dropdown.Item>
                                        ))
                                    }
                                </DropdownButton>
                            </>
                            :
                            <>
                                <br />
                                <Alert variant="secondary">
                                    <p>
                                        <FeedbackIcon className={styles.orange_feedback} /> Не найдено ни одного подходящего предмета!
                                        Выберите, пожалуйста, другие параметры занятия.
                                    </p>
                                </Alert>
                            </>
                        }
                    </>
                }

                {showRooms &&
                    <>
                        {rooms.length != 0 ?
                            <>
                                <label>Кабинет</label>
                                <DropdownButton id="dropdown-basic-button" title={roomName == "" ? "Выберите кабинет" : roomName} onSelect={onDropdownButtonChangeRoom}  >
                                    {
                                        rooms.map(room => (
                                            <Dropdown.Item eventKey={room.id} href={`#/action-${room.id}`}>{room.number}</Dropdown.Item>
                                        ))
                                    }
                                </DropdownButton>
                            </>
                            : <>
                                <br />
                                <Alert variant="secondary">
                                    <p>
                                        <FeedbackIcon className={styles.orange_feedback} /> Не найдено ни одного подходящего кабинета!
                                        Выберите, пожалуйста, другие параметры занятия.
                                    </p>
                                </Alert>
                            </>
                        }
                    </>
                }

            </Form.Group>

            {showRooms && roomId != 0 &&
                <>
                    Периодичность
                    <ToggleButtonGroup type="radio" name="periodicityId" defaultValue={0} className="mb-2" onChange={onToggleButtonGroupChangePeriodicity}>
                        {
                            periodicity.map(period => (
                                <ToggleButton id={`tbg-check-${period.id}`} value={period.id}>{period.name}</ToggleButton>
                            ))
                        }
                    </ToggleButtonGroup>
                    <br />
                    День недели
                    <DropdownButton id="dropdown-basic-button" title={weekDay == 0 ? "Не выбрано" : weekDayName[weekDay - 1]} onSelect={onDropdownButtonChangeWeekDay} >
                        {
                            weekDayName.map((day, index) => (
                                <Dropdown.Item eventKey={index} href={`#/action-${index}`}>{day}</Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                    <br />
                    ОТ &nbsp; <TimePicker defaultValue={moment(defaultStartTime, format)} inputReadOnly={false} disabledHours={disabledHours} hideDisabledOptions={true} minuteStep={5} placeholder="Время начала" showSecond={false} onChange={(e) => onInputChangeStartTime(e)} />
                    &nbsp; ДО <TimePicker defaultValue={moment(defaultEndTime, format)} inputReadOnly={false} disabledHours={disabledHours} hideDisabledOptions={true} minuteStep={5} placeholder="Время окончания" showSecond={false} onChange={(e) => onInputChangeEndTime(e)} />

                </>
            }
            <br />

            <Alert show={showAlertGroup} variant="secondary">
                <p>
                    <FeedbackIcon className={styles.orange_feedback} /> Выберите, пожалуйста, одну из групп!
                </p>
            </Alert>

            <Alert show={showAlertTeacher} variant="secondary">
                <p>
                    <FeedbackIcon className={styles.orange_feedback} /> Выберите, пожалуйста, одного из педагогов!
                </p>
            </Alert>

            <Alert show={showAlertSubject} variant="secondary">
                <p>
                    <FeedbackIcon className={styles.orange_feedback} /> Выберите, пожалуйста, один из предметов!
                </p>
            </Alert>

            <Alert show={showAlertRoom} variant="secondary">
                <p>
                    <FeedbackIcon className={styles.orange_feedback} /> Выберите, пожалуйста, один из кабинетов!
                </p>
            </Alert>

            <br />

            {errorMessage.length != 0 &&
                <Alert variant="secondary">
                    <p>
                        <FeedbackIcon className={styles.orange_feedback} />{errorMessage}
                    </p>
                </Alert>
            }

            <Button variant="success" type="submit" block>
                Добавить занятие
            </Button>
        </Form>

    )
}

export default AddLessonForm;
