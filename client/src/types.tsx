interface RealtorFormValues {
  company_name: string;
  description: string;
  profile_picture: string;
  company_mail: string;
  website_url: string;
  contact: string;
}

interface RealtorDetails extends RealtorFormValues {
  id: string;
  date_created: string;
  realtor_id: string;
}
