import Header from "@/components/global/Header";
import getRequest from "@/utilities/get_req";
import { useEffect, useState } from "react";
import styles from '@/styles/search.module.css';
import MovieCard from "@/components/Home/movie_card";
import { elementAt } from "rxjs";

export default function SearchMovies({ query, data }) {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        var path = `/home/searchmovies?q=${query}`;
        getRequest(path).then(response => {
            setSearchResult(response.response);
            console.log(response.response);
        }).catch(error => { console.log(error) });

    }, [data]);

    return (
        <div className={styles.search_page_wrapper}>
            <Header />
            <div className={styles.search_page_view}>
                <h1>Search result for {query}</h1>

                <div className={styles.search_result_view}>

                    {Array.isArray(searchResult) && searchResult.length > 0 ? (
                        searchResult.map((element) => (
                            <MovieCard
                                key={element.movie.id}
                                movie={element.movie}
                                genres={element.genres}
                                rating={element.rating}
                            />
                        ))
                    ) : (
                        <p style={{ color: "orange", fontSize: "20px" }}>
                            No movie found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { query } = params;
    const path = `http://localhost:5298/home/searchmovies?q=${query}`;

    try {
        const response = await fetch(path);
        const data = await response.json();

        console.log("response: ", response);

        return {
            props: {
                query,
                //data: data.response // Access the "response" array from the API response
            }
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                query,
                data: [] // Provide an empty array if there is an error fetching the data
            }
        };
    }
}
