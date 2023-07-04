import { Alert, Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton } from "react-bootstrap"
import { EmployeesContext } from '../../contexts/EmployeesContext';
import { useContext, useState, useEffect } from 'react';
import styles from '../../styles/employees.module.css';
import FeedbackIcon from '@mui/icons-material/Feedback';


const AddForm = () => {

    const { addEmployee } = useContext(EmployeesContext);

    const { roles } = useContext(EmployeesContext);
    const { categories } = useContext(EmployeesContext);
    const { directions } = useContext(EmployeesContext);

    const { errorMessage } = useContext(EmployeesContext);

    const [isRoleEmployee, setRoleEmployee] = useState(false);
    const [isRoleTeacher, setRoleTeacher] = useState(false);

    const [newEmployee, setNewEmployee] = useState({

        surname: "", name: "", patronymic: "", email: "",
        password: "", login: "", gender: true, birthDate: "",
        isActive: true, roleIds: [1],
        employee: {
            address: "", phoneNumber: "", startWorkDate: "",
            workExperience: 0, isVacation: false,
            teacher: {
                categoryId: 1,
                startCategoryDate: "", endCategoryDate: "",
                educationalDirectionId: 0
            }
        },

    })

    const [educationalDirectionName, setEducationalDirectionName] = useState("");

    useEffect(() => {
        if (directions.length != 0) {
            onDropdownButtonChange(directions[0].id)
            setEducationalDirectionName(directions[0].name)
            console.log("записали")
            console.log(directions[0])
        }
    }, [directions]);

    useEffect(() => {
        if (categories.length != 0) {
            onToggleButtonGroupChangeCategory(categories[0].id)
        }
    }, [categories]);

    useEffect(() => {
        if (directions.length != 0) {
            onDropdownButtonChange(directions[0].id)
        }
    }, [directions]);

    const onInputChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
    }

    const onInputChangeEmployee = (e) => {
        setNewEmployee({ ...newEmployee, employee: { ...newEmployee.employee, [e.target.name]: e.target.value } })
    }

    const onInputChangeTeacher = (e) => {

        setNewEmployee({
            ...newEmployee, employee: {
                ...newEmployee.employee, teacher: {
                    ...newEmployee.employee.teacher, [e.target.name]: e.target.value
                }
            }
        })
    }

    const onToggleButtonGroupChangeRole = (newValue) => {
        setShowAlertRole(false);
        setNewEmployee({ ...newEmployee, roleIds: newValue })
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
        setNewEmployee({
            ...newEmployee, employee: {
                ...newEmployee.employee, teacher: {
                    ...newEmployee.employee.teacher, educationalDirectionId: Number(newValue)
                }
            }
        })
        getEducationalDirectionName(newValue);
    }

    const onToggleButtonGroupChangeCategory = (newValue) => {
        setNewEmployee({
            ...newEmployee, employee: {
                ...newEmployee.employee, teacher: {
                    ...newEmployee.employee.teacher, categoryId: newValue
                }
            }
        })

    }

    const { surname, name, patronymic, email, password,
        login, gender, birthDate, isActive,
        roleIds, employee, teacher } = newEmployee;


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(roleIds)

        if (roleIds.length == 0) {
            setShowAlertRole(true);
            return;
        }

        let temp = newEmployee;

        if (gender == "false") temp.gender = false;
        else if (gender == "true") temp.gender = true;

        if (isActive == "false") temp.isActive = false;
        else if (isActive == "true") temp.isActive = true;

        if (isRoleEmployee && isRoleTeacher) {
            addEmployee(temp);
        }
        else if (isRoleEmployee && !isRoleTeacher) {
            temp.employee.teacher = null;
            addEmployee(temp);
        }
        else if (!isRoleEmployee && !isRoleTeacher) {
            temp.employee = null;
            addEmployee(temp);
        }
    }

    useEffect(() => {
        isEmployee();
        isTeacher();
    }, [roleIds])

    function isEmployee() {
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

    const [showAlertRole, setShowAlertRole] = useState(false);
  


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
                    required
                />
            </Form.Group>
            <Form.Group>
                Пароль
                <Form.Control
                    type="text"
                    placeholder="Пароль *"
                    name="password"
                    value={password}
                    onChange={(e) => onInputChange(e)}
                    required
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

            <ToggleButtonGroup type="checkbox" name="roleIds" defaultValue={1} className="mb-2" onChange={onToggleButtonGroupChangeRole}>
                {
                    roles.map(role => (
                        <ToggleButton id={`tbg-check-${role.id}`} value={role.id}>{role.name}</ToggleButton>
                    ))
                }
            </ToggleButtonGroup>



            {isRoleEmployee}
            {isRoleTeacher}

            {isRoleEmployee
                && <Form.Group><br />
                    <h5>Данные для сотрудников</h5>
                    <br />
                    Дата принятия на работу
                    {employee.startWorkDate}
                    <Form.Control
                        type="date"
                        name="startWorkDate"
                        value={employee.startWorkDate}
                        onChange={(e) => onInputChangeEmployee(e)}
                        required
                    />
                    Стаж работы
                    <Form.Control
                        type="number"
                        placeholder="Стаж работы *"
                        name="workExperience"
                        pattern="[0-9]*"
                        value={Number(employee.workExperience).toString()}
                        onInput={(e) => onInputChangeEmployee(e)}
                        min="0"
                        max="100"
                        required
                    />
                    Адрес {employee.address}
                    <Form.Control
                        as="textarea"
                        placeholder="Адрес *"
                        name="address"
                        value={employee.address}
                        onInput={(e) => onInputChangeEmployee(e)}
                        row={3}
                        required
                    />
                    Телефон {employee.phoneNumber}
                    <Form.Control
                        type="text"
                        placeholder="Телефон *"
                        name="phoneNumber"
                        value={employee.phoneNumber}
                        onChange={(e) => onInputChangeEmployee(e)}
                    />
                </Form.Group>
            }
            {isRoleTeacher
                && <Form.Group><br />
                    <h5>Данные для педагогов</h5>
                    <br />
                    Квалификационная категория <br />
                    <ToggleButtonGroup type="radio" name="categoryId" defaultValue={1} className="mb-2" onChange={onToggleButtonGroupChangeCategory}>
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

            <Alert show={showAlertRole} variant="secondary">
                <p>
                    <FeedbackIcon className={styles.orange_feedback} /> Выберите, пожалуйста, роль(-и) для регистрируемого пользователя!
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
                Добавить сотрудника
            </Button>
        </Form>

    )
}

export default AddForm;