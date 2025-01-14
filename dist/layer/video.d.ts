import { VisualSourceOptions } from './visual-source';
import { AudioSourceOptions } from './audio-source';
interface VideoOptions extends Omit<AudioSourceOptions & VisualSourceOptions, 'duration' | 'source'> {
    duration?: number;
    /**
     * The raw html `<video>` element
     */
    source: string | HTMLVideoElement;
}
declare const Video_base: new (...args: unknown[]) => import("./audio-source").AudioSource;
/**
 * Layer for an HTML video element
 * @extends AudioSource
 * @extends VisualSource
 */
declare class Video extends Video_base {
    /**
     * The raw html `<video>` element
     */
    source: HTMLVideoElement;
    constructor(options: VideoOptions);
}
export { Video, VideoOptions };
