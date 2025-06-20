'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SiteHeader } from '@/components/site-header';
import Link from 'next/link';
const matches = [
  {
    userA: {
      firstName: 'Jason',
      lastName: 'Osikoya',
      email: 'osikoyajason@gmail.com',
      age: 28,
      gender: 'Male',
    },
    userB: {
      firstName: 'Amina',
      lastName: 'Bello',
      email: 'amina.bello@example.com',
      age: 26,
      gender: 'Female',
    },
  },
  {
    userA: {
      firstName: 'Chinedu',
      lastName: 'Okeke',
      email: 'chinedu.okeke@example.com',
      age: 31,
      gender: 'Male',
    },
    userB: {
      firstName: 'Ngozi',
      lastName: 'Nwosu',
      email: 'ngozi.nwosu@example.com',
      age: 29,
      gender: 'Female',
    },
  },
];

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);

  return (
    <div className="p-6 space-y-6">
         <SiteHeader title="All Matches" />
      <div className="flex justify-end">
         <Link href='/create-match'>
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
                  {match.userA.firstName} & {match.userB.firstName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {match.userA.email} ↔ {match.userB.email}
                </div>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-lg">
              <DialogTitle>Match Details</DialogTitle>
              <ScrollArea className="h-[60vh] pr-4 mt-4 space-y-4">
                {[match.userA, match.userB].map((user, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <h2 className="font-semibold text-lg">
                      {user.firstName} {user.lastName}
                    </h2>
                    <div className="text-sm space-y-1">
                      <div>Email: {user.email}</div>
                      <div>Age: {user.age}</div>
                      <div>Gender: {user.gender}</div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
