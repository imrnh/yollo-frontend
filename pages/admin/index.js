import AdminSidebar from "@/components/Admin/sidebar";
import styles  from "@/styles/admin.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";



export default function AdminDashboard(){

    const router = new useRouter();

    var token = Cookies.get("token");
    var user_level = Cookies.get("role");

    useEffect(()=>{
        if(!token || user_level != 2){
            router.push("/home")
        }
    }, []);
 
 
 return <div className={styles.admin_wrapper}>
        <AdminSidebar />
    </div>
}