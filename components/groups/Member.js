import { useContext, useState, useEffect } from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

const url = "http://localhost:59575/api/";

//здесь будет запрос на добавление

const addChildrenToGroup = async (groupId, childId) => {
    const body = JSON.stringify(
        {
            groupId: groupId,
            childId: childId
        })

    const requestOptions = {
        method: 'PATCH',
        body: body,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    const response = await fetch(`${url}child/group`, requestOptions)
    try {
        const data = await response.json();
        //alert(data);
        return data;
    }
    catch (e) {
        alert(e.message);
    }

};

//здесь будет запрос на удаление

const deleteChildrenFromGroup = async (childId) => {
    const body = JSON.stringify(
        {
            groupId: null,
            childId: childId
        })

    const requestOptions = {
        method: 'PATCH',
        body: body,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    const response = await fetch(`${url}child/group`, requestOptions)
    try {
        const data = await response.json();
        //alert(data);
        return data;
    }
    catch (e) {
        alert(e.message);
    }

};

const Member = ({ setIsChange, theType, theChild, groupId }) => {


    const addChild = async () => {
        const resultAdd = await addChildrenToGroup(groupId, theChild.id);
        setIsChange(true);
    }

    const deleteChild = async() => {
        const resultAdd = await deleteChildrenFromGroup(theChild.id);
        setIsChange(true);
    }

    return (
        <tr key={theChild.id} >

            <td nowrap="true">{theChild.surname} {theChild.name} {theChild.patronymic}</td>
            <td>{theChild.birthDate}</td>
            <td>{theChild.address}</td>

            {theType == "current"
                ? <td nowrap="true">
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Удалить из группы
                            </Tooltip>
                        }>
                        <button onClick={deleteChild} className="btn text-danger btn-act" data-toggle="modal"><GroupRemoveIcon /></button>
                    </OverlayTrigger>
                </td>
                : <td nowrap="true">
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Добавить в группу
                            </Tooltip>
                        }>
                        <button onClick={addChild} className="btn text-success btn-act" data-toggle="modal"><GroupAddIcon /></button>
                    </OverlayTrigger>
                </td>

            }

        </tr>
    )

}

export default Member;