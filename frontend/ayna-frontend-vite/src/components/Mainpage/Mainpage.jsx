import React from 'react';
import { FiMessageCircle, FiUsers, FiLock, FiGlobe } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";


const BentoBox = ({ icon, title, description, className }) => (
    <div className={`p-6 rounded-xl backdrop-blur-sm ${className}`}>
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
    </div>
);


//welcome pagee!
const Mainpage = () => {

    const navigate = useNavigate();
    const handleGetstarted = () => {
        navigate("/signup", { replace: true });
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
            <div className="max-w-6xl mx-auto mb-12 text-center">
                <h1 className="text-5xl font-bold mb-4 py-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Welcome to Chatty
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Connect, collaborate, and communicate seamlessly with your team
                </p>
            </div>

            <div className="max-w-6xl mx-auto my-6 text-center">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                    onClick={handleGetstarted}>
                    Get Started for Free
                </button>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-sm">
                    <h2 className="text-3xl font-bold mb-4">Real-time Communication</h2>
                    <p className="text-gray-600 mb-6">
                        Experience lightning-fast messaging with end-to-end encryption.
                        Share ideas, files, and collaborate in real-time with your team.
                    </p>
                    <div className="aspect-video bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <FiMessageCircle className="w-24 h-24 text-blue-500" />
                    </div>
                </div>

                <BentoBox
                    icon={<FiUsers className="w-6 h-6 text-green-500" />}
                    title="Team Workspace"
                    description="Create dedicated spaces for your teams and projects"
                    className="bg-white/80 shadow-lg"
                />
                <BentoBox
                    icon={<FiLock className="w-6 h-6 text-orange-500" />}
                    title="Secure"
                    description="Enterprise-grade security with end-to-end encryption"
                    className="bg-white/80 shadow-lg"
                />
                <BentoBox
                    icon={<FiGlobe className="w-6 h-6 text-purple-500" />}
                    title="Global Access"
                    description="Connect with your team from anywhere in the world"
                    className="bg-white/80 shadow-lg md:col-span-2"
                />
            </div>
        </div>
    );
};

export default Mainpage;