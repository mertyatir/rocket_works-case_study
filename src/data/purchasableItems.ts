import { PurchasableItem } from "@/types/purchasableItem";

// Create a fixed list of in-game purchasable items
const purchasableItems: PurchasableItem[] = [
  {
    id: 1,
    name: "Gold Pack Small",
    description: "A small pack of gold coins.",
    price: 100,
    itemType: "goldPackage",
  },
  {
    id: 2,
    name: "Gold Pack Medium",
    description: "A medium pack of gold coins.",
    price: 180,
    itemType: "goldPackage",
  },
  {
    id: 3,
    name: "Gold Pack Large",
    description: "A large pack of gold coins.",
    price: 250,
    itemType: "goldPackage",
  },
  {
    id: 4,
    name: "Mystic Warrior",
    description: "Unlock the Mystic Warrior character.",
    price: 500,
    itemType: "specialCharacter",
  },
  {
    id: 5,
    name: "Shadow Assassin",
    description: "Unlock the Shadow Assassin character.",
    price: 500,
    itemType: "specialCharacter",
  },
  {
    id: 6,
    name: "Speed Boost",
    description: "Temporarily increases your speed by 50% for 30 seconds.",
    price: 150,
    itemType: "powerUp",
  },
  {
    id: 7,
    name: "Strength Potion",
    description: "Temporarily increases your strength by 50% for 30 seconds.",
    price: 150,
    itemType: "powerUp",
  },
  {
    id: 8,
    name: "Invincibility Elixir",
    description: "Grants invincibility for 10 seconds.",
    price: 200,
    itemType: "powerUp",
  },
  {
    id: 9,
    name: "Double Coins",
    description: "Doubles the number of coins you collect for 1 minute.",
    price: 100,
    itemType: "powerUp",
  },
];

// Export the list for use in other parts of the application
export default purchasableItems;
