import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

const position = [23.6850, 90.3563]; // Bangladesh center

const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function FlyToDistrict({ coords }) {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 10, { duration: 1.5 });
    }
    return null;
}

const BangladeshMap = ({ serviceCenters }) => {
    const [searchText, setSearchText] = useState('');
    const [activeCoords, setActiveCoords] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const district = serviceCenters.find(d =>
            d.district.toLowerCase().includes(searchText.toLowerCase())
        );
        if (district) {
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistrict(district.district);
        }
    };

    return (
        <div className="relative mt-4 w-full">
            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="w-full max-w-md mb-6"
            >
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search here"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-lime-500 hover:bg-lime-600 text-white px-6 rounded-r-md transition duration-200"
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* Map Container */}
            <div className="rounded-xl overflow-hidden shadow-lg h-[500px] w-full">
                <MapContainer
                    center={position}
                    zoom={7}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <FlyToDistrict coords={activeCoords} />

                    {serviceCenters.map((center, index) => (
                        <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}
                            icon={customIcon}
                        >
                            <Popup autoOpen={center.district === activeDistrict}>
                                <strong>{center.district}</strong><br />
                                {center.covered_area.join(', ')}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default BangladeshMap;
