'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SiteHeader } from '@/components/site-header';
const users = [
  {
    firstName: 'Jason',
    lastName: 'Osikoya',
    email: 'osikoyajason@gmail.com',
    password: 'securePassword123',
    age: 28,
    gender: 'Male',
    phoneNumber: '+2348026929093',
    country: 'Nigeria',
    address: '123 Sample Street',
    location: 'Lagos Mainland',
    city: 'Lagos',
    state: 'Lagos',
    postalCode: '100001',
    religion: 'Christianity',
    relationshipGoals: 'Long-term relationship',
    preferenceCountry: 'Nigeria',
    preferenceLocation: 'Lagos',
    preferenceLoveLanguage: 'Quality Time',
    preferenceLifestyle: 'Active',
    preferenceType: 'Serious',
  },
  {
    firstName: 'Amina',
    lastName: 'Bello',
    email: 'amina.bello@example.com',
    password: 'pass1234',
    age: 26,
    gender: 'Female',
    phoneNumber: '+2348034567890',
    country: 'Nigeria',
    address: '45 Unity Street',
    location: 'Abuja Central',
    city: 'Abuja',
    state: 'FCT',
    postalCode: '900001',
    religion: 'Islam',
    relationshipGoals: 'Marriage',
    preferenceCountry: 'Nigeria',
    preferenceLocation: 'Abuja',
    preferenceLoveLanguage: 'Words of Affirmation',
    preferenceLifestyle: 'Traditional',
    preferenceType: 'Committed',
  },
  {
    firstName: 'Chinedu',
    lastName: 'Okeke',
    email: 'chinedu.okeke@example.com',
    password: 'chinedu123',
    age: 31,
    gender: 'Male',
    phoneNumber: '+2348098765432',
    country: 'Nigeria',
    address: '78 Festac Avenue',
    location: 'Festac Town',
    city: 'Lagos',
    state: 'Lagos',
    postalCode: '102102',
    religion: 'Christianity',
    relationshipGoals: 'Companionship',
    preferenceCountry: 'Ghana',
    preferenceLocation: 'Accra',
    preferenceLoveLanguage: 'Acts of Service',
    preferenceLifestyle: 'Modern',
    preferenceType: 'Casual',
  },
  {
    firstName: 'Ngozi',
    lastName: 'Nwosu',
    email: 'ngozi.nwosu@example.com',
    password: 'ngozi123',
    age: 29,
    gender: 'Female',
    phoneNumber: '+2348123456789',
    country: 'Nigeria',
    address: '101 Market Road',
    location: 'Onitsha Main',
    city: 'Onitsha',
    state: 'Anambra',
    postalCode: '430001',
    religion: 'Christianity',
    relationshipGoals: 'Serious Dating',
    preferenceCountry: 'Nigeria',
    preferenceLocation: 'Enugu',
    preferenceLoveLanguage: 'Receiving Gifts',
    preferenceLifestyle: 'Religious',
    preferenceType: 'Faith-based',
  },
  {
    firstName: 'Usman',
    lastName: 'Danladi',
    email: 'usman.danladi@example.com',
    password: 'usman456',
    age: 34,
    gender: 'Male',
    phoneNumber: '+2347067894321',
    country: 'Nigeria',
    address: '12 Independence Way',
    location: 'Kaduna South',
    city: 'Kaduna',
    state: 'Kaduna',
    postalCode: '800001',
    religion: 'Islam',
    relationshipGoals: 'Marriage',
    preferenceCountry: 'Nigeria',
    preferenceLocation: 'Kano',
    preferenceLoveLanguage: 'Physical Touch',
    preferenceLifestyle: 'Cultural',
    preferenceType: 'Polygamous',
  },
  {
    firstName: 'Fatima',
    lastName: 'Garba',
    email: 'fatima.garba@example.com',
    password: 'fatima321',
    age: 24,
    gender: 'Female',
    phoneNumber: '+2349054321987',
    country: 'Nigeria',
    address: '67 Tafawa Street',
    location: 'Kano Central',
    city: 'Kano',
    state: 'Kano',
    postalCode: '700001',
    religion: 'Islam',
    relationshipGoals: 'Serious Dating',
    preferenceCountry: 'Nigeria',
    preferenceLocation: 'Kano',
    preferenceLoveLanguage: 'Quality Time',
    preferenceLifestyle: 'Conservative',
    preferenceType: 'Exclusive',
  },
];

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);


  return (
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
                <div className="font-semibold">{user.firstName} {user.lastName} ({user.gender[0]})</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogTitle>{user.firstName} {user.lastName}</DialogTitle>
              <ScrollArea className="h-[60vh] pr-4">
                <div className="mt-2 space-y-2 text-sm">
                  {Object.entries(user).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
