import React from 'react';
import Banner from '../Banner/Banner';
import Worksection from '../Banner/Worksection';
import Services from '../Banner/Services';
import TrustedBy from '../Banner/TrustedBy'
const Home = () => {
    return (
        <div>
            <Banner />
           <Worksection/>
          <Services/>
          <TrustedBy/>

        </div>
    );
};

export default Home;