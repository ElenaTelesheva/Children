import { useState, useEffect, useContext } from 'react';
import { Modal, Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton } from "react-bootstrap"
import { LessonsContext } from '../../contexts/LessonsContext';
import Lesson from './Lesson'
import AddForm from './AddLessonForm';
import styles from '../../styles/schedule.module.css'
import JsonData from '../../data/schedule.json'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const url = "http://localhost:59575/api/";

// const getLessons = async (group) => {

//     const requestOptions = {
//         method: 'GET',
//         credentials: "include",
//     };

//     const response = await fetch(`${url}schedule/lesson?` + new URLSearchParams({
//         groupId: group
//     }), requestOptions)
//     try {
//         const data = await response.json();
//         //alert(data);
//         return data;
//     }
//     catch (e) {
//         alert(e.message);
//     }



// }

// const add = async (newLesson) => {
//     const body = JSON.stringify(newLesson)

//     const requestOptions = {
//         method: 'POST',
//         body: body,
//         credentials: "include",
//         headers: {
//             "content-type": "application/json"
//         }
//     };

//     const response = await fetch(`${url}schedule/lesson`, requestOptions)
//     try {
//         const data = await response.json();
//         //alert(data);
//         return data;
//     }
//     catch (e) {
//         alert(e.message);
//     }

//     // update the state
//     //setUser(response);
// };

const LessonsMain = ({ theType, isLogged }) => {

    const { lessons } = useContext(LessonsContext);
    const { groups } = useContext(LessonsContext)
    const { teachers } = useContext(LessonsContext)

    const [group, setGroup] = useState(0);

    const [teacher, setTeacher] = useState(0);

    const [groupName, setGroupName] = useState("");
    const [teacherName, setTeacherName] = useState("");

    const [lessonsMonday, setLessonsMonday] = useState([])
    const [lessonsTuesday, setLessonsTuesday] = useState([])
    const [lessonsWednesday, setLessonsWednesday] = useState([])
    const [lessonsThursday, setLessonsThursday] = useState([])
    const [lessonsFriday, setLessonsFriday] = useState([])
    const [lessonsSaturday, setLessonsSaturday] = useState([])

    // const loadLessonsByGroup = async (newValue) => {
    //     const resultLessons = await getLessons(newValue);
    //     setLessons(resultLessons.map(lesson => ({ ...lesson, color: '' })))
    // }

    // const addLesson = async (newLesson) => {
    //     const resultAdd = await add(newLesson);
    // }

    const [periodicity, setPeriodicity] = useState(1);

    const onInputChange = (e) => {
        setPeriodicity(e.target.value)
    }

    const onDropdownButtonChangeGroup = (newValue) => {
        setGroup(newValue)
        groups.map(group => {
            if (group.id == newValue) {
                setGroupName(group.name);
            }
        })
    }

    const onDropdownButtonChangeTeacher = (newValue) => {
        setTeacher(newValue)
        teachers.map(teacher => {
            if (teacher.id == newValue) {
                setTeacherName(teacher.fio);
            }
        })
    }

    // useEffect(() => {
    //     loadLessons()
    // }, [])

    const [filteredLessons, setFilteredLessons] = useState([])

    useEffect(() => {

        splitLessons();

    }, [lessons, periodicity, group, teacher])

    const splitLessons = () => {

        let monday = [], tuesday = [], wednesday = [],
            thursday = [], friday = [], saturday = [];

        if (theType == "group") {
            lessons.forEach((item) => {
                if (item.weekDay == 1 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.groupId == group) monday.push(item);
                else if (item.weekDay == 2 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.groupId == group) tuesday.push(item);
                else if (item.weekDay == 3 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.groupId == group) wednesday.push(item);
                else if (item.weekDay == 4 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.groupId == group) thursday.push(item);
                else if (item.weekDay == 5 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.groupId == group) friday.push(item);
                else if (item.weekDay == 6 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.groupId == group) saturday.push(item);
            })
        } else if (theType == "teacher") {
            lessons.forEach((item) => {
                if (item.weekDay == 1 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.teacherId == teacher) monday.push(item);
                else if (item.weekDay == 2 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.teacherId == teacher) tuesday.push(item);
                else if (item.weekDay == 3 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.teacherId == teacher) wednesday.push(item);
                else if (item.weekDay == 4 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.teacherId == teacher) thursday.push(item);
                else if (item.weekDay == 5 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.teacherId == teacher) friday.push(item);
                else if (item.weekDay == 6 && (item.periodicityId == 3 || item.periodicityId == periodicity) && item.teacherId == teacher) saturday.push(item);
            })
        }


        monday = monday.sort((a, b) => (a.startTime < b.startTime ? -1 : 1));
        tuesday = tuesday.sort((a, b) => (a.startTime < b.startTime ? -1 : 1));
        wednesday = wednesday.sort((a, b) => (a.startTime < b.startTime ? -1 : 1));
        thursday = thursday.sort((a, b) => (a.startTime < b.startTime ? -1 : 1));
        friday = friday.sort((a, b) => (a.startTime < b.startTime ? -1 : 1));
        saturday = saturday.sort((a, b) => (a.startTime < b.startTime ? -1 : 1));

        setLessonsMonday(monday);
        setLessonsTuesday(tuesday);
        setLessonsWednesday(wednesday);
        setLessonsThursday(thursday);
        setLessonsFriday(friday);
        setLessonsSaturday(saturday);
    }

    useEffect(() => {
        console.log(lessonsTuesday)
    }, [lessonsTuesday])

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const format = 'h:mm';

    return (
        <>
            <div className={styles.lessons_options}>
                <div>
                    {theType == "group"
                        ? <DropdownButton id="dropdown-basic-button" title={groupName == "" ? "Выберите группу" : groupName} onSelect={onDropdownButtonChangeGroup}>
                            {
                                groups.map(group => (
                                    <Dropdown.Item eventKey={group.id} href={`#/action-${group.id}`}>{group.name}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                        : <DropdownButton id="dropdown-basic-button" title={teacherName == "" ? "Выберите педагога" : teacherName} onSelect={onDropdownButtonChangeTeacher}>
                            {
                                teachers.map(teacher => (
                                    <Dropdown.Item eventKey={teacher.id} href={`#/action2-${teacher.id}`}>{teacher.fio}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                    }

                    <br />
                    <ToggleButtonGroup type="radio" name="periodicity" defaultValue={1} >
                        <ToggleButton id="tbg-radio-1" value={1} onChange={(e) => onInputChange(e)}>
                            Четная неделя
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-2" value={2} onChange={(e) => onInputChange(e)}>
                            Нечетная неделя
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                {isLogged &&

                    <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Добавить новое занятие</span></Button>
                }


            </div>
            <br></br>
            <div className="text-danger">
                <label> Обьявление! 22 июня у группы Умники-2 состоится перенос Математики с 12:00 на 13:40</label>
                {isLogged &&
                    <>
                        <button className="btn text-secondary btn-act" data-toggle="modal"> <EditIcon /></button>
                        <button className="btn text-secondary btn-act" data-toggle="modal"><DeleteIcon /></button>
                    </>
                }
            </div>


            {
                (group != 0 || teacher != 0) &&
                <>
                    <div className={styles.block_colomn_name}>
                        <div className={styles.colomn_name}>Понедельник</div>
                        <div className={styles.colomn_name}>Вторник</div>
                        <div className={styles.colomn_name}>Среда</div>
                        <div className={styles.colomn_name}>Четверг</div>
                        <div className={styles.colomn_name}>Пятница</div>
                        <div className={styles.colomn_name}>Суббота</div>
                    </div>

                    <div className={styles.block_colomn}>
                        <div className={styles.colomn}>
                            {
                                lessonsMonday.map((lesson, index) => (
                                    <Lesson isLogged={isLogged} theType={theType} key={lesson.id} index={index} prev={[]} curr={lessonsMonday} setCurrLessons={setLessonsMonday}></Lesson>
                                ))
                            }
                        </div>
                        <div className={styles.colomn}>
                            {
                                lessonsTuesday.map((lesson, index) => (
                                    <Lesson isLogged={isLogged} theType={theType} key={lesson.id} index={index} prev={lessonsMonday} curr={lessonsTuesday} setCurrLessons={setLessonsTuesday}></Lesson>
                                ))
                            }
                        </div>
                        <div className={styles.colomn}>
                            {
                                lessonsWednesday.map((lesson, index) => (
                                    <Lesson isLogged={isLogged} theType={theType} key={lesson.id} index={index} prev={lessonsTuesday} curr={lessonsWednesday} setCurrLessons={setLessonsWednesday}></Lesson>
                                ))
                            }
                        </div>
                        <div className={styles.colomn}>
                            {
                                lessonsThursday.map((lesson, index) => (
                                    <Lesson isLogged={isLogged} theType={theType} key={lesson.id} index={index} prev={lessonsWednesday} curr={lessonsThursday} setCurrLessons={setLessonsThursday}></Lesson>
                                ))
                            }
                        </div>
                        <div className={styles.colomn}>
                            {
                                lessonsFriday.map((lesson, index) => (
                                    <Lesson isLogged={isLogged} theType={theType} key={lesson.id} index={index} prev={lessonsThursday} curr={lessonsFriday} setCurrLessons={setLessonsFriday}></Lesson>
                                ))
                            }
                        </div>
                        <div className={styles.colomn}>
                            {
                                lessonsSaturday.map((lesson, index) => (
                                    <Lesson isLogged={isLogged} theType={theType} key={lesson.id} index={index} prev={lessonsFriday} curr={lessonsSaturday} setCurrLessons={setLessonsSaturday}></Lesson>
                                ))
                            }
                        </div>
                    </div>
                </>

            }

            <Modal enforceFocus={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Добавление занятия
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm theGroup={group} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}

export default LessonsMain;