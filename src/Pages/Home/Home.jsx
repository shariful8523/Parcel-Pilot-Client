                                        
import Services from '../Banner/Services';
import TrustedBy from '../Banner/TrustedBy'
import Testimonial from '../Banner/Testimonial';
import FAQSection from '../Banner/FAQSection';
import { HeadProvider, Title  } from 'react-head';
import HeroSection from '../Banner/HeroSection';
import HowItWorks from '../Banner/HowItWorks';
import Merchant from '../Banner/Merchant';


const Home = () => {

   
   return (
        <HeadProvider>
            <Title>Parcel Pilot || Home</Title>
            <div>
               
                <HeroSection/>
                <HowItWorks/>
                <Services />
                <TrustedBy />
                <Merchant/>
                <Testimonial />
                <FAQSection />
            </div>
        </HeadProvider>
    );
};

export default Home;