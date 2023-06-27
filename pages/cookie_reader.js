import Cookies from 'js-cookie';
import { useState } from 'react';



export default function CookieReader(){

    const [token, updateToken] = useState();
    const [role, updateRole] = useState();

    function readCookie(){
        updateToken(Cookies.get('token'));
        updateRole(Cookies.get('role'));

        console.log("Token: "+ token);
        console.log("Role: "+ role);
    }


    function logout(){
        Cookies.remove('token');
        Cookies.remove('role');
    }
    
    return (<>

        <p>Role: {role}</p><br />
        <p style={{width: '600px'}}>Token: {token}</p> <br /> <br />

        <button type='button' style={{width: '200px', height: "40px", color: "black", backgroundColor: "white", border: '0', fontSize: "15px"}} onClick={readCookie}>Read Cookie</button>

        <br /> <br />
        <button onClick={logout} type='buttn' style={{width: '100px', height: "30px", color: "red", backgroundColor: "white", border: '0', fontSize: "12px"}}>Logout</button>
    </>);
}