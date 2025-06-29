'use client'

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-center px-6">
      <div className="bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Thank you! Your payment was processed successfully.
        </p>
        <div className="flex items-center justify-center">
          <svg
            className="h-12 w-12 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
