export type PropertyType = 'House' | 'Flat' | 'Bungalow';

export type RiskBandName = 'STANDARD' | 'ELEVATED' | 'HIGH_RISK';

export interface QuoteRequest {
  customerName: string;
  age: number;
  propertyType: PropertyType;
  propertyValue: number;
  postcode: string;
  previousClaims: number;
}

export interface AppliedRiskFactor {
  id: string;
  description: string;
  points: number;
}

export interface QuoteResult {
  customerName: string;
  annualPremium: number;
  riskScore: number;
  appliedFactors: AppliedRiskFactor[];
}
