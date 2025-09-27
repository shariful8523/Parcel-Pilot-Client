import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar'
import Footer from '../Pages/shared/Footer'

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;