"use client";

import React, { useState } from "react";

export default function VotePage() {
    const [selectedBusiness, setSelectedBusiness] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);

    const submitVote = () => {
        if (!selectedBusiness) {
            alert("Please select a business to vote for.");
            return;
        }

        setSuccessMessage(true);

        // Reset the selected option after voting
        setSelectedBusiness("");
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Vote
                </h1>
                <form className="space-y-6">
                    {/* Business1 Option */}
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="business1"
                            name="business"
                            value="Business1"
                            checked={selectedBusiness === "Business1"}
                            onChange={(e) => setSelectedBusiness(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="business1" className="text-gray-700 font-medium">
                            Business1
                        </label>
                    </div>

                    {/* Business2 Option */}
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="business2"
                            name="business"
                            value="Business2"
                            checked={selectedBusiness === "Business2"}
                            onChange={(e) => setSelectedBusiness(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="business2" className="text-gray-700 font-medium">
                            Business2
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={submitVote}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition"
                    >
                        Submit Vote
                    </button>
                </form>

                {/* Success Message */}
                {successMessage && (
                    <div className="mt-4 text-green-600 font-medium text-center">
                        Thank you for voting!
                    </div>
                )}
            </div>
        </div>
    );
}