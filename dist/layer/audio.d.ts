import { AudioSourceOptions } from './audio-source';
interface AudioOptions extends Omit<AudioSourceOptions, 'source'> {
    /**
     * The raw html `<audio>` element
     */
    source: string | HTMLAudioElement;
}
declare const Audio_base: new (...args: unknown[]) => import("./audio-source").AudioSource;
/**
 * Layer for an HTML audio element
 * @extends AudioSource
 */
declare class Audio extends Audio_base {
    /**
     * The raw html `<audio>` element
     */
    source: HTMLAudioElement;
    /**
     * Creates an audio layer
     */
    constructor(options: AudioOptions);
    /**
     * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
     */
    getDefaultOptions(): any;
}
export { Audio, AudioOptions };
