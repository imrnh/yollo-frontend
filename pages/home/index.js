import Cookies from 'js-cookie';
import http from 'http';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/global/Header';
import getRequest from '@/utilities/get_req';
import postRequest from '@/utilities/post_req';
import styles from '@/styles/Home.module.css';
import MovieCard from '@/components/Home/movie_card';
import MultipleMovieCardRenderer from '@/components/Home/multiple_movie_card_renderer';

export default function Home() {
    const [auth_token, updateAuthToken] = useState();
    const [featured_movie, setFeaturedMovie] = useState();
    const [featured_rating_count, setFeaturedRatingCount] = useState();
    const [featuredMovieGenres, setFeaturedMovieGenrs] = useState();



    const router = useRouter();


    useEffect(() => {
        if (!Cookies.get('token') || Cookies.get('role') == 2) {
            router.push('/auth/signin');
        }

        updateAuthToken(Cookies.get('token'));

        //read featured movie data.
        getRequest('/home/watch?slug=WALL-E7M1SI5NCHV')
            .then((responseData) => { setFeaturedMovie(responseData) })
            .catch((error) => { console.error('Error:', error); });

        //read featured movie rating count.
        getRequest('/home/getavgrating?mvi=4')
            .then((responseData) => { setFeaturedRatingCount(responseData) })
            .catch((error) => { console.log("Error: " + error) })

        postRequest({ id: [1, 78, 80] }, '/home/genreidtoname')
            .then((responseData) => { setFeaturedMovieGenrs(responseData); })
            .catch((error) => { console.log("Error: " + error) })



    }, []);


    return (
        <div style={{}}>
            <Header />
            <main className={styles.home}>


                <div className={styles.featured_movie}>
                    <video className={styles.featured_movie_banner} muted>
                        <source src="/videos/videoplayback.webm" />
                    </video>

                    <div className={styles.featured_overlay}></div>
                    <div className={styles.featured_movie_content}>

                        <p className={styles.featured_movie_desc}>{featured_movie?.movie?.description ?? 'No description available'}</p>

                        <div className={styles.featued_movie_info}>

                            <p>{featured_movie?.movie?.age_limit + '+' ?? 'N/A'}</p>

                            <div className={styles.rating_div}>
                                <p>{featured_rating_count?.ratings}</p>
                                <img src="icons/star.png" alt="Star" />
                            </div>
                        </div>
                        <div className={styles.featured_movie_genre_name_div}>Genres:
                            {featuredMovieGenres?.genre_name?.map(genre => (
                                <p className={styles.featured_movie_genre_name}>
                                    <a href={`home/movies?genre=${genre.id}`}>{genre.name},</a>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>


                <section className={styles.other_sections}>
                    <MultipleMovieCardRenderer title={"Top picks for you"} count={6} />
                    <div className={styles.other_section_divider_div}></div>

                    <MultipleMovieCardRenderer title={"Trending"} count={12} />
                    <div className={styles.other_section_divider_div}></div>

                </section>
            </main>
        </div>
    );
}