export interface IGoodDataIncome {
  name: string,
  brand: string,
  categorie: string,
  image: string,
  price: number,
}

export interface IGoodModel extends IGoodDataIncome {
  rating: number,
}

export interface IGoodFilter {
  brand?: string,
  categorie?: string,
  price?: number,
}