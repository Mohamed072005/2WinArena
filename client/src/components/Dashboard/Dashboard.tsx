import { Calendar, DollarSign, Trophy, Users } from 'lucide-react';
import React from "react";
import StatCard from "./StatCard";

const Dashboard: React.FC = () => {
    return (
        <>
            <div className="fixed inset-0 z-[-1] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 animate-gradient-x"></div>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute h-56 w-56 rounded-full bg-purple-300 blur-3xl top-1/4 left-1/4 animate-blob"></div>
                    <div className="absolute h-56 w-56 rounded-full bg-yellow-300 blur-3xl top-1/2 right-1/4 animate-blob animation-delay-2000"></div>
                    <div className="absolute h-56 w-56 rounded-full bg-pink-300 blur-3xl bottom-1/4 left-1/2 animate-blob animation-delay-4000"></div>
                </div>
            </div>
            <div className="relative min-h-screen">
                <div className="container mx-auto px-6 py-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm">Welcome, Organizer!</h1>
                        <p className="mt-2 text-xl text-gray-600">Here's an overview of your events and impact.</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Dashboard</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Total Events"
                                value="15"
                                icon={<Calendar className="h-8 w-8 text-yellow-600" />}
                            />
                            <StatCard
                                title="Total Participants"
                                value="8,282"
                                icon={<Users className="h-8 w-8 text-green-600" />}
                            />
                            <StatCard
                                title="Revenue"
                                value="$21,300"
                                icon={<DollarSign className="h-8 w-8 text-blue-600" />}
                            />
                            <StatCard
                                title="Completed Events"
                                value="12"
                                icon={<Trophy className="h-8 w-8 text-purple-600" />}
                            />
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md hover:shadow-lg">
                                Create New Event
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md hover:shadow-lg">
                                View Participant List
                            </button>
                            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md hover:shadow-lg">
                                Generate Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;

