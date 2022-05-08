interface LoginInfo {
  username: string;
  password: string;
}

interface OrderList {
  page?: number;
  size?: number;
}

interface OrderItem {
  id: string;
  user_id: string;
  username: string;
  food: string;
  massage: string;
  address: string;
  price: number;
  createTime: string;
}

interface PeopleList {
  page?: number;
  size?: number;
}

interface PeopleItem {
  user_id: string;
  username: string;
  phonenum: string;
  mailbox: string;
  address: string;
  createTime: string;
}

interface AuditInfo {
  saleId: string;
  publish: string;
}

interface CommentList {
  page?: number;
  size?: number;
}

interface CommentItem {
  id: string;
  content: string;
  username: string;
  score: number;
  food_name: string;
  business_name: string;
  createTime: string;
}

interface BusinessInfo {
  id: string;
}

interface BusinessList {
  page?: number;
  size?: number;
}

interface BusinessItem {
  id: string;
  user_id: string;
  name: string;
  rest: Boolean;
  examine: Boolean;
  createTime: string;
}

export {
  LoginInfo,
  OrderList,
  OrderItem,
  PeopleList,
  PeopleItem,
  AuditInfo,
  CommentList,
  CommentItem,
  BusinessList,
  BusinessItem,
  BusinessInfo,
};
