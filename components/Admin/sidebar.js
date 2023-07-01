import styles from "@/styles/admin.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";


export default function AdminSidebar() {
    const router = new useRouter();
    return <div className={styles.admin_sidebar_wrapper}>

        <button onClick={()=>{
            Cookies.remove("token");
            Cookies.remove("role");

            router.push("/");
        }} className={styles.admin_logout_buttn} type="button">Logout</button>

        <div className={styles.sidebar_sub_comp}>
            <p className={styles.sidebar_sub_comp_name}>Movie/TV Show</p>
            <div className={styles.sidebar_button_div}>
                <a href="/admin/upload-movie">Add movie/tv-show</a> <br /><br />
                <a href="">View all movie/tv-show</a> <br />
            </div>
        </div>

        <div className={styles.sidebar_sub_comp}>
            <div className={styles.sidebar_sub_comp_name}>Genre</div>
            <div className={styles.sidebar_button_div}>
                <a href="/admin/upload-genre">Add a new genre</a> <br /><br />
                <a href="">View all genres</a> <br />
            </div>
        </div>

        <div className={styles.sidebar_sub_comp}>
            <p className={styles.sidebar_sub_comp_name}>Publisher</p>
            <div className={styles.sidebar_button_div}>
                <a href="/admin/upload-publisher">Add a new publisher</a> <br /><br />
                <a href="">View all publishers</a> 
            </div>
        </div>

    </div>
}
