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
                    <div className="bg-blue-50 p-4 rounded-xl text-sm text-gray-700">
                        <p className="mb-2">Send payment to:</p>
                        <p className="font-semibold text-blue-700">
                            victoriadaniel890@yahoo.com
                        </p>
                        <p className="mt-3">
                            ⚠️ Please include the <b>email you used to register</b> on our
                            site in the <b>payment description</b>.
                        </p>
                    </div>

                    {/* Button */}
                    <Button
                        onClick={handleSubmit}
                        className="w-full"
                    >
                        I have made payment
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
