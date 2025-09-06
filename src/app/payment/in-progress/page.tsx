'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentInProgress() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center px-6">
            <div className="bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow-lg max-w-md">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">⏳ Payment In Progress</h1>
                <p className="text-gray-700 text-lg mb-6">
                    Your payment is being processed. You will receive an email once your payment has been confirmed.
                </p>
                <Link href="/">
                    <Button className="w-full">Back to Home</Button>
                </Link>
            </div>
        </div>
    );
}
