export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
}

export interface CreateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  gender?: Gender | string;
  phoneNumber?: string;
  country?: string;
  address?: string;
  location?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  religion?: string;
  relationshipGoals?: string;
  password?: string;
}

export interface RegisterUserDTO extends CreateUserDTO {
  preferenceCountry?: string;
  preferenceLocation?: string;
  preferenceLoveLanguage?: string;
  preferenceLifestyle?: string;
  preferenceType?: string;
}