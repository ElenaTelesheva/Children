import { Modal, Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton, Alert } from "react-bootstrap"
import { useContext, useEffect, useState } from 'react';
import { ChildrenContext } from '../../contexts/ChildrenContext';
import Child from './Child';
import AddForm from './AddChildForm';
import Pagination from '../Pagination';
import styles from '../../styles/children.module.css';
import ImportExportIcon from '@mui/icons-material/ImportExport';

const ChildrenList = () => {

    const { sortedChildren } = useContext(ChildrenContext);
    const { groups } = useContext(ChildrenContext);

    console.log(sortedChildren)

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [childrenPerPage] = useState(20)

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
    }, [sortedChildren])

    const indexOfLastChildren = currentPage * childrenPerPage;
    const indexOfFirstChildren = indexOfLastChildren - childrenPerPage;

    const currentChildren = sortedChildren.length != 0 ? sortedChildren.slice(indexOfFirstChildren, indexOfLastChildren) : null;
    const totalPagesNum = sortedChildren.length != 0 ? Math.ceil(sortedChildren.length / childrenPerPage) : null;

    const [filterFamilia, setFilterFamilia] = useState("");
    const [filterGroup, setFilterGroup] = useState(0);

    const [filterGroupName, setFilterGroupName] = useState("");

    const onDropdownButtonChangeGroup = (newValue) => {
        setFilterGroup(newValue)
        groups.map(group => {
            if (group.id == newValue) {
                setFilterGroupName(group.name);
            }
        })
        if (newValue == 0) setFilterGroupName("");
    }

    return (
        <>
            <div className={styles.children_options}>
                <div className={styles.block_filter}>
                    <label>Параметры фильтрации:</label>
                    <div className={styles.filter}>
                        <br /><br />
                        <Form.Control
                            type="text"
                            placeholder="Фамилия"
                            name="familia"
                            value={filterFamilia}
                            onChange={(e) => setFilterFamilia(e.target.value)}
                        />
                        <br />
                        <DropdownButton id="dropdown-basic-button" title={filterGroupName == "" ? "Выберите группу" : filterGroupName} onSelect={onDropdownButtonChangeGroup}>
                            <Dropdown.Item eventKey={0} href={`# / action - 0`}>Не выбрано</Dropdown.Item>
                            {
                                groups.map(group => (
                                    <Dropdown.Item eventKey={group.id} href={`# / action - ${group.id} `}>{group.name}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>

                    </div>
                </div>
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Добавить обучающегося</span></Button>
            </div>
            <br />


            {sortedChildren == null || sortedChildren.length == 0
                ? <Alert show={showAlert} variant="warning">
                    Список обучающихся пуст!
                </Alert>
                : <div>
                    <Alert show={showAlert} variant="success">
                        Список обучающихся успешно загружен!
                    </Alert>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th nowrap="true">ФИО
                                    <ImportExportIcon />
                                </th>
                                <th nowrap="true">Дата рождения
                                    <ImportExportIcon />
                                </th>
                                <th>Адрес</th>
                                <th>Учебная группа</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentChildren.map(child => (
                                    <Child key={child.id} child={child} />

                                ))
                            }
                        </tbody>
                    </table>

                    <Pagination pages={totalPagesNum}
                        setCurrentPage={setCurrentPage}
                        currentEntities={currentChildren}
                        sortedEntities={sortedChildren} />
                </div>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Добавление обучающегося
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

export default ChildrenList;