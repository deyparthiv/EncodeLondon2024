"use client";

import React, { useState } from "react";

export default function AddBusinessPage() {
    const [businessName, setBusinessName] = useState("");
    const [owners, setOwners] = useState("");
    const [description, setDescription] = useState("");
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState("");
    const [logo, setLogo] = useState<File | null>(null);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setLogo(event.target.files[0]);
        }
    };

    const submitBusiness = () => {
        if (!businessName || !owners || !description || !reason || !amount || parseFloat(amount) <= 0 || !logo) {
            alert("Please fill in all fields and upload a valid logo.");
            return;
        }

        setSuccessMessage(true);

        // Reset form fields
        setBusinessName("");
        setOwners("");
        setDescription("");
        setReason("");
        setAmount("");
        setLogo(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Add a New Business
                </h1>
                <form className="space-y-6">
                    {/* Business Name */}
                    <div>
                        <label htmlFor="businessName" className="block text-gray-700 font-medium mb-1">
                            Business Name
                        </label>
                        <input
                            type="text"
                            id="businessName"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder="Enter business name"
                        />
                    </div>

                    {/* Owners */}
                    <div>
                        <label htmlFor="owners" className="block text-gray-700 font-medium mb-1">
                            Owners
                        </label>
                        <input
                            type="text"
                            id="owners"
                            value={owners}
                            onChange={(e) => setOwners(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder="Enter names of owners"
                        />
                    </div>

                    {/* Description of Activities */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                            What are they doing?
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder="Describe what the business does"
                        ></textarea>
                    </div>

                    {/* Reason for Donation */}
                    <div>
                        <label htmlFor="reason" className="block text-gray-700 font-medium mb-1">
                            Reason to get a donation
                        </label>
                        <textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder="Why does the business need a donation?"
                        ></textarea>
                    </div>

                    {/* Amount of Supported Money */}
                    <div>
                        <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">
                            Amount of Supported Money (GBP)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder="Enter the amount in GBP"
                        />
                    </div>

                    {/* Logo Upload */}
                    <div>
                        <label htmlFor="logo" className="block text-gray-700 font-medium mb-1">
                            Upload Logo
                        </label>
                        <input
                            type="file"
                            id="logo"
                            onChange={handleLogoUpload}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            accept="image/*"
                        />
                        {logo && (
                            <p className="text-sm text-gray-500 mt-2">
                                Selected file: {logo.name}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={submitBusiness}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition"
                    >
                        Submit Business
                    </button>
                </form>

                {/* Success Message */}
                {successMessage && (
                    <div className="mt-4 text-green-600 font-medium text-center">
                        Business added successfully!
                    </div>
                )}
            </div>
        </div>
    );
}