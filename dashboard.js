import { useAuthStore } from "./store";

export const Dashboard = () => {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">M</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">MeetUs Dashboard</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to your Dashboard!</h2>

                    {user ? (
                        <div className="space-y-4">
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-purple-900 mb-2">User Information</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-700">
                                        <span className="font-medium">User ID:</span> {user.id}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium">Name:</span> {user.name}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg p-6 text-white">
                                    <h4 className="text-lg font-semibold mb-2">Welcome Message</h4>
                                    <p className="text-purple-100">You&#39;re successfully logged in!</p>
                                </div>

                                <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg p-6 text-white">
                                    <h4 className="text-lg font-semibold mb-2">Status</h4>
                                    <p className="text-pink-100">Active User</p>
                                </div>

                                <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg p-6 text-white">
                                    <h4 className="text-lg font-semibold mb-2">Session</h4>
                                    <p className="text-indigo-100">Authenticated</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading user information...</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};