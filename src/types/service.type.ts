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
  created_at: string;
  updated_at: string;
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
  name: string;
  description: string;
  price: string;
  duration: number;
  image: string;
};

export type ServiceDetail = {
  service: Service;
  service_hours: ServiceHour[];
  additional_features: AdditionalFeature[];
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
