import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios, { AxiosError, AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
  // baseURL: "http://192.168.1.3:3001",

  baseURL: "http://localhost:3001",
});

AXIOS_INSTANCE.interceptors.request.use(async (config) => {
  config.headers = config.headers || {};
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by Vue Query");
  };

  return promise;
};

export default customInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}
