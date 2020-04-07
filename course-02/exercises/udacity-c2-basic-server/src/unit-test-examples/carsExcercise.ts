import { Car } from '../cars';
import fetch from 'cross-fetch';
import { Interface } from 'readline';

export interface ResponseObj {
    status: number;
    cars: Car[];
}

export const API = 'http://localhost:8082'

const headers = {
    'Accept': 'application/json'
}

export const getAllCars = async () => {

    const res = await fetch(`${API}/cars/`, { headers });
    const status = res.status;
    const cars: Car[] = await res.json();

    return { status, cars };
}

export const getCarById = async (id: number) => {

    const res = await fetch(`${API}/cars/${id}`, { headers });
    const status = res.status;
    const car: Car = await res.json();

    return { status, car };
}