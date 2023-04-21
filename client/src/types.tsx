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
  active: boolean;
}

type ActionType = "activate" | "deactivate";

interface NewPropertyProps {
  realtor_id: string;
  propertyDetails: Object;
}

interface PropertyFormValues {
  location: string;
  address: string;
  title: string;
  bedrooms: number | string;
  bathrooms: number | string;
  property_type: string;
  category: string;
  price: number | string;
  size?: string;
}

interface PropertyDetailsCard extends PropertyFormValues {
  active: boolean;
  date_created: string;
  id: string;
  owner_id: string;
  property_images: string[];
  description: string;
}