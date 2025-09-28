                                        
import Banner from '../Banner/Banner';
import Worksection from '../Banner/Worksection';
import Services from '../Banner/Services';
import TrustedBy from '../Banner/TrustedBy'
import MerchantBanner from '../Banner/MerchantBanner';
import Testimonial from '../Banner/Testimonial';
import FAQSection from '../Banner/FAQSection';


const Home = () => {
    return (
        <div>
            <Banner />
            <Worksection />
            <Services />
            <TrustedBy />
            <MerchantBanner />
            <Testimonial/>
            <FAQSection/>
        </div>
    );
};

export default Home;