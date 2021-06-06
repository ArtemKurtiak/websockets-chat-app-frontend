import Chat from "./Chat";
import {useEffect, useState} from "react";
import openSocket, {io} from "socket.io-client";
import {BrowserRouter, NavLink} from "react-router-dom";
import {Route, Switch, useHistory} from "react-router";

let socket;
const ENDPOINT = 'http://localhost:5000'


const App = () => {
    const [name, setName] = useState('John')
    const history = useHistory();
    const [groups, setGroups] = useState([])
    useEffect(() => {
        socket = io(ENDPOINT)

    } ,[])

    useEffect(() => {
        socket.on('groups', (groups) => {
            setGroups(groups)
        })
    }, [])

    return <div>
        <BrowserRouter>
            <Route path='/' exact >
                <input type="text" onChange={(e) => {
                    setName(e.target.value)
                }} />
        Groups: {
        groups.map((el) => {
            return <NavLink to={`/chat/${el.id}`} >  <div>
                {el.name}
            </div>
            </NavLink>
        })
    }
            </Route>


        <Switch>
            <Route path='/chat/:id' exact >
                <Chat socket={socket} name={name}  />
            </Route>
        </Switch>
    </BrowserRouter>

    </div>
}

export default App;