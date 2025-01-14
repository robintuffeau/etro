import { CustomArray } from '../custom-array';
import { Base as BaseLayer } from '../layer/index';
import { Movie } from './movie';
export declare class MovieLayers extends CustomArray<BaseLayer> {
    constructor(target: BaseLayer[], movie: Movie);
}
