export type PurchasableItem = {
  id: number;
  name: string;
  description: string;
  price: number; // Assuming price is in a generic currency unit
  itemType: "goldPackage" | "specialCharacter" | "powerUp";
};
