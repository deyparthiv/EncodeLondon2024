"use client";

import React from "react";

interface Business {
    name: string;
    description: string;
    fundingNeed: number;
    logoUrl: string;
    website: string;
}

const businesses: Business[] = [
    {
        name: "The Gourmet Place",
        description: "A fine dining experience with exotic cuisines.",
        fundingNeed: 5000,
        logoUrl: "https://example.com/gourmet-logo.jpg",
        website: "https://thegourmetplace.com",
    },
    {
        name: "Quick Bites",
        description: "Delicious fast food with a twist.",
        fundingNeed: 2000,
        logoUrl: "https://example.com/quickbites-logo.jpg",
        website: "https://quickbites.com",
    },
    {
        name: "HealthFirst Pharmacy",
        description: "Your go-to pharmacy for all health needs.",
        fundingNeed: 3000,
        logoUrl: "https://example.com/healthfirst-logo.jpg",
        website: "https://healthfirstpharmacy.com",
    },
    {
        name: "Style Studio Salon",
        description: "Modern salon offering trendy hairstyles.",
        fundingNeed: 1500,
        logoUrl: "https://example.com/stylestudio-logo.jpg",
        website: "https://stylestudiosalon.com",
    },
    {
        name: "Urban Eats",
        description: "Street food with a touch of gourmet.",
        fundingNeed: 2500,
        logoUrl: "https://example.com/urbaneats-logo.jpg",
        website: "https://urbaneats.com",
    },
    {
        name: "Wellness Hub",
        description: "All-in-one health and wellness center.",
        fundingNeed: 4000,
        logoUrl: "https://example.com/wellnesshub-logo.jpg",
        website: "https://wellnesshub.com",
    },
];

export default function DiscoverPage() {
    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Discover Businesses</h1>
            
            {/* Grid layout for businesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Display each business as a card */}
                {businesses.map((business, index) => (
                    <div
                        key={index}
                        onClick={() => window.open(business.website, "_blank")}
                        className="cursor-pointer bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition hover:shadow-xl hover:bg-indigo-50"
                    >
                        {/* Business Logo */}
                        <img
                            src={business.logoUrl}
                            alt={`${business.name} logo`}
                            className="w-24 h-24 object-cover rounded-full mb-4"
                        />
                        {/* Business Name */}
                        <h3 className="text-lg font-semibold text-indigo-700 text-center">{business.name}</h3>
                        {/* Description */}
                        <p className="text-gray-600 text-center mt-2 text-sm">
                            {business.description}
                        </p>
                        {/* Funding Need */}
                        <p className="text-indigo-600 font-medium text-center mt-4">
                            Funding Need: £{business.fundingNeed.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}