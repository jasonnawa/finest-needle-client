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
import { DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';

const profiles = [
  {
    id: 1,
    firstName: 'Jason',
    lastName: 'Osikoya',
    gender: 'Male',
    email: 'osikoyajason@gmail.com',
    age: 28,
  },
  {
    id: 2,
    firstName: 'Amina',
    lastName: 'Bello',
    gender: 'Female',
    email: 'amina.bello@example.com',
    age: 26,
  },
  {
    id: 3,
    firstName: 'Chinedu',
    lastName: 'Okeke',
    gender: 'Male',
    email: 'chinedu.okeke@example.com',
    age: 31,
  },
  {
    id: 4,
    firstName: 'Ngozi',
    lastName: 'Nwosu',
    gender: 'Female',
    email: 'ngozi.nwosu@example.com',
    age: 29,
  },
];

export default function CreateMatchPage() {
  const [selectedMale, setSelectedMale] = useState<any>(null);
  const [selectedFemale, setSelectedFemale] = useState<any>(null);
  const [profileToView, setProfileToView] = useState<any>(null);

  const males = profiles.filter((p) => p.gender === 'Male');
  const females = profiles.filter((p) => p.gender === 'Female');

  const handleSubmit = () => {
    console.log('Match created:', selectedMale, selectedFemale);
    // API call to create match here
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create Match</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-2">Select Male Profile</h2>
          <div className="space-y-2">
            {males.map((profile) => (
              <Dialog key={profile.id}>
                <DialogTrigger asChild>
                  <Card
                    onClick={() => setProfileToView(profile)}
                    className="p-4 cursor-pointer hover:bg-muted"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{profile.firstName} {profile.lastName}</div>
                        <div className="text-sm text-muted-foreground">{profile.email}</div>
                      </div>
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); setSelectedMale(profile); }}>Select</Button>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogTitle>{profile.firstName} {profile.lastName}</DialogTitle>
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
              <Dialog key={profile.id}>
                <DialogTrigger asChild>
                  <Card
                    onClick={() => setProfileToView(profile)}
                    className="p-4 cursor-pointer hover:bg-muted"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{profile.firstName} {profile.lastName}</div>
                        <div className="text-sm text-muted-foreground">{profile.email}</div>
                      </div>
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); setSelectedFemale(profile); }}>Select</Button>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogTitle>{profile.firstName} {profile.lastName}</DialogTitle>
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
                  <div className="font-medium">{user.firstName} {user.lastName}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </>
              ) : (
                <div className="text-muted-foreground">No user selected</div>
              )}
            </Card>
          ))}
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="mt-4" disabled={!selectedMale || !selectedFemale}>
              Confirm Match
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to match these users?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
