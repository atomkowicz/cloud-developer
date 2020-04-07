import { cars, Car } from '../cars';
import { getAllCars, getCarById, ResponseObj } from './carsExcercise';

import { expect } from 'chai';
import 'mocha';


describe('getAllCars', () => {

    it('GET should return 200', async () => {
        const responseObj = await getAllCars();
        const status = responseObj.status;
        expect(status).to.equal(200);
    });

});

describe('getCarById', () => {

    it('Response should contain id of the queried car', async () => {
        const responseObj = await getCarById(2);
        const car: Car = await responseObj.car;
        expect(car.id).to.equal("2");
    });

});