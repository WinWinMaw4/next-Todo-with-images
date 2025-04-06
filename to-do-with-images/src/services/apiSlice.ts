import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { determineTag, tagTypes } from "./apiTags";
import { RootState } from "@/store/index";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
				
			}
			headers.set("Content-Type", "application/json");
			return headers;
		},
	}),
	// baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3003' }),
	tagTypes: tagTypes,
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({
		getEndpoint: builder.query({
			query: (url) => url,
			providesTags: (_result, _error, arg) => [{ type: determineTag(arg) }],
			// keepUnusedDataFor: 60,
		}),

		invalidateEndpoint: builder.mutation({
			query: ({ url, method, body }) => ({
				url,
				method,
				...(body && { body }),
			}),

			invalidatesTags: (_result, _error, { url }) => [
				{ type: determineTag(url) },
			],
		}),
	}),
});

export const { useGetEndpointQuery, useInvalidateEndpointMutation } = apiSlice;
