import { useContext, useState, useEffect } from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LessonsContext } from '../../contexts/LessonsContext';
import styles from '../../styles/schedule.module.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditForm from './EditLessonForm'


const Lesson = ({ theType, index, prev, curr, setCurrLessons, isLogged }) => {

    console.log(theType)

    const { deleteLesson } = useContext(LessonsContext)

    const theLesson = curr[index];

    const [colors, setColors] = useState([
        '#D0BBFF', '#FD98D4', '#5FC4CD', '#FFDE91',
        '#FFA37C', '#84A3FF'
    ])

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [divStyle, setDivStyle] = useState('');

    useEffect(() => {
        paintCard()
    }, [])


    function getRandomInt() {
        return Math.floor(Math.random() * colors.length);
    }

    const paintCard = () => {

        let tempColor = -1;

        if (theLesson.weekDay == 1) {
            if (index == 0) {
                tempColor = getRandomInt();
            } else {
                do {
                    tempColor = getRandomInt();
                } while (curr[index - 1].color == `${colors[tempColor]}`);
            }
        }
        else {
            if (index == 0) {
                if (prev.length != 0) {
                    do {
                        tempColor = getRandomInt();
                    } while (prev[index].color == `${colors[tempColor]}`);
                } else {
                    tempColor = getRandomInt();
                }

            }
            else {
                if (prev.length != 0) {
                    if (index >= prev.length) {
                        do {
                            tempColor = getRandomInt();
                        } while (curr[index - 1].color == `${colors[tempColor]}`);
                    } else {
                        do {
                            tempColor = getRandomInt();
                        } while (prev[index].color == `${colors[tempColor]}` || curr[index - 1].color == `${colors[tempColor]}`);
                    }
                }
                else {
                    do {
                        tempColor = getRandomInt();
                    } while (curr[index - 1].color == `${colors[tempColor]}`);
                }

            }
        }

        setDivStyle(`${colors[tempColor]}`);
        let currLessons = [...curr];
        currLessons[index].color = `${colors[tempColor]}`;
        setCurrLessons(currLessons)
    }

    return (
        <div className={`${styles.lesson_card}`} style={{ backgroundColor: `${divStyle}` }} >
            {isLogged &&
                <div className={`${styles.action_icons}`}>
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Редактировать
                            </Tooltip>
                        }>
                        <button onClick={handleShow} className="btn text-secondary btn-act" data-toggle="modal"> <EditIcon /></button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Удалить
                            </Tooltip>
                        }>
                        <button onClick={() => deleteLesson(theLesson.id)} className="btn text-secondary btn-act" data-toggle="modal"><DeleteIcon /></button>
                    </OverlayTrigger>
                </div>
            }


            <b>{theLesson.subject.name}</b>
            <b>{theLesson.startTime}-{theLesson.endTime}</b>
            <div>{theLesson.room.number}</div>
            {theType == "group"
                ? <div>{theLesson.teacher.fio}</div>
                : <div>{theLesson.group.name}</div>
            }
            <div>{theLesson.periodicity.name}</div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Редактировать занятие
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm theLesson={theLesson} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default Lesson;