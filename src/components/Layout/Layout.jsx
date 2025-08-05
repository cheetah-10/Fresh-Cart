import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from "react-router-dom";
import UserProfile from '../UserProfile/UserProfile';


function Layout() {
    return (
        <>

        <Navbar></Navbar>
      <UserProfile></UserProfile>
        <Outlet></Outlet>
        <Footer></Footer>

        </>
      );
}

export default Layout;