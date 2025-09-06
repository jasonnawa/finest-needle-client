"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/Field";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SiteHeader } from "@/components/site-header";
import { getPendingUsers, markAsPaid } from "@/api/users/userService";
import { User } from "@/api/users/userTypes";
import { toast } from "sonner";
import { Spinner } from "@/components/Spinner";
import Image from "next/image"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

export default function UserManagementPage() {
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [users, setUsers] = useState<User[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [isMarkingAsPaid, setIsMarkingAsPaid] = useState(false)
    const fetchUsers = async () => {
        try {
            const data = await getPendingUsers();

            if (data.status) {
                setUsers(data.data);
            } else {
                toast.error(data.message || "Failed to fetch users", {
                    duration: 3000,
                });
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Error fetching users", {
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleMarkAsPaid = async () => {
        try {
            setIsMarkingAsPaid(true)
            const response = await markAsPaid(selectedUser._id);
            if (!response.status) {
                toast.error(response?.message || "An error has occurred");
                return;
            }

            toast.success("✅ User marked as paid successfully", {
                duration: 3000,
            });

            fetchUsers();
        } catch (error) {
            console.error("❌ Error marking as paid:", error);
            toast.error("Something went wrong");
        } finally {
            setIsMarkingAsPaid(false)
        }
    };

    return (
        <>
            {loading ? (
                <div className="h-screen flex items-center justify-center">
                    <Spinner size={48} />
                </div>
            ) : (
                <div className="p-6 space-y-4">
                    <SiteHeader title="Profiles" />

                    {users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <h1 className="text-2xl font-semibold text-gray-600">No users with payment pending</h1>
                            <p className="text-gray-400 mt-2">All users are up to date 🎉</p>
                        </div>) :
                        (<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {users.map((user, index) => (
                                <Dialog key={index}>
                                    <DialogTrigger asChild>
                                        <Card
                                            onClick={() => setSelectedUser(user)}
                                            className="p-4 hover:bg-muted cursor-pointer flex items-center gap-4"
                                        >
                                            <div className="w-24 h-24 overflow-hidden rounded-md">
                                                <Image
                                                    src={user.profileImage || '/placeholder.png'}
                                                    alt="Profile Image"
                                                    width={96}
                                                    height={96}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>

                                            <div>
                                                <div className="font-semibold text-center">
                                                    {user.firstName} {user.lastName} ({user.gender[0]})
                                                </div>
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </div>
                                        </Card>

                                    </DialogTrigger>

                                    <DialogContent className="max-w-lg">
                                        <DialogTitle>
                                            {user.firstName} {user.lastName}
                                        </DialogTitle>
                                        <ScrollArea className="h-[60vh] pr-4">
                                            <div className="mt-2 space-y-2 text-sm">

                                                <Image
                                                    src={user.profileImage || '/placeholder.png'}  // Fallback if no image
                                                    alt="Profile Image"
                                                    width={100}
                                                    height={100}
                                                />


                                                <Field label="Email" value={user.email} />
                                                <Field label="Age" value={user.age} />
                                                <Field label="Gender" value={user.gender} />
                                                <Field label="Phone Number" value={user.phoneNumber} />
                                                <Field label="Country" value={user.country} />
                                                <Field label="Address" value={user.address} />
                                                <Field label="Location" value={user.location} />
                                                <Field label="City" value={user.city} />
                                                <Field label="State" value={user.state} />
                                                <Field label="Postal Code" value={user.postalCode} />
                                                <Field label="Religion" value={user.religion} />
                                                <Field label="Relationship Goals" value={user.relationshipGoals} />

                                                {user.preference && (
                                                    <>
                                                        <hr className="my-2" />
                                                        <h4 className="font-semibold text-pink-500">Preferences</h4>
                                                        <Field label="Preference Country" value={user.preference.preferenceCountry} />
                                                        <Field label="Preference Location" value={user.preference.preferenceLocation} />
                                                        <Field label="Love Language" value={user.preference.preferenceLoveLanguage} />
                                                        <Field label="Lifestyle" value={user.preference.preferenceLifestyle} />
                                                        <Field label="Type" value={user.preference.preferenceType} />
                                                    </>
                                                )}
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button className="mt-4" disabled={isMarkingAsPaid} >
                                                            {isMarkingAsPaid ? (
                                                                <>
                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                    Marking...
                                                                </>
                                                            ) : (
                                                                "Mark as Paid"
                                                            )}
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent aria-describedby="confirmation modal">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Are you sure you want to mark this user as paid?
                                                            </AlertDialogTitle>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={handleMarkAsPaid}>
                                                                Confirm
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </ScrollArea>
                                    </DialogContent>

                                </Dialog>
                            ))}
                        </div>)}
                </div>
            )}
        </>
    );
}
