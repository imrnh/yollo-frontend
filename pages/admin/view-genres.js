import AdminSidebar from "@/components/Admin/sidebar";
import styles from "@/styles/admin.module.css";
import getRequest from "@/utilities/get_req";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { every } from "rxjs";


export default function UploadMovies() {

    const [all_genres, setAllGenres] = useState([]);
    const [edit_enabled, setEditEnabled] = useState([]);

    const router = new useRouter();

    useEffect(() => {

        getRequest("/admin/allgenres")
            .then(response => {
                setAllGenres(response.all_genres)
                var response_length = response.all_genres.length
                for (let i = 0; i < response_length; i++) {
                    edit_enabled.push(false);
                }
            })
            .catch(error => alert(error));

    }, []);

    const delete_handler = (event) => {

    }

    const onFormEvent = event => {
        event.preventDefault();

        var new_id = event.target[0].value;
        var new_name = event.target[1].value

        var path = "/admin/updategenre?genre_id=" + new_id + "&genre_name=" + new_name;

        getRequest(path).then(res => { res ? alert("Changed the name to " + new_name) : alert("Error") }).catch(error => alert("Error: " + error));

        router.push("/admin/view-genres/")
    }


    return <div className={styles.admin_wrapper}>
        <AdminSidebar />

        <div className={styles.list_view_wrapper}>
            <h1>All the genres</h1>
            <div className={styles.list_view_header}>
                <p>Genre Id</p>
                <p>Genre Name</p>
                <p>Options</p>
            </div> <br />


            <div className={styles.list_view_content}>

                {all_genres.map((element, index) => (
                    <>
                        <form key={index} className={styles.list_view_form} onSubmit={onFormEvent} >
                            <input type="number" name="genre_name" value={element.id} disabled />
                            <input className={styles.list_view_editable_toggle_input} type="text" name="genre_name" value={element.name} disabled={!edit_enabled[index]}
                                onChange={
                                    (event) => {
                                        const genres = [...all_genres];
                                        genres[index].name = event.target.value;
                                        setAllGenres(genres);
                                    }
                                }
                            />
                            <div className={styles.option_pane}>
                                <button type="button" className={styles.edit_button} hidden={edit_enabled[index]} onClick={() => {
                                    var updated_array = [...edit_enabled];
                                    updated_array[index] = true
                                    setEditEnabled(updated_array)
                                    console.log("Index: " + index)
                                    console.log("Edit enabled list: " + updated_array)
                                }}>Edit</button>
                                <button type="submit" className={styles.update_button} hidden={!edit_enabled[index]}>Update</button>
                                <button type="button" className={styles.delete_button} onClick={() => {
                                    var path = "/admin/deletegenre?genre_id=" + element.id;
                                    getRequest(path).then(res => { res ? alert("Deleted the genre "+ element.name) : alert("Error") }).catch(error => alert("Error: " + error));
                                }}>Delete</button>
                            </div>
                        </form > <br />
                    </>
                ))}

            </div>
        </div>
    </div >
}