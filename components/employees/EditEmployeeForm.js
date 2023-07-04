import { Alert, Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton } from "react-bootstrap"
import { EmployeesContext } from '../../contexts/EmployeesContext';
import { useContext, useState, useEffect } from 'react';
import styles from '../../styles/employees.module.css';
import FeedbackIcon from '@mui/icons-material/Feedback';

const EditEmployeeForm = ({ theUser }) => {

    const { updateEmployee } = useContext(EmployeesContext);

    const { roles } = useContext(EmployeesContext);
    const { categories } = useContext(EmployeesContext);
    const { directions } = useContext(EmployeesContext);

    const { errorMessage } = useContext(EmployeesContext);

    const [isRoleEmployee, setRoleEmployee] = useState(false);
    const [isRoleTeacher, setRoleTeacher] = useState(false);

    const [updatedEmployee, setUpdatedEmployee] = useState({

        id: theUser.id, surname: theUser.surname, name: theUser.name, patronymic: theUser.patronymic,
        email: theUser.email, login: theUser.login,
        gender: theUser.gender, birthDate: theUser.birthDate, isActive: theUser.isActive,
        roleIds: theUser.roleIds,
        employee: null
    })

    const [employee, setEmployee] = useState({
        id: 0, startWorkDate: "", endWorkDate: null, reasonWorkEnd: "",
        workExperience: 0, isVacation: false, startVacationDate: null,
        endVacationDate: null, address: "", phoneNumber: "",
        teacher: {
            id: 0, categoryId: 1, startCategoryDate: "", endCategoryDate: "",
            educationalDirectionId: 1
        }
    });

    const { surname, name, patronymic, email,
        login, gender, birthDate, isActive,
        roleIds } = updatedEmployee;

    const { startWorkDate, endWorkDate, reasonWorkEnd,
        workExperience, isVacation, startVacationDate,
        endVacationDate, address, phoneNumber, teacher } = employee;

    useEffect(() => {
        if (theUser.employee != null) {
            setEmployee(theUser.employee)
            // if (theUser.employee.teacher != null) {
            //     setEmployee({ ...theUser.employee, teacher: theUser.employee.teacher })
            // }
        }

    }, [theUser])

    useEffect(() => {
        isEmployee();
        isTeacher();
    }, [roleIds])

    const [showAlert, setShowAlert] = useState(false);

    const [educationalDirectionName, setEducationalDirectionName] = useState("");

    useEffect(() => {

        console.log(updatedEmployee)
        if (directions.length != 0) {
            if (theUser.employee != null) {
                if (theUser.employee.teacher != null) {
                    setEducationalDirectionName(theUser.employee.teacher.educationalDirection.name);
                }
            }
        }
    }, [directions]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (roleIds.length == 0) {
            setShowAlert(true);
            return;
        }

        let temp = updatedEmployee;

        if (gender == "false") temp.gender = false;
        else if (gender == "true") temp.gender = true;

        if (isActive == "false") temp.isActive = false;
        else if (isActive == "true") temp.isActive = true;

        if (isRoleEmployee == false) {
            updateEmployee(temp);
        }
        else if (isRoleEmployee == true) {

            let temp_emp = employee;

            if (!isVacation) {
                temp_emp.startVacationDate = null;
                temp_emp.endVacationDate = null;
            }
            if (endWorkDate == null) temp_emp.reasonWorkEnd = null;

            if (isRoleTeacher == false) {
                temp_emp.teacher = null;
            }

            temp.employee = temp_emp;
            updateEmployee(temp);
        }
    }

    const onInputChange = (e) => {
        setUpdatedEmployee({ ...updatedEmployee, [e.target.name]: e.target.value })
    }

    const onToggleButtonGroupChangeRole = (newValue) => {
        setShowAlert(false);
        setUpdatedEmployee({ ...updatedEmployee, roleIds: newValue })
    }

    const onInputChangeEmployee = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }

    const onInputChangeTeacher = (e) => {
        setEmployee({ ...employee, teacher: { ...employee.teacher, [e.target.name]: e.target.value } })
    }

    const onToggleButtonGroupChangeCategory = (newValue) => {
        setEmployee({ ...employee, teacher: { ...employee.teacher, categoryId: newValue } })

    }

    const getEducationalDirectionName = (id) => {
        directions.map(direction => {
            if (direction.id == id) {
                setEducationalDirectionName(direction.name);
                return;
            }
        })
    }

    const onDropdownButtonChange = (newValue) => {
        setEmployee({ ...employee, teacher: { ...employee.teacher, educationalDirectionId: Number(newValue) } })
        getEducationalDirectionName(newValue);
    }

    function isEmployee() {

        console.log(updatedEmployee)
        if (roleIds.includes(2) === true || roleIds.includes(3) === true || roleIds.includes(4) === true)
            setRoleEmployee(true)
        else
            setRoleEmployee(false)

    }
    function isTeacher() {
        if (roleIds.includes(3) === true)
            setRoleTeacher(true)
        else setRoleTeacher(false)
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                Фамилия
                <Form.Control
                    type="text"
                    placeholder="Фамилия *"
                    name="surname"
                    value={surname}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                Имя
                <Form.Control
                    type="text"
                    placeholder="Имя *"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                Отчество
                <Form.Control
                    type="text"
                    placeholder="Отчество"
                    name="patronymic"
                    value={patronymic}
                    onChange={(e) => onInputChange(e)}
                />
            </Form.Group>
            <Form.Group>
                Электронная почта
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                Дата рождения
                <Form.Control
                    type="date"
                    placeholder="Дата рождения"
                    name="birthDate"
                    value={birthDate}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                Логин
                <Form.Control
                    type="text"
                    placeholder="Логин *"
                    name="login"
                    value={login}
                    onChange={(e) => onInputChange(e)}
                    disabled
                />
            </Form.Group>
            {/* <Form.Group>
                <Form.Control
                    type="file"
                    placeholder="Аватар"
                    name="avatar"
                    value={avatar}
                    onChange={(e) => onInputChange(e)}
                />
            </Form.Group> */}

            <br />Пол<br />
            <ToggleButtonGroup type="radio" name="gender" defaultValue={gender}>
                <ToggleButton id="tbg-radio-1" value={true} onChange={(e) => onInputChange(e)}>
                    Женский
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value={false} onChange={(e) => onInputChange(e)}>
                    Мужской
                </ToggleButton>
            </ToggleButtonGroup>

            <br />Активен ли <br />
            <ToggleButtonGroup type="radio" name="isActive" defaultValue={isActive} >
                <ToggleButton id="tbg-radio-3" value={true} onChange={(e) => onInputChange(e)}>
                    Активен
                </ToggleButton>
                <ToggleButton id="tbg-radio-4" value={false} onChange={(e) => onInputChange(e)}>
                    Не активен
                </ToggleButton>
            </ToggleButtonGroup>

            <br />Роль<br />
            <ToggleButtonGroup type="checkbox" name="roleIds" defaultValue={roleIds} className="mb-2" onChange={onToggleButtonGroupChangeRole}>
                {
                    roles.map(role => (
                        <ToggleButton id={`tbg-check-${role.id}`} value={role.id}>{role.name}</ToggleButton>
                    ))
                }
            </ToggleButtonGroup>

            {isRoleEmployee
                && <Form.Group><br />
                    <h5>Данные для сотрудников</h5>
                    <br />
                    Дата принятия на работу
                    <Form.Control
                        type="date"
                        name="startWorkDate"
                        value={startWorkDate}
                        onChange={(e) => onInputChangeEmployee(e)}
                        required
                    />
                    Дата увольнения
                    <Form.Control
                        type="date"
                        name="endWorkDate"
                        value={endWorkDate}
                        onChange={(e) => onInputChangeEmployee(e)}
                    />
                    Причина увольнения
                    <Form.Control
                        as="textarea"
                        placeholder="Адрес"
                        name="reasonWorkEnd"
                        value={reasonWorkEnd}
                        onInput={(e) => onInputChangeEmployee(e)}
                        row={3}
                    />
                    Стаж работы
                    <Form.Control
                        type="number"
                        placeholder="Стаж работы"
                        name="workExperience"
                        pattern="[0-9]*"
                        value={Number(workExperience).toString()}
                        onInput={(e) => onInputChangeEmployee(e)}
                        min="0"
                        max="100"
                        required
                    />
                    Адрес
                    <Form.Control
                        as="textarea"
                        placeholder="Адрес"
                        name="address"
                        value={address}
                        onInput={(e) => onInputChangeEmployee(e)}
                        row={3}
                        required
                    />
                    Телефон
                    <Form.Control
                        type="text"
                        placeholder="Телефон"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => onInputChangeEmployee(e)}
                    />

                    <br />В отпуске ли <br />
                    <ToggleButtonGroup type="radio" name="isVacation" defaultValue={isVacation} >
                        <ToggleButton id="tbg-radio-5" value={false} onChange={(e) => onInputChange(e)}>
                            Нет
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-6" value={true} onChange={(e) => onInputChange(e)}>
                            Да
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {isVacation &&
                        <>
                            Дата начала отпуска
                            {startVacationDate}
                            <Form.Control
                                type="date"
                                name="startVacationDate"
                                value={startVacationDate}
                                onChange={(e) => onInputChangeEmployee(e)}
                            />
                            Дата окончания отпуска
                            {endVacationDate}
                            <Form.Control
                                type="date"
                                name="endVacationDate"
                                value={endVacationDate}
                                onChange={(e) => onInputChangeEmployee(e)}
                            />
                        </>
                    }
                </Form.Group>
            }
            {isRoleTeacher
                && <Form.Group><br />
                    <h5>Данные для педагогов</h5>
                    <br />
                    Квалификационная категория <br />
                    <ToggleButtonGroup type="radio" name="categoryId" defaultValue={employee.teacher.categoryId} className="mb-2" onChange={onToggleButtonGroupChangeCategory}>
                        {
                            categories.map(category => (
                                <ToggleButton id={`tbg-check2-${category.id}`} value={category.id}>{category.name}</ToggleButton>
                            ))
                        }
                    </ToggleButtonGroup>

                    <br />
                    Начало действия категории
                    <Form.Control
                        type="date"
                        name="startCategoryDate"
                        value={employee.teacher.startCategoryDate}
                        onChange={(e) => onInputChangeTeacher(e)}
                        required
                    />

                    Окончание действия категории
                    <Form.Control
                        type="date"
                        name="endCategoryDate"
                        value={employee.teacher.endCategoryDate}
                        onChange={(e) => onInputChangeTeacher(e)}
                        required
                    />

                    Направленность
                    <DropdownButton id="dropdown-basic-button" title={educationalDirectionName} onSelect={onDropdownButtonChange}  >
                        {
                            directions.map(direction => (
                                <Dropdown.Item eventKey={direction.id} href={`#/action-${direction.id}`}>{direction.name}</Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                </Form.Group>
            }

            <br /><br />

            <Alert show={showAlert} variant="secondary">
                <p>
                    <FeedbackIcon className={styles.orange_feedback} /> Выберите, пожалуйста, роль(-и) для редактируемого пользователя!
                </p>
            </Alert>

            {errorMessage.length != 0 &&
                <Alert variant="secondary">
                    <p>
                        <FeedbackIcon className={styles.orange_feedback} />{errorMessage}
                    </p>
                </Alert>
            }

            <Button variant="success" type="submit" block>
                Редактировать сотрудника
            </Button>
        </Form>

    )
}

export default EditEmployeeForm;