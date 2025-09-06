"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SiteHeader } from "@/components/site-header";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";
import { Match } from "@/api/matches/matchTypes";
import { getMatches, unmatch } from "@/api/matches/matchService";
import Image from "next/image";
import { toast } from "sonner";

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatches().then((data) => {
      setMatches(data.data);
      setLoading(false);
    });
  }, []);

  const handleUnmatch = async () => {
    if (!selectedMatch) return;

    try {
      await unmatch(selectedMatch.userOne._id, selectedMatch.userTwo._id);

      // Manually remove the unmatched item from local state
      setMatches((prevMatches) =>
        prevMatches.filter((match) => match._id !== selectedMatch._id)
      );

      toast.success("Successfully unmatched users", {
        duration: 3000,
      });

      setSelectedMatch(null);
    } catch (error) {
      console.error("❌ Error unmatching:", error);
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
          <SiteHeader title="All Matches" />
          <div className="flex justify-end">
            <Link href="/create-match">
              <Button>Create Match</Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match, idx) => (
              <Dialog key={idx}>
                <DialogTrigger asChild>
                  <Card
                    onClick={() => setSelectedMatch(match)}
                    className="p-4 hover:bg-muted cursor-pointer"
                  >
                    <div className="font-medium">
                      {match.userOne.firstName} & {match.userTwo.firstName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {match.userOne.email} ↔ {match.userTwo.email}
                    </div>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-lg">
                  <DialogTitle>Match Details</DialogTitle>
                  <ScrollArea className="h-[50vh] pr-4 mt-4">
                    <div className="space-y-5">
                      {[match.userOne, match.userTwo].map((user, i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <Image
                            src={user.profileImage || "/placeholder.png"} // Fallback if no image
                            alt="Profile Image"
                            width={100}
                            height={100}
                          />
                          <h2 className="font-semibold text-lg">
                            {user.firstName} {user.lastName}
                          </h2>
                          <div className="text-sm space-y-1">
                            <div>Email: {user.email}</div>
                            <div>Age: {user.age}</div>
                            <div>Gender: {user.gender}</div>
                            <div>Phone Number: {user.phoneNumber}</div>
                            <div>Country: {user.country}</div>
                          </div>
                        </div>
                      ))}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="mt-4" disabled={!selectedMatch}>
                            Unmatch
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to un-match these users?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleUnmatch}>
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
          </div>
        </div>
      )}
    </>
  );
}
