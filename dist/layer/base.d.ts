import EtroObject from '../object';
import { Movie } from '../movie';
interface BaseOptions {
    /** The time in the movie at which this layer starts */
    startTime: number;
    duration: number;
}
/**
 * A layer outputs content for the movie
 */
declare class Base implements EtroObject {
    type: string;
    publicExcludes: string[];
    propertyFilters: Record<string, <T>(value: T) => T>;
    enabled: boolean;
    /**
     * If the attached movie's playback position is in this layer
     */
    active: boolean;
    /**
     * The number of times this layer has been attached to a movie minus the
     * number of times it's been detached. (Used for the movie's array proxy with
     * `unshift`)
     */
    private _occurrenceCount;
    private _startTime;
    private _duration;
    private _currentTime;
    private _movie;
    /**
     * Creates a new empty layer
     *
     * @param options
     * @param options.startTime - when to start the layer on the movie's
     * timeline
     * @param options.duration - how long the layer should last on the
     * movie's timeline
     */
    constructor(options: BaseOptions);
    /**
     * Wait until this layer is ready to render
     */
    whenReady(): Promise<void>;
    /**
     * Attaches this layer to `movie` if not already attached.
     * @ignore
     */
    tryAttach(movie: Movie): void;
    /**
     * Attaches this layer to `movie`
     *
     * Called when the layer is added to a movie's `layers` array.
     *
     * @param movie The movie to attach to
     */
    attach(movie: Movie): void;
    /**
     * Detaches this layer from its movie if the number of times `tryDetach` has
     * been called (including this call) equals the number of times `tryAttach`
     * has been called.
     *
     * @ignore
     */
    tryDetach(): void;
    /**
     * Detaches this layer from its movie
     *
     * Called when the layer is removed from a movie's `layers` array.
     */
    detach(): void;
    /**
     * Called when the layer is activated
     */
    start(): void;
    /**
     * Update {@link currentTime} when seeking
     *
     * This method is called when the movie seeks to a new time at the request of
     * the user. {@link progress} is called when the movie's `currentTime` is
     * updated due to playback.
     *
     * @param time - The new time in the layer
     */
    seek(time: number): void;
    /**
     * Update {@link currentTime} due to playback
     *
     * This method is called when the movie's `currentTime` is updated due to
     * playback. {@link seek} is called when the movie seeks to a new time at the
     * request of the user.
     *
     * @param time - The new time in the layer
     */
    progress(time: number): void;
    /**
     * Called when the movie renders and the layer is active
     */
    render(): void;
    /**
     * Called when the layer is deactivated
     */
    stop(): void;
    get parent(): Movie;
    /**
     * The time in the movie at which this layer starts (in seconds)
     */
    get startTime(): number;
    set startTime(val: number);
    /**
     * The current time of the movie relative to this layer (in seconds)
     */
    get currentTime(): number;
    /**
     * The duration of this layer (in seconds)
     */
    get duration(): number;
    set duration(val: number);
    /**
     * `true` if this layer is ready to be rendered, `false` otherwise
     */
    get ready(): boolean;
    get movie(): Movie;
    /**
     * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
     */
    getDefaultOptions(): BaseOptions;
}
export { Base, BaseOptions };
