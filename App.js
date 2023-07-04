import { Modal, Button, Alert, Nav, NavDropdown } from 'react-bootstrap';
import LoginForm from './components/employees/LoginForm';
import { useState, useEffect } from "react";
import EmployeeList from './components/employees/EmployeeList';
import EmployeeContextProvider from './contexts/EmployeesContext';
import ChildrenList from './components/children/ChildrenList';
import ChildrenContextProvider from './contexts/ChildrenContext';
import GroupsContextProvider from './contexts/GroupsContext';
import GroupsList from './components/groups/GroupsList';
import LessonsMain from './components/schedule/LessonsMain';
import LessonsContextProvider from './contexts/LessonsContext';
import EventsList from './components/events/EventsList';
import EventsContextProvider from './contexts/EventsContext';
import styles from './styles/app.module.css';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from './data/logo.jpg'

const url = "http://localhost:59575/api/";

const exit = async () => {

  const requestOptions = {
    method: 'GET',
    credentials: "include",
  };

  const response = await fetch(`${url}account/logout`, requestOptions)
  try {
    const data = await response.json();
    //удаляем пользователя из localstorage
    localStorage.clear();

  }
  catch (e) {
    alert(e.message);
  }
};

function App() {

  const [user, setUser] = useState(null)

  const [isLoggedIn, setLoggedIn] = useState(false);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [isRoleAdmin, setRoleAdmin] = useState(false);
  const [isRoleMethodist, setRoleMethodist] = useState(false);
  const [isRoleTeacher, setRoleTeacher] = useState(false);
  const [isRoleSteward, setRoleSteward] = useState(false);

  //проверка куков
  const checkAuthCookie = () => {
    const aspCookie = '.AspNetCore.Cookies';
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${aspCookie}=`)

    if (parts.length !== 2)
      return false;

    let authCookie = parts.pop().split(';').shift()
    return authCookie !== undefined;
  }

  useEffect(() => {

    console.log("первый рендеринг")

    if (!checkAuthCookie()) localStorage.clear();
    else setUser(JSON.parse(localStorage.getItem('user')))

  }, [])

  useEffect(() => {

    if (user != null) {
      setLoggedIn(true)
      checkRole();
    }
    handleClose();
    handleSelect(0);
    //checkActivity();
  }, [user])

  useEffect(() => {

    console.log(checkAuthCookie())

    if (!checkAuthCookie()) {
      setLoggedIn(false)
      setUser(null)
    }
    //checkActivity();
  })

  function checkRole() {

    user.roles.map(role => {
      if (role.id == 1) setRoleAdmin(true)
      else if (role.id = 2) setRoleMethodist(true)
      else if (role.id = 3) setRoleTeacher(true)
      else if (role.id = 4) setRoleSteward(true)
    })
  }

  const [selectedSection, setSelectedAction] = useState(0);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleSelect = (eventKey) => {
    setSelectedAction(eventKey);
    if (eventKey == 5 || eventKey == 6) setShowSchedule(true);
    else setShowSchedule(false);
    console.log(eventKey)
    //console.log(user.roles)
    //console.log(isRoleAdmin)
  }

  const logOut = () => {
    exit();
    setUser(null);
    setLoggedIn(false);
    setRoleAdmin(false);
    setRoleMethodist(false);
    setRoleTeacher(false);
    setRoleSteward(false);
    setSelectedAction(0);
    handleSelect(0)
  }

  return (

    <div>
      <div className={`table-title ${styles.navPanel}`}>
        <div className="row">
          <Nav variant="pills" activeKey={selectedSection} onSelect={handleSelect}>
            {isLoggedIn &&
              <>
                <Nav.Item>
                  <Nav.Link eventKey={1} href="#/home">
                    Сотрудники
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={2} title="Item">
                    Обучающиеся
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={3}>
                    Группы
                  </Nav.Link>
                </Nav.Item>

              </>
            }
            <NavDropdown title="Расписание" id="nav-dropdown" active={showSchedule == true}>
              <NavDropdown.Item eventKey={5}>Расписание по группам</NavDropdown.Item>
              <NavDropdown.Item eventKey={6}>Расписание по педагогам</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Nav.Link eventKey={7}>
                Мероприятия
              </Nav.Link>
            </Nav.Item>

            {isLoggedIn
              ? <Button variant="success" onClick={logOut} block><span>Выйти</span></Button>
              : <Button onClick={handleShow} className="btn" data-toggle="modal"><PersonIcon />Войти в аккаунт</Button>
            }
            {isLoggedIn &&
              <Nav.Item>
                <Nav.Link eventKey={10} disabled>
                  <div className='text-secondary'><SettingsIcon /></div>
                </Nav.Link>
              </Nav.Item>
            }

          </Nav>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Войти в аккаунт
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm da="da" setUser={setUser} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      {selectedSection == 0 &&
        <>
          <img className={styles.img_logo} src={logo}></img>
          <div className={styles.banner_text}>Учреждение дополнительного образования детей</div>
        </>
      }

      {selectedSection == 5 &&
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <LessonsContextProvider>
                <LessonsMain isLogged={isLoggedIn} theType="group" />
              </LessonsContextProvider>
            </div>
          </div>
        </div>
      }

      {selectedSection == 6 &&
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <LessonsContextProvider>
                <LessonsMain isLogged={isLoggedIn} theType="teacher" />
              </LessonsContextProvider>
            </div>
          </div>
        </div>
      }

      {selectedSection == 7 &&
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <EventsContextProvider>
                <EventsList isLogged={isLoggedIn} />
              </EventsContextProvider>
            </div>
          </div>
        </div>
      }

      {isRoleAdmin &&
        <>
          {selectedSection == 1 &&
            <div className="container-xl">
              <div className="table-responsive">
                <div className="table-wrapper">
                  <EmployeeContextProvider>
                    <EmployeeList />
                  </EmployeeContextProvider>
                </div>
              </div>
            </div>
          }

          {selectedSection == 2 &&
            <div className="container-xl">
              <div className="table-responsive">
                <div className="table-wrapper">
                  <ChildrenContextProvider>
                    <ChildrenList />
                  </ChildrenContextProvider>
                </div>
              </div>
            </div>

          }

          {selectedSection == 3 &&
            <div className="container-xl">
              <div className="table-responsive">
                <div className="table-wrapper">
                  <GroupsContextProvider>
                    <GroupsList />
                  </GroupsContextProvider>
                </div>
              </div>
            </div>
          }
        </>
      }

    </div>



  );
}

export default App;
