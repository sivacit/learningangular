export interface IPriceService {
calculateTax(basePrice: number, taxValue: number): number;
}