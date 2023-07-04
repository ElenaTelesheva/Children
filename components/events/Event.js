import { useContext, useState, useEffect } from 'react';
import { EventsContext } from '../../contexts/EventsContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditEventForm'
import styles from '../../styles/events.module.css';

const Event = ({ event, isLogged }) => {



    return (
        <tr key={event.id}>

            <td nowrap="true">{event.name}</td>
            <td>{event.educationalDirection.name}</td>
            <td>{event.date} {event.startTime}</td>
            <td>{event.organizatorFio}</td>
            <td>{event.room.number}</td>
            <td>{event.description}</td>

            {isLogged &&

                <td nowrap="true">
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Редактировать
                            </Tooltip>
                        }>
                        <button className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Удалить
                            </Tooltip>
                        }>
                        <button className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                    </OverlayTrigger>
                </td>
            }



        </tr>
    )
}

export default Event;