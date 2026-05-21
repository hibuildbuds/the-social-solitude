export type MenuItem = { name: string; price: string };

// Food menu — single flat list, modern bistro fare.
export const FOOD_MENU: MenuItem[] = [
  { name: "smoked fish rillette, potato pave", price: "55 ea" },
  { name: "pork croquette, piccalilli", price: "55 ea" },
  { name: "tss's bread, seaweed butter", price: "55" },
  { name: "local halloumi, zucchini, honey", price: "100" },
  { name: "raw fish, fermented tomato, daikon", price: "110" },
  { name: "beetroot, ricotta, tarragon", price: "100" },
  { name: "beef tartare, eggplant caponata, oyster emulsion", price: "150" },
  { name: "tss's pork sausage, prune and black garlic", price: "280" },
  { name: "green agnolotti, braised leek, parmesan", price: "130" },
  { name: "braised beef cappelletti, brown butter", price: "185" },
  { name: "pork neck, fermented cabbage, cumin", price: "380" },
  { name: "grilled chicken, onion soubise, turnip", price: "280" },
  { name: "grilled fish, corn, confit clam", price: "260" },
  { name: "organic rice, oyster mushroom abon", price: "75" },
  { name: "seasonal greens, sesame, local scarmoza", price: "85" },
  { name: "cauliflower salad, watercress, cashew", price: "85" },
  { name: "salak crostata, black tea ice cream", price: "90" },
  { name: "chocolate mousse, chocolate sorbet, buckwheat praline", price: "95" },
  { name: "tss set menu", price: "480/pax" },
];

// Drink menu — grouped by category.
export type DrinkSection = { title: string; items: MenuItem[] };
export const DRINK_MENU: DrinkSection[] = [
  {
    title: "Signature Cocktails",
    items: [
      { name: "Sandat — Light Rum Infused Sandat, Salak Pickle, Coriander, Egg White", price: "135" },
      { name: "Goodbye Hermano — Altos Tequila, Pickled Chilli, Kecombrang, Mezcal, Honey", price: "135" },
      { name: "Strawberry — Gin Infused Kaffir Leaf, Lemoncello, Honey, Fermented Strawberry Soda", price: "140" },
      { name: "Cool Curry — Malfy Gin, Curry Leaf, Ginger, Almond, Egg White, Nutmeg", price: "140" },
      { name: "Es Teh — Jameson Irish Whiskey, Jasmine arak, Lemon, Bitters, Tonic", price: "140" },
      { name: "Kopiko — Jameson Irish Whiskey, Almond Milk, Orange oleo, Coffee, Campari", price: "140" },
      { name: "Kuning Highball — Absolut Vodka, Yellow Watermelon, Calamansi, Moringa", price: "140" },
      { name: "Skippy — Peanut Butter Bourbon, Salted Caramel, Aromatic bitter", price: "150" },
      { name: "Blonde de Blanc — Palo Santo Vodka, Martini Bianco, Passionfruit", price: "160" },
      { name: "Smoke and Hustle — Scotch Whiskey, Martini Rosso, Amarena, Mesoyi Wood", price: "160" },
    ],
  },
  {
    title: "Non-Alcohol",
    items: [
      { name: "Lychee Vanilla — Lychee, Thyme, Vanilla, Tonic", price: "55" },
      { name: "Mango Kombucha — House Kombucha, Mango Puree", price: "60" },
      { name: "Tangerine — Tangerine Shrub, Coconut, Jasmine", price: "60" },
    ],
  },
  {
    title: "Red",
    items: [
      { name: "Hatten Aga Red, Syrah", price: "125/550" },
      { name: "Lazarus Pulp Barbara, Syrah, Tempranillo 2023", price: "125/700" },
      { name: "White Monkey, Pinot Noir 2023", price: "125/720" },
      { name: "Joe Chandellier, Carignan & Grenache 2023", price: "700" },
      { name: "Parcellaires de l'Herre, Malbec 2024", price: "700" },
    ],
  },
  {
    title: "White",
    items: [
      { name: "Wairau River, Pinot Gris 2023", price: "125/650" },
      { name: "Lazarus Pulp Victoria, Chardonnay 2023", price: "125/700" },
      { name: "White Monkey, Sauvignon Blanc 2023", price: "125/720" },
      { name: "Partida Creus, BN Blanco, Macabeo 2022", price: "890" },
      { name: "Domain Mamaruta, Syrah, Carigan 2023", price: "130/820" },
      { name: "Delinquente Pretty Boy, Nero d'Avola 2025", price: "850" },
    ],
  },
  {
    title: "Orange",
    items: [
      { name: "Lazarus Pulp Pamela, Chenin Blanc 2023", price: "125/700" },
    ],
  },
  {
    title: "Sparkling",
    items: [
      { name: "Hatten Tunjung, Muscat St. Vallier", price: "600" },
      { name: "Lazarus Pulp Pet Nat, Sauvignon Blanc and Chardonnay", price: "700" },
    ],
  },
  {
    title: "Beer",
    items: [
      { name: "Bintang", price: "40" },
      { name: "Island Brewing Pilsner", price: "55" },
      { name: "Kura-Kura Easy Ale", price: "60" },
    ],
  },
];
