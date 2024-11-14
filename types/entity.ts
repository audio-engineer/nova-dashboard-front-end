import type { BaseEntity } from "@/types/base";
import type { UUID } from "node:crypto";

export interface Category extends BaseEntity {
  readonly name: string;
}

export interface Product extends BaseEntity {
  readonly name: string;
}

export interface ProductWithCategoryProjection extends Product {
  readonly id: UUID;
  readonly category:
    | (Pick<Category, "_links"> & { readonly id: string })
    | null;
}

export interface Order extends BaseEntity {
  readonly orderNumber: number;
  readonly price: number;
  readonly businessDate: string;
}

export interface OrderLine extends BaseEntity {
  readonly quantity: number;
  readonly price: number;
  readonly unitPrice: number;
}

export interface WithDate {
  readonly date: string;
}

export interface DailyCategorySalesDto extends WithDate {
  readonly categorySales: readonly {
    readonly name: string;
    readonly totalSales: number;
  }[];
}

export interface DailyHourlySalesDto extends WithDate {
  readonly hourlySales: readonly {
    readonly hour: string;
    readonly totalSales: number;
  }[];
}

export interface TotalDailySalesProjection extends WithDate {
  readonly totalSales: number;
}
