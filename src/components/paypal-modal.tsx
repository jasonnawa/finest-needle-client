"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PaypalPayment() {
    const router = useRouter();

    const handleSubmit = () => {
        toast.success("Payment is being processed", {
            duration: 3000,
        });

        setTimeout(() => {
            router.push("/payment/in-progress");
        }, 1000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center">Pay with PayPal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    {/* Info Box */}
                    <div className="bg-blue-50 p-5 rounded-xl text-gray-700 text-sm space-y-3 shadow-sm">
                        <h3 className="text-base font-semibold text-gray-800">Complete Your Registration</h3>

                        <ol className="list-decimal list-inside text-left space-y-2">
                            <li>
                                Send <span className="font-bold text-pink-600">$50</span> payment to:
                                <p className="font-semibold text-blue-700 mt-1">finestneedle890@gmail.com</p>
                            </li>
                            <li>
                                In the <b>payment description</b>, include:
                                <ul className="list-disc list-inside ml-5 mt-1 text-gray-600">
                                    <li>Your <span className="font-semibold">registration email</span></li>
                                </ul>
                            </li>
                            <li>
                                Once payment is confirmed, your account will be activated 🎉
                            </li>
                        </ol>
                    </div>

                    {/* Button */}
                    <Button onClick={handleSubmit} className="w-full">
                        I have paid
                    </Button>
                </CardContent>

            </Card>
        </div>
    );
}
