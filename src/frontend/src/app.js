import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.sass';
import Chat from './pages/chat/index';
import Signin from './pages/signin/index';

export default () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route index element={<Signin></Signin>}></Route>
                    <Route path='chat' element={<Chat></Chat>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}