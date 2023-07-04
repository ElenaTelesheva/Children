import { useContext, useState, useEffect } from 'react';
import { Alert, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Member from './Member'
import PersonOffIcon from '@mui/icons-material/PersonOff';
import styles from '../../styles/groups.module.css';


const url = "http://localhost:59575/api/";

const getFutureChildren = async (programId) => {

    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}child?withoutGroup=true&eduProgramId=${programId}`, requestOptions)
    try {
        const data = await response.json();
        //alert(data);
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const getCurrentChildren = async (groupId) => {

    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    const response = await fetch(`${url}child?groupId=${groupId}`, requestOptions)
    try {
        const data = await response.json();
        //alert(data);
        return data;
    }
    catch (e) {
        alert(e.message);
    }
}

const GroupMembers = ({ theType, theGroup, isChange, setIsChange }) => {

    const [children, setChildren] = useState(null);

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const loadCurrentChildren = async () => {
        const resultChildren = await getCurrentChildren(theGroup.id);
        setChildren(resultChildren);
    }

    const loadFutureChildren = async () => {
        const resultChildren = await getFutureChildren(theGroup.educationalProgramId);
        setChildren(resultChildren);
    }

    useEffect(() => {
        console.log("зашлиииииии")
        if (theType == "current") {
            loadCurrentChildren();
        }
        else if (theType == "future") {
            loadFutureChildren();
        }

    }, [theType, theGroup, isChange])

    return (
        <>
            {children == null || children.length == 0
                ? <div className={styles.no_children}><PersonOffIcon className="text-danger" />Обучающиеся, соответствующие данному запросу, не найдены...</div>
                /* ? <Alert show={showAlert} variant="warning">
                    Список пуст!
                </Alert> */
                : <div>
                    <Alert show={showAlert} variant="success">
                        Список успешно загружен!
                    </Alert>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th nowrap="true">ФИО</th>
                                <th nowrap="true">Дата рождения</th>
                                <th>Адрес</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                children.map(child => (
                                    <Member setIsChange={setIsChange} theType={theType} key={child.id} theChild={child} groupId={theGroup.id} />
                                ))
                            }

                        </tbody>
                    </table>

                </div>
            }
        </>

    )
}

export default GroupMembers;