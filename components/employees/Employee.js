import { useContext, useState, useEffect } from 'react';
import { EmployeesContext } from '../../contexts/EmployeesContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditEmployeeForm'
import MoreIcon from '@mui/icons-material/More';


const Employee = ({ key, user }) => {

    const { deleteEmployee } = useContext(EmployeesContext)

    const [isRoleAdmin, setRoleAdmin] = useState(false);
    const [isRoleMethodist, setRoleMethodist] = useState(false);
    const [isRoleTeacher, setRoleTeacher] = useState(false);
    const [isRoleSteward, setRoleSteward] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
        checkRole();

    }, [user])

    function checkRole() {

        if (user.roleIds.includes(1)) {
            setRoleAdmin(true)
        }
        if (user.roleIds.includes(2)) {
            setRoleMethodist(true)
        }
        if (user.roleIds.includes(3)) {
            setRoleTeacher(true)
        }
        if (user.roleIds.includes(4)) {
            setRoleSteward(true)
        }
    }


    const [showBubble, setShowBubble] = useState(false);

    const onClickBubble = () => {
        if (showBubble) setShowBubble(false)
        else if (!showBubble) setShowBubble(true)
    }

    return [
        <tr key={key} >

            <td>{user.surname} {user.name} {user.patronymic}</td>
            <td>{user.email}</td>
            <td nowrap="true">{user.birthDate}</td>
            <td>
                {isRoleAdmin && <>Админ < br /></>}
                {isRoleMethodist && <>Методист < br /></>}
                {isRoleTeacher && <>Педагог < br /></>}
                {isRoleSteward && <>Завхоз < br /></>}
            </td>
            <td>
                {user.isActive
                    ? < div className="text-success">Активен</div>
                    : < div className="text-danger">Заблокирован</div>
                }
            </td>

            <td nowrap="true">
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Редактировать
                        </Tooltip>
                    }>
                    <button onClick={handleShow} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Удалить
                        </Tooltip>
                    }>
                    <button onClick={() => deleteEmployee(user.id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>

                {
                    (isRoleMethodist || isRoleTeacher || isRoleSteward) &&
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Раскрыть
                            </Tooltip>
                        }>
                        <button onClick={onClickBubble} className="btn text-primary btn-act" data-toggle="modal"><MoreIcon></MoreIcon></button>
                    </OverlayTrigger>
                }

            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Редактировать сотрудника
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm theUser={user} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </tr>,

        showBubble && (
            <tr>
                {(isRoleMethodist || isRoleTeacher || isRoleSteward) &&
                    <td>
                        <b>Пол:</b>&nbsp;
                        {user.gender
                            ? <>Женский</>
                            : <>Мужской </>
                        }
                        <br />
                        <b>Дата принятия на работу:</b> {user.employee.startWorkDate} <br />
                        <b>Стаж работы:</b> {user.employee.workExperience}<br />
                        <b>Адрес:</b> {user.employee.address}<br />
                        <b>Телефон:</b> {user.employee.phoneNumber}<br />
                    </td>
                }

                {isRoleTeacher &&
                    <td>
                        <b>Категория:</b> {user.employee.teacher.category.name}<br />
                        <b>Начало действия категории:</b> <br />{user.employee.teacher.startCategoryDate}<br />
                        <b>Окончание действия категории:</b> <br />{user.employee.teacher.endCategoryDate}<br />
                        <b>Направленность:</b> {user.employee.teacher.educationalDirection.name}
                    </td>
                }
            </tr>
        )

    ]

}

export default Employee;