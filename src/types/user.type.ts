// User Dashboard Types

export interface UserDashboardSummary {
  active_bookings: number;
  completed_services: number;
  total_spend: number;
}

export interface UserRecentTransaction {
  order_id: string;
  service_name: string;
  provider_name: string;
  payment_date: string;
  amount: string;
}

export interface UserDashboardMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface UserDashboardData {
  summary: UserDashboardSummary;
  recent_transactions: UserRecentTransaction[];
}

export interface GetUserDashboardResponse {
  success: boolean;
  message: string;
  meta: UserDashboardMeta;
  data: UserDashboardData;
}
