// import React from 'react'
// import { Link } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";

// export default function HomePage() {

//     const auth = getAuth();
//     signOut(auth).then(() => {
//       // Sign-out successful.
//     }).catch((error) => {
//       // An error happened.
//     });

//   return (
//     <div>
//       <h1>HomePage</h1>
//       <Link to="/SignIn" className="px-2">
//                   Logout
//        </Link>
       
//     </div>
//   )
// }

import {  signOut } from "firebase/auth";
import {auth} from '../firebaseconfig.js';
import { useNavigate } from 'react-router-dom';
 
const HomePage = () => {
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
          console.log(error)
        // An error happened.
        });
    }
   
    return(
        <>
            <nav className="nav" style={{display: "flex", justifyContent: "space-between" , alignItems: "center" , padding: "5px 20px"}}>
                <p style={{fontSize: "30px", fontWeight: "bold"}}>
                    File Manager
                </p>
                <div>
                      <button onClick={handleLogout} style={{backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer", marginRight: "10px"}}>
                        Logout
                      </button>
                </div>
            </nav>
        </>
    )
}
 
export default HomePage;

