import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import http from 'http';
import styles from '@/styles/pctrl.module.css';
import Header from "@/components/global/Header";
import getRequest from "@/utilities/get_req";
import postRequest from "@/utilities/post_req";

export default function ParentalControl() {

    //update activated or not from db.
    const [activated, toggleActvated] = useState(true);
    const [all_genres, setAllGenres] = useState([]);

    var token = Cookies.get('token');


    useEffect(() => {
        getRequest("/home/pctrlactivestatus").then(res => { toggleActvated(res.pctrl_status) }).catch(error => { alert(error) })
        getRequest("/home/allgenres")
            .then(response => {
                setAllGenres(response.genres)
            })
            .catch(error => alert(error));
    }, []);




    const readAllowedGenres = event => {
        //making list of value=true genres.
        var allowed_genres = [];

        const form = event.target;
        const formElements = form.elements;

        for (let i = 2; i < formElements.length - 1; i++) {
            const element = formElements[i];
            if (element.checked) {
                allowed_genres.push(element.name);
            }
        }

        return allowed_genres;
    }


    const onSubmitHandler = event => {
        event.preventDefault();

        var data = {
            activate: !activated,
            password: event.target[0].value,
            agelimit: Number(event.target[1].value),
            genres: readAllowedGenres(event)
        }

        postRequest(data, "/home/parentalcontrol").then(result => { alert(result.message); console.log(result) }).catch(error => alert("Error: " + error.message));

    }


    const form_height_controller_style = {
        height: activated ? "300px" : "700px"
    }




    return <>
        <Header />
        <div className={styles.pctrl_wrapper}>
            <h1>{activated ? "Deactivate parental control" : "Activate parental control"}</h1> <br />
            {activated ? "" : <><p>Parental control gives you control over content your children watch. Restrict what genre they watch and what is the age limit. And the best part is, it is password protected. So your children can't unlock. Please do not use the same password as original one.
            </p>  <div style={{ height: "1px", width: "100%", backgroundColor: "gray", marginTop: "20px" }}> </div></>}



            <center>
                <form onSubmit={onSubmitHandler} className={styles.pctrl_form_wrapper} style={form_height_controller_style}>

                    <div className={styles.form_group}>
                        <h4>Password for parental control</h4>
                        <input className={styles.text_pass} type="password" name="pctrl_password" placeholder="Password" required />
                        <p className={styles.input_details}>*Set an strong password. We suggest this password to be different than your original password.</p>
                    </div>
                    <br />
                    {
                        activated ? "" : <>
                            <div className={styles.form_group}>
                                <h4>Age limit</h4>
                                <input className={styles.text_pass} type="number" name="age_limit" placeholder="Age limit" required />
                                <p className={styles.input_details}>* Your child can only watch content with age limit less than given.</p>
                            </div>

                            <div className={styles.form_group}>
                                <div className={styles.pctrl_genre_selector_div}>
                                    <h3>Allowed genres</h3>
                                    <div style={{ marginTop: "30px", display: "flex", flexWrap: "wrap" }}>
                                        {all_genres.map(element => (
                                            <div className={styles.genre_selector_child}><input type="checkbox" name={element.id} /> <p>{element.name}</p> <br /></div>
                                        ))}
                                    </div>
                                </div>
                            </div></>
                    }
                    <button className={styles.pctrl_control_submit_button} type="submit">{activated ? "De-activate" : "Activate"}</button>
                </form>
            </center>
        </div>
    </>
}



