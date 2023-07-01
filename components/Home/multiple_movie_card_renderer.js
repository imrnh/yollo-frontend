import Cookies from 'js-cookie';
import http from 'http';
import MovieCard from '@/components/Home/movie_card';
import getRequest from '@/utilities/get_req';
import postRequest from '@/utilities/post_req';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';


export default function MultipleMovieCardRenderer({ title, count }) {
    const [top_picks_movies, setTopPicksMovies] = useState([]);

    useEffect(() => {
        getRequest('/home?count=' + count)
            .then((responseData) => { setTopPicksMovies(responseData["all_movies"]) })
            .catch((error) => { console.error('Error:', error); });

    }, []);




    return (
        <div className={styles.multiple_move_card_rendere_wrapper}>
            <h1>{title}</h1> <br />

            {top_picks_movies.forEach(el => {
                console.log(el)
            })}

            <div className={styles.top_picks_movie_card_holder}>
                {Array.isArray(top_picks_movies) ?
                    top_picks_movies.map((element) => (
                        <MovieCard movie={element.movie} genres={element.genres} rating={element.rating} />
                    ))
                    : "ERROR"
                }

            </div>
        </div>
    );
}