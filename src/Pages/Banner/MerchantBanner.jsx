import BgBanner from '../../assets/brands/Black.jpg';
import Location from '../../assets/location-merchant.png';
import Shadow from '../../assets/be-a-merchant-bg.png';

const MerchantBanner = () => {
    return (
        <div className='w-11/12 md:w-9/12 mx-auto'>
            <div className="relative w-full h-auto bg-cover bg-center text-white rounded-[20px] p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10"  style={{ backgroundImage: `url(${BgBanner})` }} >


                {/* Shadow Overlay */}
                <img src={Shadow} alt="Shadow effect" className="absolute top-0 left-0 w-full h-full object-cover rounded-[20px] opacity-90"/>


                {/* Text Content */}
                <div className="w-full md:w-1/2 z-10 md:pl-6 lg:pl-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
                        <span className='text-white'>Merchant and Customer Satisfaction</span><br />
                        <span className='text-white'>is Our First Priority</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-200 mb-6 leading-relaxed">
                        We offer the lowest delivery charge with the highest value along with <br />
                        100% safety of your product. Pathao courier delivers your parcels in every <br />
                        corner of Bangladesh right on time.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <button className="bg-lime-300 hover:bg-lime-400 text-black font-semibold py-2 px-5 rounded-full transition duration-200">
                            Become a Merchant
                        </button>
                        <button className="border border-lime-300 hover:bg-lime-300 hover:text-black text-white font-semibold py-2 px-5 rounded-full transition duration-200">
                            Earn with Profast Courier
                        </button>
                    </div>
                </div>

                {/* Right-side Illustration  */}
                <div className="w-full md:w-1/2 flex justify-center items-center z-10 md:pl-6 lg:pl-10">
                    <img
                        src={Location}
                        alt="Delivery Illustration"
                        className="w-[90%] md:w-[400px] lg:w-[450px] xl:w-[500px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default MerchantBanner;
