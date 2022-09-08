export interface Product {
  image: string;
  description: string;
  price: number;
  info: string;
  rating: number;
  watched: boolean;
  id: string;
  badge?: {
    content: string;
    backgroundColor: string;
    color: string;
  };
}
