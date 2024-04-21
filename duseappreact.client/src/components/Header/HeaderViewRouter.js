import {  useLocation } from 'react-router-dom';

const useIsActiveButton = (name) => 
    useIsCurrentRoute(name) ? true : false

export default useIsActiveButton;

const useIsCurrentRoute = (name) => 
    useLocation()['pathname'] === '/' + name;