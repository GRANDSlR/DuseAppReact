import {  useLocation } from 'react-router-dom';

export const useIsActiveButton = (nameArray) => 
    useIsCurrentRoute(nameArray) ? true : false

export default useIsActiveButton;

export const useIsActiveButtonFromData = (data) => {

    let result = false;

    for (let i = 0; i < data.length; i++)
        useLocation()['pathname'] === data[i].link ? result=true : null;

    return result;
}

const useIsCurrentRoute = (nameArray) => 
    useLocation()['pathname'] === '/' + nameArray;