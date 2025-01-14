/**
 * @module event
 */
import EtroObject from './object';
export interface Event {
    target: EtroObject;
    type: string;
}
export declare function deprecate(type: string, newType: string, message?: string): void;
/**
 * Listen for an event or category of events.
 *
 * @param target - an etro object
 * @param type - the id of the type (can contain subtypes, such as
 * "type.subtype")
 * @param listener
 * @param options - options
 * @param options.once - if true, the listener will only be called once
 */
export declare function subscribe(target: EtroObject, type: string, listener: <T extends Event>(T: any) => void, options?: {
    once?: boolean;
}): void;
/**
 * Remove an event listener
 *
 * @param target - an etro object
 * @param type - the id of the type (can contain subtypes, such as
 * "type.subtype")
 * @param listener
 */
export declare function unsubscribe(target: EtroObject, listener: <T extends Event>(T: any) => void): void;
/**
 * Emits an event to all listeners
 *
 * @param target - an etro object
 * @param type - the id of the type (can contain subtypes, such as
 * "type.subtype")
 * @param event - any additional event data
 */
export declare function publish(target: EtroObject, type: string, event: Record<string, unknown>): Event;
