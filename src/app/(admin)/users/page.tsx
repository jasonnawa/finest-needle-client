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
import { getAllUsers } from "@/api/users/userService";
import { User } from "@/api/users/userTypes";
import { Spinner } from "@/components/Spinner";

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [users, setUsers] = useState<User[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
       <div className="h-screen flex items-center justify-center">
       <Spinner size={48} />
     </div>
      ) : (
        <div className="p-6 space-y-4">
          <SiteHeader title="Profiles" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card
                    onClick={() => setSelectedUser(user)}
                    className="p-4 hover:bg-muted cursor-pointer"
                  >
                    <div className="font-semibold">
                      {user.firstName} {user.lastName} ({user.gender[0]})
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-lg">
  <DialogTitle>
    {user.firstName} {user.lastName}
  </DialogTitle>
  <ScrollArea className="h-[60vh] pr-4">
    <div className="mt-2 space-y-2 text-sm">

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
    </div>
  </ScrollArea>
</DialogContent>

              </Dialog>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
