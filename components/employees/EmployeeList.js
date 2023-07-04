import { Modal, Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton, Alert } from "react-bootstrap"
import { useContext, useEffect, useState } from 'react';
import { EmployeesContext } from '../../contexts/EmployeesContext';
import Employee from './Employee';
import AddForm from './AddEmployeeForm';
import Pagination from '../Pagination';
import styles from '../../styles/employees.module.css';
import ImportExportIcon from '@mui/icons-material/ImportExport';

const EmployeeList = () => {

    const { sortedEmployees } = useContext(EmployeesContext);
    const { sortEmployee } = useContext(EmployeesContext);

    const { roles } = useContext(EmployeesContext);
    const { directions } = useContext(EmployeesContext);
    const { filterEmployee } = useContext(EmployeesContext);

    console.log(sortedEmployees)

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(20)

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
    }, [sortedEmployees])

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

    const currentEmployees = sortedEmployees.length != 0 ? sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee) : null;
    const totalPagesNum = sortedEmployees.length != 0 ? Math.ceil(sortedEmployees.length / employeesPerPage) : null;

    const [filterFamilia, setFilterFamilia] = useState("");
    const [filterRole, setFilterRole] = useState(0);
    const [filterDirection, setFilterDirection] = useState(0);

    const [filterRoleName, setFilterRoleName] = useState("");
    const [filterDirectionName, setFilterDirectionName] = useState("");

    const onDropdownButtonChangeRole = (newValue) => {
        setFilterRole(newValue)
        roles.map(role => {
            if (role.id == newValue) {
                setFilterRoleName(role.name);
            }
        })
        if (newValue == 0) setFilterRoleName("");
    }

    const onDropdownButtonChangeDirections = (newValue) => {
        setFilterDirection(newValue)
        directions.map(direction => {
            if (direction.id == newValue) {
                setFilterDirectionName(direction.name);
            }
        })
        if (newValue == 0) setFilterDirectionName("");
    }

    useEffect(() => {
        let params = "";
        params += filterFamilia == "" ? "" : `surname=${filterFamilia}&`
        params += filterRole == 0 ? "" : `role=${filterRole}&`
        params += filterDirection == 0 ? "" : `educationalDirection=${filterDirection}`

        if (params.length != 0) {
            if (params[params.length - 1] == "&") params = params.substring(0, params.length - 1);
        }

        filterEmployee(params);

    }, [filterFamilia, filterRole, filterDirection])

    const [orderSurname, setOrderSurname] = useState(0);
    const [orderBirthDate, setOrderBirthDate] = useState(0);

    const sortSurname = () => {
        setOrderBirthDate(0);

        let temp_order = orderSurname;

        let params = "";
        if (temp_order < 2) {
            temp_order++;
            setOrderSurname(temp_order);
        }
        else if (orderBirthDate == 2) {
            temp_order = 0;
            setOrderSurname(temp_order);
        }

        params += temp_order == 0 ? "" : `field=surname&order=${temp_order}`

        sortEmployee(params)
    }
    const sortBirthDate = () => {
        setOrderSurname(0);
        let temp_order = orderBirthDate;

        let params = "";
        if (temp_order < 2) {
            temp_order++;
            setOrderBirthDate(temp_order);
        }
        else if (orderBirthDate == 2) {
            temp_order = 0;
            setOrderBirthDate(temp_order);
        }

        params += temp_order == 0 ? "" : `field=birthdate&order=${temp_order}`

        sortEmployee(params)
    }

    return (
        <>
            <div className={styles.employees_options}>
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
                        <DropdownButton id="dropdown-basic-button" title={filterRoleName == "" ? "Выберите роль" : filterRoleName} onSelect={onDropdownButtonChangeRole}>
                            <Dropdown.Item eventKey={0} href={`# / action - 0`}>Не выбрано</Dropdown.Item>
                            {
                                roles.map(role => (
                                    <Dropdown.Item eventKey={role.id} href={`# / action - ${role.id} `}>{role.name}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                        <br />
                        <DropdownButton id="dropdown-basic-button" title={filterDirectionName == "" ? "Выберите направленность" : filterDirectionName} onSelect={onDropdownButtonChangeDirections}>
                            <Dropdown.Item eventKey={0} href={`# / action2 - 0`}>Не выбрано</Dropdown.Item>
                            {
                                directions.map(direction => (
                                    <Dropdown.Item eventKey={direction.id} href={`# / action2 - ${direction.id} `}>{direction.name}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>

                    </div>
                </div>


                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Добавить нового сотрудника</span></Button>

            </div>
            <br />

            {sortedEmployees == null || sortedEmployees.length == 0
                ? <Alert show={showAlert} variant="warning">
                    Список сотрудников пуст!
                </Alert>
                : <div>
                    <Alert show={showAlert} variant="success">
                        Список сотрудников успешно загружен!
                    </Alert>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th onClick={sortSurname}>ФИО
                                    <ImportExportIcon />
                                </th>
                                <th>Email</th>
                                <th onClick={sortBirthDate}>Дата рождения
                                    <ImportExportIcon />
                                </th>
                                <th>Роль</th>
                                <th>Активен</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* {
                                currentEmployees.map(employee => (
                                    <tr key={employee.id}>
                                        <Employee employee={employee} />
                                    </tr>
                                ))
                            } */}

                            {
                                currentEmployees.map(user => (
                                    <Employee key={user.id} user={user} />

                                ))
                            }

                        </tbody>
                    </table>

                    <Pagination pages={totalPagesNum}
                        setCurrentPage={setCurrentPage}
                        currentEntities={currentEmployees}
                        sortedEntities={sortedEmployees} />
                </div>
            }

            <Modal show={show} onHide={handleClose} className={styles.modal_window}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Добавление пользователя
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

export default EmployeeList;