import AdminSidebar from "@/components/Admin/sidebar";
import styles from "@/styles/admin.module.css";
import getRequest from "@/utilities/get_req";
import { useEffect, useState } from "react";


export default function UploadMovies() {

    const [all_genres, setAllGenres] = useState([]);
    const [all_publishers, setAllPublishers] = useState([]);

    useEffect(() => {
        getRequest("/admin/allgenres")
            .then((response) => {
                setAllGenres(response.all_genres);
            })
            .catch((error) => alert(error));

        getRequest("/admin/allpublishers")
            .then((response) => {
                setAllPublishers(response.all_publishers);
            })
            .catch((error) => alert(error));
    }, []);
    const [selectedBanner, setSelectedBanner] = useState(null);

    const handleBannerChange = (event) => {
        setSelectedBanner(event.target.files[0]);
    };


    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoChange = (event) => {
        setSelectedVideo(event.target.files[0]);
    };


    const readValidGenreIds = (event, start, end) => {
        //making list of value=true genres.
        var allowed_genres = [];

        const form = event.target;
        const formElements = form.elements;
        
      
        for (let i = start; i < end; i++) {
            const element = formElements[i];
            if (element.checked) {
                allowed_genres.push(element.name);
            }
        }

        return allowed_genres;
    }


    const readPublishers = (event, start, end) => {
        //making list of value=true genres.
        var allowed_publishers = [];

        const form = event.target;
        const formElements = form.elements;

        for (let i = start; i < end; i++) {
            const element = formElements[i];
            if (element.checked) {
                allowed_publishers.push(element.name);
            }
        }

        return allowed_publishers;
    }

    const handleContentUpload = (event) => {
        event.preventDefault();

       
        const formData = new FormData();
        formData.append('banner', selectedBanner);
        formData.append('video', selectedVideo);
        formData.append('title', event.target[0].value);
        formData.append('desc', event.target[1].value);
        formData.append('age_limit', event.target[2].value);
        formData.append('published_at', event.target[3].value);
        formData.append('no_eps', event.target[6].value);
        formData.append('is_series', event.target[7].value);

        var movie_genres = readValidGenreIds(event, 8, 8 + all_genres.length).join(', ');
        var movie_publishers = readPublishers(event, 8 + all_genres.length + 1, 8 + all_genres.length + all_publishers.length -1).join(', ');



        formData.append('genres', movie_genres);
        formData.append('publishers', movie_publishers);



        // Send the video file to the backend API
        fetch('http://localhost:5298/admin/videoupload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Movie added successfully:', data);
                // Handle successful video upload
            })
            .catch((error) => {
                alert('Error uploading video:', error);
                // Handle error
            });
    };



    return <div className={styles.admin_wrapper}>
        <AdminSidebar />
        <div className={styles.movie_upload_wrapper}>

            <form className={styles.movie_upload_form} onSubmit={handleContentUpload} >
                <h1>Add a new Movie / TV show</h1>
                <div className={styles.form_group}>
                    <h4>Title</h4>
                    <input className={styles.text_pass} type="text" name="title" placeholder="Title" required />
                </div>
                <div className={styles.form_group}>
                    <h4>Description</h4>
                    <input className={styles.text_pass} type="text" name="description" placeholder="Description." required />
                </div>
                <div className={styles.form_group}>
                    <h4>Age limit</h4>
                    <input className={styles.text_pass} type="number" name="agelimit" placeholder="Age limit" required />
                </div>
                <div className={styles.form_group}>
                    <h4>Published at</h4>
                    <input className={styles.text_pass} type="date" name="publishedat" required />
                </div>
                <div className={styles.form_group}>
                    <h4>Banner </h4>
                    <input onChange={handleBannerChange} className={styles.text_pass} type="file" name="banner" placeholder="Banner" required />
                </div>
                <div className={styles.form_group}>
                    <h4>Files</h4>
                    <input className={styles.text_pass} type="file" name="movies" placeholder="files" required accept="video/*" onChange={handleVideoChange} />
                    <p className={styles.input_details} style={{ marginTop: "-10px" }}>* Uploading multiple file is allowed.</p>
                </div>

                <div className={styles.form_group}>
                    <h4>Number of episods</h4>
                    <input className={styles.text_pass} type="number" name="noofepisodes" placeholder="Number of episods" required multiple />
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
                                <div className={styles.genre_selector_child}><input type="checkbox" name={element.id} /> <p>{element.name} {element.id}</p> <br /></div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className={styles.form_group}>
                    <div className={styles.pctrl_genre_selector_div}>
                        <h3>Publishers</h3>
                        <div style={{ marginTop: "30px", display: "flex", flexWrap: "wrap" }}>
                            {all_publishers.map(element => (
                                <div className={styles.genre_selector_child}><input type="checkbox" name={element.id} /> <p>{element.name} {element.id}</p> <br /></div>
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