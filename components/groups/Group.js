import { useContext, useState, useEffect } from 'react';
import { GroupsContext } from '../../contexts/GroupsContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditGroupForm'
import GroupIcon from '@mui/icons-material/Group';
import styles from '../../styles/groups.module.css';

const Group = ({ selectedGroup, setSelectedGroup, group, setShowSelected, setKey }) => {

    console.log(selectedGroup)

    const { deleteGroup } = useContext(GroupsContext)

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [group])

    const selectShowMembers = () => {
        setShowSelected(true);
        setSelectedGroup(group.id);
        //setKey('selected');

        console.log("мы нажали")
        console.log(selectedGroup)
    }

    useEffect(()=>{
        console.log(selectedGroup)
    }, [selectedGroup])

    return (
        <tr key={group.id} className={selectedGroup == group.id ? `${styles.selectedGroup}` : ''}>

            <td nowrap="true">{group.name}</td>
            <td>{group.headTeacher.fio}</td>
            <td>{group.maxCapacity}</td>
            <td>{group.educationalProgram.name}</td>

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
                    <button onClick={() => deleteGroup(group.id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>

                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Состав группы
                        </Tooltip>
                    }>
                    <button onClick={selectShowMembers} className={`btn btn-act ${selectedGroup == group.id ? `text-secondary` : 'text-primary'}`} data-toggle="modal"><GroupIcon /></button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Редактировать группу
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm theGroup={group} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </tr>
    )
}

export default Group;