import type {
  Category,
  DailyCategorySalesDto,
  DailyHourlySalesDto,
  Order,
  OrderLine,
  Product,
  ProductWithCategoryProjection,
  TotalDailyRevenueProjection,
  TotalDailySalesProjection,
} from "@/types/entity";
import type { Link, SelfLink } from "@/types/base";

export interface EmbeddedCategories {
  readonly categories: readonly Category[];
}

export interface EmbeddedProducts {
  readonly products: readonly Product[];
}

export interface EmbeddedProductsWithCategory {
  readonly products: readonly ProductWithCategoryProjection[];
}

export interface EmbeddedOrders {
  readonly orders: readonly Order[];
}

export interface EmbeddedOrderLines {
  readonly orderLines: readonly OrderLine[];
}

export interface EmbeddedDailyCategorySales {
  readonly dailyCategorySalesDtoes: readonly DailyCategorySalesDto[];
}

export interface EmbeddedDailyHourlySales {
  readonly dailyHourlySalesDtoes: readonly DailyHourlySalesDto[];
}

export interface EmbeddedTotalDailySales {
  readonly tupleBackedMaps: readonly TotalDailySalesProjection[];
}

export interface EmbeddedTotalDailyRevenue {
  readonly tupleBackedMaps: readonly TotalDailyRevenueProjection[];
}

export interface PageInfo {
  readonly size: number;
  readonly totalElements: number;
  readonly totalPages: number;
  readonly number: number;
}

interface Links {
  readonly first?: Link;
  readonly prev?: Link;
  readonly next?: Link;
  readonly last?: Link;
}

export interface PaginatedResponse<
  T extends
    | EmbeddedCategories
    | EmbeddedProducts
    | EmbeddedProductsWithCategory
    | EmbeddedOrders
    | EmbeddedOrderLines
    | EmbeddedDailyCategorySales
    | EmbeddedDailyHourlySales
    | EmbeddedTotalDailySales
    | EmbeddedTotalDailyRevenue,
> {
  readonly _embedded: T;
  readonly _links: SelfLink & Links;
  readonly page: PageInfo;
}
