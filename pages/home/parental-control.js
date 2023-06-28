import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import http from 'http';

export default function ParentalControl() {

    //update activated or not from db.
    const [activated, toggleActvated] = useState(false);

    var token = Cookies.get('token');


    useEffect(() => {
        checkParentalStatus();
    }, []);


    const checkParentalStatus = async () => {
        const options = {
            hostname: 'localhost',
            port: 5298,
            path: '/home/pctrlactivestatus',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                var response = responseData;
                console.log(response);
                toggleActvated(response.pctrl_status);
            });
        });

        req.on('error', (error) => {
            console.error('Error:', error.message);
        });

        req.end();
    }



    if(activated){
        //code to de-activate parental control
        
    }
    else{
        //code to activate parental control.
    }
}