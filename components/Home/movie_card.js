import styles from '@/styles/Home.module.css';
import postRequest from '@/utilities/post_req';


export default function MovieCard({ movie, genres, rating }) {

    const addMovieToWatchLater = (movie_id, movie_title) => {
        var path = "/home/addmovietowatchlater";
        var data = {
            movieid: movie_id
        }

        postRequest(data, path).then(() => {
            //alert that data added successfully
            alert(movie_title + " added to watch later.")
        }).catch(error => {
            //alert error
            console.log("Error adding movie: " + error)
            alert("Error: " + error)
        })
    }


    return <div className={styles.movie_card_wrapper} style={{ backgroundImage: `url('${movie.banner_url}')` }}>
        <div className={styles.movie_card_overlay}></div>
        <div className={styles.movie_card_details_pan}>
            <p className={styles.movie_card_title}>{movie.title.length > 15 ? movie.title.substring(0, 15) + " ..." : movie.title}</p>
            <p className={styles.movie_card_description}>{movie.description.length > 62 ? movie.description.substring(0, 62) + " ..." : movie.description}</p>
            <p className={styles.movie_card_genre_names}>
                {
                    genres.map(genre => (
                        <a href={`home/movies?genre=${genre.id}`}>{genre.name + ", "}</a>
                    )
                    )
                }
            </p>
            <div className={styles.movie_card_rating_count}>
                {rating} <img src='/icons/star.png' />
            </div>

            <div className={styles.movie_card_play_button_wrapper}>
                <a href='movie_pay_page/movie_slug'> <button className={styles.movie_card_play_buttn} type='button'>Play</button></a>

                <button onClick={() => addMovieToWatchLater(movie.id, movie.title)} className={styles.movie_card_watch_later_button} type='submit'>
                    <img src='/icons/favourite.png' title='Add to watch later' />
                </button>

            </div>
        </div>
    </div>
}