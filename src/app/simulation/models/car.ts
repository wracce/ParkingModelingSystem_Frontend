import { CarTemplate } from './car-template';
import { ICar } from './icar';

export class Car implements ICar {
  constructor(
    public x: number,
    public y: number,
    public angle: number,
    public template: CarTemplate
  ) {}
}
