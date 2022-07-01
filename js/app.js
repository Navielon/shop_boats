(() => {
    var __webpack_modules__ = {
        211: function(__unused_webpack_module, exports) {
            (function(global, factory) {
                true ? factory(exports) : 0;
            })(0, (function(exports) {
                "use strict";
                exports.PipsMode = void 0;
                (function(PipsMode) {
                    PipsMode["Range"] = "range";
                    PipsMode["Steps"] = "steps";
                    PipsMode["Positions"] = "positions";
                    PipsMode["Count"] = "count";
                    PipsMode["Values"] = "values";
                })(exports.PipsMode || (exports.PipsMode = {}));
                exports.PipsType = void 0;
                (function(PipsType) {
                    PipsType[PipsType["None"] = -1] = "None";
                    PipsType[PipsType["NoValue"] = 0] = "NoValue";
                    PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
                    PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
                })(exports.PipsType || (exports.PipsType = {}));
                function isValidFormatter(entry) {
                    return isValidPartialFormatter(entry) && "function" === typeof entry.from;
                }
                function isValidPartialFormatter(entry) {
                    return "object" === typeof entry && "function" === typeof entry.to;
                }
                function removeElement(el) {
                    el.parentElement.removeChild(el);
                }
                function isSet(value) {
                    return null !== value && void 0 !== value;
                }
                function preventDefault(e) {
                    e.preventDefault();
                }
                function unique(array) {
                    return array.filter((function(a) {
                        return !this[a] ? this[a] = true : false;
                    }), {});
                }
                function closest(value, to) {
                    return Math.round(value / to) * to;
                }
                function offset(elem, orientation) {
                    var rect = elem.getBoundingClientRect();
                    var doc = elem.ownerDocument;
                    var docElem = doc.documentElement;
                    var pageOffset = getPageOffset(doc);
                    if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) pageOffset.x = 0;
                    return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
                }
                function isNumeric(a) {
                    return "number" === typeof a && !isNaN(a) && isFinite(a);
                }
                function addClassFor(element, className, duration) {
                    if (duration > 0) {
                        addClass(element, className);
                        setTimeout((function() {
                            removeClass(element, className);
                        }), duration);
                    }
                }
                function limit(a) {
                    return Math.max(Math.min(a, 100), 0);
                }
                function asArray(a) {
                    return Array.isArray(a) ? a : [ a ];
                }
                function countDecimals(numStr) {
                    numStr = String(numStr);
                    var pieces = numStr.split(".");
                    return pieces.length > 1 ? pieces[1].length : 0;
                }
                function addClass(el, className) {
                    if (el.classList && !/\s/.test(className)) el.classList.add(className); else el.className += " " + className;
                }
                function removeClass(el, className) {
                    if (el.classList && !/\s/.test(className)) el.classList.remove(className); else el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
                }
                function hasClass(el, className) {
                    return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
                }
                function getPageOffset(doc) {
                    var supportPageOffset = void 0 !== window.pageXOffset;
                    var isCSS1Compat = "CSS1Compat" === (doc.compatMode || "");
                    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
                    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
                    return {
                        x,
                        y
                    };
                }
                function getActions() {
                    return window.navigator.pointerEnabled ? {
                        start: "pointerdown",
                        move: "pointermove",
                        end: "pointerup"
                    } : window.navigator.msPointerEnabled ? {
                        start: "MSPointerDown",
                        move: "MSPointerMove",
                        end: "MSPointerUp"
                    } : {
                        start: "mousedown touchstart",
                        move: "mousemove touchmove",
                        end: "mouseup touchend"
                    };
                }
                function getSupportsPassive() {
                    var supportsPassive = false;
                    try {
                        var opts = Object.defineProperty({}, "passive", {
                            get: function() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("test", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }
                function getSupportsTouchActionNone() {
                    return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
                }
                function subRangeRatio(pa, pb) {
                    return 100 / (pb - pa);
                }
                function fromPercentage(range, value, startRange) {
                    return 100 * value / (range[startRange + 1] - range[startRange]);
                }
                function toPercentage(range, value) {
                    return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
                }
                function isPercentage(range, value) {
                    return value * (range[1] - range[0]) / 100 + range[0];
                }
                function getJ(value, arr) {
                    var j = 1;
                    while (value >= arr[j]) j += 1;
                    return j;
                }
                function toStepping(xVal, xPct, value) {
                    if (value >= xVal.slice(-1)[0]) return 100;
                    var j = getJ(value, xVal);
                    var va = xVal[j - 1];
                    var vb = xVal[j];
                    var pa = xPct[j - 1];
                    var pb = xPct[j];
                    return pa + toPercentage([ va, vb ], value) / subRangeRatio(pa, pb);
                }
                function fromStepping(xVal, xPct, value) {
                    if (value >= 100) return xVal.slice(-1)[0];
                    var j = getJ(value, xPct);
                    var va = xVal[j - 1];
                    var vb = xVal[j];
                    var pa = xPct[j - 1];
                    var pb = xPct[j];
                    return isPercentage([ va, vb ], (value - pa) * subRangeRatio(pa, pb));
                }
                function getStep(xPct, xSteps, snap, value) {
                    if (100 === value) return value;
                    var j = getJ(value, xPct);
                    var a = xPct[j - 1];
                    var b = xPct[j];
                    if (snap) {
                        if (value - a > (b - a) / 2) return b;
                        return a;
                    }
                    if (!xSteps[j - 1]) return value;
                    return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
                }
                var Spectrum = function() {
                    function Spectrum(entry, snap, singleStep) {
                        this.xPct = [];
                        this.xVal = [];
                        this.xSteps = [];
                        this.xNumSteps = [];
                        this.xHighestCompleteStep = [];
                        this.xSteps = [ singleStep || false ];
                        this.xNumSteps = [ false ];
                        this.snap = snap;
                        var index;
                        var ordered = [];
                        Object.keys(entry).forEach((function(index) {
                            ordered.push([ asArray(entry[index]), index ]);
                        }));
                        ordered.sort((function(a, b) {
                            return a[0][0] - b[0][0];
                        }));
                        for (index = 0; index < ordered.length; index++) this.handleEntryPoint(ordered[index][1], ordered[index][0]);
                        this.xNumSteps = this.xSteps.slice(0);
                        for (index = 0; index < this.xNumSteps.length; index++) this.handleStepPoint(index, this.xNumSteps[index]);
                    }
                    Spectrum.prototype.getDistance = function(value) {
                        var distances = [];
                        for (var index = 0; index < this.xNumSteps.length - 1; index++) distances[index] = fromPercentage(this.xVal, value, index);
                        return distances;
                    };
                    Spectrum.prototype.getAbsoluteDistance = function(value, distances, direction) {
                        var xPct_index = 0;
                        if (value < this.xPct[this.xPct.length - 1]) while (value > this.xPct[xPct_index + 1]) xPct_index++; else if (value === this.xPct[this.xPct.length - 1]) xPct_index = this.xPct.length - 2;
                        if (!direction && value === this.xPct[xPct_index + 1]) xPct_index++;
                        if (null === distances) distances = [];
                        var start_factor;
                        var rest_factor = 1;
                        var rest_rel_distance = distances[xPct_index];
                        var range_pct = 0;
                        var rel_range_distance = 0;
                        var abs_distance_counter = 0;
                        var range_counter = 0;
                        if (direction) start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]); else start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
                        while (rest_rel_distance > 0) {
                            range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
                            if (distances[xPct_index + range_counter] * rest_factor + 100 - 100 * start_factor > 100) {
                                rel_range_distance = range_pct * start_factor;
                                rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                                start_factor = 1;
                            } else {
                                rel_range_distance = distances[xPct_index + range_counter] * range_pct / 100 * rest_factor;
                                rest_factor = 0;
                            }
                            if (direction) {
                                abs_distance_counter -= rel_range_distance;
                                if (this.xPct.length + range_counter >= 1) range_counter--;
                            } else {
                                abs_distance_counter += rel_range_distance;
                                if (this.xPct.length - range_counter >= 1) range_counter++;
                            }
                            rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
                        }
                        return value + abs_distance_counter;
                    };
                    Spectrum.prototype.toStepping = function(value) {
                        value = toStepping(this.xVal, this.xPct, value);
                        return value;
                    };
                    Spectrum.prototype.fromStepping = function(value) {
                        return fromStepping(this.xVal, this.xPct, value);
                    };
                    Spectrum.prototype.getStep = function(value) {
                        value = getStep(this.xPct, this.xSteps, this.snap, value);
                        return value;
                    };
                    Spectrum.prototype.getDefaultStep = function(value, isDown, size) {
                        var j = getJ(value, this.xPct);
                        if (100 === value || isDown && value === this.xPct[j - 1]) j = Math.max(j - 1, 1);
                        return (this.xVal[j] - this.xVal[j - 1]) / size;
                    };
                    Spectrum.prototype.getNearbySteps = function(value) {
                        var j = getJ(value, this.xPct);
                        return {
                            stepBefore: {
                                startValue: this.xVal[j - 2],
                                step: this.xNumSteps[j - 2],
                                highestStep: this.xHighestCompleteStep[j - 2]
                            },
                            thisStep: {
                                startValue: this.xVal[j - 1],
                                step: this.xNumSteps[j - 1],
                                highestStep: this.xHighestCompleteStep[j - 1]
                            },
                            stepAfter: {
                                startValue: this.xVal[j],
                                step: this.xNumSteps[j],
                                highestStep: this.xHighestCompleteStep[j]
                            }
                        };
                    };
                    Spectrum.prototype.countStepDecimals = function() {
                        var stepDecimals = this.xNumSteps.map(countDecimals);
                        return Math.max.apply(null, stepDecimals);
                    };
                    Spectrum.prototype.hasNoSize = function() {
                        return this.xVal[0] === this.xVal[this.xVal.length - 1];
                    };
                    Spectrum.prototype.convert = function(value) {
                        return this.getStep(this.toStepping(value));
                    };
                    Spectrum.prototype.handleEntryPoint = function(index, value) {
                        var percentage;
                        if ("min" === index) percentage = 0; else if ("max" === index) percentage = 100; else percentage = parseFloat(index);
                        if (!isNumeric(percentage) || !isNumeric(value[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
                        this.xPct.push(percentage);
                        this.xVal.push(value[0]);
                        var value1 = Number(value[1]);
                        if (!percentage) {
                            if (!isNaN(value1)) this.xSteps[0] = value1;
                        } else this.xSteps.push(isNaN(value1) ? false : value1);
                        this.xHighestCompleteStep.push(0);
                    };
                    Spectrum.prototype.handleStepPoint = function(i, n) {
                        if (!n) return;
                        if (this.xVal[i] === this.xVal[i + 1]) {
                            this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
                            return;
                        }
                        this.xSteps[i] = fromPercentage([ this.xVal[i], this.xVal[i + 1] ], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
                        var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
                        var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
                        var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
                        this.xHighestCompleteStep[i] = step;
                    };
                    return Spectrum;
                }();
                var defaultFormatter = {
                    to: function(value) {
                        return void 0 === value ? "" : value.toFixed(2);
                    },
                    from: Number
                };
                var cssClasses = {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    handleLower: "handle-lower",
                    handleUpper: "handle-upper",
                    touchArea: "touch-area",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    connects: "connects",
                    ltr: "ltr",
                    rtl: "rtl",
                    textDirectionLtr: "txt-dir-ltr",
                    textDirectionRtl: "txt-dir-rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub"
                };
                var INTERNAL_EVENT_NS = {
                    tooltips: ".__tooltips",
                    aria: ".__aria"
                };
                function testStep(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'step' is not numeric.");
                    parsed.singleStep = entry;
                }
                function testKeyboardPageMultiplier(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
                    parsed.keyboardPageMultiplier = entry;
                }
                function testKeyboardMultiplier(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
                    parsed.keyboardMultiplier = entry;
                }
                function testKeyboardDefaultStep(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
                    parsed.keyboardDefaultStep = entry;
                }
                function testRange(parsed, entry) {
                    if ("object" !== typeof entry || Array.isArray(entry)) throw new Error("noUiSlider: 'range' is not an object.");
                    if (void 0 === entry.min || void 0 === entry.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
                    parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
                }
                function testStart(parsed, entry) {
                    entry = asArray(entry);
                    if (!Array.isArray(entry) || !entry.length) throw new Error("noUiSlider: 'start' option is incorrect.");
                    parsed.handles = entry.length;
                    parsed.start = entry;
                }
                function testSnap(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'snap' option must be a boolean.");
                    parsed.snap = entry;
                }
                function testAnimate(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'animate' option must be a boolean.");
                    parsed.animate = entry;
                }
                function testAnimationDuration(parsed, entry) {
                    if ("number" !== typeof entry) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
                    parsed.animationDuration = entry;
                }
                function testConnect(parsed, entry) {
                    var connect = [ false ];
                    var i;
                    if ("lower" === entry) entry = [ true, false ]; else if ("upper" === entry) entry = [ false, true ];
                    if (true === entry || false === entry) {
                        for (i = 1; i < parsed.handles; i++) connect.push(entry);
                        connect.push(false);
                    } else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count."); else connect = entry;
                    parsed.connect = connect;
                }
                function testOrientation(parsed, entry) {
                    switch (entry) {
                      case "horizontal":
                        parsed.ort = 0;
                        break;

                      case "vertical":
                        parsed.ort = 1;
                        break;

                      default:
                        throw new Error("noUiSlider: 'orientation' option is invalid.");
                    }
                }
                function testMargin(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'margin' option must be numeric.");
                    if (0 === entry) return;
                    parsed.margin = parsed.spectrum.getDistance(entry);
                }
                function testLimit(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'limit' option must be numeric.");
                    parsed.limit = parsed.spectrum.getDistance(entry);
                    if (!parsed.limit || parsed.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
                }
                function testPadding(parsed, entry) {
                    var index;
                    if (!isNumeric(entry) && !Array.isArray(entry)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
                    if (Array.isArray(entry) && !(2 === entry.length || isNumeric(entry[0]) || isNumeric(entry[1]))) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
                    if (0 === entry) return;
                    if (!Array.isArray(entry)) entry = [ entry, entry ];
                    parsed.padding = [ parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1]) ];
                    for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
                    var totalPadding = entry[0] + entry[1];
                    var firstValue = parsed.spectrum.xVal[0];
                    var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
                    if (totalPadding / (lastValue - firstValue) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
                }
                function testDirection(parsed, entry) {
                    switch (entry) {
                      case "ltr":
                        parsed.dir = 0;
                        break;

                      case "rtl":
                        parsed.dir = 1;
                        break;

                      default:
                        throw new Error("noUiSlider: 'direction' option was not recognized.");
                    }
                }
                function testBehaviour(parsed, entry) {
                    if ("string" !== typeof entry) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
                    var tap = entry.indexOf("tap") >= 0;
                    var drag = entry.indexOf("drag") >= 0;
                    var fixed = entry.indexOf("fixed") >= 0;
                    var snap = entry.indexOf("snap") >= 0;
                    var hover = entry.indexOf("hover") >= 0;
                    var unconstrained = entry.indexOf("unconstrained") >= 0;
                    var dragAll = entry.indexOf("drag-all") >= 0;
                    var smoothSteps = entry.indexOf("smooth-steps") >= 0;
                    if (fixed) {
                        if (2 !== parsed.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
                        testMargin(parsed, parsed.start[1] - parsed.start[0]);
                    }
                    if (unconstrained && (parsed.margin || parsed.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
                    parsed.events = {
                        tap: tap || snap,
                        drag,
                        dragAll,
                        smoothSteps,
                        fixed,
                        snap,
                        hover,
                        unconstrained
                    };
                }
                function testTooltips(parsed, entry) {
                    if (false === entry) return;
                    if (true === entry || isValidPartialFormatter(entry)) {
                        parsed.tooltips = [];
                        for (var i = 0; i < parsed.handles; i++) parsed.tooltips.push(entry);
                    } else {
                        entry = asArray(entry);
                        if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                        entry.forEach((function(formatter) {
                            if ("boolean" !== typeof formatter && !isValidPartialFormatter(formatter)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                        }));
                        parsed.tooltips = entry;
                    }
                }
                function testHandleAttributes(parsed, entry) {
                    if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
                    parsed.handleAttributes = entry;
                }
                function testAriaFormat(parsed, entry) {
                    if (!isValidPartialFormatter(entry)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
                    parsed.ariaFormat = entry;
                }
                function testFormat(parsed, entry) {
                    if (!isValidFormatter(entry)) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
                    parsed.format = entry;
                }
                function testKeyboardSupport(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
                    parsed.keyboardSupport = entry;
                }
                function testDocumentElement(parsed, entry) {
                    parsed.documentElement = entry;
                }
                function testCssPrefix(parsed, entry) {
                    if ("string" !== typeof entry && false !== entry) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
                    parsed.cssPrefix = entry;
                }
                function testCssClasses(parsed, entry) {
                    if ("object" !== typeof entry) throw new Error("noUiSlider: 'cssClasses' must be an object.");
                    if ("string" === typeof parsed.cssPrefix) {
                        parsed.cssClasses = {};
                        Object.keys(entry).forEach((function(key) {
                            parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
                        }));
                    } else parsed.cssClasses = entry;
                }
                function testOptions(options) {
                    var parsed = {
                        margin: null,
                        limit: null,
                        padding: null,
                        animate: true,
                        animationDuration: 300,
                        ariaFormat: defaultFormatter,
                        format: defaultFormatter
                    };
                    var tests = {
                        step: {
                            r: false,
                            t: testStep
                        },
                        keyboardPageMultiplier: {
                            r: false,
                            t: testKeyboardPageMultiplier
                        },
                        keyboardMultiplier: {
                            r: false,
                            t: testKeyboardMultiplier
                        },
                        keyboardDefaultStep: {
                            r: false,
                            t: testKeyboardDefaultStep
                        },
                        start: {
                            r: true,
                            t: testStart
                        },
                        connect: {
                            r: true,
                            t: testConnect
                        },
                        direction: {
                            r: true,
                            t: testDirection
                        },
                        snap: {
                            r: false,
                            t: testSnap
                        },
                        animate: {
                            r: false,
                            t: testAnimate
                        },
                        animationDuration: {
                            r: false,
                            t: testAnimationDuration
                        },
                        range: {
                            r: true,
                            t: testRange
                        },
                        orientation: {
                            r: false,
                            t: testOrientation
                        },
                        margin: {
                            r: false,
                            t: testMargin
                        },
                        limit: {
                            r: false,
                            t: testLimit
                        },
                        padding: {
                            r: false,
                            t: testPadding
                        },
                        behaviour: {
                            r: true,
                            t: testBehaviour
                        },
                        ariaFormat: {
                            r: false,
                            t: testAriaFormat
                        },
                        format: {
                            r: false,
                            t: testFormat
                        },
                        tooltips: {
                            r: false,
                            t: testTooltips
                        },
                        keyboardSupport: {
                            r: true,
                            t: testKeyboardSupport
                        },
                        documentElement: {
                            r: false,
                            t: testDocumentElement
                        },
                        cssPrefix: {
                            r: true,
                            t: testCssPrefix
                        },
                        cssClasses: {
                            r: true,
                            t: testCssClasses
                        },
                        handleAttributes: {
                            r: false,
                            t: testHandleAttributes
                        }
                    };
                    var defaults = {
                        connect: false,
                        direction: "ltr",
                        behaviour: "tap",
                        orientation: "horizontal",
                        keyboardSupport: true,
                        cssPrefix: "noUi-",
                        cssClasses,
                        keyboardPageMultiplier: 5,
                        keyboardMultiplier: 1,
                        keyboardDefaultStep: 10
                    };
                    if (options.format && !options.ariaFormat) options.ariaFormat = options.format;
                    Object.keys(tests).forEach((function(name) {
                        if (!isSet(options[name]) && void 0 === defaults[name]) {
                            if (tests[name].r) throw new Error("noUiSlider: '" + name + "' is required.");
                            return;
                        }
                        tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
                    }));
                    parsed.pips = options.pips;
                    var d = document.createElement("div");
                    var msPrefix = void 0 !== d.style.msTransform;
                    var noPrefix = void 0 !== d.style.transform;
                    parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
                    var styles = [ [ "left", "top" ], [ "right", "bottom" ] ];
                    parsed.style = styles[parsed.dir][parsed.ort];
                    return parsed;
                }
                function scope(target, options, originalOptions) {
                    var actions = getActions();
                    var supportsTouchActionNone = getSupportsTouchActionNone();
                    var supportsPassive = supportsTouchActionNone && getSupportsPassive();
                    var scope_Target = target;
                    var scope_Base;
                    var scope_Handles;
                    var scope_Connects;
                    var scope_Pips;
                    var scope_Tooltips;
                    var scope_Spectrum = options.spectrum;
                    var scope_Values = [];
                    var scope_Locations = [];
                    var scope_HandleNumbers = [];
                    var scope_ActiveHandlesCount = 0;
                    var scope_Events = {};
                    var scope_Document = target.ownerDocument;
                    var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
                    var scope_Body = scope_Document.body;
                    var scope_DirOffset = "rtl" === scope_Document.dir || 1 === options.ort ? 0 : 100;
                    function addNodeTo(addTarget, className) {
                        var div = scope_Document.createElement("div");
                        if (className) addClass(div, className);
                        addTarget.appendChild(div);
                        return div;
                    }
                    function addOrigin(base, handleNumber) {
                        var origin = addNodeTo(base, options.cssClasses.origin);
                        var handle = addNodeTo(origin, options.cssClasses.handle);
                        addNodeTo(handle, options.cssClasses.touchArea);
                        handle.setAttribute("data-handle", String(handleNumber));
                        if (options.keyboardSupport) {
                            handle.setAttribute("tabindex", "0");
                            handle.addEventListener("keydown", (function(event) {
                                return eventKeydown(event, handleNumber);
                            }));
                        }
                        if (void 0 !== options.handleAttributes) {
                            var attributes_1 = options.handleAttributes[handleNumber];
                            Object.keys(attributes_1).forEach((function(attribute) {
                                handle.setAttribute(attribute, attributes_1[attribute]);
                            }));
                        }
                        handle.setAttribute("role", "slider");
                        handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
                        if (0 === handleNumber) addClass(handle, options.cssClasses.handleLower); else if (handleNumber === options.handles - 1) addClass(handle, options.cssClasses.handleUpper);
                        return origin;
                    }
                    function addConnect(base, add) {
                        if (!add) return false;
                        return addNodeTo(base, options.cssClasses.connect);
                    }
                    function addElements(connectOptions, base) {
                        var connectBase = addNodeTo(base, options.cssClasses.connects);
                        scope_Handles = [];
                        scope_Connects = [];
                        scope_Connects.push(addConnect(connectBase, connectOptions[0]));
                        for (var i = 0; i < options.handles; i++) {
                            scope_Handles.push(addOrigin(base, i));
                            scope_HandleNumbers[i] = i;
                            scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
                        }
                    }
                    function addSlider(addTarget) {
                        addClass(addTarget, options.cssClasses.target);
                        if (0 === options.dir) addClass(addTarget, options.cssClasses.ltr); else addClass(addTarget, options.cssClasses.rtl);
                        if (0 === options.ort) addClass(addTarget, options.cssClasses.horizontal); else addClass(addTarget, options.cssClasses.vertical);
                        var textDirection = getComputedStyle(addTarget).direction;
                        if ("rtl" === textDirection) addClass(addTarget, options.cssClasses.textDirectionRtl); else addClass(addTarget, options.cssClasses.textDirectionLtr);
                        return addNodeTo(addTarget, options.cssClasses.base);
                    }
                    function addTooltip(handle, handleNumber) {
                        if (!options.tooltips || !options.tooltips[handleNumber]) return false;
                        return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
                    }
                    function isSliderDisabled() {
                        return scope_Target.hasAttribute("disabled");
                    }
                    function isHandleDisabled(handleNumber) {
                        var handleOrigin = scope_Handles[handleNumber];
                        return handleOrigin.hasAttribute("disabled");
                    }
                    function removeTooltips() {
                        if (scope_Tooltips) {
                            removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
                            scope_Tooltips.forEach((function(tooltip) {
                                if (tooltip) removeElement(tooltip);
                            }));
                            scope_Tooltips = null;
                        }
                    }
                    function tooltips() {
                        removeTooltips();
                        scope_Tooltips = scope_Handles.map(addTooltip);
                        bindEvent("update" + INTERNAL_EVENT_NS.tooltips, (function(values, handleNumber, unencoded) {
                            if (!scope_Tooltips || !options.tooltips) return;
                            if (false === scope_Tooltips[handleNumber]) return;
                            var formattedValue = values[handleNumber];
                            if (true !== options.tooltips[handleNumber]) formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                            scope_Tooltips[handleNumber].innerHTML = formattedValue;
                        }));
                    }
                    function aria() {
                        removeEvent("update" + INTERNAL_EVENT_NS.aria);
                        bindEvent("update" + INTERNAL_EVENT_NS.aria, (function(values, handleNumber, unencoded, tap, positions) {
                            scope_HandleNumbers.forEach((function(index) {
                                var handle = scope_Handles[index];
                                var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                                var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                                var now = positions[index];
                                var text = String(options.ariaFormat.to(unencoded[index]));
                                min = scope_Spectrum.fromStepping(min).toFixed(1);
                                max = scope_Spectrum.fromStepping(max).toFixed(1);
                                now = scope_Spectrum.fromStepping(now).toFixed(1);
                                handle.children[0].setAttribute("aria-valuemin", min);
                                handle.children[0].setAttribute("aria-valuemax", max);
                                handle.children[0].setAttribute("aria-valuenow", now);
                                handle.children[0].setAttribute("aria-valuetext", text);
                            }));
                        }));
                    }
                    function getGroup(pips) {
                        if (pips.mode === exports.PipsMode.Range || pips.mode === exports.PipsMode.Steps) return scope_Spectrum.xVal;
                        if (pips.mode === exports.PipsMode.Count) {
                            if (pips.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                            var interval = pips.values - 1;
                            var spread = 100 / interval;
                            var values = [];
                            while (interval--) values[interval] = interval * spread;
                            values.push(100);
                            return mapToRange(values, pips.stepped);
                        }
                        if (pips.mode === exports.PipsMode.Positions) return mapToRange(pips.values, pips.stepped);
                        if (pips.mode === exports.PipsMode.Values) {
                            if (pips.stepped) return pips.values.map((function(value) {
                                return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                            }));
                            return pips.values;
                        }
                        return [];
                    }
                    function mapToRange(values, stepped) {
                        return values.map((function(value) {
                            return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
                        }));
                    }
                    function generateSpread(pips) {
                        function safeIncrement(value, increment) {
                            return Number((value + increment).toFixed(7));
                        }
                        var group = getGroup(pips);
                        var indexes = {};
                        var firstInRange = scope_Spectrum.xVal[0];
                        var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
                        var ignoreFirst = false;
                        var ignoreLast = false;
                        var prevPct = 0;
                        group = unique(group.slice().sort((function(a, b) {
                            return a - b;
                        })));
                        if (group[0] !== firstInRange) {
                            group.unshift(firstInRange);
                            ignoreFirst = true;
                        }
                        if (group[group.length - 1] !== lastInRange) {
                            group.push(lastInRange);
                            ignoreLast = true;
                        }
                        group.forEach((function(current, index) {
                            var step;
                            var i;
                            var q;
                            var low = current;
                            var high = group[index + 1];
                            var newPct;
                            var pctDifference;
                            var pctPos;
                            var type;
                            var steps;
                            var realSteps;
                            var stepSize;
                            var isSteps = pips.mode === exports.PipsMode.Steps;
                            if (isSteps) step = scope_Spectrum.xNumSteps[index];
                            if (!step) step = high - low;
                            if (void 0 === high) high = low;
                            step = Math.max(step, 1e-7);
                            for (i = low; i <= high; i = safeIncrement(i, step)) {
                                newPct = scope_Spectrum.toStepping(i);
                                pctDifference = newPct - prevPct;
                                steps = pctDifference / (pips.density || 1);
                                realSteps = Math.round(steps);
                                stepSize = pctDifference / realSteps;
                                for (q = 1; q <= realSteps; q += 1) {
                                    pctPos = prevPct + q * stepSize;
                                    indexes[pctPos.toFixed(5)] = [ scope_Spectrum.fromStepping(pctPos), 0 ];
                                }
                                type = group.indexOf(i) > -1 ? exports.PipsType.LargeValue : isSteps ? exports.PipsType.SmallValue : exports.PipsType.NoValue;
                                if (!index && ignoreFirst && i !== high) type = 0;
                                if (!(i === high && ignoreLast)) indexes[newPct.toFixed(5)] = [ i, type ];
                                prevPct = newPct;
                            }
                        }));
                        return indexes;
                    }
                    function addMarking(spread, filterFunc, formatter) {
                        var _a, _b;
                        var element = scope_Document.createElement("div");
                        var valueSizeClasses = (_a = {}, _a[exports.PipsType.None] = "", _a[exports.PipsType.NoValue] = options.cssClasses.valueNormal, 
                        _a[exports.PipsType.LargeValue] = options.cssClasses.valueLarge, _a[exports.PipsType.SmallValue] = options.cssClasses.valueSub, 
                        _a);
                        var markerSizeClasses = (_b = {}, _b[exports.PipsType.None] = "", _b[exports.PipsType.NoValue] = options.cssClasses.markerNormal, 
                        _b[exports.PipsType.LargeValue] = options.cssClasses.markerLarge, _b[exports.PipsType.SmallValue] = options.cssClasses.markerSub, 
                        _b);
                        var valueOrientationClasses = [ options.cssClasses.valueHorizontal, options.cssClasses.valueVertical ];
                        var markerOrientationClasses = [ options.cssClasses.markerHorizontal, options.cssClasses.markerVertical ];
                        addClass(element, options.cssClasses.pips);
                        addClass(element, 0 === options.ort ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
                        function getClasses(type, source) {
                            var a = source === options.cssClasses.value;
                            var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                            var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                            return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
                        }
                        function addSpread(offset, value, type) {
                            type = filterFunc ? filterFunc(value, type) : type;
                            if (type === exports.PipsType.None) return;
                            var node = addNodeTo(element, false);
                            node.className = getClasses(type, options.cssClasses.marker);
                            node.style[options.style] = offset + "%";
                            if (type > exports.PipsType.NoValue) {
                                node = addNodeTo(element, false);
                                node.className = getClasses(type, options.cssClasses.value);
                                node.setAttribute("data-value", String(value));
                                node.style[options.style] = offset + "%";
                                node.innerHTML = String(formatter.to(value));
                            }
                        }
                        Object.keys(spread).forEach((function(offset) {
                            addSpread(offset, spread[offset][0], spread[offset][1]);
                        }));
                        return element;
                    }
                    function removePips() {
                        if (scope_Pips) {
                            removeElement(scope_Pips);
                            scope_Pips = null;
                        }
                    }
                    function pips(pips) {
                        removePips();
                        var spread = generateSpread(pips);
                        var filter = pips.filter;
                        var format = pips.format || {
                            to: function(value) {
                                return String(Math.round(value));
                            }
                        };
                        scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
                        return scope_Pips;
                    }
                    function baseSize() {
                        var rect = scope_Base.getBoundingClientRect();
                        var alt = "offset" + [ "Width", "Height" ][options.ort];
                        return 0 === options.ort ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
                    }
                    function attachEvent(events, element, callback, data) {
                        var method = function(event) {
                            var e = fixEvent(event, data.pageOffset, data.target || element);
                            if (!e) return false;
                            if (isSliderDisabled() && !data.doNotReject) return false;
                            if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) return false;
                            if (events === actions.start && void 0 !== e.buttons && e.buttons > 1) return false;
                            if (data.hover && e.buttons) return false;
                            if (!supportsPassive) e.preventDefault();
                            e.calcPoint = e.points[options.ort];
                            callback(e, data);
                            return;
                        };
                        var methods = [];
                        events.split(" ").forEach((function(eventName) {
                            element.addEventListener(eventName, method, supportsPassive ? {
                                passive: true
                            } : false);
                            methods.push([ eventName, method ]);
                        }));
                        return methods;
                    }
                    function fixEvent(e, pageOffset, eventTarget) {
                        var touch = 0 === e.type.indexOf("touch");
                        var mouse = 0 === e.type.indexOf("mouse");
                        var pointer = 0 === e.type.indexOf("pointer");
                        var x = 0;
                        var y = 0;
                        if (0 === e.type.indexOf("MSPointer")) pointer = true;
                        if ("mousedown" === e.type && !e.buttons && !e.touches) return false;
                        if (touch) {
                            var isTouchOnTarget = function(checkTouch) {
                                var target = checkTouch.target;
                                return target === eventTarget || eventTarget.contains(target) || e.composed && e.composedPath().shift() === eventTarget;
                            };
                            if ("touchstart" === e.type) {
                                var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                                if (targetTouches.length > 1) return false;
                                x = targetTouches[0].pageX;
                                y = targetTouches[0].pageY;
                            } else {
                                var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                                if (!targetTouch) return false;
                                x = targetTouch.pageX;
                                y = targetTouch.pageY;
                            }
                        }
                        pageOffset = pageOffset || getPageOffset(scope_Document);
                        if (mouse || pointer) {
                            x = e.clientX + pageOffset.x;
                            y = e.clientY + pageOffset.y;
                        }
                        e.pageOffset = pageOffset;
                        e.points = [ x, y ];
                        e.cursor = mouse || pointer;
                        return e;
                    }
                    function calcPointToPercentage(calcPoint) {
                        var location = calcPoint - offset(scope_Base, options.ort);
                        var proposal = 100 * location / baseSize();
                        proposal = limit(proposal);
                        return options.dir ? 100 - proposal : proposal;
                    }
                    function getClosestHandle(clickedPosition) {
                        var smallestDifference = 100;
                        var handleNumber = false;
                        scope_Handles.forEach((function(handle, index) {
                            if (isHandleDisabled(index)) return;
                            var handlePosition = scope_Locations[index];
                            var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
                            var clickAtEdge = 100 === differenceWithThisHandle && 100 === smallestDifference;
                            var isCloser = differenceWithThisHandle < smallestDifference;
                            var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
                            if (isCloser || isCloserAfter || clickAtEdge) {
                                handleNumber = index;
                                smallestDifference = differenceWithThisHandle;
                            }
                        }));
                        return handleNumber;
                    }
                    function documentLeave(event, data) {
                        if ("mouseout" === event.type && "HTML" === event.target.nodeName && null === event.relatedTarget) eventEnd(event, data);
                    }
                    function eventMove(event, data) {
                        if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === event.buttons && 0 !== data.buttonsProperty) return eventEnd(event, data);
                        var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
                        var proposal = 100 * movement / data.baseSize;
                        moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
                    }
                    function eventEnd(event, data) {
                        if (data.handle) {
                            removeClass(data.handle, options.cssClasses.active);
                            scope_ActiveHandlesCount -= 1;
                        }
                        data.listeners.forEach((function(c) {
                            scope_DocumentElement.removeEventListener(c[0], c[1]);
                        }));
                        if (0 === scope_ActiveHandlesCount) {
                            removeClass(scope_Target, options.cssClasses.drag);
                            setZindex();
                            if (event.cursor) {
                                scope_Body.style.cursor = "";
                                scope_Body.removeEventListener("selectstart", preventDefault);
                            }
                        }
                        if (options.events.smoothSteps) {
                            data.handleNumbers.forEach((function(handleNumber) {
                                setHandle(handleNumber, scope_Locations[handleNumber], true, true, false, false);
                            }));
                            data.handleNumbers.forEach((function(handleNumber) {
                                fireEvent("update", handleNumber);
                            }));
                        }
                        data.handleNumbers.forEach((function(handleNumber) {
                            fireEvent("change", handleNumber);
                            fireEvent("set", handleNumber);
                            fireEvent("end", handleNumber);
                        }));
                    }
                    function eventStart(event, data) {
                        if (data.handleNumbers.some(isHandleDisabled)) return;
                        var handle;
                        if (1 === data.handleNumbers.length) {
                            var handleOrigin = scope_Handles[data.handleNumbers[0]];
                            handle = handleOrigin.children[0];
                            scope_ActiveHandlesCount += 1;
                            addClass(handle, options.cssClasses.active);
                        }
                        event.stopPropagation();
                        var listeners = [];
                        var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                            target: event.target,
                            handle,
                            connect: data.connect,
                            listeners,
                            startCalcPoint: event.calcPoint,
                            baseSize: baseSize(),
                            pageOffset: event.pageOffset,
                            handleNumbers: data.handleNumbers,
                            buttonsProperty: event.buttons,
                            locations: scope_Locations.slice()
                        });
                        var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                            target: event.target,
                            handle,
                            listeners,
                            doNotReject: true,
                            handleNumbers: data.handleNumbers
                        });
                        var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                            target: event.target,
                            handle,
                            listeners,
                            doNotReject: true,
                            handleNumbers: data.handleNumbers
                        });
                        listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
                        if (event.cursor) {
                            scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                            if (scope_Handles.length > 1) addClass(scope_Target, options.cssClasses.drag);
                            scope_Body.addEventListener("selectstart", preventDefault, false);
                        }
                        data.handleNumbers.forEach((function(handleNumber) {
                            fireEvent("start", handleNumber);
                        }));
                    }
                    function eventTap(event) {
                        event.stopPropagation();
                        var proposal = calcPointToPercentage(event.calcPoint);
                        var handleNumber = getClosestHandle(proposal);
                        if (false === handleNumber) return;
                        if (!options.events.snap) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                        setHandle(handleNumber, proposal, true, true);
                        setZindex();
                        fireEvent("slide", handleNumber, true);
                        fireEvent("update", handleNumber, true);
                        if (!options.events.snap) {
                            fireEvent("change", handleNumber, true);
                            fireEvent("set", handleNumber, true);
                        } else eventStart(event, {
                            handleNumbers: [ handleNumber ]
                        });
                    }
                    function eventHover(event) {
                        var proposal = calcPointToPercentage(event.calcPoint);
                        var to = scope_Spectrum.getStep(proposal);
                        var value = scope_Spectrum.fromStepping(to);
                        Object.keys(scope_Events).forEach((function(targetEvent) {
                            if ("hover" === targetEvent.split(".")[0]) scope_Events[targetEvent].forEach((function(callback) {
                                callback.call(scope_Self, value);
                            }));
                        }));
                    }
                    function eventKeydown(event, handleNumber) {
                        if (isSliderDisabled() || isHandleDisabled(handleNumber)) return false;
                        var horizontalKeys = [ "Left", "Right" ];
                        var verticalKeys = [ "Down", "Up" ];
                        var largeStepKeys = [ "PageDown", "PageUp" ];
                        var edgeKeys = [ "Home", "End" ];
                        if (options.dir && !options.ort) horizontalKeys.reverse(); else if (options.ort && !options.dir) {
                            verticalKeys.reverse();
                            largeStepKeys.reverse();
                        }
                        var key = event.key.replace("Arrow", "");
                        var isLargeDown = key === largeStepKeys[0];
                        var isLargeUp = key === largeStepKeys[1];
                        var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
                        var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
                        var isMin = key === edgeKeys[0];
                        var isMax = key === edgeKeys[1];
                        if (!isDown && !isUp && !isMin && !isMax) return true;
                        event.preventDefault();
                        var to;
                        if (isUp || isDown) {
                            var direction = isDown ? 0 : 1;
                            var steps = getNextStepsForHandle(handleNumber);
                            var step = steps[direction];
                            if (null === step) return false;
                            if (false === step) step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
                            if (isLargeUp || isLargeDown) step *= options.keyboardPageMultiplier; else step *= options.keyboardMultiplier;
                            step = Math.max(step, 1e-7);
                            step *= isDown ? -1 : 1;
                            to = scope_Values[handleNumber] + step;
                        } else if (isMax) to = options.spectrum.xVal[options.spectrum.xVal.length - 1]; else to = options.spectrum.xVal[0];
                        setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
                        fireEvent("slide", handleNumber);
                        fireEvent("update", handleNumber);
                        fireEvent("change", handleNumber);
                        fireEvent("set", handleNumber);
                        return false;
                    }
                    function bindSliderEvents(behaviour) {
                        if (!behaviour.fixed) scope_Handles.forEach((function(handle, index) {
                            attachEvent(actions.start, handle.children[0], eventStart, {
                                handleNumbers: [ index ]
                            });
                        }));
                        if (behaviour.tap) attachEvent(actions.start, scope_Base, eventTap, {});
                        if (behaviour.hover) attachEvent(actions.move, scope_Base, eventHover, {
                            hover: true
                        });
                        if (behaviour.drag) scope_Connects.forEach((function(connect, index) {
                            if (false === connect || 0 === index || index === scope_Connects.length - 1) return;
                            var handleBefore = scope_Handles[index - 1];
                            var handleAfter = scope_Handles[index];
                            var eventHolders = [ connect ];
                            var handlesToDrag = [ handleBefore, handleAfter ];
                            var handleNumbersToDrag = [ index - 1, index ];
                            addClass(connect, options.cssClasses.draggable);
                            if (behaviour.fixed) {
                                eventHolders.push(handleBefore.children[0]);
                                eventHolders.push(handleAfter.children[0]);
                            }
                            if (behaviour.dragAll) {
                                handlesToDrag = scope_Handles;
                                handleNumbersToDrag = scope_HandleNumbers;
                            }
                            eventHolders.forEach((function(eventHolder) {
                                attachEvent(actions.start, eventHolder, eventStart, {
                                    handles: handlesToDrag,
                                    handleNumbers: handleNumbersToDrag,
                                    connect
                                });
                            }));
                        }));
                    }
                    function bindEvent(namespacedEvent, callback) {
                        scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
                        scope_Events[namespacedEvent].push(callback);
                        if ("update" === namespacedEvent.split(".")[0]) scope_Handles.forEach((function(a, index) {
                            fireEvent("update", index);
                        }));
                    }
                    function isInternalNamespace(namespace) {
                        return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
                    }
                    function removeEvent(namespacedEvent) {
                        var event = namespacedEvent && namespacedEvent.split(".")[0];
                        var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
                        Object.keys(scope_Events).forEach((function(bind) {
                            var tEvent = bind.split(".")[0];
                            var tNamespace = bind.substring(tEvent.length);
                            if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) if (!isInternalNamespace(tNamespace) || namespace === tNamespace) delete scope_Events[bind];
                        }));
                    }
                    function fireEvent(eventName, handleNumber, tap) {
                        Object.keys(scope_Events).forEach((function(targetEvent) {
                            var eventType = targetEvent.split(".")[0];
                            if (eventName === eventType) scope_Events[targetEvent].forEach((function(callback) {
                                callback.call(scope_Self, scope_Values.map(options.format.to), handleNumber, scope_Values.slice(), tap || false, scope_Locations.slice(), scope_Self);
                            }));
                        }));
                    }
                    function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue, smoothSteps) {
                        var distance;
                        if (scope_Handles.length > 1 && !options.events.unconstrained) {
                            if (lookBackward && handleNumber > 0) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                                to = Math.max(to, distance);
                            }
                            if (lookForward && handleNumber < scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                                to = Math.min(to, distance);
                            }
                        }
                        if (scope_Handles.length > 1 && options.limit) {
                            if (lookBackward && handleNumber > 0) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                                to = Math.min(to, distance);
                            }
                            if (lookForward && handleNumber < scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                                to = Math.max(to, distance);
                            }
                        }
                        if (options.padding) {
                            if (0 === handleNumber) {
                                distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                                to = Math.max(to, distance);
                            }
                            if (handleNumber === scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                                to = Math.min(to, distance);
                            }
                        }
                        if (!smoothSteps) to = scope_Spectrum.getStep(to);
                        to = limit(to);
                        if (to === reference[handleNumber] && !getValue) return false;
                        return to;
                    }
                    function inRuleOrder(v, a) {
                        var o = options.ort;
                        return (o ? a : v) + ", " + (o ? v : a);
                    }
                    function moveHandles(upward, proposal, locations, handleNumbers, connect) {
                        var proposals = locations.slice();
                        var firstHandle = handleNumbers[0];
                        var smoothSteps = options.events.smoothSteps;
                        var b = [ !upward, upward ];
                        var f = [ upward, !upward ];
                        handleNumbers = handleNumbers.slice();
                        if (upward) handleNumbers.reverse();
                        if (handleNumbers.length > 1) handleNumbers.forEach((function(handleNumber, o) {
                            var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false, smoothSteps);
                            if (false === to) proposal = 0; else {
                                proposal = to - proposals[handleNumber];
                                proposals[handleNumber] = to;
                            }
                        })); else b = f = [ true ];
                        var state = false;
                        handleNumbers.forEach((function(handleNumber, o) {
                            state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o], false, smoothSteps) || state;
                        }));
                        if (state) {
                            handleNumbers.forEach((function(handleNumber) {
                                fireEvent("update", handleNumber);
                                fireEvent("slide", handleNumber);
                            }));
                            if (void 0 != connect) fireEvent("drag", firstHandle);
                        }
                    }
                    function transformDirection(a, b) {
                        return options.dir ? 100 - a - b : a;
                    }
                    function updateHandlePosition(handleNumber, to) {
                        scope_Locations[handleNumber] = to;
                        scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
                        var translation = transformDirection(to, 0) - scope_DirOffset;
                        var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
                        scope_Handles[handleNumber].style[options.transformRule] = translateRule;
                        updateConnect(handleNumber);
                        updateConnect(handleNumber + 1);
                    }
                    function setZindex() {
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                            var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                            scope_Handles[handleNumber].style.zIndex = String(zIndex);
                        }));
                    }
                    function setHandle(handleNumber, to, lookBackward, lookForward, exactInput, smoothSteps) {
                        if (!exactInput) to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false, smoothSteps);
                        if (false === to) return false;
                        updateHandlePosition(handleNumber, to);
                        return true;
                    }
                    function updateConnect(index) {
                        if (!scope_Connects[index]) return;
                        var l = 0;
                        var h = 100;
                        if (0 !== index) l = scope_Locations[index - 1];
                        if (index !== scope_Connects.length - 1) h = scope_Locations[index];
                        var connectWidth = h - l;
                        var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
                        var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
                        scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
                    }
                    function resolveToValue(to, handleNumber) {
                        if (null === to || false === to || void 0 === to) return scope_Locations[handleNumber];
                        if ("number" === typeof to) to = String(to);
                        to = options.format.from(to);
                        if (false !== to) to = scope_Spectrum.toStepping(to);
                        if (false === to || isNaN(to)) return scope_Locations[handleNumber];
                        return to;
                    }
                    function valueSet(input, fireSetEvent, exactInput) {
                        var values = asArray(input);
                        var isInit = void 0 === scope_Locations[0];
                        fireSetEvent = void 0 === fireSetEvent ? true : fireSetEvent;
                        if (options.animate && !isInit) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
                        }));
                        var i = 1 === scope_HandleNumbers.length ? 0 : 1;
                        if (isInit && scope_Spectrum.hasNoSize()) {
                            exactInput = true;
                            scope_Locations[0] = 0;
                            if (scope_HandleNumbers.length > 1) {
                                var space_1 = 100 / (scope_HandleNumbers.length - 1);
                                scope_HandleNumbers.forEach((function(handleNumber) {
                                    scope_Locations[handleNumber] = handleNumber * space_1;
                                }));
                            }
                        }
                        for (;i < scope_HandleNumbers.length; ++i) scope_HandleNumbers.forEach((function(handleNumber) {
                            setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
                        }));
                        setZindex();
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            fireEvent("update", handleNumber);
                            if (null !== values[handleNumber] && fireSetEvent) fireEvent("set", handleNumber);
                        }));
                    }
                    function valueReset(fireSetEvent) {
                        valueSet(options.start, fireSetEvent);
                    }
                    function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
                        handleNumber = Number(handleNumber);
                        if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
                        setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
                        fireEvent("update", handleNumber);
                        if (fireSetEvent) fireEvent("set", handleNumber);
                    }
                    function valueGet(unencoded) {
                        if (void 0 === unencoded) unencoded = false;
                        if (unencoded) return 1 === scope_Values.length ? scope_Values[0] : scope_Values.slice(0);
                        var values = scope_Values.map(options.format.to);
                        if (1 === values.length) return values[0];
                        return values;
                    }
                    function destroy() {
                        removeEvent(INTERNAL_EVENT_NS.aria);
                        removeEvent(INTERNAL_EVENT_NS.tooltips);
                        Object.keys(options.cssClasses).forEach((function(key) {
                            removeClass(scope_Target, options.cssClasses[key]);
                        }));
                        while (scope_Target.firstChild) scope_Target.removeChild(scope_Target.firstChild);
                        delete scope_Target.noUiSlider;
                    }
                    function getNextStepsForHandle(handleNumber) {
                        var location = scope_Locations[handleNumber];
                        var nearbySteps = scope_Spectrum.getNearbySteps(location);
                        var value = scope_Values[handleNumber];
                        var increment = nearbySteps.thisStep.step;
                        var decrement = null;
                        if (options.snap) return [ value - nearbySteps.stepBefore.startValue || null, nearbySteps.stepAfter.startValue - value || null ];
                        if (false !== increment) if (value + increment > nearbySteps.stepAfter.startValue) increment = nearbySteps.stepAfter.startValue - value;
                        if (value > nearbySteps.thisStep.startValue) decrement = nearbySteps.thisStep.step; else if (false === nearbySteps.stepBefore.step) decrement = false; else decrement = value - nearbySteps.stepBefore.highestStep;
                        if (100 === location) increment = null; else if (0 === location) decrement = null;
                        var stepDecimals = scope_Spectrum.countStepDecimals();
                        if (null !== increment && false !== increment) increment = Number(increment.toFixed(stepDecimals));
                        if (null !== decrement && false !== decrement) decrement = Number(decrement.toFixed(stepDecimals));
                        return [ decrement, increment ];
                    }
                    function getNextSteps() {
                        return scope_HandleNumbers.map(getNextStepsForHandle);
                    }
                    function updateOptions(optionsToUpdate, fireSetEvent) {
                        var v = valueGet();
                        var updateAble = [ "margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips" ];
                        updateAble.forEach((function(name) {
                            if (void 0 !== optionsToUpdate[name]) originalOptions[name] = optionsToUpdate[name];
                        }));
                        var newOptions = testOptions(originalOptions);
                        updateAble.forEach((function(name) {
                            if (void 0 !== optionsToUpdate[name]) options[name] = newOptions[name];
                        }));
                        scope_Spectrum = newOptions.spectrum;
                        options.margin = newOptions.margin;
                        options.limit = newOptions.limit;
                        options.padding = newOptions.padding;
                        if (options.pips) pips(options.pips); else removePips();
                        if (options.tooltips) tooltips(); else removeTooltips();
                        scope_Locations = [];
                        valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
                    }
                    function setupSlider() {
                        scope_Base = addSlider(scope_Target);
                        addElements(options.connect, scope_Base);
                        bindSliderEvents(options.events);
                        valueSet(options.start);
                        if (options.pips) pips(options.pips);
                        if (options.tooltips) tooltips();
                        aria();
                    }
                    setupSlider();
                    var scope_Self = {
                        destroy,
                        steps: getNextSteps,
                        on: bindEvent,
                        off: removeEvent,
                        get: valueGet,
                        set: valueSet,
                        setHandle: valueSetHandle,
                        reset: valueReset,
                        __moveHandles: function(upward, proposal, handleNumbers) {
                            moveHandles(upward, proposal, scope_Locations, handleNumbers);
                        },
                        options: originalOptions,
                        updateOptions,
                        target: scope_Target,
                        removePips,
                        removeTooltips,
                        getPositions: function() {
                            return scope_Locations.slice();
                        },
                        getTooltips: function() {
                            return scope_Tooltips;
                        },
                        getOrigins: function() {
                            return scope_Handles;
                        },
                        pips
                    };
                    return scope_Self;
                }
                function initialize(target, originalOptions) {
                    if (!target || !target.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + target);
                    if (target.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
                    var options = testOptions(originalOptions);
                    var api = scope(target, options, originalOptions);
                    target.noUiSlider = api;
                    return api;
                }
                var nouislider = {
                    __spectrum: Spectrum,
                    cssClasses,
                    create: initialize
                };
                exports.create = initialize;
                exports.cssClasses = cssClasses;
                exports["default"] = nouislider;
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        function functions_getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        function setHash(hash) {
            hash = hash ? `#${hash}` : window.location.href.split("#")[0];
            history.pushState("", "", hash);
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function spollers() {
            const spollersArray = document.querySelectorAll("[data-spollers]");
            if (spollersArray.length > 0) {
                const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                    return !item.dataset.spollers.split(",")[0];
                }));
                if (spollersRegular.length) initSpollers(spollersRegular);
                let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                function initSpollers(spollersArray, matchMedia = false) {
                    spollersArray.forEach((spollersBlock => {
                        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                        if (matchMedia.matches || !matchMedia) {
                            spollersBlock.classList.add("_spoller-init");
                            initSpollerBody(spollersBlock);
                            spollersBlock.addEventListener("click", setSpollerAction);
                        } else {
                            spollersBlock.classList.remove("_spoller-init");
                            initSpollerBody(spollersBlock, false);
                            spollersBlock.removeEventListener("click", setSpollerAction);
                        }
                    }));
                }
                function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                    let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                    if (spollerTitles.length) {
                        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                        spollerTitles.forEach((spollerTitle => {
                            if (hideSpollerBody) {
                                spollerTitle.removeAttribute("tabindex");
                                if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                            } else {
                                spollerTitle.setAttribute("tabindex", "-1");
                                spollerTitle.nextElementSibling.hidden = false;
                            }
                        }));
                    }
                }
                function setSpollerAction(e) {
                    const el = e.target;
                    if (el.closest("[data-spoller]")) {
                        const spollerTitle = el.closest("[data-spoller]");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                        }
                        e.preventDefault();
                    }
                }
                function hideSpollersBody(spollersBlock) {
                    const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                        spollerActiveTitle.classList.remove("_spoller-active");
                        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    }
                }
                const spollersClose = document.querySelectorAll("[data-spoller-close]");
                if (spollersClose.length) document.addEventListener("click", (function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        if (spollersBlock.classList.contains("_spoller-init")) {
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                        }
                    }));
                }));
            }
        }
        function tabs() {
            const tabs = document.querySelectorAll("[data-tabs]");
            let tabsActiveHash = [];
            if (tabs.length > 0) {
                const hash = functions_getHash();
                if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
                tabs.forEach(((tabsBlock, index) => {
                    tabsBlock.classList.add("_tab-init");
                    tabsBlock.setAttribute("data-tabs-index", index);
                    tabsBlock.addEventListener("click", setTabsAction);
                    initTabs(tabsBlock);
                }));
                let mdQueriesArray = dataMediaQueries(tabs, "tabs");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
            }
            function setTitlePosition(tabsMediaArray, matchMedia) {
                tabsMediaArray.forEach((tabsMediaItem => {
                    tabsMediaItem = tabsMediaItem.item;
                    let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                    let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                    let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                    let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                    tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems.forEach(((tabsContentItem, index) => {
                        if (matchMedia.matches) {
                            tabsContent.append(tabsTitleItems[index]);
                            tabsContent.append(tabsContentItem);
                            tabsMediaItem.classList.add("_tab-spoller");
                        } else {
                            tabsTitles.append(tabsTitleItems[index]);
                            tabsMediaItem.classList.remove("_tab-spoller");
                        }
                    }));
                }));
            }
            function initTabs(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
                if (tabsActiveHashBlock) {
                    const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                    tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
                }
                if (tabsContent.length) {
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        tabsTitles[index].setAttribute("data-tabs-title", "");
                        tabsContentItem.setAttribute("data-tabs-item", "");
                        if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                        tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                    }));
                }
            }
            function setTabsStatus(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                function isTabsAnamate(tabsBlock) {
                    if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
                }
                const tabsBlockAnimate = isTabsAnamate(tabsBlock);
                if (tabsContent.length > 0) {
                    const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        if (tabsTitles[index].classList.contains("_tab-active")) {
                            if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                            if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                        } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                    }));
                }
            }
            function setTabsAction(e) {
                const el = e.target;
                if (el.closest("[data-tabs-title]")) {
                    const tabTitle = el.closest("[data-tabs-title]");
                    const tabsBlock = tabTitle.closest("[data-tabs]");
                    if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                        let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                        tabTitle.classList.add("_tab-active");
                        setTabsStatus(tabsBlock);
                    }
                    e.preventDefault();
                }
            }
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        var nouislider = __webpack_require__(211);
        function rangeInit() {
            const rangeItems = document.querySelectorAll("[data-range]");
            if (rangeItems.length) rangeItems.forEach((rangeItem => {
                const fromValue = rangeItem.querySelector("[data-range-from]");
                const toValue = rangeItem.querySelector("[data-range-to]");
                const item = rangeItem.querySelector("[data-range-item]");
                nouislider.create(item, {
                    start: [ Number(fromValue.value), Number(toValue.value) ],
                    connect: true,
                    tooltips: [ true, true ],
                    range: {
                        min: [ Number(fromValue.dataset.rangeFrom) ],
                        max: [ Number(toValue.dataset.rangeTo) ]
                    }
                });
                item.noUiSlider.on("update", (function(values, handle) {
                    fromValue.value = values[0];
                    toValue.value = values[1];
                }));
            }));
        }
        rangeInit();
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        $((function() {
            $(".banner-section__slider").slick({
                dots: true,
                prevArrow: '<button class="banner-section__slider-btn banner-section__slider-btnprev"><img src="img/icons/arrow-left.svg" alt=""></button>',
                nextArrow: '<button class="banner-section__slider-btn banner-section__slider-btnnext"><img src="img/icons/arrow-right.svg" alt=""></button>'
            });
            $(".product-slider").slick({
                infinite: true,
                autoplay: true,
                autoplaySpeed: 1500,
                slidesToShow: 4,
                slidesToscroll: 1,
                prevArrow: '<button class="product-slider__slider-btn product-slider__slider-btnprev"><img src="img/icons/arrow-black-left.svg" alt=""></button>',
                nextArrow: '<button class="product-slider__slider-btn product-slider__slider-btnnext"><img src="img/icons/arrow-black-right.svg" alt=""></button>'
            });
        }));
        !function(i) {
            "use strict";
            "function" == typeof define && define.amd ? define([ "jquery" ], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery);
        }((function(i) {
            "use strict";
            var e = window.Slick || {};
            (e = function() {
                var e = 0;
                return function(t, o) {
                    var s, n = this;
                    n.defaults = {
                        accessibility: !0,
                        adaptiveHeight: !1,
                        appendArrows: i(t),
                        appendDots: i(t),
                        arrows: !0,
                        asNavFor: null,
                        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        centerMode: !1,
                        centerPadding: "50px",
                        cssEase: "ease",
                        customPaging: function(e, t) {
                            return i('<button type="button" />').text(t + 1);
                        },
                        dots: !1,
                        dotsClass: "slick-dots",
                        draggable: !0,
                        easing: "linear",
                        edgeFriction: .35,
                        fade: !1,
                        focusOnSelect: !1,
                        focusOnChange: !1,
                        infinite: !0,
                        initialSlide: 0,
                        lazyLoad: "ondemand",
                        mobileFirst: !1,
                        pauseOnHover: !0,
                        pauseOnFocus: !0,
                        pauseOnDotsHover: !1,
                        respondTo: "window",
                        responsive: null,
                        rows: 1,
                        rtl: !1,
                        slide: "",
                        slidesPerRow: 1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        swipe: !0,
                        swipeToSlide: !1,
                        touchMove: !0,
                        touchThreshold: 5,
                        useCSS: !0,
                        useTransform: !0,
                        variableWidth: !1,
                        vertical: !1,
                        verticalSwiping: !1,
                        waitForAnimate: !0,
                        zIndex: 1e3
                    }, n.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        scrolling: !1,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        swiping: !1,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1
                    }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, 
                    n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, 
                    n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, 
                    n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, 
                    n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, 
                    n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), 
                    n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", 
                    n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", 
                    n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), 
                    n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), 
                    n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), 
                    n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), 
                    n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), 
                    n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, 
                    n.registerBreakpoints(), n.init(!0);
                };
            }()).prototype.activateADA = function() {
                this.$slideTrack.find(".slick-active").attr({
                    "aria-hidden": "false"
                }).find("a, input, button, select").attr({
                    tabindex: "0"
                });
            }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
                var s = this;
                if ("boolean" == typeof t) o = t, t = null; else if (t < 0 || t >= s.slideCount) return !1;
                s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), 
                s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), 
                s.$slideTrack.append(s.$slides), s.$slides.each((function(e, t) {
                    i(t).attr("data-slick-index", e);
                })), s.$slidesCache = s.$slides, s.reinit();
            }, e.prototype.animateHeight = function() {
                var i = this;
                if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                    var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                    i.$list.animate({
                        height: e
                    }, i.options.speed);
                }
            }, e.prototype.animateSlide = function(e, t) {
                var o = {}, s = this;
                s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), 
                !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
                    left: e
                }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
                    top: e
                }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), 
                i({
                    animStart: s.currentLeft
                }).animate({
                    animStart: e
                }, {
                    duration: s.options.speed,
                    easing: s.options.easing,
                    step: function(i) {
                        i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", 
                        s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o));
                    },
                    complete: function() {
                        t && t.call();
                    }
                })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", 
                s.$slideTrack.css(o), t && setTimeout((function() {
                    s.disableTransition(), t.call();
                }), s.options.speed));
            }, e.prototype.getNavTarget = function() {
                var e = this, t = e.options.asNavFor;
                return t && null !== t && (t = i(t).not(e.$slider)), t;
            }, e.prototype.asNavFor = function(e) {
                var t = this.getNavTarget();
                null !== t && "object" == typeof t && t.each((function() {
                    var t = i(this).slick("getSlick");
                    t.unslicked || t.slideHandler(e, !0);
                }));
            }, e.prototype.applyTransition = function(i) {
                var e = this, t = {};
                !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, 
                !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
            }, e.prototype.autoPlay = function() {
                var i = this;
                i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
            }, e.prototype.autoPlayClear = function() {
                var i = this;
                i.autoPlayTimer && clearInterval(i.autoPlayTimer);
            }, e.prototype.autoPlayIterator = function() {
                var i = this, e = i.currentSlide + i.options.slidesToScroll;
                i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, 
                i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e));
            }, e.prototype.buildArrows = function() {
                var e = this;
                !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), 
                e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), 
                e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), 
                e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), 
                !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                    "aria-disabled": "true",
                    tabindex: "-1"
                }));
            }, e.prototype.buildDots = function() {
                var e, t, o = this;
                if (!0 === o.options.dots) {
                    for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), 
                    e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                    o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active");
                }
            }, e.prototype.buildOut = function() {
                var e = this;
                e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), 
                e.slideCount = e.$slides.length, e.$slides.each((function(e, t) {
                    i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "");
                })), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), 
                e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), 
                !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), 
                i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), 
                e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), 
                !0 === e.options.draggable && e.$list.addClass("draggable");
            }, e.prototype.buildRows = function() {
                var i, e, t, o, s, n, r, l = this;
                if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
                    for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                        var d = document.createElement("div");
                        for (e = 0; e < l.options.rows; e++) {
                            var a = document.createElement("div");
                            for (t = 0; t < l.options.slidesPerRow; t++) {
                                var c = i * r + (e * l.options.slidesPerRow + t);
                                n.get(c) && a.appendChild(n.get(c));
                            }
                            d.appendChild(a);
                        }
                        o.appendChild(d);
                    }
                    l.$slider.empty().append(o), l.$slider.children().children().children().css({
                        width: 100 / l.options.slidesPerRow + "%",
                        display: "inline-block"
                    });
                }
            }, e.prototype.checkResponsive = function(e, t) {
                var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width();
                if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), 
                r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                    s = null;
                    for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                    null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, 
                    "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), 
                    !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, 
                    "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), 
                    !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, 
                    r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), 
                    r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [ r, l ]);
                }
            }, e.prototype.changeSlide = function(e, t) {
                var o, s, n, r = this, l = i(e.currentTarget);
                switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, 
                o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
                  case "previous":
                    s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                    break;

                  case "next":
                    s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                    break;

                  case "index":
                    var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                    break;

                  default:
                    return;
                }
            }, e.prototype.checkNavigable = function(i) {
                var e, t;
                if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1]; else for (var o in e) {
                    if (i < e[o]) {
                        i = t;
                        break;
                    }
                    t = e[o];
                }
                return i;
            }, e.prototype.cleanUpEvents = function() {
                var e = this;
                e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), 
                !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), 
                !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), 
                e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), 
                e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), 
                e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), 
                e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), 
                i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), 
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), 
                i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), 
                i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), 
                i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
            }, e.prototype.cleanUpSlideEvents = function() {
                var e = this;
                e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
            }, e.prototype.cleanUpRows = function() {
                var i, e = this;
                e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), 
                e.$slider.empty().append(i));
            }, e.prototype.clickHandler = function(i) {
                !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
            }, e.prototype.destroy = function(e) {
                var t = this;
                t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), 
                t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), 
                t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), 
                t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each((function() {
                    i(this).attr("style", i(this).data("originalStyling"));
                })), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), 
                t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), 
                t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), 
                t.unslicked = !0, e || t.$slider.trigger("destroy", [ t ]);
            }, e.prototype.disableTransition = function(i) {
                var e = this, t = {};
                t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
            }, e.prototype.fadeSlide = function(i, e) {
                var t = this;
                !1 === t.cssTransitions ? (t.$slides.eq(i).css({
                    zIndex: t.options.zIndex
                }), t.$slides.eq(i).animate({
                    opacity: 1
                }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
                    opacity: 1,
                    zIndex: t.options.zIndex
                }), e && setTimeout((function() {
                    t.disableTransition(i), e.call();
                }), t.options.speed));
            }, e.prototype.fadeSlideOut = function(i) {
                var e = this;
                !1 === e.cssTransitions ? e.$slides.eq(i).animate({
                    opacity: 0,
                    zIndex: e.options.zIndex - 2
                }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
                    opacity: 0,
                    zIndex: e.options.zIndex - 2
                }));
            }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
                var e = this;
                null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), 
                e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
            }, e.prototype.focusHandler = function() {
                var e = this;
                e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", (function(t) {
                    t.stopImmediatePropagation();
                    var o = i(this);
                    setTimeout((function() {
                        e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay());
                    }), 0);
                }));
            }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
                return this.currentSlide;
            }, e.prototype.getDotCount = function() {
                var i = this, e = 0, t = 0, o = 0;
                if (!0 === i.options.infinite) if (i.slideCount <= i.options.slidesToShow) ++o; else for (;e < i.slideCount; ) ++o, 
                e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else if (!0 === i.options.centerMode) o = i.slideCount; else if (i.options.asNavFor) for (;e < i.slideCount; ) ++o, 
                e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
                return o - 1;
            }, e.prototype.getLeft = function(i) {
                var e, t, o, s, n = this, r = 0;
                return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, 
                s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), 
                r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, 
                r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, 
                r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, 
                r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, 
                r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, 
                n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, 
                !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), 
                e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, 
                !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), 
                e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, 
                e += (n.$list.width() - o.outerWidth()) / 2)), e;
            }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
                return this.options[i];
            }, e.prototype.getNavigableIndexes = function() {
                var i, e = this, t = 0, o = 0, s = [];
                for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, 
                o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i; ) s.push(t), t = o + e.options.slidesToScroll, 
                o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
                return s;
            }, e.prototype.getSlick = function() {
                return this;
            }, e.prototype.getSlideCount = function() {
                var e, t, o = this;
                return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, 
                !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each((function(s, n) {
                    if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1;
                })), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll;
            }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
                this.changeSlide({
                    data: {
                        message: "index",
                        index: parseInt(i)
                    }
                }, e);
            }, e.prototype.init = function(e) {
                var t = this;
                i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), 
                t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), 
                t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [ t ]), 
                !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, 
                t.autoPlay());
            }, e.prototype.initADA = function() {
                var e = this, t = Math.ceil(e.slideCount / e.options.slidesToShow), o = e.getNavigableIndexes().filter((function(i) {
                    return i >= 0 && i < e.slideCount;
                }));
                e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                    "aria-hidden": "true",
                    tabindex: "-1"
                }).find("a, input, button, select").attr({
                    tabindex: "-1"
                }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each((function(t) {
                    var s = o.indexOf(t);
                    i(this).attr({
                        role: "tabpanel",
                        id: "slick-slide" + e.instanceUid + t,
                        tabindex: -1
                    }), -1 !== s && i(this).attr({
                        "aria-describedby": "slick-slide-control" + e.instanceUid + s
                    });
                })), e.$dots.attr("role", "tablist").find("li").each((function(s) {
                    var n = o[s];
                    i(this).attr({
                        role: "presentation"
                    }), i(this).find("button").first().attr({
                        role: "tab",
                        id: "slick-slide-control" + e.instanceUid + s,
                        "aria-controls": "slick-slide" + e.instanceUid + n,
                        "aria-label": s + 1 + " of " + t,
                        "aria-selected": null,
                        tabindex: "-1"
                    });
                })).eq(e.currentSlide).find("button").attr({
                    "aria-selected": "true",
                    tabindex: "0"
                }).end());
                for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
                e.activateADA();
            }, e.prototype.initArrowEvents = function() {
                var i = this;
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
                    message: "previous"
                }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
                    message: "next"
                }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), 
                i.$nextArrow.on("keydown.slick", i.keyHandler)));
            }, e.prototype.initDotEvents = function() {
                var e = this;
                !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
                    message: "index"
                }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), 
                !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
            }, e.prototype.initSlideEvents = function() {
                var e = this;
                e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), 
                e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
            }, e.prototype.initializeEvents = function() {
                var e = this;
                e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                    action: "start"
                }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                    action: "move"
                }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                    action: "end"
                }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                    action: "end"
                }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), 
                !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), 
                i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), 
                i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), 
                i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition);
            }, e.prototype.initUI = function() {
                var i = this;
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), 
                i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show();
            }, e.prototype.keyHandler = function(i) {
                var e = this;
                i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                    data: {
                        message: !0 === e.options.rtl ? "next" : "previous"
                    }
                }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
                    data: {
                        message: !0 === e.options.rtl ? "previous" : "next"
                    }
                }));
            }, e.prototype.lazyLoad = function() {
                function e(e) {
                    i("img[data-lazy]", e).each((function() {
                        var e = i(this), t = i(this).attr("data-lazy"), o = i(this).attr("data-srcset"), s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"), r = document.createElement("img");
                        r.onload = function() {
                            e.animate({
                                opacity: 0
                            }, 100, (function() {
                                o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                                    opacity: 1
                                }, 200, (function() {
                                    e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                                })), n.$slider.trigger("lazyLoaded", [ n, e, t ]);
                            }));
                        }, r.onerror = function() {
                            e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), 
                            n.$slider.trigger("lazyLoadError", [ n, e, t ]);
                        }, r.src = t;
                    }));
                }
                var t, o, s, n = this;
                if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), 
                s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, 
                s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, 
                s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad) for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), 
                t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
                e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
            }, e.prototype.loadSlider = function() {
                var i = this;
                i.setPosition(), i.$slideTrack.css({
                    opacity: 1
                }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
            }, e.prototype.next = e.prototype.slickNext = function() {
                this.changeSlide({
                    data: {
                        message: "next"
                    }
                });
            }, e.prototype.orientationChange = function() {
                var i = this;
                i.checkResponsive(), i.setPosition();
            }, e.prototype.pause = e.prototype.slickPause = function() {
                var i = this;
                i.autoPlayClear(), i.paused = !0;
            }, e.prototype.play = e.prototype.slickPlay = function() {
                var i = this;
                i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1;
            }, e.prototype.postSlide = function(e) {
                var t = this;
                t.unslicked || (t.$slider.trigger("afterChange", [ t, e ]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), 
                t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), 
                t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
            }, e.prototype.prev = e.prototype.slickPrev = function() {
                this.changeSlide({
                    data: {
                        message: "previous"
                    }
                });
            }, e.prototype.preventDefault = function(i) {
                i.preventDefault();
            }, e.prototype.progressiveLazyLoad = function(e) {
                e = e || 1;
                var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider);
                d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), 
                (r = document.createElement("img")).onload = function() {
                    s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), 
                    !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [ l, t, o ]), 
                    l.progressiveLazyLoad();
                }, r.onerror = function() {
                    e < 3 ? setTimeout((function() {
                        l.progressiveLazyLoad(e + 1);
                    }), 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), 
                    l.$slider.trigger("lazyLoadError", [ l, t, o ]), l.progressiveLazyLoad());
                }, r.src = o) : l.$slider.trigger("allImagesLoaded", [ l ]);
            }, e.prototype.refresh = function(e) {
                var t, o, s = this;
                o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), 
                s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, 
                s.destroy(!0), i.extend(s, s.initials, {
                    currentSlide: t
                }), s.init(), e || s.changeSlide({
                    data: {
                        message: "index",
                        index: t
                    }
                }, !1);
            }, e.prototype.registerBreakpoints = function() {
                var e, t, o, s = this, n = s.options.responsive || null;
                if ("array" === i.type(n) && n.length) {
                    s.respondTo = s.options.respondTo || "window";
                    for (e in n) if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                        for (t = n[e].breakpoint; o >= 0; ) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), 
                        o--;
                        s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings;
                    }
                    s.breakpoints.sort((function(i, e) {
                        return s.options.mobileFirst ? i - e : e - i;
                    }));
                }
            }, e.prototype.reinit = function() {
                var e = this;
                e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, 
                e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), 
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), 
                e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), 
                e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), 
                e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), 
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), 
                e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [ e ]);
            }, e.prototype.resize = function() {
                var e = this;
                i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout((function() {
                    e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition();
                }), 50));
            }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
                var o = this;
                if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, 
                o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
                o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), 
                o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), 
                o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit();
            }, e.prototype.setCSS = function(i) {
                var e, t, o = this, s = {};
                !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", 
                t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, 
                !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", 
                o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", 
                o.$slideTrack.css(s)));
            }, e.prototype.setDimensions = function() {
                var i = this;
                !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
                    padding: "0px " + i.options.centerPadding
                }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), 
                !0 === i.options.centerMode && i.$list.css({
                    padding: i.options.centerPadding + " 0px"
                })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), 
                i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), 
                i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
                var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
                !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
            }, e.prototype.setFade = function() {
                var e, t = this;
                t.$slides.each((function(o, s) {
                    e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                        position: "relative",
                        right: e,
                        top: 0,
                        zIndex: t.options.zIndex - 2,
                        opacity: 0
                    }) : i(s).css({
                        position: "relative",
                        left: e,
                        top: 0,
                        zIndex: t.options.zIndex - 2,
                        opacity: 0
                    });
                })), t.$slides.eq(t.currentSlide).css({
                    zIndex: t.options.zIndex - 1,
                    opacity: 1
                });
            }, e.prototype.setHeight = function() {
                var i = this;
                if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                    var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                    i.$list.css("height", e);
                }
            }, e.prototype.setOption = e.prototype.slickSetOption = function() {
                var e, t, o, s, n, r = this, l = !1;
                if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], 
                s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), 
                "single" === n) r.options[o] = s; else if ("multiple" === n) i.each(o, (function(i, e) {
                    r.options[i] = e;
                })); else if ("responsive" === n) for (t in s) if ("array" !== i.type(r.options.responsive)) r.options.responsive = [ s[t] ]; else {
                    for (e = r.options.responsive.length - 1; e >= 0; ) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), 
                    e--;
                    r.options.responsive.push(s[t]);
                }
                l && (r.unload(), r.reinit());
            }, e.prototype.setPosition = function() {
                var i = this;
                i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), 
                i.$slider.trigger("setPosition", [ i ]);
            }, e.prototype.setProps = function() {
                var i = this, e = document.body.style;
                i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), 
                void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), 
                i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), 
                void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", 
                i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), 
                void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", 
                i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), 
                void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", 
                i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), 
                void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", 
                i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), 
                void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", 
                i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType;
            }, e.prototype.setSlideClasses = function(i) {
                var e, t, o, s, n = this;
                if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), 
                n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
                    var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                    e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, 
                    t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 
                    0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), 
                    n.$slides.eq(i).addClass("slick-center");
                } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, 
                o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
                "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad();
            }, e.prototype.setupInfinite = function() {
                var e, t, o, s = this;
                if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, 
                s.slideCount > s.options.slidesToShow)) {
                    for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, 
                    e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                    for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                    s.$slideTrack.find(".slick-cloned").find("[id]").each((function() {
                        i(this).attr("id", "");
                    }));
                }
            }, e.prototype.interrupt = function(i) {
                var e = this;
                i || e.autoPlay(), e.interrupted = i;
            }, e.prototype.selectHandler = function(e) {
                var t = this, o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"), s = parseInt(o.attr("data-slick-index"));
                s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s);
            }, e.prototype.slideHandler = function(i, e, t) {
                var o, s, n, r, l, d = null, a = this;
                if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i)) if (!1 === e && a.asNavFor(i), 
                o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, 
                !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, 
                !0 !== t ? a.animateSlide(r, (function() {
                    a.postSlide(o);
                })) : a.postSlide(o)); else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, 
                !0 !== t ? a.animateSlide(r, (function() {
                    a.postSlide(o);
                })) : a.postSlide(o)); else {
                    if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, 
                    a.animating = !0, a.$slider.trigger("beforeChange", [ a, a.currentSlide, s ]), n = a.currentSlide, 
                    a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), 
                    a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), 
                    a.fadeSlide(s, (function() {
                        a.postSlide(s);
                    }))) : a.postSlide(s), void a.animateHeight();
                    !0 !== t ? a.animateSlide(d, (function() {
                        a.postSlide(s);
                    })) : a.postSlide(s);
                }
            }, e.prototype.startLoad = function() {
                var i = this;
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), 
                i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), 
                i.$slider.addClass("slick-loading");
            }, e.prototype.swipeDirection = function() {
                var i, e, t, o, s = this;
                return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, 
                t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), 
                o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical";
            }, e.prototype.swipeEnd = function(i) {
                var e, t, o = this;
                if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
                if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
                if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [ o, o.swipeDirection() ]), 
                o.touchObject.swipeLength >= o.touchObject.minSwipe) {
                    switch (t = o.swipeDirection()) {
                      case "left":
                      case "down":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), 
                        o.currentDirection = 0;
                        break;

                      case "right":
                      case "up":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), 
                        o.currentDirection = 1;
                    }
                    "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [ o, t ]));
                } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), 
                o.touchObject = {});
            }, e.prototype.swipeHandler = function(i) {
                var e = this;
                if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, 
                e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), 
                i.data.action) {
                  case "start":
                    e.swipeStart(i);
                    break;

                  case "move":
                    e.swipeMove(i);
                    break;

                  case "end":
                    e.swipeEnd(i);
                }
            }, e.prototype.swipeMove = function(i) {
                var e, t, o, s, n, r, l = this;
                return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), 
                l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, 
                l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), 
                r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), 
                !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), 
                t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, 
                i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), 
                !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), 
                o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, 
                l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, 
                !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, 
                !1) : void l.setCSS(l.swipeLeft))));
            }, e.prototype.swipeStart = function(i) {
                var e, t = this;
                if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, 
                !1;
                void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), 
                t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, 
                t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, 
                t.dragging = !0;
            }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
                var i = this;
                null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), 
                i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
            }, e.prototype.unload = function() {
                var e = this;
                i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), 
                e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
            }, e.prototype.unslick = function(i) {
                var e = this;
                e.$slider.trigger("unslick", [ e, i ]), e.destroy();
            }, e.prototype.updateArrows = function() {
                var i = this;
                Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 
                i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
                i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
                i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
                i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
            }, e.prototype.updateDots = function() {
                var i = this;
                null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"));
            }, e.prototype.visibility = function() {
                var i = this;
                i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1);
            }, i.fn.slick = function() {
                var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length;
                for (i = 0; i < r; i++) if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), 
                void 0 !== t) return t;
                return o;
            };
        }));
        window["FLS"] = true;
        isWebp();
        spollers();
        tabs();
        require("jsdom").env("", (function(err, window) {
            if (err) {
                console.error(err);
                return;
            }
            require("jquery")(window);
        }));
        !function(i) {
            "use strict";
            "function" == typeof define && define.amd ? define([ "jquery" ], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery);
        }((function(i) {
            "use strict";
            var e = window.Slick || {};
            (e = function() {
                var e = 0;
                return function(t, o) {
                    var s, n = this;
                    n.defaults = {
                        accessibility: !0,
                        adaptiveHeight: !1,
                        appendArrows: i(t),
                        appendDots: i(t),
                        arrows: !0,
                        asNavFor: null,
                        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        centerMode: !1,
                        centerPadding: "50px",
                        cssEase: "ease",
                        customPaging: function(e, t) {
                            return i('<button type="button" />').text(t + 1);
                        },
                        dots: !1,
                        dotsClass: "slick-dots",
                        draggable: !0,
                        easing: "linear",
                        edgeFriction: .35,
                        fade: !1,
                        focusOnSelect: !1,
                        focusOnChange: !1,
                        infinite: !0,
                        initialSlide: 0,
                        lazyLoad: "ondemand",
                        mobileFirst: !1,
                        pauseOnHover: !0,
                        pauseOnFocus: !0,
                        pauseOnDotsHover: !1,
                        respondTo: "window",
                        responsive: null,
                        rows: 1,
                        rtl: !1,
                        slide: "",
                        slidesPerRow: 1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        swipe: !0,
                        swipeToSlide: !1,
                        touchMove: !0,
                        touchThreshold: 5,
                        useCSS: !0,
                        useTransform: !0,
                        variableWidth: !1,
                        vertical: !1,
                        verticalSwiping: !1,
                        waitForAnimate: !0,
                        zIndex: 1e3
                    }, n.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        scrolling: !1,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        swiping: !1,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1
                    }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, 
                    n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, 
                    n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, 
                    n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, 
                    n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, 
                    n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), 
                    n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", 
                    n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", 
                    n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), 
                    n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), 
                    n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), 
                    n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), 
                    n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), 
                    n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, 
                    n.registerBreakpoints(), n.init(!0);
                };
            }()).prototype.activateADA = function() {
                this.$slideTrack.find(".slick-active").attr({
                    "aria-hidden": "false"
                }).find("a, input, button, select").attr({
                    tabindex: "0"
                });
            }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
                var s = this;
                if ("boolean" == typeof t) o = t, t = null; else if (t < 0 || t >= s.slideCount) return !1;
                s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), 
                s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), 
                s.$slideTrack.append(s.$slides), s.$slides.each((function(e, t) {
                    i(t).attr("data-slick-index", e);
                })), s.$slidesCache = s.$slides, s.reinit();
            }, e.prototype.animateHeight = function() {
                var i = this;
                if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                    var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                    i.$list.animate({
                        height: e
                    }, i.options.speed);
                }
            }, e.prototype.animateSlide = function(e, t) {
                var o = {}, s = this;
                s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), 
                !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
                    left: e
                }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
                    top: e
                }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), 
                i({
                    animStart: s.currentLeft
                }).animate({
                    animStart: e
                }, {
                    duration: s.options.speed,
                    easing: s.options.easing,
                    step: function(i) {
                        i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", 
                        s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o));
                    },
                    complete: function() {
                        t && t.call();
                    }
                })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", 
                s.$slideTrack.css(o), t && setTimeout((function() {
                    s.disableTransition(), t.call();
                }), s.options.speed));
            }, e.prototype.getNavTarget = function() {
                var e = this, t = e.options.asNavFor;
                return t && null !== t && (t = i(t).not(e.$slider)), t;
            }, e.prototype.asNavFor = function(e) {
                var t = this.getNavTarget();
                null !== t && "object" == typeof t && t.each((function() {
                    var t = i(this).slick("getSlick");
                    t.unslicked || t.slideHandler(e, !0);
                }));
            }, e.prototype.applyTransition = function(i) {
                var e = this, t = {};
                !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, 
                !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
            }, e.prototype.autoPlay = function() {
                var i = this;
                i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
            }, e.prototype.autoPlayClear = function() {
                var i = this;
                i.autoPlayTimer && clearInterval(i.autoPlayTimer);
            }, e.prototype.autoPlayIterator = function() {
                var i = this, e = i.currentSlide + i.options.slidesToScroll;
                i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, 
                i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e));
            }, e.prototype.buildArrows = function() {
                var e = this;
                !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), 
                e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), 
                e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), 
                e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), 
                !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                    "aria-disabled": "true",
                    tabindex: "-1"
                }));
            }, e.prototype.buildDots = function() {
                var e, t, o = this;
                if (!0 === o.options.dots) {
                    for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), 
                    e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                    o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active");
                }
            }, e.prototype.buildOut = function() {
                var e = this;
                e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), 
                e.slideCount = e.$slides.length, e.$slides.each((function(e, t) {
                    i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "");
                })), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), 
                e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), 
                !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), 
                i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), 
                e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), 
                !0 === e.options.draggable && e.$list.addClass("draggable");
            }, e.prototype.buildRows = function() {
                var i, e, t, o, s, n, r, l = this;
                if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
                    for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                        var d = document.createElement("div");
                        for (e = 0; e < l.options.rows; e++) {
                            var a = document.createElement("div");
                            for (t = 0; t < l.options.slidesPerRow; t++) {
                                var c = i * r + (e * l.options.slidesPerRow + t);
                                n.get(c) && a.appendChild(n.get(c));
                            }
                            d.appendChild(a);
                        }
                        o.appendChild(d);
                    }
                    l.$slider.empty().append(o), l.$slider.children().children().children().css({
                        width: 100 / l.options.slidesPerRow + "%",
                        display: "inline-block"
                    });
                }
            }, e.prototype.checkResponsive = function(e, t) {
                var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width();
                if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), 
                r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                    s = null;
                    for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                    null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, 
                    "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), 
                    !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, 
                    "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), 
                    !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, 
                    r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), 
                    r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [ r, l ]);
                }
            }, e.prototype.changeSlide = function(e, t) {
                var o, s, n, r = this, l = i(e.currentTarget);
                switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, 
                o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
                  case "previous":
                    s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                    break;

                  case "next":
                    s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                    break;

                  case "index":
                    var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                    break;

                  default:
                    return;
                }
            }, e.prototype.checkNavigable = function(i) {
                var e, t;
                if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1]; else for (var o in e) {
                    if (i < e[o]) {
                        i = t;
                        break;
                    }
                    t = e[o];
                }
                return i;
            }, e.prototype.cleanUpEvents = function() {
                var e = this;
                e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), 
                !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), 
                !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), 
                e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), 
                e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), 
                e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), 
                e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), 
                i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), 
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), 
                i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), 
                i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), 
                i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
            }, e.prototype.cleanUpSlideEvents = function() {
                var e = this;
                e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
            }, e.prototype.cleanUpRows = function() {
                var i, e = this;
                e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), 
                e.$slider.empty().append(i));
            }, e.prototype.clickHandler = function(i) {
                !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
            }, e.prototype.destroy = function(e) {
                var t = this;
                t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), 
                t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), 
                t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), 
                t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each((function() {
                    i(this).attr("style", i(this).data("originalStyling"));
                })), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), 
                t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), 
                t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), 
                t.unslicked = !0, e || t.$slider.trigger("destroy", [ t ]);
            }, e.prototype.disableTransition = function(i) {
                var e = this, t = {};
                t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
            }, e.prototype.fadeSlide = function(i, e) {
                var t = this;
                !1 === t.cssTransitions ? (t.$slides.eq(i).css({
                    zIndex: t.options.zIndex
                }), t.$slides.eq(i).animate({
                    opacity: 1
                }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
                    opacity: 1,
                    zIndex: t.options.zIndex
                }), e && setTimeout((function() {
                    t.disableTransition(i), e.call();
                }), t.options.speed));
            }, e.prototype.fadeSlideOut = function(i) {
                var e = this;
                !1 === e.cssTransitions ? e.$slides.eq(i).animate({
                    opacity: 0,
                    zIndex: e.options.zIndex - 2
                }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
                    opacity: 0,
                    zIndex: e.options.zIndex - 2
                }));
            }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
                var e = this;
                null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), 
                e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
            }, e.prototype.focusHandler = function() {
                var e = this;
                e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", (function(t) {
                    t.stopImmediatePropagation();
                    var o = i(this);
                    setTimeout((function() {
                        e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay());
                    }), 0);
                }));
            }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
                return this.currentSlide;
            }, e.prototype.getDotCount = function() {
                var i = this, e = 0, t = 0, o = 0;
                if (!0 === i.options.infinite) if (i.slideCount <= i.options.slidesToShow) ++o; else for (;e < i.slideCount; ) ++o, 
                e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else if (!0 === i.options.centerMode) o = i.slideCount; else if (i.options.asNavFor) for (;e < i.slideCount; ) ++o, 
                e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
                return o - 1;
            }, e.prototype.getLeft = function(i) {
                var e, t, o, s, n = this, r = 0;
                return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, 
                s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), 
                r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, 
                r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, 
                r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, 
                r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, 
                r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, 
                n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, 
                !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), 
                e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, 
                !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), 
                e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, 
                e += (n.$list.width() - o.outerWidth()) / 2)), e;
            }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
                return this.options[i];
            }, e.prototype.getNavigableIndexes = function() {
                var i, e = this, t = 0, o = 0, s = [];
                for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, 
                o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i; ) s.push(t), t = o + e.options.slidesToScroll, 
                o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
                return s;
            }, e.prototype.getSlick = function() {
                return this;
            }, e.prototype.getSlideCount = function() {
                var e, t, o = this;
                return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, 
                !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each((function(s, n) {
                    if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1;
                })), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll;
            }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
                this.changeSlide({
                    data: {
                        message: "index",
                        index: parseInt(i)
                    }
                }, e);
            }, e.prototype.init = function(e) {
                var t = this;
                i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), 
                t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), 
                t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [ t ]), 
                !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, 
                t.autoPlay());
            }, e.prototype.initADA = function() {
                var e = this, t = Math.ceil(e.slideCount / e.options.slidesToShow), o = e.getNavigableIndexes().filter((function(i) {
                    return i >= 0 && i < e.slideCount;
                }));
                e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                    "aria-hidden": "true",
                    tabindex: "-1"
                }).find("a, input, button, select").attr({
                    tabindex: "-1"
                }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each((function(t) {
                    var s = o.indexOf(t);
                    i(this).attr({
                        role: "tabpanel",
                        id: "slick-slide" + e.instanceUid + t,
                        tabindex: -1
                    }), -1 !== s && i(this).attr({
                        "aria-describedby": "slick-slide-control" + e.instanceUid + s
                    });
                })), e.$dots.attr("role", "tablist").find("li").each((function(s) {
                    var n = o[s];
                    i(this).attr({
                        role: "presentation"
                    }), i(this).find("button").first().attr({
                        role: "tab",
                        id: "slick-slide-control" + e.instanceUid + s,
                        "aria-controls": "slick-slide" + e.instanceUid + n,
                        "aria-label": s + 1 + " of " + t,
                        "aria-selected": null,
                        tabindex: "-1"
                    });
                })).eq(e.currentSlide).find("button").attr({
                    "aria-selected": "true",
                    tabindex: "0"
                }).end());
                for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
                e.activateADA();
            }, e.prototype.initArrowEvents = function() {
                var i = this;
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
                    message: "previous"
                }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
                    message: "next"
                }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), 
                i.$nextArrow.on("keydown.slick", i.keyHandler)));
            }, e.prototype.initDotEvents = function() {
                var e = this;
                !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
                    message: "index"
                }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), 
                !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
            }, e.prototype.initSlideEvents = function() {
                var e = this;
                e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), 
                e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
            }, e.prototype.initializeEvents = function() {
                var e = this;
                e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                    action: "start"
                }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                    action: "move"
                }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                    action: "end"
                }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                    action: "end"
                }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), 
                !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), 
                i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), 
                i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), 
                i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition);
            }, e.prototype.initUI = function() {
                var i = this;
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), 
                i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show();
            }, e.prototype.keyHandler = function(i) {
                var e = this;
                i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                    data: {
                        message: !0 === e.options.rtl ? "next" : "previous"
                    }
                }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
                    data: {
                        message: !0 === e.options.rtl ? "previous" : "next"
                    }
                }));
            }, e.prototype.lazyLoad = function() {
                function e(e) {
                    i("img[data-lazy]", e).each((function() {
                        var e = i(this), t = i(this).attr("data-lazy"), o = i(this).attr("data-srcset"), s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"), r = document.createElement("img");
                        r.onload = function() {
                            e.animate({
                                opacity: 0
                            }, 100, (function() {
                                o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                                    opacity: 1
                                }, 200, (function() {
                                    e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                                })), n.$slider.trigger("lazyLoaded", [ n, e, t ]);
                            }));
                        }, r.onerror = function() {
                            e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), 
                            n.$slider.trigger("lazyLoadError", [ n, e, t ]);
                        }, r.src = t;
                    }));
                }
                var t, o, s, n = this;
                if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), 
                s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, 
                s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, 
                s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad) for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), 
                t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
                e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
            }, e.prototype.loadSlider = function() {
                var i = this;
                i.setPosition(), i.$slideTrack.css({
                    opacity: 1
                }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
            }, e.prototype.next = e.prototype.slickNext = function() {
                this.changeSlide({
                    data: {
                        message: "next"
                    }
                });
            }, e.prototype.orientationChange = function() {
                var i = this;
                i.checkResponsive(), i.setPosition();
            }, e.prototype.pause = e.prototype.slickPause = function() {
                var i = this;
                i.autoPlayClear(), i.paused = !0;
            }, e.prototype.play = e.prototype.slickPlay = function() {
                var i = this;
                i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1;
            }, e.prototype.postSlide = function(e) {
                var t = this;
                t.unslicked || (t.$slider.trigger("afterChange", [ t, e ]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), 
                t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), 
                t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
            }, e.prototype.prev = e.prototype.slickPrev = function() {
                this.changeSlide({
                    data: {
                        message: "previous"
                    }
                });
            }, e.prototype.preventDefault = function(i) {
                i.preventDefault();
            }, e.prototype.progressiveLazyLoad = function(e) {
                e = e || 1;
                var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider);
                d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), 
                (r = document.createElement("img")).onload = function() {
                    s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), 
                    !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [ l, t, o ]), 
                    l.progressiveLazyLoad();
                }, r.onerror = function() {
                    e < 3 ? setTimeout((function() {
                        l.progressiveLazyLoad(e + 1);
                    }), 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), 
                    l.$slider.trigger("lazyLoadError", [ l, t, o ]), l.progressiveLazyLoad());
                }, r.src = o) : l.$slider.trigger("allImagesLoaded", [ l ]);
            }, e.prototype.refresh = function(e) {
                var t, o, s = this;
                o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), 
                s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, 
                s.destroy(!0), i.extend(s, s.initials, {
                    currentSlide: t
                }), s.init(), e || s.changeSlide({
                    data: {
                        message: "index",
                        index: t
                    }
                }, !1);
            }, e.prototype.registerBreakpoints = function() {
                var e, t, o, s = this, n = s.options.responsive || null;
                if ("array" === i.type(n) && n.length) {
                    s.respondTo = s.options.respondTo || "window";
                    for (e in n) if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                        for (t = n[e].breakpoint; o >= 0; ) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), 
                        o--;
                        s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings;
                    }
                    s.breakpoints.sort((function(i, e) {
                        return s.options.mobileFirst ? i - e : e - i;
                    }));
                }
            }, e.prototype.reinit = function() {
                var e = this;
                e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, 
                e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), 
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), 
                e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), 
                e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), 
                e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), 
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), 
                e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [ e ]);
            }, e.prototype.resize = function() {
                var e = this;
                i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout((function() {
                    e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition();
                }), 50));
            }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
                var o = this;
                if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, 
                o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
                o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), 
                o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), 
                o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit();
            }, e.prototype.setCSS = function(i) {
                var e, t, o = this, s = {};
                !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", 
                t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, 
                !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", 
                o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", 
                o.$slideTrack.css(s)));
            }, e.prototype.setDimensions = function() {
                var i = this;
                !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
                    padding: "0px " + i.options.centerPadding
                }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), 
                !0 === i.options.centerMode && i.$list.css({
                    padding: i.options.centerPadding + " 0px"
                })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), 
                i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), 
                i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
                var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
                !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
            }, e.prototype.setFade = function() {
                var e, t = this;
                t.$slides.each((function(o, s) {
                    e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                        position: "relative",
                        right: e,
                        top: 0,
                        zIndex: t.options.zIndex - 2,
                        opacity: 0
                    }) : i(s).css({
                        position: "relative",
                        left: e,
                        top: 0,
                        zIndex: t.options.zIndex - 2,
                        opacity: 0
                    });
                })), t.$slides.eq(t.currentSlide).css({
                    zIndex: t.options.zIndex - 1,
                    opacity: 1
                });
            }, e.prototype.setHeight = function() {
                var i = this;
                if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                    var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                    i.$list.css("height", e);
                }
            }, e.prototype.setOption = e.prototype.slickSetOption = function() {
                var e, t, o, s, n, r = this, l = !1;
                if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], 
                s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), 
                "single" === n) r.options[o] = s; else if ("multiple" === n) i.each(o, (function(i, e) {
                    r.options[i] = e;
                })); else if ("responsive" === n) for (t in s) if ("array" !== i.type(r.options.responsive)) r.options.responsive = [ s[t] ]; else {
                    for (e = r.options.responsive.length - 1; e >= 0; ) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), 
                    e--;
                    r.options.responsive.push(s[t]);
                }
                l && (r.unload(), r.reinit());
            }, e.prototype.setPosition = function() {
                var i = this;
                i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), 
                i.$slider.trigger("setPosition", [ i ]);
            }, e.prototype.setProps = function() {
                var i = this, e = document.body.style;
                i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), 
                void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), 
                i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), 
                void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", 
                i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), 
                void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", 
                i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), 
                void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", 
                i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), 
                void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", 
                i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), 
                void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", 
                i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType;
            }, e.prototype.setSlideClasses = function(i) {
                var e, t, o, s, n = this;
                if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), 
                n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
                    var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                    e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, 
                    t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 
                    0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), 
                    n.$slides.eq(i).addClass("slick-center");
                } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, 
                o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
                "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad();
            }, e.prototype.setupInfinite = function() {
                var e, t, o, s = this;
                if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, 
                s.slideCount > s.options.slidesToShow)) {
                    for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, 
                    e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                    for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                    s.$slideTrack.find(".slick-cloned").find("[id]").each((function() {
                        i(this).attr("id", "");
                    }));
                }
            }, e.prototype.interrupt = function(i) {
                var e = this;
                i || e.autoPlay(), e.interrupted = i;
            }, e.prototype.selectHandler = function(e) {
                var t = this, o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"), s = parseInt(o.attr("data-slick-index"));
                s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s);
            }, e.prototype.slideHandler = function(i, e, t) {
                var o, s, n, r, l, d = null, a = this;
                if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i)) if (!1 === e && a.asNavFor(i), 
                o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, 
                !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, 
                !0 !== t ? a.animateSlide(r, (function() {
                    a.postSlide(o);
                })) : a.postSlide(o)); else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, 
                !0 !== t ? a.animateSlide(r, (function() {
                    a.postSlide(o);
                })) : a.postSlide(o)); else {
                    if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, 
                    a.animating = !0, a.$slider.trigger("beforeChange", [ a, a.currentSlide, s ]), n = a.currentSlide, 
                    a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), 
                    a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), 
                    a.fadeSlide(s, (function() {
                        a.postSlide(s);
                    }))) : a.postSlide(s), void a.animateHeight();
                    !0 !== t ? a.animateSlide(d, (function() {
                        a.postSlide(s);
                    })) : a.postSlide(s);
                }
            }, e.prototype.startLoad = function() {
                var i = this;
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), 
                i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), 
                i.$slider.addClass("slick-loading");
            }, e.prototype.swipeDirection = function() {
                var i, e, t, o, s = this;
                return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, 
                t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), 
                o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical";
            }, e.prototype.swipeEnd = function(i) {
                var e, t, o = this;
                if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
                if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
                if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [ o, o.swipeDirection() ]), 
                o.touchObject.swipeLength >= o.touchObject.minSwipe) {
                    switch (t = o.swipeDirection()) {
                      case "left":
                      case "down":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), 
                        o.currentDirection = 0;
                        break;

                      case "right":
                      case "up":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), 
                        o.currentDirection = 1;
                    }
                    "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [ o, t ]));
                } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), 
                o.touchObject = {});
            }, e.prototype.swipeHandler = function(i) {
                var e = this;
                if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, 
                e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), 
                i.data.action) {
                  case "start":
                    e.swipeStart(i);
                    break;

                  case "move":
                    e.swipeMove(i);
                    break;

                  case "end":
                    e.swipeEnd(i);
                }
            }, e.prototype.swipeMove = function(i) {
                var e, t, o, s, n, r, l = this;
                return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), 
                l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, 
                l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), 
                r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), 
                !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), 
                t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, 
                i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), 
                !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), 
                o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, 
                l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, 
                !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, 
                !1) : void l.setCSS(l.swipeLeft))));
            }, e.prototype.swipeStart = function(i) {
                var e, t = this;
                if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, 
                !1;
                void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), 
                t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, 
                t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, 
                t.dragging = !0;
            }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
                var i = this;
                null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), 
                i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
            }, e.prototype.unload = function() {
                var e = this;
                i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), 
                e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
            }, e.prototype.unslick = function(i) {
                var e = this;
                e.$slider.trigger("unslick", [ e, i ]), e.destroy();
            }, e.prototype.updateArrows = function() {
                var i = this;
                Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 
                i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
                i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
                i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
                i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
            }, e.prototype.updateDots = function() {
                var i = this;
                null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"));
            }, e.prototype.visibility = function() {
                var i = this;
                i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1);
            }, i.fn.slick = function() {
                var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length;
                for (i = 0; i < r; i++) if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), 
                void 0 !== t) return t;
                return o;
            };
        }));
        $((function() {
            $(".banner-section__slider").slick({});
        }));
    })();
})();