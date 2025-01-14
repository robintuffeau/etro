import { VisualSourceOptions } from './visual-source';
interface ImageOptions extends Omit<VisualSourceOptions, 'source'> {
    /**
     * The raw html `<img>` element
     */
    source: string | HTMLImageElement;
}
declare const Image_base: new (...args: unknown[]) => import("./visual-source").VisualSource;
/**
 * Layer for an HTML image element
 * @extends VisualSource
 */
declare class Image extends Image_base {
    /**
     * The raw html `<img>` element
     */
    source: HTMLImageElement;
    constructor(options: ImageOptions);
}
export { Image, ImageOptions };
