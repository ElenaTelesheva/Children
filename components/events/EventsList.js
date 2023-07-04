import { Modal, Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton, Alert } from "react-bootstrap"
import { useContext, useEffect, useState } from 'react';
import { EventsContext } from '../../contexts/EventsContext';
import Event from './Event';
import AddForm from './AddEventForm';
import Pagination from '../Pagination';
import styles from '../../styles/events.module.css';


const EventsList = ({ isLogged }) => {

    const { sortedEvents } = useContext(EventsContext);
    const { directions } = useContext(EventsContext);
    const { teachers } = useContext(EventsContext);
    const { rooms } = useContext(EventsContext);

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [groupsPerPage] = useState(20)

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }

    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [sortedEvents])

    const indexOfLastGroups = currentPage * groupsPerPage;
    const indexOfFirstGroups = indexOfLastGroups - groupsPerPage;

    const currentGroups = sortedEvents.length != 0 ? sortedEvents.slice(indexOfFirstGroups, indexOfLastGroups) : null;
    const totalPagesNum = sortedEvents.length != 0 ? Math.ceil(sortedEvents.length / groupsPerPage) : null;

    const [filterEventName, setFilterEventName] = useState("");
    const [filterDirection, setFilterDirection] = useState(0);
    const [filterTeacher, setFilterTeacher] = useState(0);

    const [filterDirectionName, setFilterDirectionName] = useState("");
    const [filterTeacherName, setFilterTeacherName] = useState("");


    const onDropdownButtonChangeDirections = (newValue) => {
        setFilterDirection(newValue)
        directions.map(direction => {
            if (direction.id == newValue) {
                setFilterDirectionName(direction.name);
            }
        })
        if (newValue == 0) setFilterDirectionName("");
    }

    const onDropdownButtonChangeTeacher = (newValue) => {
        setFilterTeacher(newValue)
        teachers.map(teacher => {
            if (teacher.id == newValue) {
                setFilterTeacherName(teacher.fio);
            }
        })
        if (newValue == 0) setFilterTeacherName("");
    }

    return (
        <>{isLogged &&
            <>
                <div className={styles.events_options}>
                    <div className={styles.block_filter}>
                        <label>Параметры фильтрации:</label>
                        <div className={styles.filter}>
                            <br /><br />
                            <Form.Control
                                type="text"
                                placeholder="Название"
                                name="eventName"
                                value={filterEventName}
                                onChange={(e) => setFilterEventName(e.target.value)}
                            />
                            <br />
                            <DropdownButton id="dropdown-basic-button" title={filterDirectionName == "" ? "Выберите направленность" : filterDirectionName} onSelect={onDropdownButtonChangeDirections}>
                                <Dropdown.Item eventKey={0} href={`# / action2 - 0`}>Не выбрано</Dropdown.Item>
                                {
                                    directions.map(direction => (
                                        <Dropdown.Item eventKey={direction.id} href={`# / action2 - ${direction.id} `}>{direction.name}</Dropdown.Item>
                                    ))
                                }
                            </DropdownButton>
                            <br />
                            <DropdownButton id="dropdown-basic-button" title={filterTeacherName == "" ? "Выберите педагога" : filterTeacherName} onSelect={onDropdownButtonChangeTeacher}>
                                <Dropdown.Item eventKey={0} href={`# / action - 0`}>Не выбрано</Dropdown.Item>
                                {
                                    teachers.map(teacher => (
                                        <Dropdown.Item eventKey={teacher.id} href={`# / action - ${teacher.id} `}>{teacher.fio}</Dropdown.Item>
                                    ))
                                }
                            </DropdownButton>

                        </div>
                    </div>

                    <Button className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Добавить мероприятие</span></Button>

                </div>
                <br />
            </>
        }


            {sortedEvents == null || sortedEvents.length == 0
                ? <Alert show={showAlert} variant="warning">
                    Список мероприятий пуст!
                </Alert>
                : <div>
                    <Alert show={showAlert} variant="success">
                        Список мероприятий успешно загружен!
                    </Alert>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th nowrap="true">Название</th>
                                <th nowrap="true">Направленность обучения</th>
                                <th>Время проведения</th>
                                <th>Организатор</th>
                                <th nowrap="true">Место проведения</th>
                                <th>Описание</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                sortedEvents.map(event => (
                                    <Event sortedEvents={sortedEvents} key={event.id} event={event} isLogged={isLogged}/>
                                ))
                            }

                        </tbody>
                    </table>

                    <Pagination pages={totalPagesNum}
                        setCurrentPage={setCurrentPage}
                        currentEntities={currentGroups}
                        sortedEntities={sortedEvents} />
                </div>
            }


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Добавление мероприятия
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm />
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

export default EventsList;