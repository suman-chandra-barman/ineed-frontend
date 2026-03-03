import { baseApi } from "@/redux/api/baseApi";
import { Category } from "@/types/category";

interface CategoryResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Category[];
}

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResponse, object>({
      query: () => "/services/categories/",
      providesTags: ["Category"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCategoriesQuery } = categoryApi;
