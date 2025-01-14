export declare abstract class CustomArrayListener<T> {
    abstract onAdd(item: T): void;
    abstract onRemove(item: T): void;
}
/**
 * An array that notifies a listener when items are added or removed.
 */
export declare class CustomArray<T> extends Array<T> {
    constructor(target: T[], listener: CustomArrayListener<T>);
}
