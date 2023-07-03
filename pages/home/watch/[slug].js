import Header from "@/components/global/Header";
import getRequest from "@/utilities/get_req";
import { useEffect, useState } from "react";
import styles from '@/styles/watch.module.css';
import MovieCard from "@/components/Home/movie_card";
import { elementAt } from "rxjs";
import postRequest from "@/utilities/post_req";

export default function Watch({ slug, data }) {

    /*
        TODO:
            - watch movie and movie info.
            - view movie reviews.
            - Publish movie review.
            - Get movies with similar genre. - [Optional]
    
    */



    const [movie_data, setMovieData] = useState([]);

    const [rating_count, setRatingCount] = useState();
    const [movie_genres, setMovieGenrs] = useState([]);
    const [movie_publishers, setMoviePublishers] = useState([]);
    const [movie_reviews, setMovieReviews] = useState([]);



    const [rangeValue, setRangeValue] = useState(0);

    const handleRangeChange = (event) => {
        setRangeValue(event.target.value);
    };


    const path = `/home/watch?slug=${slug}`;
    useEffect(() => {
        getRequest(path).then(response => {
            setMovieData(response.movie);
            setMovieGenrs(response.genres);
            setMoviePublishers(response.publishers);
        }).catch(error => { console.log(error) });

    }, [slug]);

    useEffect(() => {

        //add the movie to watch history
        getRequest("/home/addmovietowatchhistory?movie_id=" + movie_data?.id)
            .then(res => console.log("movie added to watch history"))
            .catch(err => alert("Error adding movie to watch history: " + err))
    }, [movie_data])


    useEffect(() => {
        //read featured movie rating count.
        getRequest('/home/getavgrating?mvi=' + movie_data.id)
            .then((responseData) => { setRatingCount(responseData.ratings) })
            .catch((error) => { alert("Error: " + error) })

        //get all reviews of the movie.
        getRequest("/home/getallreviews?mvi=" + movie_data.id)
            .then((responseData) => { setMovieReviews(responseData.reviews) })
            .catch((error) => { alert("Error: " + error) })
    }, [movie_data]);


    useEffect(
        () => { },
        [movie_reviews]
    );


    const reviewSubmitHandler = event => {
        event.preventDefault();

        console.log(event);
        var data = {
            mid: movie_data?.id,
            rating: event.target[0].value,
            review: event.target[1].value,
        }


        postRequest(data, "/home/postreview")
            .then((response) => { if (response.status_code == 200) { alert(response.message) } else { throw (response.message); } })
            .catch((error) => { alert("Error: " + error) })
    }

    return (
        <div className={styles.search_page_wrapper}>
            <Header />
            <div className={styles.movie_watch_wrapper}>
                <div className={styles.movie_content_holder}>
                    <video className={styles.movie_content} controls>
                        {movie_data?.movie_files && movie_data.movie_files.length > 0 && (
                            <source src={`http://localhost:5298/content/${movie_data.movie_files[0]}`} />
                        )}
                    </video>
                    <div className={styles.movie_info_holder}>
                        <h1>{movie_data?.title}</h1> <br />

                        <p>{movie_data?.description}</p> <br />
                        <p><b>Genres: </b>  {movie_genres?.map(genre => (<a key={genre.id} href={`/home/movies?genre=${genre.id}`}>{genre.name}, </a>))} </p>
                        <p><b>Publihsers: </b>  {movie_publishers?.map(publ => (<a key={publ.id} href={`/home/movies?publishers=${publ.id}`}>{publ.name}, </a>))} </p>
                        <p><b>Published:</b> {movie_data?.published_at?.substring(0, 4)}</p>
                        <p><b>Age limit: </b>{movie_data?.age_limit}+</p>
                    </div>
                </div>

                <div style={{ height: "1px", width: "var(--global-display-width)", backgroundColor: "rgb(40,40,40)", marginTop: "100px" }}></div>

                <div className={styles.review_section}>
                    <p><b>Avg. Rating:</b> {rating_count?.toFixed(1)} </p>
                    <p><b>Total Reviews:</b> {movie_reviews?.length ?? 0}</p>
                    <br />
                    <form onSubmit={reviewSubmitHandler} className={styles.review_form}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", backgroundColor: "transparent", marginTop: "-10px", marginRight: "50px" }}>
                            <input style={{ width: "100px" }}
                                type="range"
                                min={0}
                                max={10}
                                value={rangeValue}
                                onChange={handleRangeChange}
                            /> <br />
                            <p style={{ marginTop: "-30px" }}>Rating: {rangeValue}</p>
                        </div>
                        <input type="text" placeholder="Write your review..." />
                        <button type="submit" >Post</button> <br /><br /><br />
                    </form> <br /> <br /> <br />



                    {Array.isArray(movie_reviews) && movie_reviews.length > 0 ? (
                        movie_reviews.map((review, index) => (
                            <div className={styles.review_render_p}>
                                <p ><b style={{ color: "rgb(200,200,200)" }}>{review.user_name}</b></p>
                                <p style={{ fontSize: "14px", color: "grey" }} key={index}>
                                    {review.review}
                                </p></div>
                        ))
                    ) : (
                        <p style={{ color: "brown", fontSize: "16px" }}>No reviews available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;


    try {
        const response = await fetch(path);
        const data = await response.json();

        console.log("response: ", response);

        return {
            props: {
                slug,
                data: data.movie // Access the "response" array from the API response
            }
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                slug,
                data: [] // Provide an empty array if there is an error fetching the data
            }
        };
    }
}
