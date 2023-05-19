interface RealtorFormValues {
  company_name: string;
  description: string;
  profile_picture: string;
  company_mail: string;
  website_url: string;
  contact: string;
}

interface SearchProps {
  type: string;
  category: string;
  baths: string | number;
  beds: string | number;
  min_price: string | number;
  max_price: string | number;
  search_term: string;
  area_max: string | number;
  [key: string]: string | number;
}

type SearchAction =
  | { type: "Type"; payload: string }
  | { type: "Category"; payload: string }
  | { type: "SearchTerm"; payload: string }
  | { type: "Baths"; payload: number | string }
  | { type: "Beds"; payload: number | string }
  | { type: "MinPrice"; payload: number | string }
  | { type: "AreaMax"; payload: number | string }
  | { type: "MaxPrice"; payload: number | string }
  | { type: "Reset" };

interface SearchContextState {
  data: SearchProps;
  dispatch: React.Dispatch<SearchAction>;
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
  userToken: string;
}

interface RealtorObject extends RealtorFormValues {
  user_id: string;
}

interface RealtorAccountProps {
  userToken: string;
  realtorDetails: RealtorObject;
}

interface PropertyFormValues {
  location: string;
  address: string;
  bedrooms: number | string;
  bathrooms: number | string;
  property_type: string;
  category: string;
  price: number | string;
  size: string;
}

interface PropertyDetailsCard extends PropertyFormValues {
  active: boolean;
  date_created: string;
  id: string;
  owner_id: string;
  property_images: string[];
  description: string;
}

interface PropertyDetails extends PropertyDetailsCard {}

type FormType = "create" | "update";

interface InitValuesProps {
  formikValues: PropertyFormValues;
  description: string;
  property_images: string[];
  property_id: string;
}

interface UpdatePropertyProps {
  realtor_id: string;
  property_id: string;
  propertyDetails: Object;
  userToken: string;
}

interface PropertyModalProp {
  show: boolean;
  property_id: null | string;
}

interface EmailAgentModalProp {
  data: { show: boolean; realtor_id: string | null };
  setShowEmailAgentModal: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      realtor_id: string | null;
    }>
  >;
}

type FollowAction = "follow" | "unfollow";

type AddToFavoriteAction = "add" | "remove";
