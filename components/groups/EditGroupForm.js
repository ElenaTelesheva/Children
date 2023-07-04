import { Alert, Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton } from "react-bootstrap"
import { GroupsContext } from '../../contexts/GroupsContext';
import { useContext, useState, useEffect } from 'react';
import styles from '../../styles/groups.module.css'
import FeedbackIcon from '@mui/icons-material/Feedback';



const EditGroupForm = ({ theGroup }) => {

    const { updateGroup } = useContext(GroupsContext);

    const { programs } = useContext(GroupsContext);
    const { headTeachers } = useContext(GroupsContext);
    const { getTeachersByProgram } = useContext(GroupsContext);

    const [updatedGroup, setUpdatedGroup] = useState({
        id: theGroup.id, name: theGroup.name, headTeacherId: theGroup.headTeacherId,
        maxCapacity: theGroup.maxCapacity, educationalProgramId: theGroup.educationalProgramId
    })

    const [programName, setProgramName] = useState("");
    const [headTeacherName, setHeadTeacherName] = useState("");

    const [showAlertTeacher, setShowAlertTeacher] = useState(false);
    const [showAlertProgram, setShowAlertProgram] = useState(false);

    useEffect(() => {
        console.log("fffffffff")
        console.log(theGroup)

        setProgramName(theGroup.educationalProgram.name);

        getTeachersByProgram(theGroup.educationalProgramId);

        setHeadTeacherName(theGroup.headTeacher.fio);


    }, [programs])

    // useEffect(() => {
    //     if (headTeachers.length != 0) {
    //         headTeachers.map(headTeacher => {
    //             if (headTeacher.id == theGroup.headTeacherId) {
    //                 setHeadTeacherName(headTeacher.fio);
    //             }
    //         })
    //     }
    // }, [])

    const onInputChange = (e) => {
        setUpdatedGroup({ ...updatedGroup, [e.target.name]: e.target.value })
    }

    const onDropdownButtonChangeTeacher = (newValue) => {
        setUpdatedGroup({ ...updatedGroup, headTeacherId: newValue })
        headTeachers.map(headTeacher => {
            if (headTeacher.id == newValue) {
                setHeadTeacherName(headTeacher.fio);
            }
        })
    }
    const onDropdownButtonChangeProgram = (newValue) => {
        console.log(newValue)
        getTeachersByProgram(newValue);
        let temp = updatedGroup;
        updatedGroup.educationalProgramId = newValue;
        updatedGroup.headTeacherId = 0;
        setUpdatedGroup(temp)
        setHeadTeacherName("");
        setShowAlertProgram(false);
        setShowAlertTeacher(false);
        programs.map(program => {
            if (program.id == newValue) {
                setProgramName(program.name);
            }
        })
    }

    const { name, headTeacherId, maxCapacity, educationalProgramId } = updatedGroup;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (educationalProgramId == 0) {
            setShowAlertProgram(true);
            return;
        }

        if (headTeacherId == 0) {
            if (showAlertProgram == false && headTeachers.length != 0) {
                setShowAlertTeacher(true);
            }
            return;
        }

        updateGroup(updatedGroup);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                Название группы
                <Form.Control
                    type="text"
                    placeholder="Название *"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                Максимальная вместимость {maxCapacity}
                <Form.Control
                    type="number"
                    placeholder="Максимальная вместимость"
                    name="maxCapacity"
                    pattern="[0-9]*"
                    value={Number(maxCapacity).toString()}
                    onInput={(e) => onInputChange(e)}
                    min="0"
                    max="3000"
                    required
                />
            </Form.Group>

            Образовательная программа {educationalProgramId}
            <DropdownButton id="dropdown-basic-button" title={programName} onSelect={onDropdownButtonChangeProgram}>
                {
                    programs.map(program => (
                        <Dropdown.Item eventKey={program.id} href={`#/action-${program.id}`}>{program.name}</Dropdown.Item>
                    ))
                }
            </DropdownButton>

            {headTeachers.length != 0
                ? <>
                    Классный руководитель {headTeacherId}
                    <DropdownButton id="dropdown-basic-button" title={headTeacherName} onSelect={onDropdownButtonChangeTeacher}>
                        {
                            headTeachers.map(headTeacher => (
                                <Dropdown.Item eventKey={headTeacher.id} href={`#/action-${headTeacher.id}`}>{headTeacher.fio}</Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                </>
                : <>
                    <br />
                    <Alert variant="secondary">
                        <p>
                            <FeedbackIcon className={styles.orange_feedback} /> Не найдено ни одного подходящего педагога для данной образовательной программы!
                            Выберите, пожалуйста, другую программу.
                        </p>
                    </Alert>
                </>
            }

            <br />
            <Alert show={showAlertProgram} variant="secondary">
                <p>
                    <FeedbackIcon className={styles.orange_feedback} /> Выберите, пожалуйста, одну из образовательных программ!
                </p>
            </Alert>

            <Alert show={showAlertTeacher} variant="secondary">
                <p>
                    <FeedbackIcon className={styles.orange_feedback} /> Выберите, пожалуйста, одного из преподавателей!
                </p>
            </Alert>
            <br /><br />
            <Button variant="success" type="submit" block>
                Редактировать группу
            </Button>
        </Form>

    )
}

export default EditGroupForm;