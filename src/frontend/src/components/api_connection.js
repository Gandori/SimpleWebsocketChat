import axios from 'axios';

const URL = 'http://localhost:10000/'

export function api_get(route, setValue)
{
    axios.get(`${URL}${route}`).then(res =>{
            var data = res.data;
            setValue(data);
        })
        .catch(e => {
            console.log(e);
        })
};

export function api_post(route, data, setState)
{
    axios.post(`${URL}${route}`, data).then(res =>{
        setState(res.data)
    })
    .catch(e => {
        console.log(e);
    })
};