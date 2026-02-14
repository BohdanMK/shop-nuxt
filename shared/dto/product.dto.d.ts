// shared/dto/product.ts
export interface ImageDTO {
  src: string;
  alt?: string;
}

export interface ProductComponentDTO {
  name: string;
  image: ImageDTO;
}

export type ProductOptionGroupType = 'single' | 'multiple';

export interface ProductOptionValueDTO {
  id: string;
  label: string;
  description?: string;
  image?: ImageDTO;
  extraPrice?: PriceDTO;
  components?: ProductComponentDTO[];
}

export interface ProductOptionGroupDTO {
  id: string;
  name: string;
  type: ProductOptionGroupType;
  required?: boolean;
  minSelected?: number;
  maxSelected?: number;
  values: ProductOptionValueDTO[];
}


export interface PriceDTO {
    amount: number;
    currency: 'UAH';
}

export interface ProductDTO {
    _id?: string;
    id?: string;
    title: string;
    image: ImageDTO;
    isOnSale: boolean;
    salePrice?: number;
    weightGrams: number;
    components: ProductComponentDTO[];
    price: PriceDTO;
    ctaLabel?: string;
    optionGroups?: ProductOptionGroupDTO[];
    categoryId?: string,
    categoryName?: string,
    subCategoryId?: string,
    subCategoryName?: string
}


