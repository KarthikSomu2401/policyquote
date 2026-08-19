export interface QuoteInput {
  customerName: string;
  propertyValue: number;
  age: number;
  propertyType: 'House' | 'Flat' | 'Bungalow';
  previousClaims?: number;
  postcode?: string;
}