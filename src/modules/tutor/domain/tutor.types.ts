export interface CreateTutorProps {
  name: string;
  phone_number: string;
  email: string;
  date_of_birth: Date;
  zip_code: string;
}

export interface ChangeTutorInformationProps {
  name?: string;
  phone_number?: string;
  email?: string;
  zip_code?: string;
}
