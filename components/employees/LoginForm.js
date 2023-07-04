import { Form, Button, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton } from "react-bootstrap"
import { useState } from "react";

const url = "http://localhost:59575/api/";

const auth = async (login, password) => {
    const body = JSON.stringify(
        {
            login: "admin",
            password: "admin"
        })

    const requestOptions = {
        method: 'POST',
        body: body,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    };

    const response = await fetch(`${url}account/login`, requestOptions)
    try {
        const data = await response.json();
        //alert(data);

        //записываем пользователя в localstorage
        localStorage.setItem('user', JSON.stringify(data));

        return data;
    }
    catch (e) {
        alert(e.message);
    }

    // update the state
    //setUser(response);
};

const RegisterForm = ({ da, setUser }) => {

    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("")

    // const onInputChange = (e) => {
    //     setUser({ ...user, [e.target.name]: e.target.value })
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(da)

        const resultAuth = await auth(login, password);
        setUser(resultAuth)
        console.log(resultAuth)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                Логин
                <Form.Control
                    type="text"
                    placeholder="Логин"
                    name="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
            </Form.Group>
            Пароль
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Пароль"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <br/><br/>
            <Button variant="success" type="submit" block>
                Войти
            </Button>

        </Form>
    )


}

export default RegisterForm;