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

export interface LaptopProduct extends Product {
  name: string;
  previousPrice: string;
  numReviews: number;
  category: string;
}
