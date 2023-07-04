import { Alert, Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton } from "react-bootstrap"
import { GroupsContext } from '../../contexts/GroupsContext';
import { useContext, useState, useEffect } from 'react';
import styles from '../../styles/groups.module.css'
import FeedbackIcon from '@mui/icons-material/Feedback';


const AddGroupForm = () => {

    const { addGroup } = useContext(GroupsContext);

    const { programs } = useContext(GroupsContext);
    const { headTeachers } = useContext(GroupsContext);
    const { getTeachersByProgram } = useContext(GroupsContext);

    const [showHeadTeachers, setShowHeadTeachers] = useState(false);

    const [newGroup, setNewGroup] = useState({
        name: "", headTeacherId: 0, maxCapacity: 0, educationalProgramId: 0
    })

    const { name, headTeacherId, maxCapacity, educationalProgramId } = newGroup;

    const [programName, setProgramName] = useState("");
    const [headTeacherName, setHeadTeacherName] = useState("");

    const onInputChange = (e) => {
        setNewGroup({ ...newGroup, [e.target.name]: e.target.value })
    }

    const onDropdownButtonChangeProgram = (newValue) => {
        console.log(newValue)
        let temp = newGroup;
        newGroup.educationalProgramId = newValue;
        newGroup.headTeacherId = 0;
        setNewGroup(temp);
        getTeachersByProgram(newValue);
        setHeadTeacherName("");
        setShowHeadTeachers(true);
        setShowAlertProgram(false);
        setShowAlertTeacher(false);
        programs.map(program => {
            if (program.id == newValue) {
                setProgramName(program.name);
            }
        })
    }

    const onDropdownButtonChangeTeacher = (newValue) => {
        setNewGroup({ ...newGroup, headTeacherId: newValue })
        headTeachers.map(headTeacher => {
            if (headTeacher.id == newValue) {
                setHeadTeacherName(headTeacher.fio);
            }
        })
    }



    // useEffect(() => {
    //     if (programs.length != 0) {
    //         onDropdownButtonChangeProgram(programs[0].id);
    //     }
    // }, [programs])

    // useEffect(() => {
    //     if (headTeachers.length != 0) {
    //         onDropdownButtonChangeTeacher(headTeachers[0].id)
    //     }
    // }, [headTeachers])

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

        addGroup(newGroup);
    }

    const [showAlertTeacher, setShowAlertTeacher] = useState(false);
    const [showAlertProgram, setShowAlertProgram] = useState(false);

    useEffect(() => {
        console.log("ffffffffffffffffffffffffff")
        console.log(educationalProgramId)
    }, [educationalProgramId])

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


            {showHeadTeachers &&
                <>
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
                    <FeedbackIcon className={styles.orange_feedback} /> Выберите, пожалуйста, одного из педагогов!
                </p>
            </Alert>

            <Button variant="success" type="submit" block>
                Добавить группу
            </Button>
        </Form>

    )
}

export default AddGroupForm;