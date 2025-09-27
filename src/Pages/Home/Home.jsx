import React from 'react';
import Banner from '../Banner/Banner';
import Worksection from '../Banner/Worksection';
import Services from '../Banner/Services';
import TrustedBy from '../Banner/TrustedBy'
import MerchantBanner from '../Banner/MerchantBanner';


const Home = () => {
    return (
        <div>
            <Banner />
            <Worksection />
            <Services />
            <TrustedBy />
            <MerchantBanner />

        </div>
    );
};

export default Home;