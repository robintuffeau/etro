import { Color, Dynamic } from '../util';
import { Visual, VisualOptions } from './visual';
declare enum TextStrokePosition {
    Inside = 0,
    Center = 1,
    Outside = 2
}
interface TextOptions extends VisualOptions {
    text: Dynamic<string>;
    fontSize: Dynamic<number>;
    font?: Dynamic<string>;
    color?: Dynamic<Color>;
    background?: Dynamic<Color>;
    textBackground?: Dynamic<Color>;
    padding?: Dynamic<number>;
    radius?: Dynamic<number>;
    lineHeight?: Dynamic<number>;
    /** The text's horizontal offset from the layer */
    textX?: Dynamic<number>;
    /** The text's vertical offset from the layer */
    textY?: Dynamic<number>;
    maxWidth?: Dynamic<number>;
    /**
     * @desc The horizontal alignment
     * @see [`CanvasRenderingContext2D#textAlign<`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign)
     */
    textAlign?: Dynamic<string>;
    /**
     * @desc The vertical alignment
     * @see [`CanvasRenderingContext2D#textBaseline`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline)
     */
    textBaseline?: Dynamic<string>;
    /**
     * @see [`CanvasRenderingContext2D#direction`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline)
     */
    textDirection?: Dynamic<string>;
    textStroke?: Dynamic<{
        color: Color;
        position?: TextStrokePosition;
        thickness?: number;
    }>;
}
declare class Text extends Visual {
    text: Dynamic<string>;
    font: Dynamic<string>;
    color: Dynamic<Color>;
    fontSize: Dynamic<number>;
    textBackground: Dynamic<Color>;
    padding: Dynamic<number>;
    radius: Dynamic<number>;
    lineHeight: Dynamic<number>;
    /** The text's horizontal offset from the layer */
    textX: Dynamic<number>;
    /** The text's vertical offset from the layer */
    textY: Dynamic<number>;
    maxWidth: Dynamic<number>;
    /**
     * @desc The horizontal alignment
     * @see [`CanvasRenderingContext2D#textAlign<`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign)
     */
    textAlign: Dynamic<string>;
    /**
     * @desc The vertical alignment
     * @see [`CanvasRenderingContext2D#textBaseline`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline)
     */
    textBaseline: Dynamic<string>;
    /**
     * @see [`CanvasRenderingContext2D#direction`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline)
     */
    textDirection: Dynamic<string>;
    textStroke?: Dynamic<{
        color: Color;
        position?: TextStrokePosition;
        thickness?: number;
    }>;
    private _prevText;
    private _prevFont;
    private _prevMaxWidth;
    /**
     * Creates a new text layer
     */
    constructor(options: TextOptions);
    doRender(): void;
    /**
     * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
     */
    getDefaultOptions(): TextOptions;
}
export { Text, TextOptions, TextStrokePosition };
