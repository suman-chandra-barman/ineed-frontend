export type ServiceImage = {
  id: number;
  image: string;
  created_at: string;
};

export type Service = {
  id: number;
  category_id: number;
  name: string;
  description: string;
  man_price: string;
  offer_price: string;
  discount: string;
  image: string | null;
  images: ServiceImage[];
  is_active: boolean;
  is_favorite?: boolean;
  created_at: string;
  updated_at: string;
  rating: number;
  total_bookings: number;
};

export type ServiceHour = {
  id: number;
  service_id: number;
  day_of_week: number;
  from_time: string;
  to_time: string;
  is_closed: boolean;
  created_at: string;
};

export type AdditionalFeature = {
  id: number;
  service_id: number;
  additional_features_title: string;
  subtitle: string;
  additional_features_image: string;
  additional_features_price: string;
  estimate_time: string;
  estimate_time_unit: string;
  created_at: string;
  updated_at: string;
};

export type ServiceReviewSummary = {
  average_rating: number;
  total_reviews: number;
  rating_breakdown: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
};

export type ServiceReview = {
  id: number;
  rating: number;
  comment: string;
  user_name: string;
  user_image: string | null;
  created_at: string;
  updated_at: string;
};

export type ServiceDetail = {
  service: Service;
  service_hours: ServiceHour[];
  additional_features: AdditionalFeature[];
  review_summary: ServiceReviewSummary;
  reviews: ServiceReview[];
};

export type ServicesResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Service[];
};

export type ServiceDetailResponse = {
  success: boolean;
  message: string;
  data: ServiceDetail;
};

export type FavoriteService = {
  favorite_id: number;
  service_id: number;
  category_id: number;
  service_name: string;
  service_description: string;
  man_price: string;
  offer_price: string;
  discount: string;
  service_image: string | null;
  is_favorite: boolean;
};

export type FavoriteServicesResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: FavoriteService[];
};

export type ToggleFavoriteResponse = {
  success: boolean;
  message: string;
  data: {
    service_id: number;
    is_favorite: boolean;
  };
};
