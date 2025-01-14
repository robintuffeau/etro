import { CustomArray } from '../custom-array';
import { Visual as VisualEffect } from '../effect/index';
import { Movie } from './movie';
export declare class MovieEffects extends CustomArray<VisualEffect> {
    constructor(target: VisualEffect[], movie: Movie);
}
