import { useContext, useState, useEffect } from 'react';
import { ChildrenContext } from '../../contexts/ChildrenContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditChildForm'
import MoreIcon from '@mui/icons-material/More';


const Child = ({ child }) => {

    console.log(child)

    const { deleteChild } = useContext(ChildrenContext)

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [child])

    const [showBubble, setShowBubble] = useState(false);

    const onClickBubble = () => {
        if (showBubble) setShowBubble(false)
        else if (!showBubble) setShowBubble(true)
    }

    return [
        <tr key={child.id} >

            <td nowrap="true">{child.surname} {child.name} {child.patronymic}</td>
            <td>{child.birthDate}</td>
            <td>{child.address}</td>
            {child.group != null
                ? <td>{child.group.name}</td>
                : <td>нет</td>
            }

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
                    <button onClick={() => deleteChild(child.id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            More inf
                        </Tooltip>
                    }>
                    <button onClick={onClickBubble} className="btn text-primary btn-act" data-toggle="modal"><MoreIcon></MoreIcon></button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Редактировать обучающегося
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm theChild={child} />
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
                <td>
                    <b>Email:</b> {child.email}<br />
                    <b>Пол:</b>&nbsp;
                    {child.gender
                        ? <>Женский</>
                        : <>Мужской </>
                    }
                    <br />
                    <b>Группа здоровья:</b> {child.healthGroup.name}<br />
                    <b>Примечание о здоровье:</b> {child.healthNote}<br />
                </td>

                {
                    child.parents.map(parent => (
                        <td>
                            <b>РОДСТВЕННИК:</b> {parent.relationship.name}<br />
                            <b>ФИО:</b>{parent.surname} {parent.name} {parent.patronymic}<br />
                            <b>Email:</b> {parent.email}<br />
                            <b>Место работы:</b> {parent.workPlace}<br />
                            <b>Телефон:</b> {parent.phoneNumber}<br />
                        </td>
                    ))
                }
                <td></td>
                <td></td>

            </tr>
        )

    ]

}

export default Child;