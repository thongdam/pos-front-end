// ~/types/index.ts

export interface Product {
  id: number;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  price: number; 
  cost: string;  
  category_id: number; // snake_case
  stock: number;
  min_stock: number;
  max_stock: number;
  unit: string;
  images?: string | null;
  supplier_id?: number | null;
  weight?: string;
  dimensions?: string | null;
  notes?: string | null;
  track_stock: boolean;
  is_active: boolean; // snake_case
  created_at: string;
  updated_at: string;
  category?: Category; // nested category object
}

export interface Category {
  id: number;
  name: string;
  description?: string | null;
  color?: string;
  image?: string | null;
  parent_id?: number | null;
  sort_order: number;
  is_active: boolean; // snake_case
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ProductFilter {
  category_id?: number | string;
  searchQuery?: string;
  stockStatus?: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
  sortBy?: 'name' | 'price' | 'stock' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

// Helper interfaces 
export interface ProductDisplay extends Omit<Product, 'price' | 'cost' | 'category_id' | 'is_active' | 'created_at' | 'updated_at'> {
  price: number;
  cost: number;
  categoryId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryDisplay extends Omit<Category, 'is_active' | 'created_at' | 'updated_at' | 'parent_id'> {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  parentId?: number | null;
}


// POS Types
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  membershipType?: 'ທົດສອບ' | 'ທຳມະ' | 'ສະມາຊິກ' | 'VIP';
  totalSpent: number;
  lastVisit: Date;
  points: number;
  phone?: string;
  email?: string;
  address?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
  discount: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  itemCount: number;
}

export interface Sale {
  id: number;
  customer_id?: number;
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total: number;
  payment_method: 'ເງິນສົດ' | 'ບັດເຄຣດິດ' | 'QR' | 'ໂອນເງິນ';
  status: 'completed' | 'pending' | 'cancelled';
  sale_date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  items: SaleItem[];
}

export interface SaleItem {
  id: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  price: number;
  discount: number;
  subtotal: number;
  product?: Product;
}

// Helper interfaces
export interface ProductDisplay extends Omit<Product, 'price' | 'cost' | 'category_id' | 'is_active' | 'created_at' | 'updated_at'> {
  price: number;
  cost: number;
  categoryId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryDisplay extends Omit<Category, 'is_active' | 'created_at' | 'updated_at' | 'parent_id'> {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  parentId?: number | null;
}

export type ToastType = 'ສຳເລັດ' | 'ຜິດພາດ' | 'ແຈ້ງເຕືອນ' | 'ຂໍ້ມູນ'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message: string
  duration: number
}