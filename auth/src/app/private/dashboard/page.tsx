"use client";
import { useState } from "react";

const Dashboard = () => {
    const [welcomeMessage] = useState("Welcome to your Dashboard!");

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-extrabold mb-6">Dashboard</h1>
                <p className="text-xl mb-12">{welcomeMessage}</p>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Statistics</h2>
                        <p className="text-gray-300">
                            View your recent activity, performance stats, and
                            more.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Reports</h2>
                        <p className="text-gray-300">
                            Generate and download various reports.
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Settings</h2>
                        <p className="text-gray-300">
                            Manage your account settings and preferences.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
