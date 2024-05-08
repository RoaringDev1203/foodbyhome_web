type CurrencyType = '₹' | '$' | '€'

const currentCurrency: CurrencyType = '$';

export const BASE_URL: string = 'https://foodbyhome-api-dev-six.vercel.app';
export const authSessionKey = '__FOODBYHOME_REACT_AUTH__'

const extendedColorVariants = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
  'pink',
]

const colorVariants = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
]

enum foodCategory {
  Asian = "Asiatisk",
  Barbecue = "Barbecue",
  Burger = "Burger",
  Cafe = "Cafe",
  Desserts = "Desserter",
  Lunch = "Frokost",
  Indian = "Indisk",
  IceCream = "Is",
  Italian = "Italiensk",
  ItalianPizza = "Italiensk pizza",
  Japanese = "Japansk",
  Kebab = "Kebab",
  Breakfast = "Morgenmad",
  Pita = "Pita",
  PokeBowl = "Poke bowl",
  Salad = "Salat",
  Sandwich = "Sandwich",
  Thai = "Thai",
  Offers = "Tilbud",
  Turkish = "Tyrkisk",
  Wok = "Wok"
}
export { extendedColorVariants, colorVariants, currentCurrency, foodCategory }
