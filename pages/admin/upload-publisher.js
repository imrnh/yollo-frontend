import AdminSidebar from "@/components/Admin/sidebar";
import styles from "@/styles/admin.module.css";
import getRequest from "@/utilities/get_req";
import postRequest from "@/utilities/post_req";
import { useEffect, useState } from "react";


export default function UploadMovies() {

    const [all_genres, setAllGenres] = useState([]);
    const [all_publishers, setAllPublishers] = useState([]);

    useEffect(() => {

        getRequest("/admin/allgenres")
            .then(response => {
                setAllGenres(response.all_genres)
            })
            .catch(error => alert(error));

        getRequest("/admin/allpublishers")
            .then(response => {
                setAllPublishers(response.all_publishers)
            })
            .catch(error => alert(error));
    }, []);


    const onSubmitHandler = event => {
        event.preventDefault();
        var data = {
            name: event.target[0].value
        }
        postRequest(data, "/admin/addpublisher").then(response => {
            if (response.status_code == 200) {
                alert(response.message)
            } else {
                alert("error: " + response.message)
            }
        }).catch(error => alert(error))

    }


    return <div className={styles.admin_wrapper}>
        <AdminSidebar />
        <div className={styles.movie_upload_wrapper}>

            <form className={styles.movie_upload_form} onSubmit={onSubmitHandler} >
                <h1>Add a new publisher</h1>
                <div className={styles.form_group}>
                    <h4>Title</h4>
                    <input className={styles.text_pass} type="text" name="name" placeholder="Publisher name" required />
                </div>

                <br /><br />
                <button className={styles.pctrl_control_submit_button} type="submit">+ Add</button>
            </form>
        </div>
    </div>
}