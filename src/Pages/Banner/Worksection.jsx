
import Boking from '../../assets/bookingIcon.png'

const Worksection = () => {


    return (
        <div className='w-10/12 mx-auto mt-5  mb-20 space-y-10  ' >
            <h1 className=' text-4xl font-semibold '>How it Works</h1>

           <div className=' grid  lg:flex gap-10 justify-center'>
             <div className=" w-72 p-5 bg-[#ebebf7] space-y-3 rounded-2xl ">
                <img src={Boking} alt="" />

                <h2 className='text-xl font-semibold'>Booking Pick & Drop</h2>

                <p>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>

            <div className=" w-72 p-5 bg-[#ebebf7] space-y-3 rounded-2xl ">
                <img src={Boking} alt="" />

                <h2 className='text-xl font-semibold'>Cash On Delivery</h2>

                <p>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>

            <div className=" w-72 p-5 bg-[#ebebf7] space-y-3 rounded-2xl ">
                <img src={Boking} alt="" />

                <h2 className='text-xl font-semibold'>Delivery Hub</h2>

                <p>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>

            <div className=" w-72 p-5 bg-[#ebebf7] space-y-3 rounded-2xl ">
                <img src={Boking} alt="" />

                <h2 className='text-xl font-semibold'>Booking SME & Corporate</h2>

                <p>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>

           </div>

        </div>
    );
};

export default Worksection;