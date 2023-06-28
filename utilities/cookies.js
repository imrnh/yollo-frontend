import Cookies from "js-cookie";


export function setCookie({ name, value, path = '/', expires = 30 }) {
    try {
        Cookies.set(name, value, { expires: expires, path: path });
        return true;
    } catch (error) {
        return (false, error);
    }
}


export function getCookie({ name }) {
    return Cookies.get(name);
}

export function removeCookie({ name }) {
    Cookies.remove(name);
}