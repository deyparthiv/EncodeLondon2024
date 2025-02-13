"use client";

import React, { useState } from "react";

export default function Test() {
    const [amount, setAmount] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);

    const submitDonation = () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        setSuccessMessage(true);

        // Reset form
        setAmount("");
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Fundraise SMEs Donation
                </h1>
                <form className="space-y-6">
                    {/* Donation Amount */}
                    <div>
                        <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">
                            Amount (GBP)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder="Enter amount in GBP"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={submitDonation}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition"
                    >
                        Submit Donation
                    </button>
                </form>

                {/* Success Message */}
                {successMessage && (
                    <div className="mt-4 text-green-600 font-medium text-center">
                        Thank you for your generous donation!
                    </div>
                )}
            </div>
        </div>
    );
}