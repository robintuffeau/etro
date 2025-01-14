/**
 * @module movie
 */
import { Dynamic, Color } from '../util';
import { Base as BaseLayer } from '../layer/index';
import { Base as BaseEffect } from '../effect/index';
import { MovieEffects } from './effects';
import { MovieLayers } from './layers';
declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
    interface HTMLCanvasElement {
        captureStream(frameRate?: number): MediaStream;
    }
}
export declare class MovieOptions {
    /** The html canvas element to use for playback */
    canvas: HTMLCanvasElement;
    /** The audio context to use for playback, defaults to a new audio context */
    actx?: AudioContext;
    /** @deprecated Use <code>actx</code> instead */
    audioContext?: AudioContext;
    /** The background color of the movie as a cSS string */
    background?: Dynamic<Color>;
    /**
     * If set to true, the movie will repeat when it reaches the end (unless it's
     * recording)
     */
    repeat?: boolean;
}
/**
 * The movie contains everything included in the render.
 *
 * Implements a pub/sub system.
 */
export declare class Movie {
    type: string;
    /**
     * @deprecated Auto-refresh will be removed in the future. If you want to
     * refresh the canvas, call `refresh`. See
     * {@link https://github.com/etro-js/etro/issues/130}
     */
    publicExcludes: string[];
    propertyFilters: Record<string, <T>(value: T) => T>;
    repeat: boolean;
    /** The background color of the movie as a cSS string */
    background: Dynamic<Color>;
    /** The audio context to which audio output is sent during playback */
    readonly actx: AudioContext;
    readonly effects: MovieEffects;
    readonly layers: MovieLayers;
    /** The canvas that we are currently rendering to */
    private _canvas;
    private _visibleCanvas;
    private _cctx;
    private _recorder;
    private _currentTime;
    private _paused;
    private _ended;
    private _renderingFrame;
    private _recording;
    private _currentStream;
    private _endTime;
    /** The timestamp last frame in seconds */
    private _lastRealTime;
    /**
     * Creates a new movie.
     */
    constructor(options: MovieOptions);
    private _whenReady;
    /**
     * Plays the movie
     *
     * @param [options]
     * @param [options.onStart] Called when the movie starts playing
     * @param [options.duration] The duration of the movie to play in seconds
     *
     * @return Fulfilled when the movie is done playing, never fails
     */
    play(options?: {
        onStart?: () => void;
        duration?: number;
    }): Promise<void>;
    /**
     * Updates the rendering canvas and audio destination to the visible canvas
     * and the audio context destination.
     */
    private _show;
    /**
     * Streams the movie to a MediaStream
     *
     * @param options Options for the stream
     * @param options.frameRate The frame rate of the stream's video
     * @param options.duration The duration of the stream in seconds
     * @param options.video Whether to stream video. Defaults to true.
     * @param options.audio Whether to stream audio. Defaults to true.
     * @param options.onStart Called when the stream is started
     * @return Fulfilled when the stream is done, never fails
     */
    stream(options: {
        frameRate: number;
        duration?: number;
        video?: boolean;
        audio?: boolean;
        onStart(stream: MediaStream): void;
    }): Promise<void>;
    /**
     * Plays the movie in the background and records it
     *
     * @param options
     * @param [options.frameRate] - Video frame rate
     * @param [options.video=true] - whether to include video in recording
     * @param [options.audio=true] - whether to include audio in recording
     * @param [options.mediaRecorderOptions=undefined] - Options to pass to the
     * `MediaRecorder` constructor
     * @param [options.type='video/webm'] - MIME type for exported video
     * @param [options.onStart] - Called when the recording starts
     * @return Resolves when done recording, rejects when media recorder errors
     */
    record(options: {
        frameRate: number;
        duration?: number;
        type?: string;
        video?: boolean;
        audio?: boolean;
        mediaRecorderOptions?: Record<string, unknown>;
        onStart?: (recorder: MediaRecorder) => void;
    }): Promise<Blob>;
    /**
     * Stops the movie without resetting the playback position
     * @return The movie
     */
    pause(): Movie;
    /**
     * Stops playback and resets the playback position
     * @return The movie
     */
    stop(): Movie;
    /**
     * Processes one frame of the movie and draws it to the canvas
     *
     * @param [timestamp=performance.now()]
     * @param [done=undefined] - Called when done playing or when the current
     * frame is loaded
     */
    private _render;
    private _updateCurrentTime;
    /**
     * Draws the movie's background to the canvas
     *
     * @param timestamp The current high-resolution timestamp in milliseconds
     */
    private _renderBackground;
    /**
     * Ticks all layers and renders them to the canvas
     */
    private _renderLayers;
    /**
     * Applies all of the movie's effects to the canvas
     *
     * Note: This method only applies the movie's effects, not the layers'
     * effects.
     */
    private _applyEffects;
    /**
     * Refreshes the screen
     *
     * Only use this if auto-refresh is disabled
     *
     * @return - Promise that resolves when the frame is loaded
     */
    refresh(): Promise<null>;
    /**
     * Convienence method (TODO: remove)
     */
    private _publishToLayers;
    /**
     * `true` if the movie is playing, recording or refreshing
     */
    get rendering(): boolean;
    /**
     * `true` if the movie is refreshing the current frame
     */
    get renderingFrame(): boolean;
    /**
     * `true` if the movie is recording
     */
    get recording(): boolean;
    /**
     * The duration of the movie in seconds
     *
     * Calculated from the end time of the last layer
     */
    get duration(): number;
    /**
     * Convenience method for `layers.push()`
     *
     * @param layer
     * @return The movie
     */
    addLayer(layer: BaseLayer): Movie;
    /**
     * Convenience method for `effects.push()`
     *
     * @param effect
     * @return the movie
     */
    addEffect(effect: BaseEffect): Movie;
    /**
     * `true` if the movie is paused
     */
    get paused(): boolean;
    /**
     * `true` if the playback position is at the end of the movie
     */
    get ended(): boolean;
    /**
     * Skips to the provided playback position, updating {@link currentTime}.
     *
     * @param time - The new playback position (in seconds)
     */
    seek(time: number): void;
    /**
     * The current playback position in seconds
     */
    get currentTime(): number;
    /**
     * Skips to the provided playback position, updating {@link currentTime}.
     *
     * @param time - The new playback position (in seconds)
     *
     * @deprecated Use `seek` instead
     */
    set currentTime(time: number);
    /**
     * Skips to the provided playback position, updating {@link currentTime}.
     *
     * @param time - The new time (in seconds)
     * @param [refresh=true] - Render a single frame?
     * @return Promise that resolves when the current frame is rendered if
     * `refresh` is true; otherwise resolves immediately.
     *
     * @deprecated Call {@link seek} and {@link refresh} separately
     */
    setCurrentTime(time: number, refresh?: boolean): Promise<void>;
    /**
     * `true` if the movie is ready for playback
     */
    get ready(): boolean;
    /**
     * The HTML canvas element used for rendering
     */
    get canvas(): HTMLCanvasElement;
    /**
     * The canvas context used for rendering
     */
    get cctx(): CanvasRenderingContext2D;
    /**
     * The width of the output canvas
     */
    get width(): number;
    set width(width: number);
    /**
     * The height of the output canvas
     */
    get height(): number;
    set height(height: number);
    /**
     * @return The movie
     */
    get movie(): Movie;
    /**
     * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
     */
    getDefaultOptions(): MovieOptions;
}
