const SignUpPayment = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center px-6">
            <div className="bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow-lg max-w-md">
                <h1 className="text-3xl font-bold text-pink-600 mb-4">🚧 Coming Soon!</h1>
                <p className="text-gray-700 text-lg mb-6">
                    We’re building something special for you. Payments will be available very soon.
                </p>
                <div className="flex items-center justify-center">
                    <svg
                        className="animate-spin h-6 w-6 text-pink-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default SignUpPayment