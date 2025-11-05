import React from 'react';
import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';
import { Title } from 'react-head';

const Coverage = () => {
    const serviceCenters = useLoaderData();

    return (
        <>

            <Title> Parcel Pilot || Coverage </Title>
            <div className="w-11/12 mx-auto bg-[#FFFFFF] mt-5 -mb-25 rounded-2xl py-12 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-3xl text-left md:text-4xl font-bold text-gray-900 mb-6">
                        We are available in 64 districts
                    </h1>

                    <p className="text-left text-lg font-semibold text-gray-700 mt-10 mb-4">
                        We deliver almost all over Bangladesh
                    </p>

                    <BangladeshMap serviceCenters={serviceCenters} />


                </div>
            </div>
        </>

    );
};

export default Coverage;
