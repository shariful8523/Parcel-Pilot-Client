import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar'
import Footer from '../Pages/shared/Footer'

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <section className='mt-32'>
                <Footer />
            </section>
        </div>
    );
};

export default RootLayout;