import AdminSidebar from "@/components/Admin/sidebar";
import styles from "@/styles/admin.module.css";
import getRequest from "@/utilities/get_req";
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

        console.log(event);
    }


    return <div className={styles.admin_wrapper}>
        <AdminSidebar />
        <div className={styles.movie_upload_wrapper}>

            <form className={styles.movie_upload_form} onSubmit={onSubmitHandler} >
                <h1>Add a new Movie / TV show</h1>
                <div className={styles.form_group}>
                    <h4>Title</h4>
                    <input className={styles.text_pass} type="text" name="title" placeholder="Title" required />
                </div>
                <div className={styles.form_group}>
                    <h4>Description</h4>
                    <input className={styles.text_pass} type="text" name="desc" placeholder="Description." required />
                </div>
                <div className={styles.form_group}>
                    <h4>Age limit</h4>
                    <input className={styles.text_pass} type="number" name="age_limit" placeholder="Age limit" required />
                </div>
                <div className={styles.form_group}>
                    <h4>Banner </h4>
                    <input className={styles.text_pass} type="file" name="banner" placeholder="Banner" required />
                </div>
                <div className={styles.form_group}>
                    <h4>Files</h4>
                    <input className={styles.text_pass} type="file" name="files" placeholder="files" required multiple />
                    <p className={styles.input_details} style={{ marginTop: "-10px" }}>* Uploading multiple file is allowed.</p>
                </div>

                <div className={styles.form_group}>
                    <h4>Number of episods</h4>
                    <input className={styles.text_pass} type="number" name="noepisods" placeholder="Number of episods" required multiple />
                    <p className={styles.input_details}>* If you are uploading a movie, number of episods are 1</p>
                </div>

                <div className={styles.form_group} style={{ display: "flex", flexDirection: "row" }}>
                    <h4>TV show?</h4>
                    <input style={{ width: "20px", height: "20px", marginTop: "-1px", marginLeft: "20px" }} className={styles.text_pass} type="checkbox" name="isseries" />
                </div>

                <div className={styles.form_group}>
                    <div className={styles.pctrl_genre_selector_div}>
                        <h3>Genres</h3>
                        <div style={{ marginTop: "30px", display: "flex", flexWrap: "wrap" }}>
                            {all_genres.map(element => (
                                <div className={styles.genre_selector_child}><input type="checkbox" name={element.id} /> <p>{element.name}</p> <br /></div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className={styles.form_group}>
                    <div className={styles.pctrl_genre_selector_div}>
                        <h3>Publishers</h3>
                        <div style={{ marginTop: "30px", display: "flex", flexWrap: "wrap" }}>
                            {all_publishers.map(element => (
                                <div className={styles.genre_selector_child}><input type="checkbox" name={element.id} /> <p>{element.name}</p> <br /></div>
                            ))}
                        </div>
                    </div>
                </div>
                                <br /><br />
                <button className={styles.pctrl_control_submit_button} type="submit">+ Add</button>
            </form>
        </div>
    </div>
}