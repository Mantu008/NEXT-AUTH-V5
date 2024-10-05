"use client";

const Setting = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold mb-8">Settings</h1>

                {/* Account Settings Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        Account Settings
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Username</span>
                            <span className="text-white">JohnDoe</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Email</span>
                            <span className="text-white">
                                johndoe@example.com
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Password</span>
                            <button className="text-blue-500 hover:text-blue-400">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-3xl font-bold mb-4">Preferences</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Theme</span>
                            <span className="text-white">Dark Mode</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Language</span>
                            <span className="text-white">English</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Notifications</span>
                            <button className="text-blue-500 hover:text-blue-400">
                                Manage Notifications
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">Security</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-300">
                                Two-Factor Authentication
                            </span>
                            <button className="text-blue-500 hover:text-blue-400">
                                Enable
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">
                                Login Activity
                            </span>
                            <button className="text-blue-500 hover:text-blue-400">
                                View Activity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
