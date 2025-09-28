import { FaClipboardCheck } from "react-icons/fa";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Worksection = () => {
  return (
    <div className="w-10/12 mx-auto mt-5 mb-20 space-y-10">
      <h1 className="text-4xl font-semibold ">How it Works</h1>

      <div className="grid lg:flex gap-10 justify-center flex-wrap">
        {/* Card 1 */}
        <div className="w-72 p-6 bg-[#ebebf7] rounded-2xl text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
          <FaClipboardCheck className="text-7xl text-[#4f46e5] mb-4" />
          <h2 className="text-xl font-semibold">Booking Pick & Drop</h2>
          <p className="text-gray-700 mt-2">
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Card 2 */}
        <div className="w-72 p-6 bg-[#ebebf7] rounded-2xl text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
          <MdOutlineMonetizationOn className="text-7xl text-[#4f46e5] mb-4" />
          <h2 className="text-xl font-semibold">Cash On Delivery</h2>
          <p className="text-gray-700 mt-2">
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Card 3 */}
        <div className="w-72 p-6 bg-[#ebebf7] rounded-2xl text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
          <AiOutlineHome className="text-7xl text-[#4f46e5] mb-4" />
          <h2 className="text-xl font-semibold">Delivery Hub</h2>
          <p className="text-gray-700 mt-2">
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Card 4 */}
        <div className="w-72 p-6 bg-[#ebebf7] rounded-2xl text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
          <BsFillBagCheckFill className="text-7xl text-[#4f46e5] mb-4" />
          <h2 className="text-xl font-semibold">Booking SME & Corporate</h2>
          <p className="text-gray-700 mt-2">
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Worksection;
