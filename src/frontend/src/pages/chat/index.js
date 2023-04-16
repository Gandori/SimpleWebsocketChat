import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './index.sass';

export default () => {

    const [websocket, setWebsocket] = useState(null);
    const [userinput, setUserinput] = useState('');
    const [active_users, setActive_users] = useState([])
    const [messages, setMessages] = useState([])
    const username = useLocation().state

    useEffect(() => {
        let socket = new WebSocket(`ws://localhost:10000/ws/${username}`);
        setWebsocket(socket);
    }, [])
    

    if (websocket)
    {
        websocket.onmessage = event => {
            let data = JSON.parse(event.data);
            setActive_users(data.user);
            setMessages(data.message);
        }
    }

    function submit() {
        if (userinput == '') {return;};
        websocket.send(JSON.stringify({'username': username, 'message': userinput}));
        setUserinput('')
    }

    return (
        <div id='chat'>

            <div id='container_outer'>
                <h5 id='header'>USER</h5>
                <div id='container_inner'>
                    {active_users.map((user, key) =>{
                        return <label key={key}>{user}</label>
                    })}
                </div>
            </div>

            <div id='container_outer'>
                <h5 id='header'>CHAT</h5>
                <div id='user_input_container'>
                    <input type='text' value={userinput}  onChange={e => setUserinput(e.target.value)}></input>
                    <button onClick={submit}>senden</button>
                </div>
                <div id='container_inner'>
                    {messages.map((message, key) => {
                        return <label key={key}><span>{message.username}: </span>{message.message}</label>
                    })}
                </div>
            </div>

        </div>
    )
}