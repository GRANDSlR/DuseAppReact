
import {getUserByToken} from './Users.js';

export const verifyUsersCookies = async () =>{

  const token = getCookies('space-cookies');

  if(token == null)
    return false;

  const userModel = await getUserByToken(token);

  const userSession = JSON.parse(sessionStorage.getItem('userModel'));

  if(JSON.stringify(userModel) != JSON.stringify(userSession))
    return false;

  return true;
}

export default verifyUsersCookies;


export const getCookies = (name) => {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
  
  