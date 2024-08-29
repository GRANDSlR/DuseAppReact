
import {getUserByToken} from '../../entities/UserFetches.js';


export const verifyUsersCookies = async (userState) =>{

  const token = getCookies('space-cookies');

  if(token == null)
    return false;

  const userModel = await getUserByToken(token);

  if(JSON.stringify(userModel) != userState)
    return false;

  return true;
}

export default verifyUsersCookies;

export const getCookies = (name) => {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const deleteCookies = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
  
  