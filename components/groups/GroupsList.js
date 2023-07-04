import { Modal, Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton, Alert, Tabs, Tab } from "react-bootstrap"
import { useContext, useEffect, useState } from 'react';
import { GroupsContext } from '../../contexts/GroupsContext';
import Group from './Group';
import AddForm from './AddGroupForm';
import Pagination from '../Pagination';
import styles from '../../styles/groups.module.css';
import GroupMembers from './GroupMembers'

const GroupsList = () => {

    const { sortedGroups } = useContext(GroupsContext);
    const { headTeachers } = useContext(GroupsContext);
    const { programs } = useContext(GroupsContext);

    console.log(sortedGroups)

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
    }, [sortedGroups])

    const indexOfLastGroups = currentPage * groupsPerPage;
    const indexOfFirstGroups = indexOfLastGroups - groupsPerPage;

    const currentGroups = sortedGroups.length != 0 ? sortedGroups.slice(indexOfFirstGroups, indexOfLastGroups) : null;
    const totalPagesNum = sortedGroups.length != 0 ? Math.ceil(sortedGroups.length / groupsPerPage) : null;

    const [key, setKey] = useState('all');
    const [showSelected, setShowSelected] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(0);

    const onSelectTab = (key) => {
        setKey(key);
        //if (key = 'all') setShowSelected(false);
    }

    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        console.log("Обноваааааа прилетелааааа, надо обновляться")
        setIsChange(false)
    }, [isChange])
    //console.log(selectedGroup)

    const [filterGroupName, setFilterGroupName] = useState("");
    const [filterTeacher, setFilterTeacher] = useState(0);
    const [filterProgram, setFilterProgram] = useState(0);

    const [filterTeacherName, setFilterTeacherName] = useState("");
    const [filterProgramName, setFilterProgramName] = useState("");

    const onDropdownButtonChangeTeacher = (newValue) => {
        setFilterTeacher(newValue)
        headTeachers.map(teacher => {
            if (teacher.id == newValue) {
                setFilterTeacherName(teacher.fio);
            }
        })
        if (newValue == 0) setFilterTeacherName("");
    }

    const onDropdownButtonChangeProgram = (newValue) => {
        setFilterProgram(newValue)
        programs.map(program => {
            if (program.id == newValue) {
                setFilterProgramName(program.name);
            }
        })
        if (newValue == 0) setFilterProgramName("");
    }

    return (
        <>
            <div className={styles.groups_options}>
                <div className={styles.block_filter}>
                    <label>Параметры фильтрации:</label>
                    <div className={styles.filter}>
                        <br /><br />
                        <Form.Control
                            type="text"
                            placeholder="Название"
                            name="groupName"
                            value={filterGroupName}
                            onChange={(e) => setFilterGroupName(e.target.value)}
                        />
                        <br />
                        <DropdownButton id="dropdown-basic-button" title={filterTeacherName == "" ? "Выберите классного руков." : filterTeacherName} onSelect={onDropdownButtonChangeTeacher}>
                            <Dropdown.Item eventKey={0} href={`# / action - 0`}>Не выбрано</Dropdown.Item>
                            {
                                headTeachers.map(teacher => (
                                    <Dropdown.Item eventKey={teacher.id} href={`# / action - ${teacher.id} `}>{teacher.fio}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                        <br />
                        <DropdownButton id="dropdown-basic-button" title={filterProgramName == "" ? "Выберите образоват. прогр." : filterProgramName} onSelect={onDropdownButtonChangeProgram}>
                            <Dropdown.Item eventKey={0} href={`# / action2 - 0`}>Не выбрано</Dropdown.Item>
                            {
                                programs.map(program => (
                                    <Dropdown.Item eventKey={program.id} href={`# / action2 - ${program.id} `}>{program.name}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>

                    </div>
                </div>
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Добавить группу</span></Button>
            </div>
            <br />

            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => onSelectTab(k)} className="mb-3">
                <Tab eventKey="all" title="Все группы">

                    {sortedGroups == null || sortedGroups.length == 0
                        ? <Alert show={showAlert} variant="warning">
                            Список групп пуст!
                        </Alert>
                        : <div>
                            <Alert show={showAlert} variant="success">
                                Список групп успешно загружен!
                            </Alert>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th nowrap="true">Название</th>
                                        <th nowrap="true">Классный руководитель</th>
                                        <th>Максимальная вместимость</th>
                                        <th>Образовательная программа</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        currentGroups.map(group => (
                                            <Group selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} key={group.id} group={group} setKey={setKey} setShowSelected={setShowSelected} />

                                        ))
                                    }

                                </tbody>
                            </table>

                            <Pagination pages={totalPagesNum}
                                setCurrentPage={setCurrentPage}
                                currentEntities={currentGroups}
                                sortedEntities={sortedGroups} />
                        </div>
                    }
                </Tab>
                {showSelected
                    && <Tab eventKey="selected-1" title={`-->Текущий состав группы: ${currentGroups[selectedGroup - 1].name}`} onSelect={(k) => onSelectTab(k)}>
                        <GroupMembers isChange={isChange} setIsChange={setIsChange} theType="current" theGroup={currentGroups[selectedGroup - 1]} />
                    </Tab>

                }

                {showSelected &&
                    <Tab eventKey="selected-2" title={`-->Возможный состав группы: ${currentGroups[selectedGroup - 1].name}`} onSelect={(k) => onSelectTab(k)}>
                        <GroupMembers isChange={isChange} setIsChange={setIsChange} theType="future" theGroup={currentGroups[selectedGroup - 1]} />
                    </Tab>

                }

            </Tabs>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Добавление группы
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

export default GroupsList;