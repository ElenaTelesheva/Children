import { Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton, ThemeProvider } from "react-bootstrap"
import { ChildrenContext } from '../../contexts/ChildrenContext';
import { useContext, useState, useEffect } from 'react';

const EditChildForm = ({ theChild }) => {

    console.log(theChild)

    const { groups } = useContext(ChildrenContext);
    const { healthGroups } = useContext(ChildrenContext);
    const { relationships } = useContext(ChildrenContext);

    const { updateChild } = useContext(ChildrenContext);

    const [updatedChild, setUpdatedChild] = useState({

        id: theChild.id, surname: theChild.surname, name: theChild.name, patronymic: theChild.patronymic,
        email: theChild.email, gender: theChild.gender, birthDate: theChild.birthDate,
        avatar: theChild.avatar, groupId: theChild.groupId, address: theChild.address,
        healthGroupId: theChild.healthGroupId, healthNote: theChild.healthNote,
        parents: null
    })

    const [parentFirst, setParentFirst] = useState({
        surname: "", name: "", patronymic: "", email: "",
        phoneNumber: "", workPlace: "", relationshipId: 1
    })
    const [parentSecond, setParentSecond] = useState({
        surname: "", name: "", patronymic: "", email: "",
        phoneNumber: "", workPlace: "", relationshipId: 1
    })
    const [parentThird, setParentThird] = useState({
        surname: "", name: "", patronymic: "", email: "",
        phoneNumber: "", workPlace: "", relationshipId: 1
    })

    const [groupName, setGroupName] = useState("");
    const [firstRelationshipName, setFirstRelationshipName] = useState("");
    const [secondRelationshipName, setSecondRelationshipName] = useState("");
    const [thirdRelationshipName, setThirdRelationshipName] = useState("");

    useEffect(() => {
        if (theChild.parents.length == 1) {
            setParentFirst(theChild.parents[0])
            setNumberParents(1)
            setFirstRelationshipName(theChild.parents[0].relationship.name);
        }
        else if (theChild.parents.length == 2) {
            setParentFirst(theChild.parents[0])
            setParentSecond(theChild.parents[1])
            setNumberParents(2)
            setFirstRelationshipName(theChild.parents[0].relationship.name);
            setSecondRelationshipName(theChild.parents[1].relationship.name);
        }
        else if (theChild.parents.length == 3) {
            setParentFirst(theChild.parents[0])
            setParentSecond(theChild.parents[1])
            setParentThird(theChild.parents[2])
            setNumberParents(3)
            setFirstRelationshipName(theChild.parents[0].relationship.name);
            setSecondRelationshipName(theChild.parents[1].relationship.name);
            setThirdRelationshipName(theChild.parents[2].relationship.name);
        }
        if (theChild.group != null) {
            setGroupName(theChild.group.name);
        }

    }, [theChild])


    //Методы обновления поля детей и родителей

    const onInputChange = (e) => {
        setUpdatedChild({ ...updatedChild, [e.target.name]: e.target.value })
    }

    const onInputChangeFirstParent = (e) => {
        setParentFirst({ ...parentFirst, [e.target.name]: e.target.value })
    }
    const onInputChangeSecondParent = (e) => {
        setParentSecond({ ...parentSecond, [e.target.name]: e.target.value })
    }
    const onInputChangeThirdParent = (e) => {
        setParentThird({ ...parentThird, [e.target.name]: e.target.value })
    }

    const onDropdownButtonChangeGroup = (newValue) => {
        setUpdatedChild({ ...updatedChild, groupId: Number(newValue) })
        groups.map(group => {
            if (group.id == newValue) {
                setGroupName(group.name);
            }
        })
    }

    const onDropdownButtonChangeFirstRelationship = (newValue) => {
        setParentFirst({ ...parentFirst, relationshipId: newValue })
        relationships.map(relationship => {
            if (relationship.id == newValue) {
                setFirstRelationshipName(relationship.name);
            }
        })
    }
    const onDropdownButtonChangeSecondRelationship = (newValue) => {
        setParentSecond({ ...parentSecond, relationshipId: newValue })
        relationships.map(relationship => {
            if (relationship.id == newValue) {
                setSecondRelationshipName(relationship.name);
            }
        })
    }
    const onDropdownButtonChangeThirdRelationship = (newValue) => {
        setParentThird({ ...parentThird, relationshipId: newValue })
        relationships.map(relationship => {
            if (relationship.id == newValue) {
                setThirdRelationshipName(relationship.name);
            }
        })
    }

    const { surname, name, patronymic, email, gender,
        birthDate, avatar, groupId, address,
        healthGroupId, healthNote } = updatedChild;

    const handleSubmit = (e) => {
        e.preventDefault();

        let temp = updatedChild;
        if (gender == "false") temp.gender = false;
        else if (gender == "true") temp.gender = true;

        if (numberParents == 1) {
            let temp_parents = []
            temp_parents.push(parentFirst)
            temp.parents = temp_parents;
        }
        else if (numberParents == 2) {
            let temp_parents = []
            temp_parents.push(parentFirst)
            temp_parents.push(parentSecond)
            temp.parents = temp_parents;
        }
        else if (numberParents == 3) {
            let temp_parents = []
            temp_parents.push(parentFirst)
            temp_parents.push(parentSecond)
            temp_parents.push(parentThird)
            temp.parents = temp_parents;
        }

        updateChild(temp);
    }

    const [numberParents, setNumberParents] = useState(1);

    function addNewParent(e) {
        e.preventDefault();
        if (numberParents < 3) setNumberParents(prev => prev + 1)
    }

    function deleteNewParent(e) {
        e.preventDefault();
        if (numberParents > 1) setNumberParents(prev => prev - 1)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                Фамилия
                <Form.Control
                    type="text"
                    placeholder="Фамилия *"
                    name="surname"
                    value={updatedChild.surname}
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
                    value={updatedChild.name}
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
                    value={updatedChild.patronymic}
                    onChange={(e) => onInputChange(e)}
                />
            </Form.Group>
            <Form.Group>
                Электронная почта
                <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={updatedChild.email}
                    onChange={(e) => onInputChange(e)}
                />
            </Form.Group>
            <Form.Group>
                Дата рождения
                <Form.Control
                    type="date"
                    placeholder="Дата рождения"
                    name="birthDate"
                    value={updatedChild.birthDate}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            Адрес
            <Form.Control
                as="textarea"
                placeholder="Адрес"
                name="address"
                value={updatedChild.address}
                onInput={(e) => onInputChange(e)}
                row={3}
                required
            />

            Учебная группа (при наличии)
            <DropdownButton id="dropdown-basic-button" title={groupName} onSelect={onDropdownButtonChangeGroup} required>
                {
                    groups.map(group => (
                        <Dropdown.Item eventKey={group.id} href={`#/action-${group.id}`}>{group.name}</Dropdown.Item>
                    ))
                }
            </DropdownButton>
           

            <br />Пол<br />
            <ToggleButtonGroup type="radio" name="gender" defaultValue={gender}>
                <ToggleButton id="tbg-radio-1" value={true} onChange={(e) => onInputChange(e)}>
                    Женский
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value={false} onChange={(e) => onInputChange(e)}>
                    Мужской
                </ToggleButton>
            </ToggleButtonGroup>

            <br />Группа здоровья <br />
            <ToggleButtonGroup type="radio" name="healthGroupId" defaultValue={healthGroupId} >
                {
                    healthGroups.map(healthGroup => (
                        <ToggleButton id={`tbg-radio2-${healthGroup.id}`} value={healthGroup.id} onChange={(e) => onInputChange(e)}>{healthGroup.name}</ToggleButton>
                    ))
                }
            </ToggleButtonGroup>

            <br />Примечание о здоровье<br />
            <Form.Control
                as="textarea"
                placeholder="Примечание"
                name="healthNote"
                value={updatedChild.healthNote}
                onInput={(e) => onInputChange(e)}
                row={3}
            />


            <br />
            <h5>Данные о первом родственнике</h5>
            <br />
            <Form.Group>
                Фамилия
                <Form.Control
                    type="text"
                    placeholder="Фамилия *"
                    name="surname"
                    value={parentFirst.surname}
                    onChange={(e) => onInputChangeFirstParent(e)}
                    required
                />
                Имя
                <Form.Control
                    type="text"
                    placeholder="Имя *"
                    name="name"
                    value={parentFirst.name}
                    onChange={(e) => onInputChangeFirstParent(e)}
                    required
                />
                Отчество
                <Form.Control
                    type="text"
                    placeholder="Отчество"
                    name="patronymic"
                    value={parentFirst.patronymic}
                    onChange={(e) => onInputChangeFirstParent(e)}
                />
                Электронная почта
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={parentFirst.email}
                    onChange={(e) => onInputChangeFirstParent(e)}
                    required
                />
                Место работы
                <Form.Control
                    as="textarea"
                    placeholder="Место работы"
                    name="workPlace"
                    value={parentFirst.workPlace}
                    onInput={(e) => onInputChangeFirstParent(e)}
                    row={3}
                    required
                />
                Телефон
                <Form.Control
                    type="text"
                    placeholder="Телефон"
                    name="phoneNumber"
                    value={parentFirst.phoneNumber}
                    onChange={(e) => onInputChangeFirstParent(e)}
                />

                Тип родства
                <DropdownButton id="dropdown-basic-button" title={firstRelationshipName} onSelect={onDropdownButtonChangeFirstRelationship}  >
                    {
                        relationships.map(relationship => (
                            <Dropdown.Item eventKey={relationship.id} href={`#/action-${relationship.id}`}>{relationship.name}</Dropdown.Item>
                        ))
                    }
                </DropdownButton>
            </Form.Group>

            <br />
            {numberParents == 1 &&
                <Button variant="warning" onClick={addNewParent}>Добавить ещё родственника</Button>
            }

            {(numberParents == 2 || numberParents == 3) &&
                <Form.Group>
                    <br /><h5>Данные о втором родственнике</h5><br />


                    Фамилия
                    <Form.Control
                        type="text"
                        placeholder="Фамилия *"
                        name="surname"
                        value={parentSecond.surname}
                        onChange={(e) => onInputChangeSecondParent(e)}
                        required
                    />
                    Имя
                    <Form.Control
                        type="text"
                        placeholder="Имя *"
                        name="name"
                        value={parentSecond.name}
                        onChange={(e) => onInputChangeSecondParent(e)}
                        required
                    />
                    Отчество
                    <Form.Control
                        type="text"
                        placeholder="Отчество"
                        name="patronymic"
                        value={parentSecond.patronymic}
                        onChange={(e) => onInputChangeSecondParent(e)}
                    />
                    Электронная почта
                    <Form.Control
                        type="email"
                        placeholder="Email *"
                        name="email"
                        value={parentSecond.email}
                        onChange={(e) => onInputChangeSecondParent(e)}
                        required
                    />
                    Место работы
                    <Form.Control
                        as="textarea"
                        placeholder="Место работы"
                        name="workPlace"
                        value={parentSecond.workPlace}
                        onInput={(e) => onInputChangeSecondParent(e)}
                        row={3}
                        required
                    />
                    Телефон {parentSecond.phoneNumber}
                    <Form.Control
                        type="text"
                        placeholder="Телефон"
                        name="phoneNumber"
                        value={parentSecond.phoneNumber}
                        onChange={(e) => onInputChangeSecondParent(e)}
                    />

                    Тип родства
                    <DropdownButton id="dropdown-basic-button" title={secondRelationshipName} onSelect={onDropdownButtonChangeSecondRelationship}  >
                        {
                            relationships.map(relationship => (
                                <Dropdown.Item eventKey={relationship.id} href={`#/action2-${relationship.id}`}>{relationship.name}</Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                    <br />
                    {numberParents == 2 &&
                        <Button variant="danger" onClick={deleteNewParent}>Удалить родственника</Button>
                    }
                </Form.Group>
            }

            {numberParents == 2 &&
                <Button variant="warning" onClick={addNewParent}>Добавить ещё родственника</Button>
            }

            {numberParents == 3 &&
                <Form.Group>
                    <br /><h5>Данные о третьем родственнике</h5><br />

                    Фамилия
                    <Form.Control
                        type="text"
                        placeholder="Фамилия *"
                        name="surname"
                        value={parentThird.surname}
                        onChange={(e) => onInputChangeThirdParent(e)}
                        required
                    />
                    Имя
                    <Form.Control
                        type="text"
                        placeholder="Имя *"
                        name="name"
                        value={parentThird.name}
                        onChange={(e) => onInputChangeThirdParent(e)}
                        required
                    />
                    Отчество
                    <Form.Control
                        type="text"
                        placeholder="Отчество"
                        name="patronymic"
                        value={parentThird.patronymic}
                        onChange={(e) => onInputChangeThirdParent(e)}
                    />
                    Электронная почта
                    <Form.Control
                        type="email"
                        placeholder="Email *"
                        name="email"
                        value={parentThird.email}
                        onChange={(e) => onInputChangeThirdParent(e)}
                        required
                    />
                    Место работы
                    <Form.Control
                        as="textarea"
                        placeholder="Место работы"
                        name="workPlace"
                        value={parentThird.workPlace}
                        onInput={(e) => onInputChangeThirdParent(e)}
                        row={3}
                        required
                    />
                    Телефон
                    <Form.Control
                        type="text"
                        placeholder="Телефон"
                        name="phoneNumber"
                        value={parentSecond.phoneNumber}
                        onChange={(e) => onInputChangeThirdParent(e)}
                    />

                    Тип родства
                    <DropdownButton id="dropdown-basic-button" title={thirdRelationshipName} onSelect={onDropdownButtonChangeThirdRelationship}  >
                        {
                            relationships.map(relationship => (
                                <Dropdown.Item eventKey={relationship.id} href={`#/action3-${relationship.id}`}>{relationship.name}</Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                    <br />
                    <Button variant="danger" onClick={deleteNewParent}>Удалить родственника</Button>
                </Form.Group>
            }

            <br /><br /><br />
            <Button variant="success" type="submit" block>
                Редактировать обучающегося
            </Button>
        </Form>

    )
}

export default EditChildForm;