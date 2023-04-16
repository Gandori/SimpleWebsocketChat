import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api_post } from '../../components/api_connection';
import './index.sass';

export default () => {
    const [username, setUsername] = useState(null);
    const [res , setRes] = useState(null);

    function submit(){
        if (!username) {return};

        api_post('signin', {'username':username}, setRes);
    }

    if (res){
        return <Navigate to='/chat' state={res} replace={true}></Navigate>
    }

    console.log(res);

    return (
        <div id='signin'>
            <label>Benutzernamen Festlegen</label>
            
            <input type='text' onChange={e => setUsername(e.target.value)}></input>

            <button onClick={submit}>Weiter</button>
        </div>
    )
}