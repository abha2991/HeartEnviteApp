import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { customInstance, ErrorType } from "./axios-instance";
import { CardDto } from "./types";

export const cardApi = (url: string, cardDto: CardDto) => {
  return customInstance<void>({
    url,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: cardDto,
  });
};

export type CardApiResult = NonNullable<Awaited<ReturnType<typeof cardApi>>>;
export type CardApiBody = CardDto;
export type CardApiError = ErrorType<unknown>;

export const useCardApi = <TError = ErrorType<unknown>, TContext = unknown>(
  url: string,
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof cardApi>>,
      TError,
      { data: CardDto },
      TContext
    >;
  }
) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof cardApi>>,
    { data: CardDto }
  > = (props) => {
    const { data } = props ?? {};

    return cardApi(url, data);
  };

  return useMutation<
    Awaited<ReturnType<typeof cardApi>>,
    TError,
    { data: CardDto },
    TContext
  >(mutationFn, mutationOptions);
};
