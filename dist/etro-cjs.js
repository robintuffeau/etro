'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * @module event
 */
var DeprecatedEvent = /** @class */ (function () {
    function DeprecatedEvent(replacement, message) {
        if (message === void 0) { message = undefined; }
        this.replacement = replacement;
        this.message = message;
    }
    DeprecatedEvent.prototype.toString = function () {
        var str = '';
        if (this.replacement) {
            str += "Use ".concat(this.replacement, " instead.");
        }
        if (this.message) {
            str += " ".concat(this.message);
        }
        return str;
    };
    return DeprecatedEvent;
}());
var deprecatedEvents = {};
/**
 * An event type
 * @private
 */
var TypeId = /** @class */ (function () {
    function TypeId(id) {
        this._parts = id.split('.');
    }
    TypeId.prototype.contains = function (other) {
        if (other._parts.length > this._parts.length) {
            return false;
        }
        for (var i = 0; i < other._parts.length; i++) {
            if (other._parts[i] !== this._parts[i]) {
                return false;
            }
        }
        return true;
    };
    TypeId.prototype.toString = function () {
        return this._parts.join('.');
    };
    return TypeId;
}());
function deprecate(type, newType, message) {
    if (message === void 0) { message = undefined; }
    deprecatedEvents[type] = new DeprecatedEvent(newType, message);
}
function subscribeOnce(target, type, listener) {
    var wrapped = function (event) {
        unsubscribe(target, wrapped);
        listener(event);
    };
    subscribe(target, type, wrapped);
}
function subscribeMany(target, type, listener) {
    if (!listeners.has(target)) {
        listeners.set(target, []);
    }
    listeners.get(target).push({ type: new TypeId(type), listener: listener });
}
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
function subscribe(target, type, listener, options) {
    if (options === void 0) { options = {}; }
    // Check if this event is deprecated.
    if (Object.keys(deprecatedEvents).includes(type)) {
        console.warn("Event ".concat(type, " is deprecated. ").concat(deprecatedEvents[type]));
    }
    if (options.once) {
        subscribeOnce(target, type, listener);
    }
    else {
        subscribeMany(target, type, listener);
    }
}
/**
 * Remove an event listener
 *
 * @param target - an etro object
 * @param type - the id of the type (can contain subtypes, such as
 * "type.subtype")
 * @param listener
 */
function unsubscribe(target, listener) {
    // Make sure `listener` has been added with `subscribe`.
    if (!listeners.has(target) ||
        !listeners.get(target).map(function (pair) { return pair.listener; }).includes(listener)) {
        throw new Error('No matching event listener to remove');
    }
    var removed = listeners.get(target)
        .filter(function (pair) { return pair.listener !== listener; });
    listeners.set(target, removed);
}
/**
 * Publish an event to all listeners without checking if it is deprecated.
 *
 * @param target
 * @param type
 * @param event
 * @returns
 */
function _publish(target, type, event) {
    event.target = target; // could be a proxy
    event.type = type;
    var t = new TypeId(type);
    if (!listeners.has(target)) {
        // No event fired
        return null;
    }
    // Call event listeners for this event.
    var listenersForType = [];
    for (var i = 0; i < listeners.get(target).length; i++) {
        var item = listeners.get(target)[i];
        if (t.contains(item.type)) {
            listenersForType.push(item.listener);
        }
    }
    for (var i = 0; i < listenersForType.length; i++) {
        var listener = listenersForType[i];
        listener(event);
    }
    return event;
}
/**
 * Emits an event to all listeners
 *
 * @param target - an etro object
 * @param type - the id of the type (can contain subtypes, such as
 * "type.subtype")
 * @param event - any additional event data
 */
function publish(target, type, event) {
    // Check if this event is deprecated only if it can be replaced.
    if (Object.keys(deprecatedEvents).includes(type) && deprecatedEvents[type].replacement) {
        throw new Error("Event ".concat(type, " is deprecated. ").concat(deprecatedEvents[type]));
    }
    // Check for deprecated events that this event replaces.
    for (var deprecated in deprecatedEvents) {
        var deprecatedEvent = deprecatedEvents[deprecated];
        if (type === deprecatedEvent.replacement) {
            _publish(target, deprecated, __assign({}, event));
        }
    }
    return _publish(target, type, event);
}
var listeners = new WeakMap();

var event = /*#__PURE__*/Object.freeze({
    __proto__: null,
    deprecate: deprecate,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish
});

/**
 * @module util
 */
/**
 * Gets the first matching property descriptor in the prototype chain, or
 * undefined.
 * @param obj
 * @param name
 */
function getPropertyDescriptor(obj, name) {
    do {
        var propDesc = Object.getOwnPropertyDescriptor(obj, name);
        if (propDesc) {
            return propDesc;
        }
        obj = Object.getPrototypeOf(obj);
    } while (obj);
    return undefined;
}
/**
 * Merges `options` with `defaultOptions`, and then copies the properties with
 * the keys in `defaultOptions` from the merged object to `destObj`.
 *
 * @deprecated Each option should be copied individually, and the default value
 * should be set in the constructor. See
 * {@link https://github.com/etro-js/etro/issues/131} for more info.
 *
 * @return
 */
// TODO: Make methods like getDefaultOptions private
function applyOptions(options, destObj) {
    var defaultOptions = destObj.getDefaultOptions();
    // Validate; make sure `keys` doesn't have any extraneous items
    for (var option in options) {
        // eslint-disable-next-line no-prototype-builtins
        if (!defaultOptions.hasOwnProperty(option)) {
            throw new Error("Invalid option: '" + option + "'");
        }
    }
    // Merge options and defaultOptions
    options = __assign(__assign({}, defaultOptions), options);
    // Copy options
    for (var option in options) {
        var propDesc = getPropertyDescriptor(destObj, option);
        // Update the property as long as the property has not been set (unless if it has a setter)
        if (!propDesc || propDesc.set) {
            destObj[option] = options[option];
        }
    }
}
// This must be cleared at the start of each frame
var valCache = new WeakMap();
function cacheValue(element, path, value) {
    // Initiate movie cache
    if (!valCache.has(element.movie)) {
        valCache.set(element.movie, new WeakMap());
    }
    var movieCache = valCache.get(element.movie);
    // Initiate element cache
    if (!movieCache.has(element)) {
        movieCache.set(element, {});
    }
    var elementCache = movieCache.get(element);
    // Cache the value
    elementCache[path] = value;
    return value;
}
function hasCachedValue(element, path) {
    return valCache.has(element.movie) &&
        valCache.get(element.movie).has(element) &&
        path in valCache.get(element.movie).get(element);
}
function getCachedValue(element, path) {
    return valCache.get(element.movie).get(element)[path];
}
function clearCachedValues(movie) {
    valCache.delete(movie);
}
/**
 * A keyframe set.
 *
 * Usage:
 * ```js
 new etro.KeyFrame([time1, value1, interpolation1], [time2, value2])`
 * ```
 * TypeScript users need to specify the type of the value as a type parameter.
 */
var KeyFrame = /** @class */ (function () {
    function KeyFrame() {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        this.value = value;
        this.interpolationKeys = [];
    }
    KeyFrame.prototype.withKeys = function (keys) {
        this.interpolationKeys = keys;
        return this;
    };
    KeyFrame.prototype.evaluate = function (time) {
        if (this.value.length === 0) {
            throw new Error('Empty keyframe');
        }
        if (time === undefined) {
            throw new Error('|time| is undefined or null');
        }
        var firstTime = this.value[0][0];
        if (time < firstTime) {
            throw new Error('No keyframe point before |time|');
        }
        // I think reduce are slow to do per-frame (or more)?
        for (var i = 0; i < this.value.length; i++) {
            var startTime = this.value[i][0];
            var startValue = this.value[i][1];
            var interpolate = this.value[i].length === 3 ? this.value[i][2] : linearInterp;
            if (i + 1 < this.value.length) {
                var endTime = this.value[i + 1][0];
                var endValue = this.value[i + 1][1];
                if (startTime <= time && time < endTime) {
                    // No need for endValue if it is flat interpolation
                    // TODO: support custom interpolation for 'other' types?
                    if (!(typeof startValue === 'number' || typeof endValue === 'object')) {
                        return startValue;
                    }
                    else if (typeof startValue !== typeof endValue) {
                        throw new Error('Type mismatch in keyframe values');
                    }
                    else {
                        // Interpolate
                        var percentProgress = (time - startTime) / (endTime - startTime);
                        return interpolate(startValue, // eslint-disable-line @typescript-eslint/ban-types
                        endValue, // eslint-disable-line @typescript-eslint/ban-types
                        percentProgress, this.interpolationKeys);
                    }
                }
            }
            else {
                // Repeat last value forever
                return startValue;
            }
        }
    };
    return KeyFrame;
}());
/**
 * Computes a property.
 *
 * @param element - the etro object to which the property belongs to
 * @param path - the dot-separated path to a property on `element`
 * @param time - time to calculate keyframes for, if necessary
 *
 * Note that only values used in keyframes that are numbers or objects
 * (including arrays) are interpolated. All other values are taken sequentially
 * with no interpolation. JavaScript will convert parsed colors, if created
 * correctly, to their string representations when assigned to a
 * CanvasRenderingContext2D property.
 */
// TODO: Is this function efficient?
// TODO: Update doc @params to allow for keyframes
function val(element, path, time) {
    if (hasCachedValue(element, path)) {
        return getCachedValue(element, path);
    }
    // Get property of element at path
    var pathParts = path.split('.');
    var property = element[pathParts.shift()];
    while (pathParts.length > 0) {
        property = property[pathParts.shift()];
    }
    // Property filter function
    var process = element.propertyFilters[path];
    var value;
    if (property instanceof KeyFrame) {
        value = property.evaluate(time);
    }
    else if (typeof property === 'function') {
        value = property(element, time);
    }
    else {
        // Simple value
        value = property;
    }
    return cacheValue(element, path, process ? process.call(element, value) : value);
}
/* export function floorInterp(x1, x2, t, objectKeys) {
    // https://stackoverflow.com/a/25835337/3783155 (TODO: preserve getters/setters, etc?)
    return !objectKeys ? x1 : objectKeys.reduce((a, x) => {
        if (x1.hasOwnProperty(x)) a[x] = o[x];  // ignore x2
        return a;
    }, Object.create(Object.getPrototypeOf(x1)));
} */
function linearInterp(x1, x2, t, objectKeys) {
    if (typeof x1 !== typeof x2) {
        throw new Error('Type mismatch');
    }
    if (typeof x1 !== 'number' && typeof x1 !== 'object') {
        // Flat interpolation (floor)
        return x1;
    }
    if (typeof x1 === 'object') { // to work with objects (including arrays)
        // TODO: make this code DRY
        if (Object.getPrototypeOf(x1) !== Object.getPrototypeOf(x2)) {
            throw new Error('Prototype mismatch');
        }
        // Preserve prototype of objects
        var int = Object.create(Object.getPrototypeOf(x1));
        // Take the intersection of properties
        var keys = Object.keys(x1) || objectKeys; // TODO: reverse operands
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            // eslint-disable-next-line no-prototype-builtins
            if (!x1.hasOwnProperty(key) || !x2.hasOwnProperty(key)) {
                continue;
            }
            int[key] = linearInterp(x1[key], x2[key], t);
        }
        return int;
    }
    return (1 - t) * x1 + t * x2;
}
function cosineInterp(x1, x2, t, objectKeys) {
    if (typeof x1 !== typeof x2) {
        throw new Error('Type mismatch');
    }
    if (typeof x1 !== 'number' && typeof x1 !== 'object') {
        // Flat interpolation (floor)
        return x1;
    }
    if (typeof x1 === 'object' && typeof x2 === 'object') { // to work with objects (including arrays)
        if (Object.getPrototypeOf(x1) !== Object.getPrototypeOf(x2)) {
            throw new Error('Prototype mismatch');
        }
        // Preserve prototype of objects
        var int = Object.create(Object.getPrototypeOf(x1));
        // Take the intersection of properties
        var keys = Object.keys(x1) || objectKeys;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            // eslint-disable-next-line no-prototype-builtins
            if (!x1.hasOwnProperty(key) || !x2.hasOwnProperty(key)) {
                continue;
            }
            int[key] = cosineInterp(x1[key], x2[key], t);
        }
        return int;
    }
    var cos = Math.cos(Math.PI / 2 * t);
    return cos * x1 + (1 - cos) * x2;
}
/**
 * An RGBA color, for proper interpolation and shader effects
 */
var Color = /** @class */ (function () {
    /**
     * @param r
     * @param g
     * @param b
     * @param a
     */
    function Color(r, g, b, a) {
        if (a === void 0) { a = 1.0; }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
     * Converts to a CSS color
     */
    Color.prototype.toString = function () {
        return "rgba(".concat(this.r, ", ").concat(this.g, ", ").concat(this.b, ", ").concat(this.a, ")");
    };
    return Color;
}());
var parseColorCanvas = document.createElement('canvas');
parseColorCanvas.width = parseColorCanvas.height = 1;
var parseColorCtx = parseColorCanvas.getContext('2d');
/**
 * Converts a CSS color string to a {@link Color} object representation.
 * @param str
 * @return the parsed color
 */
function parseColor(str) {
    // TODO - find a better way to deal with the fact that invalid values of "col"
    // are ignored.
    parseColorCtx.clearRect(0, 0, 1, 1);
    parseColorCtx.fillStyle = str;
    parseColorCtx.fillRect(0, 0, 1, 1);
    var data = parseColorCtx.getImageData(0, 0, 1, 1).data;
    return new Color(data[0], data[1], data[2], data[3] / 255);
}
/**
 * A font, for proper interpolation
 */
var Font = /** @class */ (function () {
    /**
     * @param size
     * @param family
     * @param sizeUnit
     */
    function Font(size, sizeUnit, family, style, variant, weight, stretch, lineHeight) {
        if (style === void 0) { style = 'normal'; }
        if (variant === void 0) { variant = 'normal'; }
        if (weight === void 0) { weight = 'normal'; }
        if (stretch === void 0) { stretch = 'normal'; }
        if (lineHeight === void 0) { lineHeight = 'normal'; }
        this.size = size;
        this.sizeUnit = sizeUnit;
        this.family = family;
        this.style = style;
        this.variant = variant;
        this.weight = weight;
        this.stretch = stretch;
        this.lineHeight = lineHeight;
    }
    /**
     * Converts to CSS font syntax
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font
     */
    Font.prototype.toString = function () {
        var s = '';
        if (this.style !== 'normal') {
            s += this.style + ' ';
        }
        if (this.variant !== 'normal') {
            s += this.variant + ' ';
        }
        if (this.weight !== 'normal') {
            s += this.weight + ' ';
        }
        if (this.stretch !== 'normal') {
            s += this.stretch + ' ';
        }
        s += "".concat(this.size).concat(this.sizeUnit, " ");
        if (this.lineHeight !== 'normal') {
            s += this.lineHeight + ' ';
        }
        s += this.family;
        return s;
    };
    return Font;
}());
var parseFontEl = document.createElement('div');
/**
 * Converts a CSS font string to a {@link Font} object
 * representation.
 * @param str
 * @return the parsed font
 */
function parseFont(str) {
    // Assign css string to html element
    parseFontEl.setAttribute('style', "font: ".concat(str));
    var _a = parseFontEl.style, fontSize = _a.fontSize, fontFamily = _a.fontFamily, fontStyle = _a.fontStyle, fontVariant = _a.fontVariant, fontWeight = _a.fontWeight, lineHeight = _a.lineHeight;
    parseFontEl.removeAttribute('style');
    var size = parseFloat(fontSize);
    var sizeUnit = fontSize.substring(size.toString().length);
    return new Font(size, sizeUnit, fontFamily, fontStyle, fontVariant, fontWeight, lineHeight);
}
/**
 * @param mapper
 * @param canvas
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 * @param flush
 * @deprecated Use {@link effect.Shader} instead
 */
function mapPixels(mapper, canvas, ctx, x, y, width, height, flush) {
    if (flush === void 0) { flush = true; }
    x = x || 0;
    y = y || 0;
    width = width || canvas.width;
    height = height || canvas.height;
    var frame = ctx.getImageData(x, y, width, height);
    for (var i = 0, l = frame.data.length; i < l; i += 4) {
        mapper(frame.data, i);
    }
    if (flush) {
        ctx.putImageData(frame, x, y);
    }
}

/**
 * A layer that gets its audio from an HTMLMediaElement
 * @mixin AudioSourceMixin
 */
// TODO: Implement playback rate
// The generic is just for type-checking. The argument is for functionality
// (survives when compiled to javascript).
function AudioSourceMixin(superclass) {
    var MixedAudioSource = /** @class */ (function (_super) {
        __extends(MixedAudioSource, _super);
        /**
         * @param options
         * @param options.source
         * @param options.onload
         * @param [options.sourceStartTime=0] - at what time in the audio
         * the layer starts
         * @param [options.duration=media.duration-options.sourceStartTime]
         * @param [options.muted=false]
         * @param [options.volume=1]
         * @param [options.playbackRate=1]
         */
        function MixedAudioSource(options) {
            var _this = this;
            var _a;
            if (!options.source) {
                throw new Error('Property "source" is required in options');
            }
            var onload = options.onload;
            // Don't set as instance property
            delete options.onload;
            _this = _super.call(this, __assign(__assign({}, options), { 
                // Set a default duration so that the super constructor doesn't throw an
                // error
                duration: (_a = options.duration) !== null && _a !== void 0 ? _a : 0 })) || this;
            _this._initialized = false;
            _this._sourceStartTime = options.sourceStartTime || 0;
            applyOptions(options, _this);
            var load = function () {
                if (options.duration < 0) {
                    throw new Error('Invalid options.duration. It must be a non-negative value.');
                }
                if (_this.sourceStartTime > _this.source.duration) {
                    throw new Error('options.sourceStartTime cannot exceed options.source.duration');
                }
                _this._unstretchedDuration = options.duration || (_this.source.duration - _this.sourceStartTime);
                _this.duration = _this._unstretchedDuration / (_this.playbackRate);
                // onload will use `this`, and can't bind itself because it's before
                // super()
                onload && onload.bind(_this)(_this.source, options);
            };
            if (_this.source.readyState >= 2) {
                // this frame's data is available now
                load();
            }
            else {
                // when this frame's data is available
                _this.source.addEventListener('loadedmetadata', load);
            }
            _this.source.addEventListener('durationchange', function () {
                _this.duration = options.duration || (_this.source.duration - _this.sourceStartTime);
            });
            return _this;
        }
        MixedAudioSource.prototype.whenReady = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.whenReady.call(this)];
                        case 1:
                            _a.sent();
                            if (!(this.source.readyState < 4)) return [3 /*break*/, 3];
                            return [4 /*yield*/, new Promise(function (resolve) {
                                    _this.source.addEventListener('canplaythrough', resolve);
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MixedAudioSource.prototype.attach = function (movie) {
            var _this = this;
            _super.prototype.attach.call(this, movie);
            // TODO: on unattach?
            subscribe(movie, 'audiodestinationupdate', function (event) {
                _this.audioNode.disconnect(_this._lastAudioDestination);
                _this.audioNode.connect(event.destination);
                _this._lastAudioDestination = event.destination;
            });
            // connect to audiocontext
            this._audioNode = this.audioNode || movie.actx.createMediaElementSource(this.source);
            // Connect to actx.destination by default (can be rewired by user)
            this.audioNode.connect(movie.actx.destination);
            this._lastAudioDestination = movie.actx.destination;
        };
        MixedAudioSource.prototype.detach = function () {
            // Cache dest before super.detach() unsets this.movie
            var dest = this.movie.actx.destination;
            _super.prototype.detach.call(this);
            this.audioNode.disconnect(dest);
        };
        MixedAudioSource.prototype.start = function () {
            this.source.currentTime = this.currentTime + this.sourceStartTime;
            this.source.play();
        };
        MixedAudioSource.prototype.seek = function (time) {
            _super.prototype.seek.call(this, time);
            if (isNaN(this.currentTime)) {
                this.source.currentTime = this.sourceStartTime;
            }
            else {
                this.source.currentTime = this.currentTime + this.sourceStartTime;
            }
        };
        MixedAudioSource.prototype.render = function () {
            _super.prototype.render.call(this);
            // TODO: implement Issue: Create built-in audio node to support built-in
            // audio nodes, as this does nothing rn
            this.source.muted = val(this, 'muted', this.currentTime);
            this.source.volume = val(this, 'volume', this.currentTime);
            this.source.playbackRate = val(this, 'playbackRate', this.currentTime);
        };
        MixedAudioSource.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this.source.pause();
        };
        Object.defineProperty(MixedAudioSource.prototype, "audioNode", {
            /**
             * The audio source node for the media
             */
            get: function () {
                return this._audioNode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MixedAudioSource.prototype, "playbackRate", {
            get: function () {
                return this._playbackRate;
            },
            set: function (value) {
                this._playbackRate = value;
                if (this._unstretchedDuration !== undefined) {
                    this.duration = this._unstretchedDuration / value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MixedAudioSource.prototype, "startTime", {
            get: function () {
                return this.__startTime;
            },
            set: function (val) {
                this.__startTime = val;
                if (this._initialized) {
                    var mediaProgress = this.movie.currentTime - this.startTime;
                    this.source.currentTime = this.sourceStartTime + mediaProgress;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MixedAudioSource.prototype, "sourceStartTime", {
            /**
             * Time in the media at which the layer starts
             */
            get: function () {
                return this._sourceStartTime;
            },
            set: function (val) {
                this._sourceStartTime = val;
                if (this._initialized) {
                    var mediaProgress = this.movie.currentTime - this.startTime;
                    this.source.currentTime = mediaProgress + this.sourceStartTime;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MixedAudioSource.prototype, "ready", {
            get: function () {
                // Typescript doesn't support `super.ready` when targeting es5
                var superReady = Object.getOwnPropertyDescriptor(superclass.prototype, 'ready').get.call(this);
                return superReady && this.source.readyState === 4;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
         */
        MixedAudioSource.prototype.getDefaultOptions = function () {
            return __assign(__assign({}, superclass.prototype.getDefaultOptions()), { source: undefined, sourceStartTime: 0, duration: undefined, muted: false, volume: 1, playbackRate: 1 });
        };
        return MixedAudioSource;
    }(superclass));
    return MixedAudioSource;
}

/**
 * A layer outputs content for the movie
 */
var Base = /** @class */ (function () {
    /**
     * Creates a new empty layer
     *
     * @param options
     * @param options.startTime - when to start the layer on the movie's
     * timeline
     * @param options.duration - how long the layer should last on the
     * movie's timeline
     */
    function Base(options) {
        if (options.duration === null || options.duration === undefined) {
            throw new Error('Property "duration" is required in BaseOptions');
        }
        if (options.startTime === null || options.startTime === undefined) {
            throw new Error('Property "startTime" is required in BaseOptions');
        }
        // Set startTime and duration properties manually, because they are
        // readonly. applyOptions ignores readonly properties.
        this._startTime = options.startTime;
        this._duration = options.duration;
        applyOptions(options, this);
        // Whether this layer is currently being rendered
        this.active = false;
        this.enabled = true;
        this._occurrenceCount = 0; // no occurrences in parent
        this._movie = null;
    }
    /**
     * Wait until this layer is ready to render
     */
    Base.prototype.whenReady = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }; // eslint-disable-line @typescript-eslint/no-empty-function
    /**
     * Attaches this layer to `movie` if not already attached.
     * @ignore
     */
    Base.prototype.tryAttach = function (movie) {
        if (this._occurrenceCount === 0) {
            this.attach(movie);
        }
        this._occurrenceCount++;
    };
    /**
     * Attaches this layer to `movie`
     *
     * Called when the layer is added to a movie's `layers` array.
     *
     * @param movie The movie to attach to
     */
    Base.prototype.attach = function (movie) {
        this._movie = movie;
    };
    /**
     * Detaches this layer from its movie if the number of times `tryDetach` has
     * been called (including this call) equals the number of times `tryAttach`
     * has been called.
     *
     * @ignore
     */
    Base.prototype.tryDetach = function () {
        if (this.movie === null) {
            throw new Error('No movie to detach from');
        }
        this._occurrenceCount--;
        // If this layer occurs in another place in a `layers` array, do not unset
        // _movie. (For calling `unshift` on the `layers` proxy)
        if (this._occurrenceCount === 0) {
            this.detach();
        }
    };
    /**
     * Detaches this layer from its movie
     *
     * Called when the layer is removed from a movie's `layers` array.
     */
    Base.prototype.detach = function () {
        this._movie = null;
    };
    /**
     * Called when the layer is activated
     */
    Base.prototype.start = function () { }; // eslint-disable-line @typescript-eslint/no-empty-function
    /**
     * Update {@link currentTime} when seeking
     *
     * This method is called when the movie seeks to a new time at the request of
     * the user. {@link progress} is called when the movie's `currentTime` is
     * updated due to playback.
     *
     * @param time - The new time in the layer
     */
    Base.prototype.seek = function (time) {
        this._currentTime = time;
    };
    /**
     * Update {@link currentTime} due to playback
     *
     * This method is called when the movie's `currentTime` is updated due to
     * playback. {@link seek} is called when the movie seeks to a new time at the
     * request of the user.
     *
     * @param time - The new time in the layer
     */
    Base.prototype.progress = function (time) {
        this._currentTime = time;
    };
    /**
     * Called when the movie renders and the layer is active
     */
    Base.prototype.render = function () { }; // eslint-disable-line @typescript-eslint/no-empty-function
    /**
     * Called when the layer is deactivated
     */
    Base.prototype.stop = function () {
        this._currentTime = undefined;
    };
    Object.defineProperty(Base.prototype, "parent", {
        // TODO: is this needed?
        get: function () {
            return this._movie;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "startTime", {
        /**
         * The time in the movie at which this layer starts (in seconds)
         */
        get: function () {
            return this._startTime;
        },
        set: function (val) {
            this._startTime = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "currentTime", {
        /**
         * The current time of the movie relative to this layer (in seconds)
         */
        get: function () {
            return this._currentTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "duration", {
        /**
         * The duration of this layer (in seconds)
         */
        get: function () {
            return this._duration;
        },
        set: function (val) {
            this._duration = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "ready", {
        /**
         * `true` if this layer is ready to be rendered, `false` otherwise
         */
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "movie", {
        get: function () {
            return this._movie;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
     */
    Base.prototype.getDefaultOptions = function () {
        return {
            startTime: undefined,
            duration: undefined // required
        };
    };
    return Base;
}());
// id for events (independent of instance, but easy to access when on prototype
// chain)
Base.prototype.type = 'layer';
Base.prototype.publicExcludes = ['active'];
Base.prototype.propertyFilters = {};

// TODO: rename to something more consistent with the naming convention of Visual and VisualSourceMixin
/**
 * Layer for an HTML audio element
 * @extends AudioSource
 */
var Audio = /** @class */ (function (_super) {
    __extends(Audio, _super);
    /**
     * Creates an audio layer
     */
    function Audio(options) {
        if (typeof options.source === 'string') {
            var audio = document.createElement('audio');
            audio.src = options.source;
            options.source = audio;
        }
        return _super.call(this, options) || this;
    }
    /**
     * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
     */
    Audio.prototype.getDefaultOptions = function () {
        return __assign(__assign({}, Object.getPrototypeOf(this).getDefaultOptions()), { 
            /**
             * @name module:layer.Audio#sourceStartTime
             * @desc Where in the media to start playing when the layer starts
             */
            sourceStartTime: 0, duration: undefined });
    };
    return Audio;
}(AudioSourceMixin(Base)));

var CustomArrayListener = /** @class */ (function () {
    function CustomArrayListener() {
    }
    return CustomArrayListener;
}());
/**
 * An array that notifies a listener when items are added or removed.
 */
var CustomArray = /** @class */ (function (_super) {
    __extends(CustomArray, _super);
    function CustomArray(target, listener) {
        var _this = _super.call(this) || this;
        for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
            var item = target_1[_i];
            listener.onAdd(item);
        }
        // Create proxy
        return new Proxy(target, {
            deleteProperty: function (target, property) {
                var value = target[property];
                delete target[property];
                listener.onRemove(value);
                return true;
            },
            set: function (target, property, value) {
                var oldValue = target[property];
                target[property] = value;
                // Check if property is a number (index)
                if (!isNaN(Number(property))) {
                    if (oldValue !== undefined) {
                        listener.onRemove(oldValue);
                    }
                    listener.onAdd(value);
                }
                return true;
            }
        });
    }
    return CustomArray;
}(Array));

// eslint-disable-next-line no-use-before-define
var VisualEffectsListener = /** @class */ (function (_super) {
    __extends(VisualEffectsListener, _super);
    // eslint-disable-next-line no-use-before-define
    function VisualEffectsListener(layer) {
        var _this = _super.call(this) || this;
        _this._layer = layer;
        return _this;
    }
    VisualEffectsListener.prototype.onAdd = function (effect) {
        effect.tryAttach(this._layer);
    };
    VisualEffectsListener.prototype.onRemove = function (effect) {
        effect.tryDetach();
    };
    return VisualEffectsListener;
}(CustomArrayListener));
var VisualEffects = /** @class */ (function (_super) {
    __extends(VisualEffects, _super);
    // eslint-disable-next-line no-use-before-define
    function VisualEffects(target, layer) {
        return _super.call(this, target, new VisualEffectsListener(layer)) || this;
    }
    return VisualEffects;
}(CustomArray));
/** Any layer that renders to a canvas */
var Visual = /** @class */ (function (_super) {
    __extends(Visual, _super);
    /**
     * Creates a visual layer
     */
    function Visual(options) {
        var _this = _super.call(this, options) || this;
        applyOptions(options, _this);
        _this.canvas = document.createElement('canvas');
        _this.cctx = _this.canvas.getContext('2d');
        _this.effects = new VisualEffects([], _this);
        return _this;
    }
    Visual.prototype.whenReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.whenReady.call(this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(this.effects.map(function (effect) { return effect.whenReady(); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Render visual output
     */
    Visual.prototype.render = function () {
        // Prevent empty canvas errors if the width or height is 0
        var width = val(this, 'width', this.currentTime);
        var height = val(this, 'height', this.currentTime);
        if (width === 0 || height === 0) {
            return;
        }
        this.beginRender();
        this.doRender();
        this.endRender();
    };
    Visual.prototype.beginRender = function () {
        this.canvas.width = val(this, 'width', this.currentTime);
        this.canvas.height = val(this, 'height', this.currentTime);
        this.cctx.globalAlpha = val(this, 'opacity', this.currentTime);
    };
    Visual.prototype.doRender = function () {
        /*
         * If this.width or this.height is null, that means "take all available
         * screen space", so set it to this._move.width or this._movie.height,
         * respectively canvas.width & canvas.height are already interpolated
         */
        if (this.background) {
            this.cctx.fillStyle = val(this, 'background', this.currentTime);
            // (0, 0) relative to layer
            this.cctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        var border = val(this, 'border', this.currentTime);
        if (border && border.color) {
            this.cctx.strokeStyle = border.color;
            // This is optional.. TODO: integrate this with defaultOptions
            this.cctx.lineWidth = border.thickness || 1;
        }
    };
    Visual.prototype.endRender = function () {
        var w = val(this, 'width', this.currentTime) || val(this.movie, 'width', this.movie.currentTime);
        var h = val(this, 'height', this.currentTime) || val(this.movie, 'height', this.movie.currentTime);
        if (w * h > 0) {
            this._applyEffects();
        }
        // else InvalidStateError for drawing zero-area image in some effects, right?
    };
    Visual.prototype._applyEffects = function () {
        for (var i = 0; i < this.effects.length; i++) {
            var effect = this.effects[i];
            if (effect && effect.enabled) {
                // Pass relative time
                effect.apply(this, this.movie.currentTime - this.startTime);
            }
        }
    };
    /**
     * Convenience method for <code>effects.push()</code>
     * @param effect
     * @return the layer (for chaining)
     */
    Visual.prototype.addEffect = function (effect) {
        this.effects.push(effect);
        return this;
    };
    Object.defineProperty(Visual.prototype, "ready", {
        get: function () {
            // Typescript doesn't support `super.ready` when targeting es5
            var superReady = Object.getOwnPropertyDescriptor(Base.prototype, 'ready').get.call(this);
            return superReady && this.effects.every(function (effect) { return effect.ready; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
     */
    Visual.prototype.getDefaultOptions = function () {
        return __assign(__assign({}, Base.prototype.getDefaultOptions()), { 
            /**
             * @name module:layer.Visual#x
             * @desc The offset of the layer relative to the movie
             */
            x: 0, 
            /**
             * @name module:layer.Visual#y
             * @desc The offset of the layer relative to the movie
             */
            y: 0, 
            /**
             * @name module:layer.Visual#width
             */
            width: null, 
            /**
             * @name module:layer.Visual#height
             */
            height: null, 
            /**
             * @name module:layer.Visual#background
             * @desc The color code for the background, or <code>null</code> for
             * transparency
             */
            background: null, 
            /**
             * @name module:layer.Visual#border
             * @desc The border style, or <code>null</code> for no border
             */
            border: null, 
            /**
             * @name module:layer.Visual#opacity
             */
            opacity: 1 });
    };
    return Visual;
}(Base));
Visual.prototype.publicExcludes = Base.prototype.publicExcludes.concat(['canvas', 'cctx', 'effects']);
Visual.prototype.propertyFilters = __assign(__assign({}, Base.prototype.propertyFilters), { 
    /*
     * If this.width or this.height is null, that means "take all available screen
     * space", so set it to this._move.width or this._movie.height, respectively
     */
    width: function (width) {
        return width != undefined ? width : this._movie.width; // eslint-disable-line eqeqeq
    }, height: function (height) {
        return height != undefined ? height : this._movie.height; // eslint-disable-line eqeqeq
    } });

/**
 * A layer that gets its image data from an HTML image or video element
 * @mixin VisualSourceMixin
 */
function VisualSourceMixin(superclass) {
    var MixedVisualSource = /** @class */ (function (_super) {
        __extends(MixedVisualSource, _super);
        function MixedVisualSource(options) {
            var _this = this;
            if (!options.source) {
                throw new Error('Property "source" is required in options');
            }
            _this = _super.call(this, options) || this;
            applyOptions(options, _this);
            return _this;
        }
        MixedVisualSource.prototype.whenReady = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.whenReady.call(this)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) {
                                    if (_this.source instanceof HTMLImageElement) {
                                        // The source is an image; wait for it to load
                                        if (_this.source.complete) {
                                            resolve();
                                        }
                                        else {
                                            _this.source.addEventListener('load', function () {
                                                resolve();
                                            });
                                        }
                                    }
                                    else {
                                        // The source is a video; wait for the first frame to load
                                        if (_this.source.readyState === 4) {
                                            resolve();
                                        }
                                        else {
                                            _this.source.addEventListener('canplaythrough', function () {
                                                resolve();
                                            });
                                        }
                                    }
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MixedVisualSource.prototype.doRender = function () {
            // Clear/fill background
            _super.prototype.doRender.call(this);
            /*
             * Source dimensions crop the image. Dest dimensions set the size that
             * the image will be rendered at *on the layer*. Note that this is
             * different from the layer dimensions (`this.width` and `this.height`).
             * The main reason this distinction exists is so that an image layer can
             * be rotated without being cropped (see iss #46).
             */
            this.cctx.drawImage(this.source, val(this, 'sourceX', this.currentTime), val(this, 'sourceY', this.currentTime), val(this, 'sourceWidth', this.currentTime), val(this, 'sourceHeight', this.currentTime), 
            // `destX` and `destY` are relative to the layer
            val(this, 'destX', this.currentTime), val(this, 'destY', this.currentTime), val(this, 'destWidth', this.currentTime), val(this, 'destHeight', this.currentTime));
        };
        Object.defineProperty(MixedVisualSource.prototype, "ready", {
            get: function () {
                // Typescript doesn't support `super.ready` when targeting es5
                var superReady = Object.getOwnPropertyDescriptor(superclass.prototype, 'ready').get.call(this);
                var sourceReady = this.source instanceof HTMLImageElement
                    ? this.source.complete
                    : this.source.readyState === 4;
                return superReady && sourceReady;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
         */
        MixedVisualSource.prototype.getDefaultOptions = function () {
            return __assign(__assign({}, superclass.prototype.getDefaultOptions()), { source: undefined, sourceX: 0, sourceY: 0, sourceWidth: undefined, sourceHeight: undefined, destX: 0, destY: 0, destWidth: undefined, destHeight: undefined });
        };
        return MixedVisualSource;
    }(superclass));
    MixedVisualSource.prototype.propertyFilters = __assign(__assign({}, Visual.prototype.propertyFilters), { 
        /*
         * If no layer width was provided, fall back to the dest width.
         * If no dest width was provided, fall back to the source width.
         * If no source width was provided, fall back to `source.width`.
         */
        sourceWidth: function (sourceWidth) {
            // != instead of !== to account for `null`
            var width = this.source instanceof HTMLImageElement
                ? this.source.width
                : this.source.videoWidth;
            return sourceWidth != undefined ? sourceWidth : width; // eslint-disable-line eqeqeq
        }, sourceHeight: function (sourceHeight) {
            var height = this.source instanceof HTMLImageElement
                ? this.source.height
                : this.source.videoHeight;
            return sourceHeight != undefined ? sourceHeight : height; // eslint-disable-line eqeqeq
        }, destWidth: function (destWidth) {
            // I believe reltime is redundant, as element#currentTime can be used
            // instead. (TODO: fact check)
            /* eslint-disable eqeqeq */
            return destWidth != undefined
                ? destWidth
                : val(this, 'sourceWidth', this.currentTime);
        }, destHeight: function (destHeight) {
            /* eslint-disable eqeqeq */
            return destHeight != undefined
                ? destHeight
                : val(this, 'sourceHeight', this.currentTime);
        }, width: function (width) {
            /* eslint-disable eqeqeq */
            return width != undefined
                ? width
                : val(this, 'destWidth', this.currentTime);
        }, height: function (height) {
            /* eslint-disable eqeqeq */
            return height != undefined
                ? height
                : val(this, 'destHeight', this.currentTime);
        } });
    return MixedVisualSource;
}

/**
 * Layer for an HTML image element
 * @extends VisualSource
 */
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image(options) {
        if (typeof (options.source) === 'string') {
            var img = document.createElement('img');
            img.src = options.source;
            options.source = img;
        }
        return _super.call(this, options) || this;
    }
    return Image;
}(VisualSourceMixin(Visual)));

var TextStrokePosition;
(function (TextStrokePosition) {
    TextStrokePosition[TextStrokePosition["Inside"] = 0] = "Inside";
    TextStrokePosition[TextStrokePosition["Center"] = 1] = "Center";
    TextStrokePosition[TextStrokePosition["Outside"] = 2] = "Outside";
})(TextStrokePosition || (TextStrokePosition = {}));
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    /**
     * Creates a new text layer
     */
    // TODO: add padding options
    // TODO: is textX necessary? it seems inconsistent, because you can't define
    // width/height directly for a text layer
    function Text(options) {
        var _this = this;
        if (!options.text) {
            throw new Error('Property "text" is required in TextOptions');
        }
        // Default to no (transparent) background
        _this = _super.call(this, __assign({ background: null }, options)) || this;
        applyOptions(options, _this);
        return _this;
        // this._prevText = undefined;
        // // because the canvas context rounds font size, but we need to be more accurate
        // // rn, this doesn't make a difference, because we can only measure metrics by integer font sizes
        // this._lastFont = undefined;
        // this._prevMaxWidth = undefined;
    }
    Text.prototype.doRender = function () {
        var _a, _b;
        _super.prototype.doRender.call(this);
        var text = val(this, 'text', this.currentTime);
        var font = val(this, 'font', this.currentTime);
        var maxWidth = this.maxWidth ? val(this, 'maxWidth', this.currentTime) : undefined;
        this.cctx.font = font;
        var textWidth = this.cctx.measureText(text).width;
        var fontSize = val(this, 'fontSize', this.currentTime);
        var textBackground = val(this, 'textBackground', this.currentTime);
        var lineHeight = val(this, 'lineHeight', this.currentTime);
        var padding = val(this, 'padding', this.currentTime);
        var radius = val(this, 'radius', this.currentTime);
        this.cctx.save();
        if (textBackground) {
            // Calcule les dimensions et position du fond
            var rectWidth = textWidth + padding * 2;
            var rectHeight = fontSize + padding * 2;
            // Centre le fond par rapport au point de dessin du texte
            var textX = val(this, 'textX', this.currentTime);
            var textY = val(this, 'textY', this.currentTime);
            var rectX = textX - rectWidth / 2;
            var rectY = textY - ((fontSize * lineHeight) - fontSize) - padding / 2;
            this.cctx.fillStyle = textBackground;
            this.cctx.beginPath();
            this.cctx.moveTo(rectX + padding, rectY);
            this.cctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight, radius);
            this.cctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX, rectY + rectHeight, radius);
            this.cctx.arcTo(rectX, rectY + rectHeight, rectX, rectY, radius);
            this.cctx.arcTo(rectX, rectY, rectX + rectWidth, rectY, radius);
            this.cctx.closePath();
            this.cctx.fill();
        }
        this.cctx.restore();
        // Dessin du texte
        this.cctx.fillStyle = val(this, 'color', this.currentTime);
        this.cctx.textAlign = val(this, 'textAlign', this.currentTime);
        this.cctx.textBaseline = val(this, 'textBaseline', this.currentTime);
        this.cctx.direction = val(this, 'textDirection', this.currentTime);
        this.cctx.fillText(text, val(this, 'textX', this.currentTime), val(this, 'textY', this.currentTime), maxWidth);
        var textStroke = val(this, 'textStroke', this.currentTime);
        if (textStroke) {
            this.cctx.strokeStyle = textStroke.color;
            this.cctx.miterLimit = 2;
            this.cctx.lineJoin = "round";
            this.cctx.lineWidth = (_a = textStroke.thickness) !== null && _a !== void 0 ? _a : 1;
            var position = (_b = textStroke.position) !== null && _b !== void 0 ? _b : 'outer';
            // Save the globalCompositeOperation, we have to revert it after stroking the text.
            var globalCompositionOperation = this.cctx.globalCompositeOperation;
            switch (position) {
                case TextStrokePosition.Inside:
                    this.cctx.globalCompositeOperation = 'source-atop';
                    this.cctx.lineWidth *= 2;
                    break;
                case TextStrokePosition.Center:
                    break;
                case TextStrokePosition.Outside:
                    this.cctx.globalCompositeOperation = 'destination-over';
                    this.cctx.lineWidth *= 2;
                    break;
            }
            this.cctx.strokeText(text, val(this, 'textX', this.currentTime), val(this, 'textY', this.currentTime), maxWidth);
            this.cctx.globalCompositeOperation = globalCompositionOperation;
        }
        this._prevText = text;
        this._prevFont = font;
        this._prevMaxWidth = maxWidth;
    };
    // _updateMetrics(text, font, maxWidth) {
    //     // TODO calculate / measure for non-integer font.size values
    //     let metrics = Text._measureText(text, font, maxWidth);
    //     // TODO: allow user-specified/overwritten width/height
    //     this.width = /*this.width || */metrics.width;
    //     this.height = /*this.height || */metrics.height;
    // }
    // TODO: implement setters and getters that update dimensions!
    /* static _measureText(text, font, maxWidth) {
          // TODO: fix too much bottom padding
          const s = document.createElement("span");
          s.textContent = text;
          s.style.font = font;
          s.style.padding = "0";
          if (maxWidth) s.style.maxWidth = maxWidth;
          document.body.appendChild(s);
          const metrics = {width: s.offsetWidth, height: s.offsetHeight};
          document.body.removeChild(s);
          return metrics;
      } */
    /**
     * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
     */
    Text.prototype.getDefaultOptions = function () {
        return __assign(__assign({}, Visual.prototype.getDefaultOptions()), { background: null, padding: 0, radius: 0, fontSize: 16, text: undefined, font: '10px sans-serif', textBackground: parseColor('#fff'), color: parseColor('#fff'), textX: 0, lineHeight: 1, textY: 0, maxWidth: null, textAlign: 'start', textBaseline: 'top', textDirection: 'ltr', textStroke: null });
    };
    return Text;
}(Visual));

/**
 * Layer for an HTML video element
 * @extends AudioSource
 * @extends VisualSource
 */
var Video = /** @class */ (function (_super) {
    __extends(Video, _super);
    function Video(options) {
        var _a;
        if (typeof (options.source) === 'string') {
            var video = document.createElement('video');
            video.src = options.source;
            options.source = video;
        }
        return _super.call(this, __assign(__assign({}, options), { 
            // Set a default duration so that the super constructor doesn't throw an
            // error
            duration: (_a = options.duration) !== null && _a !== void 0 ? _a : 0 })) || this;
    }
    return Video;
}(AudioSourceMixin(VisualSourceMixin(Visual))));

/**
 * @module layer
 */

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AudioSourceMixin: AudioSourceMixin,
    Audio: Audio,
    Base: Base,
    Image: Image,
    Text: Text,
    get TextStrokePosition () { return TextStrokePosition; },
    Video: Video,
    VisualSourceMixin: VisualSourceMixin,
    Visual: Visual
});

/**
 * @deprecated All visual effects now inherit from `Visual` instead
 */
var Base$1 = /** @class */ (function () {
    function Base() {
        this.enabled = true;
        this._occurrenceCount = 0;
        this._target = null;
    }
    /**
     * Wait until this effect is ready to be applied
     */
    Base.prototype.whenReady = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }; // eslint-disable-line @typescript-eslint/no-empty-function
    /**
     * Attaches this effect to `target` if not already attached.
     * @ignore
     */
    Base.prototype.tryAttach = function (target) {
        if (this._occurrenceCount === 0) {
            this.attach(target);
        }
        this._occurrenceCount++;
    };
    Base.prototype.attach = function (movie) {
        this._target = movie;
    };
    /**
     * Detaches this effect from its target if the number of times `tryDetach`
     * has been called (including this call) equals the number of times
     * `tryAttach` has been called.
     *
     * @ignore
     */
    Base.prototype.tryDetach = function () {
        if (this._target === null) {
            throw new Error('No movie to detach from');
        }
        this._occurrenceCount--;
        // If this effect occurs in another place in the containing array, do not
        // unset _target. (For calling `unshift` on the `layers` proxy)
        if (this._occurrenceCount === 0) {
            this.detach();
        }
    };
    Base.prototype.detach = function () {
        this._target = null;
    };
    // subclasses must implement apply
    /**
     * Apply this effect to a target at the given time
     *
     * @param target
     * @param reltime - the movie's current time relative to the layer
     * (will soon be replaced with an instance getter)
     * @abstract
     */
    Base.prototype.apply = function (target, reltime) { }; // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    Object.defineProperty(Base.prototype, "currentTime", {
        /**
         * The current time of the target
         */
        get: function () {
            return this._target ? this._target.currentTime : undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "ready", {
        /** `true` if this effect is ready to be applied */
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "parent", {
        get: function () {
            return this._target;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "movie", {
        get: function () {
            return this._target ? this._target.movie : undefined;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
     */
    Base.prototype.getDefaultOptions = function () {
        return {};
    };
    return Base;
}());
// id for events (independent of instance, but easy to access when on prototype
// chain)
Base$1.prototype.type = 'effect';
Base$1.prototype.publicExcludes = [];
Base$1.prototype.propertyFilters = {};

/**
 * Modifies the visual contents of a layer.
 */
var Visual$1 = /** @class */ (function (_super) {
    __extends(Visual, _super);
    function Visual() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // subclasses must implement apply
    /**
     * Apply this effect to a target at the given time
     *
     * @param target
     * @param reltime - the movie's current time relative to the layer
     * (will soon be replaced with an instance getter)
     * @abstract
     */
    Visual.prototype.apply = function (target, reltime) {
        _super.prototype.apply.call(this, target, reltime);
    };
    return Visual;
}(Base$1));

/**
 * A hardware-accelerated pixel mapping using WebGL
 */
// TODO: can `v_TextureCoord` be replaced by `gl_FragUV`?
var Shader = /** @class */ (function (_super) {
    __extends(Shader, _super);
    /**
     * @param fragmentSrc
     * @param [userUniforms={}] - object mapping uniform id to an
     * options object or a string (if you only need to provide the uniforms'
     * type)
     * @param [userTextures=[]]
     * @param [sourceTextureOptions={}]
     */
    function Shader(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        // TODO: split up into multiple methods
        var fragmentSrc = options.fragmentSource || Shader._IDENTITY_FRAGMENT_SOURCE;
        var userUniforms = options.uniforms || {};
        var userTextures = options.textures || {};
        var sourceTextureOptions = options.sourceTextureOptions || {};
        var gl = _this._initGl();
        _this._program = Shader._initShaderProgram(gl, Shader._VERTEX_SOURCE, fragmentSrc);
        _this._buffers = Shader._initRectBuffers(gl);
        _this._initTextures(userUniforms, userTextures, sourceTextureOptions);
        _this._initAttribs();
        _this._initUniforms(userUniforms);
        return _this;
    }
    Shader.prototype._initGl = function () {
        this._canvas = document.createElement('canvas');
        var gl = this._canvas.getContext('webgl');
        if (gl === null) {
            throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.');
        }
        this._gl = gl;
        return gl;
    };
    Shader.prototype._initTextures = function (userUniforms, userTextures, sourceTextureOptions) {
        var gl = this._gl;
        var maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        if (userTextures.length > maxTextures) {
            console.warn('Too many textures!');
        }
        this._userTextures = {};
        for (var name_1 in userTextures) {
            var userOptions = userTextures[name_1];
            // Apply default options.
            var options = __assign(__assign({}, Shader._DEFAULT_TEXTURE_OPTIONS), userOptions);
            if (options.createUniform) {
                /*
                 * Automatically, create a uniform with the same name as this texture,
                 * that points to it. This is an easy way for the user to use custom
                 * textures, without having to define multiple properties in the effect
                 * object.
                 */
                if (userUniforms[name_1]) {
                    throw new Error("Texture - uniform naming conflict: ".concat(name_1, "!"));
                }
                // Add this as a "user uniform".
                userUniforms[name_1] = '1i'; // texture pointer
            }
            this._userTextures[name_1] = options;
        }
        this._sourceTextureOptions = __assign(__assign({}, Shader._DEFAULT_TEXTURE_OPTIONS), sourceTextureOptions);
    };
    Shader.prototype._initAttribs = function () {
        var gl = this._gl;
        this._attribLocations = {
            textureCoord: gl.getAttribLocation(this._program, 'a_TextureCoord')
            // a_VertexPosition ?? somehow it works without it though...
        };
    };
    Shader.prototype._initUniforms = function (userUniforms) {
        var gl = this._gl;
        this._uniformLocations = {
            source: gl.getUniformLocation(this._program, 'u_Source'),
            size: gl.getUniformLocation(this._program, 'u_Size')
        };
        // The options value can just be a string equal to the type of the variable,
        // for syntactic sugar. If this is the case, convert it to a real options
        // object.
        this._userUniforms = {};
        for (var name_2 in userUniforms) {
            var val_1 = userUniforms[name_2];
            this._userUniforms[name_2] = typeof val_1 === 'string' ? { type: val_1 } : val_1;
        }
        for (var unprefixed in userUniforms) {
            // property => u_Property
            var prefixed = 'u_' + unprefixed.charAt(0).toUpperCase() + (unprefixed.length > 1 ? unprefixed.slice(1) : '');
            this._uniformLocations[unprefixed] = gl.getUniformLocation(this._program, prefixed);
        }
    };
    Shader.prototype.apply = function (target, reltime) {
        this._checkDimensions(target);
        this._refreshGl();
        this._enablePositionAttrib();
        this._enableTexCoordAttrib();
        this._prepareTextures(target, reltime);
        this._gl.useProgram(this._program);
        this._prepareUniforms(target, reltime);
        this._draw(target);
    };
    Shader.prototype._checkDimensions = function (target) {
        var gl = this._gl;
        // TODO: Change target.canvas.width => target.width and see if it breaks
        // anything.
        if (this._canvas.width !== target.canvas.width || this._canvas.height !== target.canvas.height) { // (optimization)
            this._canvas.width = target.canvas.width;
            this._canvas.height = target.canvas.height;
            gl.viewport(0, 0, target.canvas.width, target.canvas.height);
        }
    };
    Shader.prototype._refreshGl = function () {
        var gl = this._gl;
        // Clear to black; fragments can be made transparent with the blendfunc
        // below.
        gl.clearColor(0, 0, 0, 1);
        // gl.clearDepth(1.0);         // clear everything
        // not sure why I can't multiply rgb by zero
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.SRC_ALPHA, gl.ONE, gl.ZERO);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        // gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
    Shader.prototype._enablePositionAttrib = function () {
        var gl = this._gl;
        // Tell WebGL how to pull out the positions from buffer
        var numComponents = 2;
        // The data in the buffer is 32bit floats
        var type = gl.FLOAT;
        // Don't normalize
        var normalize = false;
        // How many bytes to get from one set of values to the next
        // 0 = use type and numComponents above
        var stride = 0;
        // How many bytes inside the buffer to start from
        var offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.position);
        gl.vertexAttribPointer(this._attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
        gl.enableVertexAttribArray(this._attribLocations.vertexPosition);
    };
    Shader.prototype._enableTexCoordAttrib = function () {
        var gl = this._gl;
        // tell webgl how to pull out the texture coordinates from buffer
        var numComponents = 2; // every coordinate composed of 2 values (uv)
        var type = gl.FLOAT; // the data in the buffer is 32 bit float
        var normalize = false; // don't normalize
        var stride = 0; // how many bytes to get from one set to the next
        var offset = 0; // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.textureCoord);
        gl.vertexAttribPointer(this._attribLocations.textureCoord, numComponents, type, normalize, stride, offset);
        gl.enableVertexAttribArray(this._attribLocations.textureCoord);
    };
    Shader.prototype._prepareTextures = function (target, reltime) {
        var gl = this._gl;
        // TODO: figure out which properties should be private / public
        // Tell WebGL we want to affect texture unit 0
        // Call `activeTexture` before `_loadTexture` so it won't be bound to the
        // last active texture.
        gl.activeTexture(gl.TEXTURE0);
        this._inputTexture = Shader._loadTexture(gl, target.canvas, this._sourceTextureOptions);
        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this._inputTexture);
        var i = 0;
        for (var name_3 in this._userTextures) {
            var options = this._userTextures[name_3];
            /*
             * Call `activeTexture` before `_loadTexture` so it won't be bound to the
             * last active texture.
             * TODO: investigate better implementation of `_loadTexture`
             */
            gl.activeTexture(gl.TEXTURE0 + (Shader.INTERNAL_TEXTURE_UNITS + i)); // use the fact that TEXTURE0, TEXTURE1, ... are continuous
            var preparedTex = Shader._loadTexture(gl, val(this, name_3, reltime), options); // do it every frame to keep updated (I think you need to)
            gl.bindTexture(gl[options.target], preparedTex);
            i++;
        }
    };
    /**
     * Set the shader's uniforms.
     * @param target The movie or layer to apply the shader to.
     * @param reltime The relative time of the movie or layer.
     */
    Shader.prototype._prepareUniforms = function (target, reltime) {
        var gl = this._gl;
        // Tell the shader we bound the texture to texture unit 0.
        // All base (Shader class) uniforms are optional.
        if (this._uniformLocations.source) {
            gl.uniform1i(this._uniformLocations.source, 0);
        }
        // All base (Shader class) uniforms are optional.
        if (this._uniformLocations.size) {
            gl.uniform2iv(this._uniformLocations.size, [target.canvas.width, target.canvas.height]);
        }
        for (var unprefixed in this._userUniforms) {
            var options = this._userUniforms[unprefixed];
            var value = val(this, unprefixed, reltime);
            var preparedValue = this._prepareValue(value, options.type, reltime, options);
            var location_1 = this._uniformLocations[unprefixed];
            // haHA JavaScript (`options.type` is "1f", for instance)
            gl['uniform' + options.type](location_1, preparedValue);
        }
        gl.uniform1i(this._uniformLocations.test, 0);
    };
    Shader.prototype._draw = function (target) {
        var gl = this._gl;
        var offset = 0;
        var vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
        // clear the target, in case the effect outputs transparent pixels
        target.cctx.clearRect(0, 0, target.canvas.width, target.canvas.height);
        // copy internal image state onto target
        target.cctx.drawImage(this._canvas, 0, 0);
    };
    /**
     * Converts a value of a standard type for javascript to a standard type for
     * GLSL
     *
     * @param value - the raw value to prepare
     * @param outputType - the WebGL type of |value|; example:
     * <code>1f</code> for a float
     * @param reltime - current time, relative to the target
     * @param [options]
     * @returns the prepared value
     */
    Shader.prototype._prepareValue = function (value, outputType, reltime, options) {
        if (options === void 0) { options = {}; }
        var def = options.defaultFloatComponent || 0;
        if (outputType === '1i') {
            /*
             * Textures are passed to the shader by both providing the texture (with
             * texImage2D) and setting the |sampler| uniform equal to the index of
             * the texture. In etro shader effects, the subclass passes the names of
             * all the textures ot this base class, along with all the names of
             * uniforms. By default, corresponding uniforms (with the same name) are
             * created for each texture for ease of use. You can also define
             * different texture properties in the javascript effect by setting it
             * identical to the property with the passed texture name. In WebGL, it
             * will be set to the same integer texture unit.
             *
             * To do this, test if |value| is identical to a texture. If so, set it
             * to the texture's index, so the shader can use it.
             */
            var i = 0;
            for (var name_4 in this._userTextures) {
                var testValue = val(this, name_4, reltime);
                if (value === testValue) {
                    value = Shader.INTERNAL_TEXTURE_UNITS + i; // after the internal texture units
                }
                i++;
            }
        }
        if (outputType === '3fv') {
            // allow 4-component vectors; TODO: why?
            if (Array.isArray(value) && (value.length === 3 || value.length === 4)) {
                return value;
            }
            // kind of loose so this can be changed if needed
            if (typeof value === 'object') {
                return [
                    value.r !== undefined ? value.r : def,
                    value.g !== undefined ? value.g : def,
                    value.b !== undefined ? value.b : def
                ];
            }
            throw new Error("Invalid type: ".concat(outputType, " or value: ").concat(value));
        }
        if (outputType === '4fv') {
            if (Array.isArray(value) && value.length === 4) {
                return value;
            }
            // kind of loose so this can be changed if needed
            if (typeof value === 'object') {
                return [
                    value.r !== undefined ? value.r : def,
                    value.g !== undefined ? value.g : def,
                    value.b !== undefined ? value.b : def,
                    value.a !== undefined ? value.a : def
                ];
            }
            throw new Error("Invalid type: ".concat(outputType, " or value: ").concat(value));
        }
        return value;
    };
    Shader._initRectBuffers = function (gl) {
        var position = [
            // the screen/canvas (output)
            -1.0, 1.0,
            1.0, 1.0,
            -1.0, -1.0,
            1.0, -1.0
        ];
        var textureCoord = [
            // the texture/canvas (input)
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0
        ];
        return {
            position: Shader._initBuffer(gl, position),
            textureCoord: Shader._initBuffer(gl, textureCoord)
        };
    };
    /**
     * Creates the quad covering the screen
     */
    Shader._initBuffer = function (gl, data) {
        var buffer = gl.createBuffer();
        // Select the buffer as the one to apply buffer operations to from here out.
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        return buffer;
    };
    /**
     * Creates a webgl texture from the source.
     * @param [options] - optional WebGL config for texture
     * @param [options.target=gl.TEXTURE_2D]
     * @param [options.level=0]
     * @param [options.internalFormat=gl.RGBA]
     * @param [options.srcFormat=gl.RGBA]
     * @param [options.srcType=gl.UNSIGNED_BYTE]
     * @param [options.wrapS=gl.CLAMP_TO_EDGE]
     * @param [options.wrapT=gl.CLAMP_TO_EDGE]
     * @param [options.minFilter=gl.LINEAR]
     * @param [options.magFilter=gl.LINEAR]
     */
    Shader._loadTexture = function (gl, source, options) {
        if (options === void 0) { options = {}; }
        // Apply default options, just in case.
        options = __assign(__assign({}, Shader._DEFAULT_TEXTURE_OPTIONS), options);
        // When creating the option, the user can't access `gl` so access it here.
        var target = gl[options.target];
        var level = options.level;
        var internalFormat = gl[options.internalFormat];
        var srcFormat = gl[options.srcFormat];
        var srcType = gl[options.srcType];
        var wrapS = gl[options.wrapS];
        var wrapT = gl[options.wrapT];
        var minFilter = gl[options.minFilter];
        var magFilter = gl[options.magFilter];
        // TODO: figure out how wrap-s and wrap-t interact with mipmaps
        // (for legacy support)
        // let wrapS = options.wrapS ? options.wrapS : gl.CLAMP_TO_EDGE,
        //     wrapT = options.wrapT ? options.wrapT : gl.CLAMP_TO_EDGE;
        var tex = gl.createTexture();
        gl.bindTexture(target, tex);
        // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true) // premultiply alpha
        // TODO: figure out how this works with layer width/height
        // TODO: support 3d textures (change texImage2D)
        // set to `source`
        gl.texImage2D(target, level, internalFormat, srcFormat, srcType, source);
        /*
         * WebGL1 has different requirements for power of 2 images vs non power of 2
         * images so check if the image is a power of 2 in both dimensions. Get
         * dimensions by using the fact that all valid inputs for texImage2D must have
         * `width` and `height` properties except videos, which have `videoWidth` and
         * `videoHeight` instead and `ArrayBufferView`, which is one dimensional (so
         * don't worry about mipmaps)
         */
        var w = target instanceof HTMLVideoElement ? target.videoWidth : target.width;
        var h = target instanceof HTMLVideoElement ? target.videoHeight : target.height;
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, magFilter);
        if ((w && isPowerOf2(w)) && (h && isPowerOf2(h))) {
            // Yes, it's a power of 2. All wrap modes are valid. Generate mips.
            gl.texParameteri(target, gl.TEXTURE_WRAP_S, wrapS);
            gl.texParameteri(target, gl.TEXTURE_WRAP_T, wrapT);
            gl.generateMipmap(target);
        }
        else {
            // No, it's not a power of 2. Turn off mips and set
            // wrapping to clamp to edge
            if (wrapS !== gl.CLAMP_TO_EDGE || wrapT !== gl.CLAMP_TO_EDGE) {
                console.warn('Wrap mode is not CLAMP_TO_EDGE for a non-power-of-two texture. Defaulting to CLAMP_TO_EDGE');
            }
            gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        return tex;
    };
    Shader._initShaderProgram = function (gl, vertexSrc, fragmentSrc) {
        var vertexShader = Shader._loadShader(gl, gl.VERTEX_SHADER, vertexSrc);
        var fragmentShader = Shader._loadShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        // Check program creation status
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.warn('Unable to link shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    };
    Shader._loadShader = function (gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        // Check compile status
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn('An error occured compiling shader: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };
    /**
     * WebGL texture units consumed by {@link Shader}
     */
    Shader.INTERNAL_TEXTURE_UNITS = 1;
    Shader._DEFAULT_TEXTURE_OPTIONS = {
        createUniform: true,
        target: 'TEXTURE_2D',
        level: 0,
        internalFormat: 'RGBA',
        srcFormat: 'RGBA',
        srcType: 'UNSIGNED_BYTE',
        minFilter: 'LINEAR',
        magFilter: 'LINEAR',
        wrapS: 'CLAMP_TO_EDGE',
        wrapT: 'CLAMP_TO_EDGE'
    };
    Shader._VERTEX_SOURCE = "\n    attribute vec4 a_VertexPosition;\n    attribute vec2 a_TextureCoord;\n\n    varying highp vec2 v_TextureCoord;\n\n    void main() {\n        // no need for projection or model-view matrices, since we're just rendering a rectangle\n        // that fills the screen (see position values)\n        gl_Position = a_VertexPosition;\n        v_TextureCoord = a_TextureCoord;\n    }\n  ";
    Shader._IDENTITY_FRAGMENT_SOURCE = "\n    precision mediump float;\n\n    uniform sampler2D u_Source;\n\n    varying highp vec2 v_TextureCoord;\n\n    void main() {\n        gl_FragColor = texture2D(u_Source, v_TextureCoord);\n    }\n  ";
    return Shader;
}(Visual$1));
var isPowerOf2 = function (value) { return (value && (value - 1)) === 0; };

/**
 * Changes the brightness
 */
var Brightness = /** @class */ (function (_super) {
    __extends(Brightness, _super);
    /**
     * @param [brightness=0] - the value to add to each pixel's color
     * channels (between -255 and 255)
     */
    function Brightness(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, {
            fragmentSource: "\n        precision mediump float;\n\n        uniform sampler2D u_Source;\n        uniform float u_Brightness;\n\n        varying highp vec2 v_TextureCoord;\n\n        void main() {\n          vec4 color = texture2D(u_Source, v_TextureCoord);\n          vec3 rgb = clamp(color.rgb + u_Brightness / 255.0, 0.0, 1.0);\n          gl_FragColor = vec4(rgb, color.a);\n        }\n      ",
            uniforms: {
                brightness: '1f'
            }
        }) || this;
        /**
         * The value to add to each pixel's color channels (between -255 and 255)
         */
        _this.brightness = options.brightness || 0;
        return _this;
    }
    return Brightness;
}(Shader));

/**
 * Multiplies each channel by a different factor
 */
var Channels = /** @class */ (function (_super) {
    __extends(Channels, _super);
    /**
     * @param factors - channel factors, each defaulting to 1
     */
    function Channels(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, {
            fragmentSource: "\n        precision mediump float;\n\n        uniform sampler2D u_Source;\n        uniform vec4 u_Factors;\n\n        varying highp vec2 v_TextureCoord;\n\n        void main() {\n          vec4 color = texture2D(u_Source, v_TextureCoord);\n          gl_FragColor = clamp(u_Factors * color, 0.0, 1.0);\n        }\n      ",
            uniforms: {
                factors: { type: '4fv', defaultFloatComponent: 1 }
            }
        }) || this;
        /**
         * Channel factors, each defaulting to 1
         */
        _this.factors = options.factors || {};
        return _this;
    }
    return Channels;
}(Shader));

/**
 * Reduces alpha for pixels which are close to a specified target color
 */
var ChromaKey = /** @class */ (function (_super) {
    __extends(ChromaKey, _super);
    /**
     * @param [target={r: 0, g: 0, b: 0, a: 1}] - the color to remove
     * @param [threshold=0] - how much error to allow
     * @param [interpolate=false] - <code>true</code> to interpolate
     * the alpha channel, or <code>false</code> value for no smoothing (i.e. an
     * alpha of either 0 or 255)
     */
    // TODO: Use <code>smoothingSharpness</code>
    function ChromaKey(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, {
            fragmentSource: "\n        precision mediump float;\n\n        uniform sampler2D u_Source;\n        uniform vec3 u_Target;\n        uniform float u_Threshold;\n        uniform bool u_Interpolate;\n\n        varying highp vec2 v_TextureCoord;\n\n        void main() {\n          vec4 color = texture2D(u_Source, v_TextureCoord);\n          float alpha = color.a;\n          vec3 dist = abs(color.rgb - u_Target / 255.0);\n          if (!u_Interpolate) {\n            // Standard way that most video editors probably use (all-or-nothing method)\n            float thresh = u_Threshold / 255.0;\n            bool transparent = dist.r <= thresh && dist.g <= thresh && dist.b <= thresh;\n            if (transparent)\n              alpha = 0.0;\n          } else {\n            /*\n             better way IMHO:\n             Take the average of the absolute differences between the pixel and the target for each channel\n             */\n            float transparency = (dist.r + dist.g + dist.b) / 3.0;\n            // TODO: custom or variety of interpolation methods\n            alpha = transparency;\n          }\n          gl_FragColor = vec4(color.rgb, alpha);\n        }\n      ",
            uniforms: {
                target: '3fv',
                threshold: '1f',
                interpolate: '1i'
            }
        }) || this;
        /**
         * The color to remove
         */
        _this.target = options.target || new Color(0, 0, 0);
        /**
         * How much error to allow
         */
        _this.threshold = options.threshold || 0;
        /**
         * <code>true<code> to interpolate the alpha channel, or <code>false<code>
         * for no smoothing (i.e. 255 or 0 alpha)
         */
        _this.interpolate = options.interpolate || false;
        return _this;
        // this.smoothingSharpness = smoothingSharpness;
    }
    return ChromaKey;
}(Shader));

/**
 * Changes the contrast by multiplying the RGB channels by a constant
 */
var Contrast = /** @class */ (function (_super) {
    __extends(Contrast, _super);
    /**
     * @param [contrast=1] - the contrast multiplier
     */
    function Contrast(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, {
            fragmentSource: "\n        precision mediump float;\n\n        uniform sampler2D u_Source;\n        uniform float u_Contrast;\n\n        varying highp vec2 v_TextureCoord;\n\n        void main() {\n          vec4 color = texture2D(u_Source, v_TextureCoord);\n          vec3 rgb = clamp(u_Contrast * (color.rgb - 0.5) + 0.5, 0.0, 1.0);\n          gl_FragColor = vec4(rgb, color.a);\n        }\n      ",
            uniforms: {
                contrast: '1f'
            }
        }) || this;
        /**
         * The contrast multiplier
         */
        _this.contrast = options.contrast || 1;
        return _this;
    }
    return Contrast;
}(Shader));

var EllipticalMaskOptions = /** @class */ (function () {
    function EllipticalMaskOptions() {
    }
    return EllipticalMaskOptions;
}());
/**
 * Preserves an ellipse of the layer and clears the rest
 */
// TODO: Parent layer mask effects will make more complex masks easier
var EllipticalMask = /** @class */ (function (_super) {
    __extends(EllipticalMask, _super);
    function EllipticalMask(options) {
        var _this = _super.call(this) || this;
        _this.x = options.x;
        _this.y = options.y;
        _this.radiusX = options.radiusX;
        _this.radiusY = options.radiusY;
        _this.rotation = options.rotation || 0;
        _this.startAngle = options.startAngle || 0;
        _this.endAngle = options.endAngle !== undefined ? options.endAngle : 2 * Math.PI;
        _this.anticlockwise = options.anticlockwise || false;
        // for saving image data before clearing
        _this._tmpCanvas = document.createElement('canvas');
        _this._tmpCtx = _this._tmpCanvas.getContext('2d');
        return _this;
    }
    EllipticalMask.prototype.apply = function (target, reltime) {
        var ctx = target.cctx;
        var canvas = target.canvas;
        var x = val(this, 'x', reltime);
        var y = val(this, 'y', reltime);
        var radiusX = val(this, 'radiusX', reltime);
        var radiusY = val(this, 'radiusY', reltime);
        var rotation = val(this, 'rotation', reltime);
        var startAngle = val(this, 'startAngle', reltime);
        var endAngle = val(this, 'endAngle', reltime);
        var anticlockwise = val(this, 'anticlockwise', reltime);
        this._tmpCanvas.width = target.canvas.width;
        this._tmpCanvas.height = target.canvas.height;
        this._tmpCtx.drawImage(canvas, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save(); // idk how to preserve clipping state without save/restore
        // create elliptical path and clip
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
        ctx.closePath();
        ctx.clip();
        // render image with clipping state
        ctx.drawImage(this._tmpCanvas, 0, 0);
        ctx.restore();
    };
    return EllipticalMask;
}(Visual$1));

var StackEffectsListener = /** @class */ (function (_super) {
    __extends(StackEffectsListener, _super);
    function StackEffectsListener(stack) {
        var _this = _super.call(this) || this;
        _this._stack = stack;
        return _this;
    }
    StackEffectsListener.prototype.onAdd = function (effect) {
        if (!this._stack.parent) {
            return;
        }
        effect.tryAttach(this._stack.parent);
    };
    StackEffectsListener.prototype.onRemove = function (effect) {
        if (!this._stack.parent) {
            return;
        }
        effect.tryDetach();
    };
    return StackEffectsListener;
}(CustomArrayListener));
var StackEffects = /** @class */ (function (_super) {
    __extends(StackEffects, _super);
    // eslint-disable-next-line no-use-before-define
    function StackEffects(target, stack) {
        return _super.call(this, target, new StackEffectsListener(stack)) || this;
    }
    return StackEffects;
}(CustomArray));
/**
 * A sequence of effects to apply, treated as one effect. This can be useful
 * for defining reused effect sequences as one effect.
 */
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    function Stack(options) {
        var _this = _super.call(this) || this;
        _this.effects = new StackEffects(options.effects, _this);
        options.effects.forEach(function (effect) { return _this.effects.push(effect); });
        return _this;
    }
    Stack.prototype.attach = function (movie) {
        _super.prototype.attach.call(this, movie);
        this.effects.filter(function (effect) { return !!effect; }).forEach(function (effect) {
            effect.tryAttach(movie);
        });
    };
    Stack.prototype.detach = function () {
        _super.prototype.detach.call(this);
        this.effects.filter(function (effect) { return !!effect; }).forEach(function (effect) {
            effect.tryDetach();
        });
    };
    Stack.prototype.apply = function (target, reltime) {
        for (var i = 0; i < this.effects.length; i++) {
            var effect = this.effects[i];
            if (!effect) {
                continue;
            }
            effect.apply(target, reltime);
        }
    };
    /**
     * Convenience method for chaining
     * @param effect - the effect to append
     */
    Stack.prototype.addEffect = function (effect) {
        this.effects.push(effect);
        return this;
    };
    return Stack;
}(Visual$1));

/**
 * Applies a Gaussian blur
 */
// TODO: Improve performance
// TODO: Make sure this is truly gaussian even though it doesn't require a
// standard deviation
var GaussianBlur = /** @class */ (function (_super) {
    __extends(GaussianBlur, _super);
    function GaussianBlur(options) {
        // Divide into two shader effects (use the fact that gaussian blurring can
        // be split into components for performance benefits)
        return _super.call(this, {
            effects: [
                new GaussianBlurHorizontal(options),
                new GaussianBlurVertical(options)
            ]
        }) || this;
    }
    return GaussianBlur;
}(Stack));
/**
 * Shared class for both horizontal and vertical gaussian blur classes.
 */
// TODO: If radius == 0, don't affect the image (right now, the image goes black).
var GaussianBlurComponent = /** @class */ (function (_super) {
    __extends(GaussianBlurComponent, _super);
    /**
     * @param src - fragment source code (specific to which component -
     * horizontal or vertical)
     * @param radius - only integers are currently supported
     */
    function GaussianBlurComponent(options) {
        var _this = _super.call(this, {
            fragmentSource: options.fragmentSource,
            uniforms: {
                radius: '1i'
            },
            textures: {
                shape: { minFilter: 'NEAREST', magFilter: 'NEAREST' }
            }
        }) || this;
        /**
         */
        _this.radius = options.radius;
        _this._radiusCache = undefined;
        return _this;
    }
    GaussianBlurComponent.prototype.apply = function (target, reltime) {
        var radiusVal = val(this, 'radius', reltime);
        if (radiusVal !== this._radiusCache) {
            // Regenerate gaussian distribution canvas.
            this.shape = GaussianBlurComponent._render1DKernel(GaussianBlurComponent._gen1DKernel(radiusVal));
        }
        this._radiusCache = radiusVal;
        _super.prototype.apply.call(this, target, reltime);
    };
    /**
     * Render Gaussian kernel to a canvas for use in shader.
     * @param kernel
     * @private
     *
     * @return
     */
    GaussianBlurComponent._render1DKernel = function (kernel) {
        // TODO: Use Float32Array instead of canvas.
        // init canvas
        var canvas = document.createElement('canvas');
        canvas.width = kernel.length;
        canvas.height = 1; // 1-dimensional
        var ctx = canvas.getContext('2d');
        // draw to canvas
        var imageData = ctx.createImageData(canvas.width, canvas.height);
        for (var i = 0; i < kernel.length; i++) {
            imageData.data[4 * i + 0] = 255 * kernel[i]; // Use red channel to store distribution weights.
            imageData.data[4 * i + 1] = 0; // Clear all other channels.
            imageData.data[4 * i + 2] = 0;
            imageData.data[4 * i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
        return canvas;
    };
    GaussianBlurComponent._gen1DKernel = function (radius) {
        var pascal = GaussianBlurComponent._genPascalRow(2 * radius + 1);
        // don't use `reduce` and `map` (overhead?)
        var sum = 0;
        for (var i = 0; i < pascal.length; i++) {
            sum += pascal[i];
        }
        for (var i = 0; i < pascal.length; i++) {
            pascal[i] /= sum;
        }
        return pascal;
    };
    GaussianBlurComponent._genPascalRow = function (index) {
        if (index < 0) {
            throw new Error("Invalid index ".concat(index));
        }
        var currRow = [1];
        for (var i = 1; i < index; i++) {
            var nextRow = [];
            nextRow.length = currRow.length + 1;
            // edges are always 1's
            nextRow[0] = nextRow[nextRow.length - 1] = 1;
            for (var j = 1; j < nextRow.length - 1; j++) {
                nextRow[j] = currRow[j - 1] + currRow[j];
            }
            currRow = nextRow;
        }
        return currRow;
    };
    return GaussianBlurComponent;
}(Shader));
GaussianBlurComponent.prototype.publicExcludes = Shader.prototype.publicExcludes.concat(['shape']);
/**
 * Horizontal component of gaussian blur
 */
var GaussianBlurHorizontal = /** @class */ (function (_super) {
    __extends(GaussianBlurHorizontal, _super);
    /**
     * @param radius
     */
    function GaussianBlurHorizontal(options) {
        return _super.call(this, {
            fragmentSource: "\n        #define MAX_RADIUS 250\n\n        precision mediump float;\n\n        uniform sampler2D u_Source;\n        uniform ivec2 u_Size;   // pixel dimensions of input and output\n        uniform sampler2D u_Shape;  // pseudo one-dimension of blur distribution (would be 1D but webgl doesn't support it)\n        uniform int u_Radius;   // TODO: support floating-point radii\n\n        varying highp vec2 v_TextureCoord;\n\n        void main() {\n          /*\n           * Ideally, totalWeight should end up being 1, but due to rounding errors, it sometimes ends up less than 1\n           * (I believe JS canvas stores values as integers, which rounds down for the majority of the Gaussian curve)\n           * So, normalize by accumulating all the weights and dividing by that.\n           */\n          float totalWeight = 0.0;\n          vec4 avg = vec4(0.0);\n          // GLSL can only use constants in for-loop declaration, so start at zero, and stop before 2 * u_Radius + 1,\n          // opposed to starting at -u_Radius and stopping _at_ +u_Radius.\n          for (int i = 0; i < 2 * MAX_RADIUS + 1; i++) {\n            if (i >= 2 * u_Radius + 1)\n              break;  // GLSL can only use constants in for-loop declaration, so we break here.\n            // (2 * u_Radius + 1) is the width of u_Shape, by definition\n            float weight = texture2D(u_Shape, vec2(float(i) / float(2 * u_Radius + 1), 0.5)).r;   // TODO: use single-channel format\n            totalWeight += weight;\n            vec4 sample = texture2D(u_Source, v_TextureCoord + vec2(i - u_Radius, 0.0) / vec2(u_Size));\n            avg += weight * sample;\n          }\n          gl_FragColor = avg / totalWeight;\n        }\n      ",
            radius: options.radius
        }) || this;
    }
    return GaussianBlurHorizontal;
}(GaussianBlurComponent));
/**
 * Vertical component of gaussian blur
 */
var GaussianBlurVertical = /** @class */ (function (_super) {
    __extends(GaussianBlurVertical, _super);
    /**
     * @param radius
     */
    function GaussianBlurVertical(options) {
        return _super.call(this, {
            fragmentSource: "\n        #define MAX_RADIUS 250\n\n        precision mediump float;\n\n        uniform sampler2D u_Source;\n        uniform ivec2 u_Size;   // pixel dimensions of input and output\n        uniform sampler2D u_Shape;  // pseudo one-dimension of blur distribution (would be 1D but webgl doesn't support it)\n        uniform int u_Radius;   // TODO: support floating-point radii\n\n        varying highp vec2 v_TextureCoord;\n\n        void main() {\n          /*\n           * Ideally, totalWeight should end up being 1, but due to rounding errors, it sometimes ends up less than 1\n           * (I believe JS canvas stores values as integers, which rounds down for the majority of the Gaussian curve)\n           * So, normalize by accumulating all the weights and dividing by that.\n           */\n          float totalWeight = 0.0;\n          vec4 avg = vec4(0.0);\n          // GLSL can only use constants in for-loop declaration, so start at zero, and stop before 2 * u_Radius + 1,\n          // opposed to starting at -u_Radius and stopping _at_ +u_Radius.\n          for (int i = 0; i < 2 * MAX_RADIUS + 1; i++) {\n            if (i >= 2 * u_Radius + 1)\n              break;  // GLSL can only use constants in for-loop declaration, so we break here.\n            // (2 * u_Radius + 1) is the width of u_Shape, by definition\n            float weight = texture2D(u_Shape, vec2(float(i) / float(2 * u_Radius + 1), 0.5)).r;   // TODO: use single-channel format\n            totalWeight += weight;\n            vec4 sample = texture2D(u_Source, v_TextureCoord + vec2(0.0, i - u_Radius) / vec2(u_Size));\n            avg += weight * sample;\n          }\n          gl_FragColor = avg / totalWeight;\n        }\n      ",
            radius: options.radius
        }) || this;
    }
    return GaussianBlurVertical;
}(GaussianBlurComponent));

/**
 * Converts the target to a grayscale image
 */
var Grayscale = /** @class */ (function (_super) {
    __extends(Grayscale, _super);
    function Grayscale() {
        return _super.call(this, {
            fragmentSource: "\n        precision mediump float;\n\n        uniform sampler2D u_Source;\n        uniform vec4 u_Factors;\n\n        varying highp vec2 v_TextureCoord;\n\n        float max3(float x, float y, float z) {\n          return max(x, max(y, z));\n        }\n\n        float min3(float x, float y, float z) {\n          return min(x, min(y, z));\n        }\n\n        void main() {\n          vec4 color = texture2D(u_Source, v_TextureCoord);\n          // Desaturate\n          float value = (max3(color.r, color.g, color.b) + min3(color.r, color.g, color.b)) / 2.0;\n          gl_FragColor = vec4(value, value, value, color.a);\n        }\n      "
        }) || this;
    }
    return Grayscale;
}(Shader));

/**
 * Breaks the target up into squares of `pixelSize` by `pixelSize`
 */
// TODO: just resample with NEAREST interpolation? but how?
var Pixelate = /** @class */ (function (_super) {
    __extends(Pixelate, _super);
    /**
     * @param pixelSize
     */
    function Pixelate(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, {
            fragmentSource: "\n        precision mediump float;\n\n        uniform sampler2D u_Source;\n        uniform ivec2 u_Size;\n        uniform int u_PixelSize;\n\n        varying highp vec2 v_TextureCoord;\n\n        void main() {\n          int ps = u_PixelSize;\n\n          // Snap to nearest block's center\n          vec2 loc = vec2(u_Size) * v_TextureCoord; // pixel-space\n          vec2 snappedLoc = float(ps) * floor(loc / float(ps));\n          vec2 centeredLoc = snappedLoc + vec2(float(u_PixelSize) / 2.0 + 0.5);\n          vec2 clampedLoc = clamp(centeredLoc, vec2(0.0), vec2(u_Size));\n          gl_FragColor = texture2D(u_Source, clampedLoc / vec2(u_Size));\n        }\n      ",
            uniforms: {
                pixelSize: '1i'
            }
        }) || this;
        _this.pixelSize = options.pixelSize || 1;
        return _this;
    }
    Pixelate.prototype.apply = function (target, reltime) {
        var ps = val(this, 'pixelSize', reltime);
        if (ps % 1 !== 0 || ps < 0) {
            throw new Error('Pixel size must be a nonnegative integer');
        }
        _super.prototype.apply.call(this, target, reltime);
    };
    return Pixelate;
}(Shader));

/**
 * Transforms a layer or movie using a transformation matrix. Use {@link
 * Transform.Matrix} to either A) calculate those values based on a series of
 * translations, scalings and rotations) or B) input the matrix values
 * directly, using the optional argument in the constructor.
 */
var Transform = /** @class */ (function (_super) {
    __extends(Transform, _super);
    /**
     * @param matrix - matrix that determines how to transform the target
     */
    function Transform(options) {
        var _this = _super.call(this) || this;
        /**
         * How to transform the target
         */
        _this.matrix = options.matrix;
        _this._tmpMatrix = new Transform.Matrix();
        _this._tmpCanvas = document.createElement('canvas');
        _this._tmpCtx = _this._tmpCanvas.getContext('2d');
        return _this;
    }
    Transform.prototype.apply = function (target, reltime) {
        if (target.canvas.width !== this._tmpCanvas.width) {
            this._tmpCanvas.width = target.canvas.width;
        }
        if (target.canvas.height !== this._tmpCanvas.height) {
            this._tmpCanvas.height = target.canvas.height;
        }
        // Use data, since that's the underlying storage
        this._tmpMatrix.data = val(this, 'matrix.data', reltime);
        this._tmpCtx.setTransform(this._tmpMatrix.a, this._tmpMatrix.b, this._tmpMatrix.c, this._tmpMatrix.d, this._tmpMatrix.e, this._tmpMatrix.f);
        this._tmpCtx.drawImage(target.canvas, 0, 0);
        // Assume it was identity for now
        this._tmpCtx.setTransform(1, 0, 0, 0, 1, 0);
        target.cctx.clearRect(0, 0, target.canvas.width, target.canvas.height);
        target.cctx.drawImage(this._tmpCanvas, 0, 0);
    };
    return Transform;
}(Visual$1));
(function (Transform) {
    /**
     * @class
     * A 3x3 matrix for storing 2d transformations
     */
    var Matrix = /** @class */ (function () {
        function Matrix(data) {
            this.data = data || [
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            ];
        }
        Matrix.prototype.identity = function () {
            for (var i = 0; i < this.data.length; i++) {
                this.data[i] = Matrix.IDENTITY.data[i];
            }
            return this;
        };
        /**
         * @param x
         * @param y
         * @param [val]
         */
        Matrix.prototype.cell = function (x, y, val) {
            if (val !== undefined) {
                this.data[3 * y + x] = val;
            }
            return this.data[3 * y + x];
        };
        Object.defineProperty(Matrix.prototype, "a", {
            /* For canvas context setTransform */
            get: function () {
                return this.data[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Matrix.prototype, "b", {
            get: function () {
                return this.data[3];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Matrix.prototype, "c", {
            get: function () {
                return this.data[1];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Matrix.prototype, "d", {
            get: function () {
                return this.data[4];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Matrix.prototype, "e", {
            get: function () {
                return this.data[2];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Matrix.prototype, "f", {
            get: function () {
                return this.data[5];
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Combines <code>this</code> with another matrix <code>other</code>
         * @param other
         */
        Matrix.prototype.multiply = function (other) {
            // copy to temporary matrix to avoid modifying `this` while reading from it
            for (var x = 0; x < 3; x++) {
                for (var y = 0; y < 3; y++) {
                    var sum = 0;
                    for (var i = 0; i < 3; i++) {
                        sum += this.cell(x, i) * other.cell(i, y);
                    }
                    Matrix._TMP_MATRIX.cell(x, y, sum);
                }
            }
            // copy data from TMP_MATRIX to this
            for (var i = 0; i < Matrix._TMP_MATRIX.data.length; i++) {
                this.data[i] = Matrix._TMP_MATRIX.data[i];
            }
            return this;
        };
        /**
         * @param x
         * @param y
         */
        Matrix.prototype.translate = function (x, y) {
            this.multiply(new Matrix([
                1, 0, x,
                0, 1, y,
                0, 0, 1
            ]));
            return this;
        };
        /**
         * @param x
         * @param y
         */
        Matrix.prototype.scale = function (x, y) {
            this.multiply(new Matrix([
                x, 0, 0,
                0, y, 0,
                0, 0, 1
            ]));
            return this;
        };
        /**
         * @param a - the angle or rotation in radians
         */
        Matrix.prototype.rotate = function (a) {
            var c = Math.cos(a);
            var s = Math.sin(a);
            this.multiply(new Matrix([
                c, s, 0,
                -s, c, 0,
                0, 0, 1
            ]));
            return this;
        };
        /**
         * The identity matrix
         */
        Matrix.IDENTITY = new Matrix();
        Matrix._TMP_MATRIX = new Matrix();
        return Matrix;
    }());
    Transform.Matrix = Matrix;
})(Transform || (Transform = {}));

/**
 * @module effect
 */

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Base: Base$1,
    Brightness: Brightness,
    Channels: Channels,
    ChromaKey: ChromaKey,
    Contrast: Contrast,
    EllipticalMaskOptions: EllipticalMaskOptions,
    EllipticalMask: EllipticalMask,
    GaussianBlur: GaussianBlur,
    GaussianBlurHorizontal: GaussianBlurHorizontal,
    GaussianBlurVertical: GaussianBlurVertical,
    Grayscale: Grayscale,
    Pixelate: Pixelate,
    Shader: Shader,
    Stack: Stack,
    get Transform () { return Transform; },
    Visual: Visual$1
});

var MovieEffectsListener = /** @class */ (function (_super) {
    __extends(MovieEffectsListener, _super);
    function MovieEffectsListener(movie) {
        var _this = _super.call(this) || this;
        _this._movie = movie;
        return _this;
    }
    MovieEffectsListener.prototype.onAdd = function (effect) {
        effect.tryAttach(this._movie);
    };
    MovieEffectsListener.prototype.onRemove = function (effect) {
        effect.tryDetach();
    };
    return MovieEffectsListener;
}(CustomArrayListener));
var MovieEffects = /** @class */ (function (_super) {
    __extends(MovieEffects, _super);
    function MovieEffects(target, movie) {
        return _super.call(this, target, new MovieEffectsListener(movie)) || this;
    }
    return MovieEffects;
}(CustomArray));

var MovieLayersListener = /** @class */ (function (_super) {
    __extends(MovieLayersListener, _super);
    function MovieLayersListener(movie) {
        var _this = _super.call(this) || this;
        _this._movie = movie;
        return _this;
    }
    MovieLayersListener.prototype.onAdd = function (layer) {
        layer.tryAttach(this._movie);
    };
    MovieLayersListener.prototype.onRemove = function (layer) {
        layer.tryDetach();
    };
    return MovieLayersListener;
}(CustomArrayListener));
var MovieLayers = /** @class */ (function (_super) {
    __extends(MovieLayers, _super);
    function MovieLayers(target, movie) {
        return _super.call(this, target, new MovieLayersListener(movie)) || this;
    }
    return MovieLayers;
}(CustomArray));

/**
 * @module movie
 */
var MovieOptions = /** @class */ (function () {
    function MovieOptions() {
    }
    return MovieOptions;
}());
/**
 * The movie contains everything included in the render.
 *
 * Implements a pub/sub system.
 */
// TODO: rename renderingFrame -> refreshing
var Movie = /** @class */ (function () {
    /**
     * Creates a new movie.
     */
    function Movie(options) {
        this._recording = false;
        // Set actx option manually, because it's readonly.
        this.actx = options.actx ||
            options.audioContext ||
            new AudioContext() ||
            // eslint-disable-next-line new-cap
            new window.webkitAudioContext();
        delete options.actx;
        // Check if required file canvas is provided
        if (!options.canvas) {
            throw new Error('Required option "canvas" not provided to Movie');
        }
        // Set canvas option manually, because it's readonly.
        this._canvas = this._visibleCanvas = options.canvas;
        delete options.canvas;
        this._cctx = this.canvas.getContext('2d'); // TODO: make private?
        // Set options on the movie
        applyOptions(options, this);
        this.effects = new MovieEffects([], this);
        this.layers = new MovieLayers([], this);
        this._paused = true;
        this._ended = false;
        // This lock prevents multiple refresh loops at the same time (see
        // `render`). It's only valid while rendering.
        this._renderingFrame = false;
        this.currentTime = 0;
    }
    Movie.prototype._whenReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            Promise.all(this.layers.map(function (layer) { return layer.whenReady(); })),
                            Promise.all(this.effects.map(function (effect) { return effect.whenReady(); }))
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Plays the movie
     *
     * @param [options]
     * @param [options.onStart] Called when the movie starts playing
     * @param [options.duration] The duration of the movie to play in seconds
     *
     * @return Fulfilled when the movie is done playing, never fails
     */
    Movie.prototype.play = function (options) {
        var _a;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._whenReady()];
                    case 1:
                        _b.sent();
                        if (!this.paused) {
                            throw new Error('Already playing');
                        }
                        this._paused = this._ended = false;
                        this._lastRealTime = performance.now();
                        this._endTime = options.duration ? this.currentTime + options.duration : this.duration;
                        (_a = options.onStart) === null || _a === void 0 ? void 0 : _a.call(options);
                        // For backwards compatibility
                        publish(this, 'movie.play', {});
                        // Repeatedly render frames until the movie ends
                        return [4 /*yield*/, new Promise(function (resolve) {
                                if (!_this.renderingFrame) {
                                    // Not rendering (and not playing), so play.
                                    _this._render(undefined, resolve);
                                }
                                // Stop rendering frame if currently doing so, because playing has higher
                                // priority. This will affect the next _render call.
                                _this._renderingFrame = false;
                            })
                            // After we're done playing, clear the last timestamp
                        ];
                    case 2:
                        // Repeatedly render frames until the movie ends
                        _b.sent();
                        // After we're done playing, clear the last timestamp
                        this._lastRealTime = undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates the rendering canvas and audio destination to the visible canvas
     * and the audio context destination.
     */
    Movie.prototype._show = function () {
        this._canvas = this._visibleCanvas;
        this._cctx = this.canvas.getContext('2d');
        publish(this, 'audiodestinationupdate', { movie: this, destination: this.actx.destination });
    };
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
    Movie.prototype.stream = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var tracks, visualStream, hasMediaTracks, audioDestination, audioStream;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Validate options
                        if (!options || !options.frameRate) {
                            throw new Error('Required option "frameRate" not provided to Movie.stream');
                        }
                        if (options.video === false && options.audio === false) {
                            throw new Error('Both video and audio cannot be disabled');
                        }
                        if (!this.paused) {
                            throw new Error("Cannot stream movie while it's already playing");
                        }
                        // Wait until all resources are loaded
                        return [4 /*yield*/, this._whenReady()
                            // Create a temporary canvas to stream from
                        ];
                    case 1:
                        // Wait until all resources are loaded
                        _a.sent();
                        // Create a temporary canvas to stream from
                        this._canvas = document.createElement('canvas');
                        this.canvas.width = this._visibleCanvas.width;
                        this.canvas.height = this._visibleCanvas.height;
                        this._cctx = this.canvas.getContext('2d');
                        tracks = [];
                        // Add video track
                        if (options.video !== false) {
                            visualStream = this.canvas.captureStream(options.frameRate);
                            tracks = tracks.concat(visualStream.getTracks());
                        }
                        hasMediaTracks = this.layers.some(function (layer) { return layer instanceof Audio || layer instanceof Video; });
                        // If no media tracks present, don't include an audio stream, because
                        // Chrome doesn't record silence when an audio stream is present.
                        if (hasMediaTracks && options.audio !== false) {
                            audioDestination = this.actx.createMediaStreamDestination();
                            audioStream = audioDestination.stream;
                            tracks = tracks.concat(audioStream.getTracks());
                            // Notify layers and any other listeners of the new audio destination
                            publish(this, 'audiodestinationupdate', { movie: this, destination: audioDestination });
                        }
                        // Create the stream
                        this._currentStream = new MediaStream(tracks);
                        // Play the movie
                        return [4 /*yield*/, this.play({
                                onStart: function () {
                                    // Call the user's onStart callback
                                    options.onStart(_this._currentStream);
                                },
                                duration: options.duration
                            })
                            // Clear the stream after the movie is done playing
                        ];
                    case 2:
                        // Play the movie
                        _a.sent();
                        // Clear the stream after the movie is done playing
                        this._currentStream.getTracks().forEach(function (track) {
                            track.stop();
                        });
                        this._currentStream = null;
                        this._show();
                        return [2 /*return*/];
                }
            });
        });
    };
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
    // TODO: Improve recording performance to increase frame rate
    Movie.prototype.record = function (options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var mimeType, stream, recordedChunks, mediaRecorderOptions;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Validate options
                        if (options.video === false && options.audio === false) {
                            throw new Error('Both video and audio cannot be disabled');
                        }
                        if (!this.paused) {
                            throw new Error("Cannot record movie while it's already playing");
                        }
                        mimeType = options.type || 'video/webm';
                        if (MediaRecorder && MediaRecorder.isTypeSupported && !MediaRecorder.isTypeSupported(mimeType)) {
                            throw new Error('Please pass a valid MIME type for the exported video');
                        }
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.stream({
                                    frameRate: options.frameRate,
                                    duration: options.duration,
                                    video: options.video,
                                    audio: options.audio,
                                    onStart: resolve
                                }).then(function () {
                                    // Stop the media recorder when the movie is done playing
                                    _this._recorder.requestData();
                                    _this._recorder.stop();
                                });
                            })
                            // The array to store the recorded chunks
                        ];
                    case 1:
                        stream = _b.sent();
                        recordedChunks = [];
                        mediaRecorderOptions = __assign(__assign({}, (options.mediaRecorderOptions || {})), { mimeType: mimeType });
                        this._recorder = new MediaRecorder(stream, mediaRecorderOptions);
                        this._recorder.ondataavailable = function (event) {
                            // if (this._paused) reject(new Error("Recording was interrupted"));
                            if (event.data.size > 0) {
                                recordedChunks.push(event.data);
                            }
                        };
                        // Start recording
                        this._recorder.start();
                        this._recording = true;
                        // Notify caller that the media recorder has started
                        (_a = options.onStart) === null || _a === void 0 ? void 0 : _a.call(options, this._recorder);
                        // For backwards compatibility
                        publish(this, 'movie.record', { options: options });
                        // Wait until the media recorder is done recording and processing
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this._recorder.onstop = function () {
                                    resolve();
                                };
                                _this._recorder.onerror = reject;
                            })
                            // Clean up
                        ];
                    case 2:
                        // Wait until the media recorder is done recording and processing
                        _b.sent();
                        // Clean up
                        this._paused = true;
                        this._ended = true;
                        this._recording = false;
                        // Construct the exported video out of all the frame blobs.
                        return [2 /*return*/, new Blob(recordedChunks, {
                                type: mimeType
                            })];
                }
            });
        });
    };
    /**
     * Stops the movie without resetting the playback position
     * @return The movie
     */
    Movie.prototype.pause = function () {
        // Update state
        this._paused = true;
        // Deactivate all layers
        for (var i = 0; i < this.layers.length; i++) {
            if (Object.prototype.hasOwnProperty.call(this.layers, i)) {
                var layer = this.layers[i];
                if (layer.active) {
                    layer.stop();
                    layer.active = false;
                }
            }
        }
        // For backwards compatibility, notify event listeners that the movie has
        // paused
        publish(this, 'movie.pause', {});
        return this;
    };
    /**
     * Stops playback and resets the playback position
     * @return The movie
     */
    Movie.prototype.stop = function () {
        this.pause();
        this.currentTime = 0;
        return this;
    };
    /**
     * Processes one frame of the movie and draws it to the canvas
     *
     * @param [timestamp=performance.now()]
     * @param [done=undefined] - Called when done playing or when the current
     * frame is loaded
     */
    Movie.prototype._render = function (timestamp, done) {
        var _this = this;
        if (timestamp === void 0) { timestamp = performance.now(); }
        if (done === void 0) { done = undefined; }
        clearCachedValues(this);
        if (!this.rendering) {
            // (this.paused && !this._renderingFrame) is true so it's playing or it's
            // rendering a single frame.
            if (done) {
                done();
            }
            return;
        }
        if (this.ready) {
            publish(this, 'movie.loadeddata', { movie: this });
            // If the movie is streaming or recording, resume the media recorder
            if (this._recording && this._recorder.state === 'paused') {
                this._recorder.resume();
            }
            // If the movie is streaming or recording, end at the specified duration.
            // Otherwise, end at the movie's duration, because play() does not
            // support playing a portion of the movie yet.
            // TODO: Is calling duration every frame bad for performance? (remember,
            // it's calling Array.reduce)
            var end = this._currentStream ? this._endTime : this.duration;
            this._updateCurrentTime(timestamp, end);
            if (this.currentTime === end) {
                if (this.recording) {
                    publish(this, 'movie.recordended', { movie: this });
                }
                if (this.currentTime === this.duration) {
                    publish(this, 'movie.ended', { movie: this, repeat: this.repeat });
                }
                // Don't use setter, which publishes 'seek'. Instead, update the
                // value and publish a 'imeupdate' event.
                this._currentTime = 0;
                publish(this, 'movie.timeupdate', { movie: this });
                this._renderingFrame = false;
                // Stop playback or recording if done (except if it's playing and repeat
                // is true)
                if (!(!this.recording && this.repeat)) {
                    this._paused = true;
                    this._ended = true;
                    // Deactivate all layers
                    for (var i = 0; i < this.layers.length; i++) {
                        if (Object.prototype.hasOwnProperty.call(this.layers, i)) {
                            var layer = this.layers[i];
                            // A layer that has been deleted before layers.length has been updated
                            // (see the layers proxy in the constructor).
                            if (!layer || !layer.active) {
                                continue;
                            }
                            layer.stop();
                            layer.active = false;
                        }
                    }
                    publish(this, 'movie.pause', {});
                    if (done) {
                        done();
                    }
                    return;
                }
            }
            // Do render
            this._renderBackground(timestamp);
            this._renderLayers();
            this._applyEffects();
        }
        else {
            // If we are recording, pause the media recorder until the movie is
            // ready.
            if (this.recording && this._recorder.state === 'recording') {
                this._recorder.pause();
            }
        }
        // If the frame didn't load this instant, repeatedly frame-render until it
        // is loaded.
        // If the expression below is true, don't publish an event, just silently
        // stop the render loop.
        if (this._renderingFrame && this.ready) {
            this._renderingFrame = false;
            if (done) {
                done();
            }
            return;
        }
        // TODO: Is making a new arrow function every frame bad for performance?
        window.requestAnimationFrame(function () {
            _this._render(undefined, done);
        });
    };
    Movie.prototype._updateCurrentTime = function (timestampMs, end) {
        // If we're only frame-rendering (current frame only), it doesn't matter if
        // it's paused or not.
        if (!this._renderingFrame) {
            var timestamp = timestampMs / 1000;
            var delta = timestamp - this._lastRealTime;
            this._lastRealTime = timestamp;
            if (delta > 0) {
                // Update the current time (don't use setter)
                this._currentTime += delta;
                // For backwards compatibility, publish a 'movie.timeupdate' event.
                publish(this, 'movie.timeupdate', { movie: this });
            }
            if (this.currentTime > end) {
                this._currentTime = end;
            }
        }
    };
    /**
     * Draws the movie's background to the canvas
     *
     * @param timestamp The current high-resolution timestamp in milliseconds
     */
    Movie.prototype._renderBackground = function (timestamp) {
        this.cctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Evaluate background color (since it's a dynamic property)
        var background = val(this, 'background', timestamp);
        if (background) {
            this.cctx.fillStyle = background;
            this.cctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };
    /**
     * Ticks all layers and renders them to the canvas
     */
    Movie.prototype._renderLayers = function () {
        for (var i = 0; i < this.layers.length; i++) {
            if (!Object.prototype.hasOwnProperty.call(this.layers, i)) {
                continue;
            }
            var layer = this.layers[i];
            // A layer that has been deleted before layers.length has been updated
            // (see the layers proxy in the constructor).
            if (!layer) {
                continue;
            }
            // Cancel operation if layer disabled or outside layer time interval
            var reltime = this.currentTime - layer.startTime;
            if (!val(layer, 'enabled', reltime) ||
                // TODO                                                    > or >= ?
                this.currentTime < layer.startTime || this.currentTime > layer.startTime + layer.duration) {
                // Layer is not active.
                // If only rendering this frame, we are not "starting" the layer.
                if (layer.active && !this._renderingFrame) {
                    layer.stop();
                    layer.active = false;
                }
                continue;
            }
            // If we are playing (not refreshing), update the layer's progress
            if (!this._renderingFrame) {
                layer.progress(reltime);
            }
            // If only rendering this frame, we are not "starting" the layer
            if (!layer.active && val(layer, 'enabled', reltime) && !this._renderingFrame) {
                layer.start();
                layer.active = true;
            }
            layer.render();
            // if the layer has visual component
            if (layer instanceof Visual) {
                var canvas = layer.canvas;
                if (canvas.width * canvas.height > 0) {
                    this.cctx.drawImage(canvas, val(layer, 'x', reltime), val(layer, 'y', reltime), canvas.width, canvas.height);
                }
            }
        }
    };
    /**
     * Applies all of the movie's effects to the canvas
     *
     * Note: This method only applies the movie's effects, not the layers'
     * effects.
     */
    Movie.prototype._applyEffects = function () {
        for (var i = 0; i < this.effects.length; i++) {
            var effect = this.effects[i];
            // An effect that has been deleted before effects.length has been updated
            // (see the effectsproxy in the constructor).
            if (!effect) {
                continue;
            }
            effect.apply(this, this.currentTime);
        }
    };
    /**
     * Refreshes the screen
     *
     * Only use this if auto-refresh is disabled
     *
     * @return - Promise that resolves when the frame is loaded
     */
    Movie.prototype.refresh = function () {
        var _this = this;
        // Refreshing while playing can interrupt playback
        if (!this.paused) {
            throw new Error('Already playing');
        }
        return new Promise(function (resolve) {
            _this._renderingFrame = true;
            _this._render(undefined, resolve);
        });
    };
    /**
     * Convienence method (TODO: remove)
     */
    Movie.prototype._publishToLayers = function (type, event) {
        for (var i = 0; i < this.layers.length; i++) {
            if (Object.prototype.hasOwnProperty.call(this.layers, i)) {
                publish(this.layers[i], type, event);
            }
        }
    };
    Object.defineProperty(Movie.prototype, "rendering", {
        /**
         * `true` if the movie is playing, recording or refreshing
         */
        get: function () {
            return !this.paused || this._renderingFrame;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "renderingFrame", {
        /**
         * `true` if the movie is refreshing the current frame
         */
        get: function () {
            return this._renderingFrame;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "recording", {
        /**
         * `true` if the movie is recording
         */
        get: function () {
            return this._recording;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "duration", {
        /**
         * The duration of the movie in seconds
         *
         * Calculated from the end time of the last layer
         */
        // TODO: cache
        get: function () {
            return this.layers.reduce(function (end, layer) { return Math.max(layer.startTime + layer.duration, end); }, 0);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Convenience method for `layers.push()`
     *
     * @param layer
     * @return The movie
     */
    Movie.prototype.addLayer = function (layer) {
        this.layers.push(layer);
        return this;
    };
    /**
     * Convenience method for `effects.push()`
     *
     * @param effect
     * @return the movie
     */
    Movie.prototype.addEffect = function (effect) {
        this.effects.push(effect);
        return this;
    };
    Object.defineProperty(Movie.prototype, "paused", {
        /**
         * `true` if the movie is paused
         */
        get: function () {
            return this._paused;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "ended", {
        /**
         * `true` if the playback position is at the end of the movie
         */
        get: function () {
            return this._ended;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Skips to the provided playback position, updating {@link currentTime}.
     *
     * @param time - The new playback position (in seconds)
     */
    Movie.prototype.seek = function (time) {
        this._currentTime = time;
        // Call `seek` on every layer
        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            if (layer) {
                var relativeTime = time - layer.startTime;
                if (relativeTime >= 0 && relativeTime <= layer.duration) {
                    layer.seek(relativeTime);
                }
                else {
                    layer.seek(undefined);
                }
            }
        }
        // For backwards compatibility, publish a `seek` event
        publish(this, 'movie.seek', {});
    };
    Object.defineProperty(Movie.prototype, "currentTime", {
        /**
         * The current playback position in seconds
         */
        get: function () {
            return this._currentTime;
        },
        /**
         * Skips to the provided playback position, updating {@link currentTime}.
         *
         * @param time - The new playback position (in seconds)
         *
         * @deprecated Use `seek` instead
         */
        set: function (time) {
            this.seek(time);
        },
        enumerable: false,
        configurable: true
    });
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
    // TODO: Refresh only if auto-refreshing is enabled
    Movie.prototype.setCurrentTime = function (time, refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = true; }
        return new Promise(function (resolve, reject) {
            _this.seek(time);
            if (refresh) {
                // Pass promise callbacks to `refresh`
                _this.refresh().then(resolve).catch(reject);
            }
            else {
                resolve();
            }
        });
    };
    Object.defineProperty(Movie.prototype, "ready", {
        /**
         * `true` if the movie is ready for playback
         */
        get: function () {
            var layersReady = this.layers.every(function (layer) { return layer.ready; });
            var effectsReady = this.effects.every(function (effect) { return effect.ready; });
            return layersReady && effectsReady;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "canvas", {
        /**
         * The HTML canvas element used for rendering
         */
        get: function () {
            return this._canvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "cctx", {
        /**
         * The canvas context used for rendering
         */
        get: function () {
            return this._cctx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "width", {
        /**
         * The width of the output canvas
         */
        get: function () {
            return this.canvas.width;
        },
        set: function (width) {
            this.canvas.width = width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "height", {
        /**
         * The height of the output canvas
         */
        get: function () {
            return this.canvas.height;
        },
        set: function (height) {
            this.canvas.height = height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "movie", {
        /**
         * @return The movie
         */
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @deprecated See {@link https://github.com/etro-js/etro/issues/131}
     */
    Movie.prototype.getDefaultOptions = function () {
        return {
            canvas: undefined,
            /**
             * @name module:movie#background
             * @desc The color for the background, or <code>null</code> for transparency
             */
            background: parseColor('#000'),
            /**
             * @name module:movie#repeat
             */
            repeat: false
        };
    };
    return Movie;
}());
// Id for events
Movie.prototype.type = 'movie';
Movie.prototype.propertyFilters = {};
deprecate('movie.audiodestinationupdate', 'audiodestinationupdate');
deprecate('movie.ended', undefined);
deprecate('movie.loadeddata', undefined);
deprecate('movie.pause', undefined, 'Wait for `play()`, `stream()`, or `record()` to resolve instead.');
deprecate('movie.play', undefined, 'Provide an `onStart` callback to `play()`, `stream()`, or `record()` instead.');
deprecate('movie.record', undefined, 'Provide an `onStart` callback to `record()` instead.');
deprecate('movie.recordended', undefined, 'Wait for `record()` to resolve instead.');
deprecate('movie.seek', undefined, 'Override the `seek` method on layers instead.');
deprecate('movie.timeupdate', undefined, 'Override the `progress` method on layers instead.');

/*
 * Typedoc can't handle default exports. To let users import default export and
 * make typedoc work, this module exports everything as named exports. Then,
 * ./index imports everything from this module and exports it as a default
 * export. Typedoc uses this file, and rollup and NPM use ./index
 */

var etro = /*#__PURE__*/Object.freeze({
    __proto__: null,
    layer: index,
    effect: index$1,
    event: event,
    MovieOptions: MovieOptions,
    Movie: Movie,
    applyOptions: applyOptions,
    clearCachedValues: clearCachedValues,
    KeyFrame: KeyFrame,
    val: val,
    linearInterp: linearInterp,
    cosineInterp: cosineInterp,
    Color: Color,
    parseColor: parseColor,
    Font: Font,
    parseFont: parseFont,
    mapPixels: mapPixels
});

/**
 * The entry point
 * @module index
 */

module.exports = etro;
