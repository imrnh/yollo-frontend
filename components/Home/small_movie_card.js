import styles from '@/styles/profile.module.css';
import getRequest from '@/utilities/get_req';


export default function MiniMovieCard({ movie, genres, publishers, rating, delete_path }) {
    return <div className={styles.mini_movie_card_wrapper}>
        <img src={`http://localhost:5298/content/${movie?.banner_url}`} alt={movie?.title} />
        <div className={styles.mini_movie_info_wrapper}>
            <h4>{movie?.title?.substring(0, 15)}...</h4>
            <p className={styles.mini_movie_info_genre_p}>
                {genres?.map(genre => (
                    <a href={`home/movies?genre=${genre.id}`}>{genre.name},</a>
                ))}
            </p>

            <div className={styles.mini_movie_info_bottm_part}>
                <p className={styles.mini_movie_info_rating_p}>{rating}/10</p>
                <div>
                    <a className={styles.mini_movie_info_play_link} href={`/home/watch/${movie?.slug}`}>Play</a>
                    <button style={{backgroundColor: "transparent", color: "brown", border: "0", marginRight: "10px"}} className={styles.mini_movie_info_play_link} href={`/home/watch/${movie?.slug}`}
                        onClick={()=>{
                            getRequest(delete_path + movie?.id)
                                .then(res=>alert(res.value))
                                .catch(err=>"error deleting: " + err)
                        }}
                    >Delete</button>
                </div>
            </div>
        </div>
    </div>
}