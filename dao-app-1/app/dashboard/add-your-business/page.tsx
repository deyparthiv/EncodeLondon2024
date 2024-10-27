"use client"

import React from "react";
import { submitBusiness } from "./actions.js";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation.js";
  
export default function AddBusinessPage() {
    const [state, formAction] = useFormState(submitBusiness, null);

    if (state == "success") {
        redirect("/success")
    }

    return (
        <div className="bg-gray-100 my-10 flex justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Add your Business
                </h1>
                <form action={formAction} className="space-y-6">
                    {/* Business Name */}
                    <div>
                        <label htmlFor="businessName" className="block text-gray-700 font-medium mb-1">
                            Business Name
                        </label>
                        <input
                            type="text"
                            name="businessName"
                            id="businessName"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder="Enter business name"
                        />
                    </div>

                    {/* Description of Activities */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                            Describe your business
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder="Describe what the business does"
                        ></textarea>
                    </div>

                    {/* Reason for Donation */}
                    <div>
                        <label htmlFor="reason" className="block text-gray-700 font-medium mb-1">
                            How will you use the money?
                        </label>
                        <textarea
                            name="reason"
                            id="reason"
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder=""
                        ></textarea>
                    </div>

                    {/* Amount of Supported Money */}
                    <div>
                        <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">
                            How much does your business need? (Lumins)
                        </label>
                        <input
                            name="amount"
                            type="number"
                            id="amount"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder=""
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition"
                    >
                        Submit Business
                    </button>
                </form>

                {/* Error Message */}
                {state == "error" && (
                    <div className="mt-4 text-red-500 font-medium">
                        Please fill in all fields and upload a valid logo!
                    </div>
                )}
            </div>
        </div>
    );
}