import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Banner1 from '../../assets/banner/banner1.png'
import Banner2 from '../../assets/banner/banner2.png'
import Banner5 from '../../assets/banner/banner5.png'

const Banner = () => {
    return (
        <Carousel className="w-11/12 mx-auto p-3" showThumbs={false} autoPlay infiniteLoop interval={2000} showStatus={false} >
            <div>
                <img src={Banner1} alt="Banner 1" />
            </div>
            <div>
                <img src={Banner2} alt="Banner 2" />
            </div>
            <div>
                <img src={Banner5} alt="Banner 3" />
            </div>
        </Carousel>
    );
};

export default Banner;
