import logo from '../../assets/logo.png'

import linkedin from '../../assets/linkedin.png'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/twitter.png'
import youtube from '../../assets/youtube.png'



const Footer = () => {
    return (
        <footer
            className="footer footer-horizontal bg-[#0B0B0B]  w-11/12 mx-auto rounded-3xl mt-5 footer-center  text-primary-content p-10">
            <aside className='  space-y-4'>

                <section className='flex flex-col sm:flex-row  items-center sm:items  gap-3 '>
                    <img className='  w-32' src={logo} alt="" />
                    <h1 className=' text-4xl lg:text-6xl font-bold mt-8'>Parcel Pilot</h1>
                </section>


                <p className="font-bold text-[#b4aaaa]">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business
                    shipments — we deliver on time, every time.
                </p>

            </aside>

            <div className=' grid grid-cols-1'>

                <span className='text-[#737373] '>- - - - - - -  - - - - -  - - -  - - - - - - - - - - - - - - - - - -  - - -  -  - - -  -
                    - - - - - - - - - - - - - - - - -  - - - -  - - -  - - - - - - - - - - - - - - - - - -  - - -</span>
                <ul className=' md:flex gap-7 text-[#b4aaaa] text-lg'>

                    <li>Services</li>
                    <li>Coverage</li>
                    <li>About Us</li>
                    <li>Pricing</li>
                    <li>Be a Rider</li>
                </ul>
                <span className='text-[#737373] '>- - - - - - -  - - - - -  - - -  - - - - - - - - - - - - - - - - - -  - - -  -  - - -  -
                    - - - - - - - - - - - - - - - - -  - - - -  - - -  - - - - - - - - - - - - - - - - - -  - - -</span>
            </div>

            <nav >
                <div className="grid grid-flow-col gap-4">
                    <img src={linkedin} alt="" />
                    <img src={twitter} alt="" />
                    <img src={facebook} alt="" />
                    <img src={youtube} alt="" />
                </div>
            </nav>

            <p >Copyright © {new Date().getFullYear()} - Parcel pilot - All right reserved</p>
        </footer>
    );
};

export default Footer;