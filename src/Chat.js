import openSocket from "socket.io-client";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";


const Chat = ({socket, name}) => {
    const {id} = useParams();

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('')

    useEffect(() => {

        socket.emit('join', {name, roomId: id, })
        socket.on('message', (message) => {
            setMessages([...messages, message])
        });
        socket.emit('getMessages', id)

    }, []);

    useEffect(() => {
        socket.emit('getMessages', id)
        socket.on('setMessages', (messages) => {
            setMessages(messages.messages)
        })
    }, [messages])

    const click = (text) => {
        socket.emit('chatMessage', text);
    }

    return <div>
        <input type="text" onChange={(e) => {
            setMessageText(e.target.value)
        }}/>
        <button onClick={() => {
            click(messageText)
        }}>Click
        </button>
        {messages.map((el) => {
            return <div>{el.text}</div>
        })}

        {JSON.stringify(id)}


    </div>
}

export default Chat;