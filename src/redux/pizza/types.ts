export type FetchPizzasArgs = Record<string, string>;

export type SearchPizzaParams = {
sortBy: string, 
order: string, 
category: string, 
search: string, 
currentPage: string
}
  
export type PizzaItem = {
id: string,
title: string,
price: number,
imageUrl: string, 
sizes: number[], 
types: number[]
}

export enum Status {
LOADING = 'loading',
SUCCESS = 'success',
ERROR = 'error',
}

export interface PizzaSliceState {
items: PizzaItem[];
status: Status
}