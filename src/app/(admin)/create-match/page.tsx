"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogFooter } from "@/components/ui/dialog";
import { SiteHeader } from "@/components/site-header";
import { Spinner } from "@/components/Spinner";
import { toast } from "sonner";
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
import { getAllUsers } from "@/api/users/userService";
import { User } from "@/api/users/userTypes";
import { createMatch } from "@/api/matches/matchService";

export default function CreateMatchPage() {
  const [selectedMale, setSelectedMale] = useState<User | null>(null);
  const [selectedFemale, setSelectedFemale] = useState<User | null>(null);
  const [profileToView, setProfileToView] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | []>([]);
  const [loading, setLoading] = useState(true);

  const males = users.filter((p) => p.gender === "Male");
  const females = users.filter((p) => p.gender === "Female");

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      if (selectedMale && selectedFemale) {
        const res = await createMatch({
          userOne: selectedMale._id,
          userTwo: selectedFemale._id,
        });
        if (res.status) {
          toast.success(res.message || "Match created successfully", {
            duration: 3000,
          });
        } else {
          toast.error(res.message || "Error creating match", {
            duration: 3000,
          });
        }
      } else {
        toast.error("Two profiles are required", {
          duration: 3000,
        });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Sign-in failed", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner size={48} />
        </div>
      ) : (
        <div className="p-6 space-y-6">
          <SiteHeader title="Create Match" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold mb-2">Select Male Profile</h2>
              <div className="space-y-2">
                {males.map((profile) => (
                  <Dialog key={profile._id}>
                    <DialogTrigger asChild>
                      <Card
                        onClick={() => setProfileToView(profile)}
                        className="p-4 cursor-pointer hover:bg-muted"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">
                              {profile.firstName} {profile.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {profile.email}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMale(profile);
                            }}
                            disabled={selectedMale?._id === profile._id}
                            variant={
                              selectedMale?._id === profile._id
                                ? "secondary"
                                : "default"
                            }
                          >
                            {selectedMale?._id === profile._id
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </div>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogTitle>
                        {profile.firstName} {profile.lastName}
                      </DialogTitle>
                      <div className="text-sm space-y-1">
                        <div>Email: {profile.email}</div>
                        <div>Age: {profile.age}</div>
                        <div>Gender: {profile.gender}</div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Select Female Profile</h2>
              <div className="space-y-2">
                {females.map((profile) => (
                  <Dialog key={profile._id}>
                    <DialogTrigger asChild>
                      <Card
                        onClick={() => setProfileToView(profile)}
                        className="p-4 cursor-pointer hover:bg-muted"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">
                              {profile.firstName} {profile.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {profile.email}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFemale(profile);
                            }}
                            disabled={selectedFemale?._id === profile._id}
                            variant={
                              selectedFemale?._id === profile._id
                                ? "secondary"
                                : "default"
                            }
                          >
                            {selectedFemale?._id === profile._id
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </div>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogTitle>
                        {profile.firstName} {profile.lastName}
                      </DialogTitle>
                      <div className="text-sm space-y-1">
                        <div>Email: {profile.email}</div>
                        <div>Age: {profile.age}</div>
                        <div>Gender: {profile.gender}</div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-2">Selected Match</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {[selectedMale, selectedFemale].map((user, i) => (
                <Card key={i} className="p-4 w-full min-h-[80px]">
                  {user ? (
                    <>
                      <div className="font-medium">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </>
                  ) : (
                    <div className="text-muted-foreground">
                      No user selected
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="mt-4"
                  disabled={!selectedMale || !selectedFemale}
                >
                  Confirm Match
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to match these users?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </>
  );
}
