import axios from "axios";

const baseURL = "http://127.0.0.1:3000/api";

const api = axios.create({
  baseURL,
  timeout: 8000,
});

export const get = async (
  url: string,
  data: Record<string | number, any> = {}
): Promise<any> => {
  let realUrl = baseURL + url;
  Object.keys(data).forEach((item, index) => {
    if (index === 0) {
      realUrl += `?${item}=${data[item]}`;
    } else {
      realUrl += `&${item}=${data[item]}`;
    }
  });

  const resData: any = await api.get(realUrl);
  console.log(resData.data);
  return resData.data || true;
};

export const post = async (
  url: string,
  data: Record<string | number, any>
): Promise<any> => {
  const resData: any = await api.post(`${baseURL}${url}`, data);
  console.log(resData.data);
  return resData.data || true;
};
export const Delete = async (url: string, data: string): Promise<any> => {
  const resData: any = await api.delete(`${baseURL}${url}/${data}`);
  console.log(resData.data);
  return resData.data || true;
};
