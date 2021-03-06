/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/react-laag/dist/index.es.js":
/*!**************************************************!*\
  !*** ./node_modules/react-laag/dist/index.es.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Arrow": () => (/* binding */ Arrow),
/* harmony export */   "ToggleLayer": () => (/* binding */ ToggleLayer),
/* harmony export */   "Transition": () => (/* binding */ Transition),
/* harmony export */   "anchor": () => (/* binding */ Anchor),
/* harmony export */   "useBreakpoint": () => (/* binding */ useBreakpoint),
/* harmony export */   "useHover": () => (/* binding */ useHover),
/* harmony export */   "useToggleLayer": () => (/* binding */ useToggleLayer),
/* harmony export */   "useTooltip": () => (/* binding */ useTooltip)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);



function useEvent(element, event, callback, enabled = true, capture = false) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!enabled || !element) {
      return;
    }

    const cb = callback;
    const el = Array.isArray(element) ? element : [element];
    const ev = Array.isArray(event) ? event : [event];
    el.forEach(e => {
      ev.forEach(event => {
        e.addEventListener(event, cb, capture);
      });
    });
    return () => {
      el.forEach(e => {
        ev.forEach(event => {
          e.removeEventListener(event, cb, capture);
        });
      });
    };
  }, [callback, element, enabled, event, capture]);
}

const OutsideClickContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});

function isChildOf(parent, target) {
  if (parent === target) {
    return true;
  }

  const hasChildren = parent.children && parent.children.length > 0;

  if (hasChildren) {
    // tslint:disable-next-line
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];

      if (child && isChildOf(child, target)) {
        return true;
      }
    }
  }

  return false;
}

function OutsideClickGroupProvider({
  refs,
  children
}) {
  const isPartOfGroup = typeof react__WEBPACK_IMPORTED_MODULE_0___default().useContext(OutsideClickContext) === "function";

  if (isPartOfGroup) {
    return children;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(OutsideClickContext.Provider, {
    value: react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(layerRef => {
      refs.current.add(layerRef);
    }, [])
  }, children);
}

function useRegisterGroup(refs) {
  const registerRefToGroup = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(OutsideClickContext);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => {
    const [layerRef] = refs.current.values();

    if (typeof registerRefToGroup === "function" && layerRef) {
      registerRefToGroup(layerRef);
    }
  }, [registerRefToGroup, refs]);
}

function useOutsideClick(refs, callback) {
  const [events] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(["click"]);
  useRegisterGroup(refs);
  useEvent(typeof document !== "undefined" ? document : null, events, react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(evt => {
    for (const ref of refs.current) {
      if (!ref.current) {
        continue;
      }

      if (isChildOf(ref.current, evt.target)) {
        return;
      }
    }

    callback();
  }, [callback]), true, true);
}

function useOnScroll(elements, onScroll, environment, trackScroll = true) {
  const memoElements = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => typeof environment !== "undefined" ? [environment, ...elements] : [], [elements]);
  useEvent(memoElements, "scroll", onScroll, trackScroll);
}

function useOnWindowResize(onResize, environment, trackResize = true) {
  useEvent(typeof environment !== "undefined" ? environment : null, "resize", onResize, trackResize);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

function useTrackElementResize(injectedResizeObserver, layerRef, triggerElement, isOpen, callback, environment) {
  const callbackRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(callback);
  callbackRef.current = callback;
  const ResizeObserver = injectedResizeObserver || (typeof environment === "undefined" ? class ResizeObserver {} : environment.ResizeObserver);

  if (!ResizeObserver) {
    throw new Error("This browser does not support `ResizeObserver` out of the box. Please provide a polyfill as a prop.");
  }

  const resizeObserver = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new ResizeObserver(() => {
    if (layerRef.current) {
      callbackRef.current();
    }
  }));
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      if (triggerElement) {
        resizeObserver.current.observe(triggerElement);
      }
    } else {
      if (triggerElement) {
        resizeObserver.current.unobserve(triggerElement);
      }

      if (layerRef.current) {
        resizeObserver.current.unobserve(layerRef.current);
      }
    }
  }, [isOpen, triggerElement]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => {
      resizeObserver.current.disconnect();
    };
  }, []);
  return resizeObserver.current;
}

const EMPTY_STYLE = {};
function isSet(value) {
  return value !== undefined && value !== null;
}

function areStylesTheSame(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let i = 0; i < Math.max(aKeys.length, bKeys.length); i++) {
    const key = aKeys[i] || bKeys[i];

    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}

function shouldUpdateStyles(prev, next) {
  if (areStylesTheSame(prev.layer, next.layer) && areStylesTheSame(prev.arrow, next.arrow)) {
    return false;
  }

  return true;
} // creates a ClientRect-like object from the viewport's dimensions

function getWindowClientRect(environment) {
  return {
    top: 0,
    left: 0,
    right: environment ? environment.innerWidth : 0,
    bottom: environment ? environment.innerHeight : 0,
    height: environment ? environment.innerHeight : 0,
    width: environment ? environment.innerWidth : 0
  };
}

const convertFloat = value => parseFloat(value.replace("px", "")); // get the outer width / height of an element
// We effectively want the same width / height that `getBoundingClientRect()`
// gives, minus optional `scale` transforms


function getContentBox(element, environment) {
  if (!environment) {
    return {
      width: 0,
      height: 0
    };
  }

  const {
    width,
    height,
    boxSizing,
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom
  } = environment.getComputedStyle(element);
  return {
    width: boxSizing === "border-box" ? convertFloat(width) : [width, borderLeft, borderRight, paddingLeft, paddingRight].reduce((total, value) => total + (value ? convertFloat(value) : 0), 0),
    height: boxSizing === "border-box" ? convertFloat(height) : [height, borderTop, borderBottom, paddingTop, paddingBottom].reduce((total, value) => total + (value ? convertFloat(value) : 0), 0)
  };
} // converts a ClientRect (or DOMRect) to a plain js-object
// usefull for destructuring for instance

function clientRectToObject(clientRect) {
  return {
    top: clientRect.top,
    left: clientRect.left,
    right: clientRect.right,
    bottom: clientRect.bottom,
    width: clientRect.width,
    height: clientRect.height
  };
}
function getElementFromAnchorNode(anchorNode) {
  let currentElement = anchorNode;

  while (!currentElement.getBoundingClientRect) {
    if (!currentElement.parentElement) {
      return null;
    }

    currentElement = currentElement.parentElement;
  }

  return currentElement;
}
function minMax(value, {
  min,
  max
}) {
  return value < min ? min : value > max ? max : value;
}

function useStyleState(anchor) {
  const [INITIAL_STYLES] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    layer: EMPTY_STYLE,
    arrow: EMPTY_STYLE,
    layerSide: anchor.split("_")[0].toLowerCase()
  });
  const [styles, setStyles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(INITIAL_STYLES);
  const lastStyles = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(styles);
  return {
    styles,
    lastStyles,
    setStyles,
    resetLastStyles: () => {
      lastStyles.current = INITIAL_STYLES;
    }
  };
}

const Anchor = {
  BOTTOM_LEFT: "BOTTOM_LEFT",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
  BOTTOM_CENTER: "BOTTOM_CENTER",
  TOP_LEFT: "TOP_LEFT",
  TOP_CENTER: "TOP_CENTER",
  TOP_RIGHT: "TOP_RIGHT",
  LEFT_BOTTOM: "LEFT_BOTTOM",
  LEFT_CENTER: "LEFT_CENTER",
  LEFT_TOP: "LEFT_TOP",
  RIGHT_BOTTOM: "RIGHT_BOTTOM",
  RIGHT_CENTER: "RIGHT_CENTER",
  RIGHT_TOP: "RIGHT_TOP"
};
const POSSIBLE_ANCHORS = Object.keys(Anchor);
function getPrimaryDirection(anchor) {
  return anchor.startsWith("TOP_") || anchor.startsWith("BOTTOM_") ? "Y" : "X";
}

function primaryIsY(primary) {
  return primary === "TOP" || primary === "BOTTOM";
}

function getPrimaryByIndex(index, preferedPrimary, preferedX, preferedY) {
  const prefferedIsY = primaryIsY(preferedPrimary);

  if (index < 3) {
    return preferedPrimary;
  }

  if (index < 6) {
    return prefferedIsY ? preferedX : preferedY;
  }

  if (index < 9) {
    if (prefferedIsY) {
      return ["LEFT", "RIGHT"].filter(x => x !== preferedX)[0];
    } else {
      return ["TOP", "BOTTOM"].filter(x => x !== preferedY)[0];
    }
  }

  if (prefferedIsY) {
    return ["TOP", "BOTTOM"].filter(x => x !== preferedPrimary)[0];
  } else {
    return ["LEFT", "RIGHT"].filter(x => x !== preferedPrimary)[0];
  }
}

function getSecondaryByIndex(index, preferedPrimary, preferedSecondary, rects) {
  const prefferedIsY = primaryIsY(preferedPrimary);
  const triggerHasBiggerHeight = rects.trigger.height > rects.layer.height;
  const triggerHasBiggerWidth = rects.trigger.width > rects.layer.width;

  switch (index) {
    case 9:
    case 0:
      return preferedSecondary;

    case 1:
    case 10:
      {
        if (preferedSecondary === "CENTER") {
          return prefferedIsY ? "RIGHT" : "BOTTOM";
        }

        return "CENTER";
      }

    case 4:
    case 7:
      return "CENTER";

    case 2:
    case 11:
      {
        if (prefferedIsY) {
          return ["LEFT", "RIGHT"].filter(x => x !== preferedSecondary)[0];
        } else {
          return ["TOP", "BOTTOM"].filter(x => x !== preferedSecondary)[0];
        }
      }

    case 3:
    case 6:
      {
        if (prefferedIsY) {
          return preferedPrimary === "BOTTOM" ? triggerHasBiggerHeight ? "BOTTOM" : "TOP" : triggerHasBiggerHeight ? "TOP" : "BOTTOM";
        }

        return preferedPrimary === "LEFT" ? triggerHasBiggerWidth ? "LEFT" : "RIGHT" : triggerHasBiggerWidth ? "RIGHT" : "LEFT";
      }

    case 5:
    case 8:
      {
        if (prefferedIsY) {
          return preferedPrimary === "BOTTOM" ? triggerHasBiggerHeight ? "TOP" : "BOTTOM" : triggerHasBiggerHeight ? "BOTTOM" : "TOP";
        }

        return preferedPrimary === "LEFT" ? triggerHasBiggerWidth ? "RIGHT" : "LEFT" : triggerHasBiggerWidth ? "LEFT" : "RIGHT";
      }
  }
  /* istanbul ignore next */


  return "LEFT";
}

function getSecondaryAnchorOptionsByPrimary(primary, anchorOptions) {
  return anchorOptions.filter(anchor => anchor.startsWith(primary));
}
function splitAnchor(anchor) {
  const [primary, secondary] = anchor.split("_");
  return {
    primary,
    secondary
  };
}
function getLayerSideByAnchor(anchor) {
  if (anchor === "CENTER") {
    return "center";
  }

  return splitAnchor(anchor).primary.toLowerCase();
}
function getAnchorPriority(preferedAnchor, possibleAnchors, preferedX, preferedY, rects) {
  const {
    primary,
    secondary
  } = preferedAnchor !== "CENTER" ? splitAnchor(preferedAnchor) : {
    primary: preferedY,
    secondary: "CENTER"
  };
  let anchors = POSSIBLE_ANCHORS.map((_, index) => {
    return getPrimaryByIndex(index, primary, preferedX, preferedY) + "_" + getSecondaryByIndex(index, primary, secondary, rects);
  }).filter(anchor => possibleAnchors.indexOf(anchor) > -1); // include prefered anchor if not included in possibleAnchors

  if (anchors.indexOf(preferedAnchor) === -1) {
    /* istanbul ignore next */
    anchors = [preferedAnchor, ...anchors];
  }

  return anchors;
}

function getPrimaryStyle(primary, rects, scroll, triggerOffset) {
  const prop = primary === "TOP" || primary === "BOTTOM" ? "top" : "left";
  const size = primary === "TOP" || primary === "BOTTOM" ? "height" : "width";

  if (primary === "TOP" || primary === "LEFT") {
    return {
      [prop]: rects.trigger[prop] - rects.layer[size] - (rects.relativeParent[prop] - scroll[prop]) - triggerOffset
    };
  }

  return {
    [prop]: rects.trigger[prop] + rects.trigger[size] - (rects.relativeParent[prop] - scroll[prop]) + triggerOffset
  };
}

function getCenter(rects, scroll, offsetSecondary, prop, size) {
  return minMax(rects.trigger[prop] - rects.relativeParent[prop] + scroll[prop] + rects.trigger[size] / 2 - rects.layer[size] / 2 - offsetSecondary, getLimits(rects, scroll)[prop]);
}

function getLimits(rects, scroll) {
  const topBase = rects.trigger.top - rects.relativeParent.top + scroll.top;
  const leftBase = rects.trigger.left - rects.relativeParent.left + scroll.left;
  return {
    top: {
      min: topBase - (rects.layer.height - rects.arrow.height),
      max: topBase + (rects.trigger.height - rects.arrow.height)
    },
    left: {
      min: leftBase - (rects.layer.width - rects.arrow.width),
      max: leftBase + (rects.trigger.width - rects.arrow.width)
    }
  };
}

function getSecondaryStyle(secondary, rects, scroll, offsetSecondary, primaryDirection) {
  if (secondary === "CENTER") {
    const prop = primaryDirection === "X" ? "top" : "left";
    const size = primaryDirection === "X" ? "height" : "width";
    return {
      [prop]: getCenter(rects, scroll, offsetSecondary, prop, size)
    };
  }

  const prop = secondary === "TOP" || secondary === "BOTTOM" ? "top" : "left";
  const size = secondary === "TOP" || secondary === "BOTTOM" ? "height" : "width";

  if (secondary === "TOP" || secondary === "LEFT") {
    return {
      [prop]: minMax(rects.trigger[prop] - rects.relativeParent[prop] + scroll[prop] + offsetSecondary, getLimits(rects, scroll)[prop])
    };
  }

  return {
    [prop]: minMax(rects.trigger[prop] + rects.trigger[size] - rects.layer[size] - (rects.relativeParent[prop] - scroll[prop]) - offsetSecondary, getLimits(rects, scroll)[prop])
  };
}

function getAbsolutePositions({
  anchor,
  rects,
  triggerOffset,
  offsetSecondary,
  scrollLeft,
  scrollTop
}) {
  const scroll = {
    left: scrollLeft,
    top: scrollTop
  };

  if (anchor === "CENTER") {
    return {
      top: getCenter(rects, scroll, 0, "top", "height"),
      left: getCenter(rects, scroll, 0, "left", "width")
    };
  }

  const {
    primary,
    secondary
  } = splitAnchor(anchor);
  const primaryDirection = getPrimaryDirection(anchor);
  return { ...getPrimaryStyle(primary, rects, scroll, triggerOffset),
    ...getSecondaryStyle(secondary, rects, scroll, offsetSecondary, primaryDirection)
  };
}

// anticipate the width / height based on the current anchor

function fixLayerDimensions(originalLayer, anchor, layerDimensions) {
  const dimensions = typeof layerDimensions === "function" ? layerDimensions(getLayerSideByAnchor(anchor)) : layerDimensions;
  return { ...clientRectToObject(originalLayer),
    ...dimensions
  };
}

const propMap = {
  TOP: {
    side1: "bottom",
    side2: "top",
    size: "height",
    factor: -1
  },
  BOTTOM: {
    side1: "top",
    side2: "bottom",
    size: "height",
    factor: 1
  },
  LEFT: {
    side1: "right",
    side2: "left",
    size: "width",
    factor: -1
  },
  RIGHT: {
    side1: "left",
    side2: "right",
    size: "width",
    factor: 1
  }
};

function getPrimaryRect(primary, trigger, layer, triggerOffset) {
  const {
    side1,
    side2,
    size,
    factor
  } = propMap[primary];
  const value = trigger[side2] + triggerOffset * factor;
  return {
    [side1]: value,
    [side2]: value + layer[size] * factor
  };
}

function getCenter$1(trigger, layer, offsetSecondary, prop, size) {
  const value = trigger[prop] + trigger[size] / 2 - layer[size] / 2 - offsetSecondary;
  return {
    [prop]: value,
    [prop === "left" ? "right" : "bottom"]: value + layer[size]
  };
}

function getSecondaryRect(secondary, trigger, layer, offsetSecondary, primaryDirection) {
  if (secondary === "CENTER") {
    const prop = primaryDirection === "X" ? "top" : "left";
    const size = primaryDirection === "X" ? "height" : "width";
    return getCenter$1(trigger, layer, offsetSecondary, prop, size);
  }

  const {
    side1,
    side2,
    size,
    factor
  } = propMap[secondary];
  const value = trigger[side2] - offsetSecondary * factor;
  return {
    [side2]: value,
    [side1]: value - layer[size] * factor
  };
}

function getLayerRectByAnchor({
  trigger,
  layer,
  anchor,
  triggerOffset,
  scrollOffset = 0,
  offsetSecondary = 0,
  layerDimensions
}) {
  let primaryRect;
  let secondaryRect; // get the correct anticipated ClientRect based on the provided Anchor

  const layerRect = layerDimensions ? fixLayerDimensions(layer, anchor, layerDimensions) : layer;

  if (anchor === "CENTER") {
    primaryRect = getCenter$1(trigger, layerRect, 0, "top", "height");
    secondaryRect = getCenter$1(trigger, layerRect, 0, "left", "width");
  } else {
    const {
      primary,
      secondary
    } = splitAnchor(anchor);
    const primaryDirection = getPrimaryDirection(anchor);
    primaryRect = getPrimaryRect(primary, trigger, layerRect, triggerOffset);
    secondaryRect = getSecondaryRect(secondary, trigger, layerRect, offsetSecondary, primaryDirection);
  }

  const result = { ...layerRect,
    ...primaryRect,
    ...secondaryRect
  }; // correct scrollOffsets

  result.top = result.top - scrollOffset;
  result.right = result.right + scrollOffset;
  result.left = result.left - scrollOffset;
  result.bottom = result.bottom + scrollOffset;
  return result;
}

const ALL_OFFSET_SIDES = ["bottom", "top", "left", "right"];

function getLayerOffsetsToParent(layer, parent) {
  return {
    top: layer.top - parent.top,
    bottom: parent.bottom - layer.bottom,
    left: layer.left - parent.left,
    right: parent.right - layer.right
  };
}

function getLayerOffsetsToParents(layer, parents) {
  return parents.map(parent => getLayerOffsetsToParent(layer, parent));
}

function isLayerCompletelyInvisible(layer, parents) {
  return parents.some(parent => {
    return layer.bottom <= parent.top || layer.right <= parent.left || layer.top >= parent.bottom || layer.left >= parent.right;
  });
}
function doesEntireLayerFitWithinScrollParents(layer, parents) {
  const parentOffsets = getLayerOffsetsToParents(layer, parents);
  return parentOffsets.every(offsets => {
    return ALL_OFFSET_SIDES.every(side => offsets[side] >= 0);
  });
}
function reduceOffsets(parentOffsets) {
  const parentOffsetsCombined = parentOffsets.reduce((result, offsets) => {
    ALL_OFFSET_SIDES.forEach(side => {
      result[side] = [...result[side], offsets[side]];
    });
    return result;
  }, {
    top: [],
    bottom: [],
    left: [],
    right: []
  });
  return ALL_OFFSET_SIDES.reduce((result, side) => {
    result[side] = parentOffsetsCombined[side].sort((a, b) => a - b)[0];
    return result;
  }, {});
}
function getNegativeOffsetSides(parentOffsets) {
  const offsets = reduceOffsets(parentOffsets);
  return ALL_OFFSET_SIDES.filter(side => offsets[side] < 0);
}

function getVisibleLayerSurface(layer, parent) {
  const offsets = getLayerOffsetsToParent(layer, parent);
  const {
    width,
    height
  } = ALL_OFFSET_SIDES.filter(side => offsets[side] < 0).reduce((rect, side) => {
    const affectedProperty = side === "top" || side === "bottom" ? "height" : "width";
    return { ...rect,
      [affectedProperty]: rect[affectedProperty] + offsets[side]
    };
  }, layer);
  const result = width * height;
  return width < 0 && height < 0 ? -result : result;
}

function getVisibleLayerSurfaceWithinScrollParent(layer, parents) {
  const surfaces = parents.map(parent => getVisibleLayerSurface(layer, parent)); // pick smallest

  return surfaces.sort((a, b) => a - b)[0];
}
function doesAnchorFitWithinScrollParents(anchor, rects, triggerOffset, scrollOffset, layerDimensions) {
  const layerRect = getLayerRectByAnchor({
    anchor,
    trigger: rects.trigger,
    layer: rects.layer,
    triggerOffset,
    scrollOffset,
    layerDimensions
  });
  return doesEntireLayerFitWithinScrollParents(layerRect, rects.scrollParents);
}
function getLayerOffsetsToScrollParentsByAnchor(anchor, rects, triggerOffset, scrollOffset) {
  return getLayerOffsetsToParents(getLayerRectByAnchor({
    anchor,
    trigger: rects.trigger,
    layer: rects.layer,
    triggerOffset,
    scrollOffset,
    layerDimensions: null
  }), rects.scrollParents);
}
function triggerIsBiggerThanLayer(layerSide, layer, trigger) {
  return (layerSide === "top" || layerSide === "bottom") && trigger.width > layer.width || (layerSide === "left" || layerSide === "right") && trigger.height > layer.height;
}

function getOffsetSurface(anchor, layer, triggerOffset, scrollOffset) {
  const primaryDirection = getPrimaryDirection(anchor);
  const primarySize = layer[primaryDirection === "X" ? "width" : "height"] - triggerOffset - scrollOffset * 2;
  const secondarySize = layer[primaryDirection === "X" ? "height" : "width"] - triggerOffset - scrollOffset * 2;
  return primarySize * secondarySize;
}

function findAnchorByLayerSurface(rects, anchorOptions, triggerOffset, scrollOffset, layerDimensions) {
  const result = anchorOptions.map(anchor => {
    // get layerRect based on all offsets
    const layerRect = getLayerRectByAnchor({
      anchor,
      layer: rects.layer,
      trigger: rects.trigger,
      scrollOffset,
      triggerOffset,
      layerDimensions
    }); // get smallest visible layer surface for current anchor

    const surface = getVisibleLayerSurfaceWithinScrollParent(layerRect, rects.scrollParents); // get surface of the offsets
    // offsets are important for collision detection, but
    // eventually we are interested in the 'meat' of the layer

    const offsetSurface = getOffsetSurface(anchor, layerRect, triggerOffset, scrollOffset);
    return {
      anchor,
      square: surface - offsetSurface
    };
  }) // sort -> biggest surface first
  .sort((a, b) => b.square - a.square);
  return result[0].anchor;
}

function findBestSuitableAnchor(rects, anchorOptions, triggerOffset, scrollOffset, layerDimensions) {
  // STRATEGY A
  // find first that fits parent
  const anchor = anchorOptions.find(anchor => doesAnchorFitWithinScrollParents(anchor, rects, triggerOffset, scrollOffset, layerDimensions));

  if (anchor) {
    return anchor;
  } // STRATEGY B
  // find first with biggest surface


  return findAnchorByLayerSurface(rects, anchorOptions, triggerOffset, scrollOffset, layerDimensions);
}

function getSecondaryOffsetSide(currentAnchor, firstAnchorThatDoesNotFit, rects, triggerOffset, scrollOffset) {
  const primaryDirection = getPrimaryDirection(currentAnchor);
  const offsets = getLayerOffsetsToScrollParentsByAnchor(firstAnchorThatDoesNotFit, rects, triggerOffset, scrollOffset);
  const sides = getNegativeOffsetSides(offsets);
  return sides.find(side => {
    if (primaryDirection === "X") {
      return side === "top" || side === "bottom";
    }

    return side === "left" || side === "right";
  });
}

function findSecondaryOffset(anchor, anchorOptions, rects, triggerOffset, scrollOffset) {
  const {
    primary
  } = splitAnchor(anchor);
  /**
   * A.
   * Check which other anchors available
   */

  const secondaryAnchorOptions = getSecondaryAnchorOptionsByPrimary(primary, anchorOptions);
  /**
   * B.
   * Check whether current anchor is the preffered anchor and whether
   * it fits
   * If so, skip secondary offset
   */

  const currentAnchorHasHighestPriority = secondaryAnchorOptions.indexOf(anchor) === 0;
  const currentAnchorFits = doesAnchorFitWithinScrollParents(anchor, rects, triggerOffset, scrollOffset, null);

  if (currentAnchorHasHighestPriority && currentAnchorFits) {
    return 0;
  }
  /**
   * C.
   * Retrieve the first anchor on same primary side (by priority) that
   * does not fit.
   * Check if there's a relevant side that has a negative offset.
   * If not, skip secondary offset
   */


  const firstAnchorThatDoesNotFit = secondaryAnchorOptions.find(anchor => {
    return !doesAnchorFitWithinScrollParents(anchor, rects, triggerOffset, scrollOffset, null);
  });
  const affectedSide = getSecondaryOffsetSide(anchor, firstAnchorThatDoesNotFit, rects, triggerOffset, scrollOffset);

  if (!affectedSide) {
    return 0;
  }
  /**
   * Determine the final secondary offset
   */


  const currentOffsets = reduceOffsets(getLayerOffsetsToScrollParentsByAnchor(anchor, rects, triggerOffset, scrollOffset));
  let secondaryOffset = -currentOffsets[affectedSide];
  const triggerIsBigger = triggerIsBiggerThanLayer(getLayerSideByAnchor(anchor), rects.layer, rects.trigger);
  const isCenter = anchor.includes("_CENTER");
  const isLeft = anchor.includes("_LEFT");
  const isTop = anchor.includes("_TOP"); // when trigger is bigger, make `secondaryOffset` positive
  // conditionally

  if (triggerIsBigger && (isLeft && affectedSide === "right" || affectedSide === "left" || isTop && affectedSide === "bottom" || affectedSide === "top")) {
    secondaryOffset = -secondaryOffset;
  } else if ( // when current anchor is center, make `secondaryOffset` positive
  // when affectedSide is top or right
  !triggerIsBigger && isCenter && (affectedSide === "top" || affectedSide === "left")) {
    secondaryOffset = -secondaryOffset;
  }

  return secondaryOffset;
}

function getOffsets(layer, trigger, arrow) {
  const left = layer.left + layer.width / 2 - trigger.left - arrow.width / 2;
  const right = layer.right - layer.width / 2 - trigger.right + arrow.width / 2;
  const top = layer.top + layer.height / 2 - trigger.top - arrow.height / 2;
  const bottom = layer.bottom - layer.height / 2 - trigger.bottom + arrow.height / 2;
  return {
    left: left < 0 ? -left : 0,
    right: right > 0 ? -right : 0,
    top: top < 0 ? -top : 0,
    bottom: bottom > 0 ? -bottom : 0
  };
}

function getArrowStyle(layer, trigger, layerSide, arrow) {
  const triggerIsBigger = triggerIsBiggerThanLayer(layerSide, layer, trigger);
  const limitsDefault = {
    left: {
      min: arrow.width / 2,
      max: layer.width - arrow.width / 2
    },
    top: {
      min: arrow.height / 2,
      max: layer.height - arrow.height / 2
    }
  };
  const offsets = getOffsets(layer, trigger, arrow);

  if (layerSide === "bottom") {
    return {
      bottom: "100%",
      top: null,
      left: minMax(triggerIsBigger ? layer.width / 2 + (offsets.left + offsets.right) : trigger.left + trigger.width / 2 - layer.left, limitsDefault.left),
      right: null
    };
  }

  if (layerSide === "right") {
    return {
      right: "100%",
      left: null,
      top: minMax(triggerIsBigger ? layer.height / 2 + (offsets.top + offsets.bottom) : trigger.top + trigger.height / 2 - layer.top, limitsDefault.top),
      bottom: null
    };
  }

  if (layerSide === "top") {
    return {
      top: "100%",
      bottom: null,
      left: minMax(triggerIsBigger ? layer.width / 2 + (offsets.left + offsets.right) : trigger.left + trigger.width / 2 - layer.left, limitsDefault.left),
      right: null
    };
  }

  return {
    left: "100%",
    right: null,
    top: minMax(triggerIsBigger ? layer.height / 2 + (offsets.top + offsets.bottom) : trigger.top + trigger.height / 2 - layer.top, limitsDefault.top),
    bottom: null
  };
}

function getAbsoluteStyle({
  rects,
  scrollTop,
  scrollLeft,
  triggerOffset,
  scrollOffset,
  possibleAnchors,
  preferedAnchor,
  preferedX,
  preferedY,
  autoAdjust,
  snapToAnchor,
  layerDimensions
}) {
  // get a list of possible anchors bases on user set props
  const possibleAnchorsByPriority = getAnchorPriority(preferedAnchor, possibleAnchors, preferedX, preferedY, rects); // on `autoAdjust` find best suitable anchor based on
  // window's / scrollParent's position

  const anchor = autoAdjust ? findBestSuitableAnchor(rects, possibleAnchorsByPriority, triggerOffset, scrollOffset, layerDimensions) : preferedAnchor; // calculate a secondary offset when `autoAdjust` is set
  // and `snapToAnchor` is not.
  // Basically it creates a visual effect where it seems that
  // the layer has glued to it's parents sides
  // Note: `offsetSecondary` is disabled when anchor is CENTER

  const offsetSecondary = autoAdjust && !snapToAnchor && anchor !== "CENTER" ? findSecondaryOffset(anchor, possibleAnchorsByPriority, rects, triggerOffset, scrollOffset) : 0;
  const layerStyle = getAbsolutePositions({
    anchor,
    rects,
    triggerOffset,
    offsetSecondary,
    scrollLeft,
    scrollTop
  });
  const layerRect = getLayerRectByAnchor({
    anchor,
    trigger: rects.trigger,
    layer: rects.layer,
    triggerOffset,
    offsetSecondary,
    layerDimensions
  });

  if (layerDimensions) {
    layerStyle.width = layerRect.width;
    layerStyle.height = layerRect.height;
  }

  return {
    layerStyle,
    layerRect,
    anchor
  };
}

function compensateScrollbars(rect, clientWidth, clientHeight) {
  const scrollbarWidth = rect.width - clientWidth;
  const scrollbarHeight = rect.height - clientHeight;
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width - scrollbarWidth,
    right: rect.right - scrollbarWidth,
    height: rect.height - scrollbarHeight,
    bottom: rect.bottom - scrollbarHeight
  };
}

function getArrowRect(layerElement, arrowOffset) {
  const arrowElement = layerElement.querySelector("[data-arrow]");

  if (!arrowElement) {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }

  const rect = arrowElement.getBoundingClientRect();
  return { ...clientRectToObject(rect),
    width: rect.width + arrowOffset * 2,
    height: rect.height + arrowOffset * 2
  };
}

const defaultPlacement = {
  autoAdjust: false,
  snapToAnchor: false,
  anchor: "TOP_CENTER",
  layerDimensions: null,
  possibleAnchors: POSSIBLE_ANCHORS,
  preferX: "RIGHT",
  preferY: "BOTTOM",
  scrollOffset: 10,
  triggerOffset: 0,
  arrowOffset: 0
};
function getPositioning({
  triggerRect,
  layerElement,
  relativeParentElement,
  scrollParents,
  placement = {},
  environment,
  fixed
}) {
  /**
   * A.
   * Calculate new layer positions
   */
  // sometimes ResizeObserver calls this function when all values in the
  // trigger ClientRect are 0. Return early in that case
  if (triggerRect.height === 0) {
    return;
  }

  if (!layerElement) {
    return;
  } // gather all scroll parents (including the window ClientRect)
  // in order to check for collisions


  const scrollParentRects = fixed ? [getWindowClientRect(environment)] : [...scrollParents.map(parent => compensateScrollbars(parent.getBoundingClientRect(), parent.clientWidth, parent.clientHeight)), getWindowClientRect(environment)];
  const options = {
    autoAdjust: placement.autoAdjust || defaultPlacement.autoAdjust,
    snapToAnchor: placement.snapToAnchor || defaultPlacement.snapToAnchor,
    triggerOffset: isSet(placement.triggerOffset) ? placement.triggerOffset : defaultPlacement.triggerOffset,
    scrollOffset: isSet(placement.scrollOffset) ? placement.scrollOffset : defaultPlacement.scrollOffset,
    possibleAnchors: placement.possibleAnchors || defaultPlacement.possibleAnchors,
    preferedAnchor: placement.anchor || defaultPlacement.anchor,
    preferedX: placement.preferX || defaultPlacement.preferX,
    preferedY: placement.preferY || defaultPlacement.preferY,
    scrollLeft: relativeParentElement === document.body ? 0 : relativeParentElement.scrollLeft,
    scrollTop: relativeParentElement === document.body ? 0 : relativeParentElement.scrollTop,
    relativeParentElement,
    layerDimensions: placement.layerDimensions || defaultPlacement.layerDimensions
  };
  const layerBox = layerElement.getBoundingClientRect(); // construct layerRect

  const layer = {
    top: layerBox.top,
    left: layerBox.left,
    right: layerBox.right,
    bottom: layerBox.bottom,
    // use `window.getComputedProperty` for width / height in order
    // to handle things like scale-transforms
    ...getContentBox(layerElement, environment)
  };
  const rects = {
    layer,
    relativeParent: relativeParentElement.getBoundingClientRect(),
    scrollParents: scrollParentRects,
    trigger: triggerRect,
    arrow: getArrowRect(layerElement, placement.arrowOffset || defaultPlacement.arrowOffset)
  };
  const {
    layerRect,
    layerStyle,
    anchor
  } = getAbsoluteStyle({
    rects,
    ...options
  });

  if (fixed) {
    layerStyle.top = layerRect.top;
    layerStyle.left = layerRect.left;
  } // determine in which side to layer will be relative to
  // the trigger


  const layerSide = getLayerSideByAnchor(anchor); // get optional arrow positions
  // anchor-style is pointless when rendered anchor is CENTER

  const arrowStyle = anchor === "CENTER" ? EMPTY_STYLE : getArrowStyle(layerRect, triggerRect, layerSide, rects.arrow);
  const styles = {
    layer: layerStyle,
    arrow: arrowStyle,
    layerSide
  };
  return {
    styles,
    layerRect
  };
}

/**
 * Tracks an element and keeps it in state
 * (together with other relevant state that depends on the element)
 */

function useElementRef(initialState, elementToState) {
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialState || null);
  const lastElement = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const setRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(node => {
    if (node && node !== lastElement.current) {
      lastElement.current = node;

      if (elementToState) {
        setState(elementToState(node));
      } else {
        setState(node);
      }
    }
  }, []);
  return [setRef, state, lastElement];
}

function findScrollContainers(element, environment) {
  const result = [];

  if (!element || !environment) {
    return result;
  }

  if (element === document.body) {
    return result;
  }

  const {
    overflow,
    overflowX,
    overflowY
  } = environment.getComputedStyle(element);

  if ([overflow, overflowX, overflowY].some(prop => prop === "auto" || prop === "scroll")) {
    result.push(element);
  }

  return [...result, ...findScrollContainers(element.parentElement, environment)];
}

function useElementState(container, fixed, environment) {
  return useElementRef({
    triggerElement: null,
    relativeParentElement: null,
    scrollParents: []
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(triggerElement => {
    const scrollParents = findScrollContainers(triggerElement, environment);
    const relativeParentElement = scrollParents[0] || document.body;

    if (relativeParentElement === document.body) {
      document.body.style.position = "relative";
    } else if ( true && environment) {
      // Check if we should warn the user about 'position: relative; stuff...'
      const containerElement = typeof container === "function" ? container() : container;
      const position = environment.getComputedStyle(relativeParentElement).position;
      const shouldWarnAboutPositionStyle = position !== "relative" && position !== "absolute" && position !== "fixed" && !fixed && !containerElement;

      if (shouldWarnAboutPositionStyle) {
        console.error("react-laag: Set the 'position' style of the nearest scroll-container to 'relative', 'absolute' or 'fixed', or set the 'fixed' prop to true. This is needed in order to position the layers properly. Currently the scroll-container is positioned: \"" + position + "\". Visit https://react-laag.com/docs/#position-relative for more info.", relativeParentElement);
      }
    }

    return {
      triggerElement,
      relativeParentElement,
      scrollParents
    };
  }, []));
}

function useIsOpen(internal, external) {
  const shouldOpenAfterMount = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(external);
  const isOpen = shouldOpenAfterMount.current ? false : isSet(external) ? external : internal;
  const rerenderAfterMount = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false)[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (shouldOpenAfterMount.current) {
      shouldOpenAfterMount.current = false;
      rerenderAfterMount(true);
    }
  }, []);
  return isOpen;
}

const ToggleLayer = ({
  children,
  renderLayer,
  placement = {},
  onStyle,
  isOpen: isOpenExternal,
  closeOnOutsideClick,
  onOutsideClick,
  onDisappear,
  closeOnDisappear,
  fixed,
  container,
  environment = typeof window !== "undefined" ? window : undefined,
  ...props
}) => {
  /**
   * Tracks trigger element and keeps it in state together with it's
   * relative/absolute positioned parent
   */
  const [triggerRef, {
    relativeParentElement,
    triggerElement,
    scrollParents
  }, normalTriggerRef] = useElementState(container, fixed, environment);
  const {
    styles,
    setStyles,
    lastStyles,
    resetLastStyles
  } = useStyleState(placement.anchor || defaultPlacement.anchor);
  const layerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [isOpenInternal, setOpenInternal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const isOpen = useIsOpen(isOpenInternal, isOpenExternal);
  const handlePositioning = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!triggerElement) {
      throw new Error("Could not find a valid reference of the trigger element. See https://www.react-laag.com/docs/togglelayer/#children for more info.");
    }

    const triggerRect = triggerElement.getBoundingClientRect();
    const result = getPositioning({
      triggerRect,
      layerElement: layerRef.current,
      placement,
      relativeParentElement,
      scrollParents,
      fixed,
      environment
    });

    if (!result) {
      return;
    }

    const {
      layerRect,
      styles
    } = result; // only update styles when necessary

    if (shouldUpdateStyles(lastStyles.current, styles)) {
      // is parent in control of styles? (onStyle)
      if (isSet(onStyle)) {
        lastStyles.current = styles;
        onStyle(styles.layer, styles.arrow, styles.layerSide);
      } // ... otherwise set styles internally
      else {
          setStyles(styles);
        }
    }
    /**
     * B.
     * Manage disappearance
     */


    const hasOnDisappear = isSet(onDisappear);
    const shouldCloseOnDisappear = closeOnDisappear && !isSet(isOpenExternal); // Should we respond to the layer's partial or full disappearance?
    // (trigger's disappearance when `fixed` props is set)

    if (hasOnDisappear || shouldCloseOnDisappear) {
      const allScrollParents = [...scrollParents.map(parent => parent.getBoundingClientRect()), getWindowClientRect(environment)];
      const partial = !doesEntireLayerFitWithinScrollParents(fixed ? triggerRect : layerRect, allScrollParents);
      const full = isLayerCompletelyInvisible(fixed ? triggerRect : layerRect, allScrollParents); // if parent is interested in diseappearance...

      if (hasOnDisappear) {
        if (partial || full) {
          onDisappear(full ? "full" : "partial");
        }
      } // ... else close accordingly
      else {
          if (closeOnDisappear === "partial" && partial) {
            setOpenInternal(false);
          }

          if (closeOnDisappear === "full" && full) {
            setOpenInternal(false);
          }
        }
    }
  }, [relativeParentElement, isOpen, triggerElement, scrollParents, fixed, placement]); // call `handlePositioning` when the layer's / trigger's
  // height and / or width changes

  const resizeObserver = useTrackElementResize(props.ResizeObserver, layerRef, triggerElement, isOpen, handlePositioning, environment); // On every render, check a few things...

  useIsomorphicLayoutEffect(() => {
    /**
     * A.
     * Ignore when render is caused by internal style change
     */
    const styleIsSetInterally = !isSet(onStyle);
    const effectBecauseOfInternalStyleChange = styles !== lastStyles.current;

    if (effectBecauseOfInternalStyleChange && styleIsSetInterally) {
      lastStyles.current = styles;
      return;
    } // reset lastStyles-ref when closed


    if (!isOpen) {
      resetLastStyles();
      return;
    }
    /**
     * B.
     * Prepare to calculate new layer style
     */
    // if (!triggerElement) {
    //   throw new Error("Please provide a valid ref to the trigger element");
    // } else if (!layerRef.current) {
    //   throw new Error("Please provide a valid ref to the layer element");
    // }


    handlePositioning();
  }); // calculate new layer style when window size changes

  useOnWindowResize(handlePositioning, environment, isOpen); // calculate new layer style when user scrolls

  useOnScroll(scrollParents, handlePositioning, environment, isOpen);
  const outsideClickRefs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Set([layerRef, normalTriggerRef])); // handle clicks that are not originated from the trigger / layer
  // element

  useOutsideClick(outsideClickRefs, (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!isOpen) {
      return;
    }

    if (onOutsideClick) {
      onOutsideClick();
    }

    if (closeOnOutsideClick && !isSet(isOpenExternal)) {
      setOpenInternal(false);
    }
  }, [isOpen, setOpenInternal, isOpenExternal, onOutsideClick]));
  const containerElement = typeof container === "function" ? container() : container;
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, children({
    isOpen,
    close: () => {
      /* istanbul ignore next */
      if (isSet(isOpenExternal)) {
        throw new Error("You cannot call `close()` while using the `isOpen` prop");
      }
      /* istanbul ignore next */


      setOpenInternal(false);
    },
    open: () => {
      /* istanbul ignore next */
      if (isSet(isOpenExternal)) {
        throw new Error("You cannot call `open()` while using the `isOpen` prop");
      }
      /* istanbul ignore next */


      setOpenInternal(true);
    },
    toggle: () => {
      /* istanbul ignore next */
      if (isSet(isOpenExternal)) {
        throw new Error("You cannot call `toggle()` while using the `isOpen` prop");
      }

      setOpenInternal(!isOpenInternal);
    },
    triggerRef,
    layerSide: isOpen ? styles.layerSide : null
  }), relativeParentElement && /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(OutsideClickGroupProvider, {
    refs: outsideClickRefs
  }, /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(renderLayer({
    layerProps: {
      ref: element => {
        if (element) {
          // observe the layer for resizing
          // it's ok to observe the same element multiple times
          // since multiple observes of same element are ignored
          resizeObserver.observe(element);
        }

        layerRef.current = element;
      },
      style: { ...(isSet(onStyle) ? EMPTY_STYLE : styles.layer),
        position: fixed ? "fixed" : "absolute",
        willChange: "top, bottom, left, right, width, height"
      }
    },
    arrowStyle: { ...(isSet(onStyle) ? EMPTY_STYLE : styles.arrow),
      position: "absolute",
      willChange: "top, bottom, left, right"
    },
    isOpen,
    layerSide: styles.layerSide,
    triggerRect: triggerElement ? triggerElement.getBoundingClientRect() : null,
    close: () => {
      /* istanbul ignore next */
      if (isSet(isOpenExternal)) {
        throw new Error("You cannot call `close()` while using the `isOpen` prop");
      }
      /* istanbul ignore next */


      setOpenInternal(false);
    }
  }), containerElement || relativeParentElement)));
};

function getWidthBasedOnAngle(angle, size) {
  return Math.tan(angle * (Math.PI / 180)) * size;
}

function getViewBox(sizeA, sizeB, layerSide, borderWidth) {
  switch (layerSide) {
    case "bottom":
      return "0 " + -borderWidth + " " + sizeB + " " + sizeA;

    case "top":
      return "0 0 " + sizeB + " " + (sizeA + borderWidth);

    case "right":
      return -borderWidth + " 0 " + sizeA + " " + sizeB;

    case "left":
      return "0 0 " + (sizeA + borderWidth) + " " + sizeB;
  }

  return "";
}

function getTrianglePath({
  sizeA,
  sizeB,
  layerSide,
  roundness,
  angle
}) {
  const relativeRoundness = roundness / 10 * sizeA * 2;
  const A = layerSide === "bottom" ? "0 " + sizeA : layerSide === "top" ? "0 0" : layerSide === "right" ? sizeA + " " + sizeB : "0 " + sizeB;
  const B = (layerSide === "bottom" || layerSide === "top" ? "H" : "V") + " " + (layerSide === "bottom" || layerSide === "top" ? sizeB : 0);
  const cPoint = sizeB / 2;
  const c1A = sizeB / 2 + getWidthBasedOnAngle(angle, sizeA / 8);
  const c1B = sizeA / 8;
  const C = layerSide === "bottom" ? "C " + c1A + " " + c1B + " " + (cPoint + relativeRoundness) + " 0 " + cPoint + " 0" : layerSide === "top" ? "C " + c1A + " " + (sizeA - c1B) + " " + (cPoint + relativeRoundness) + " " + sizeA + " " + cPoint + " " + sizeA : layerSide === "right" ? "C " + c1B + " " + (sizeB - c1A) + " 0 " + (cPoint - relativeRoundness) + " 0 " + cPoint : "C " + (sizeA - c1B) + " " + (sizeB - c1A) + " " + sizeA + " " + (cPoint - relativeRoundness) + " " + sizeA + " " + cPoint;
  const d1A = sizeB / 2 - getWidthBasedOnAngle(angle, sizeA / 8);
  const d1B = sizeA / 8;
  const D = layerSide === "bottom" ? "C " + (cPoint - relativeRoundness) + " 0 " + d1A + " " + d1B + " " + A : layerSide === "top" ? "C " + (cPoint - relativeRoundness) + " " + sizeA + " " + d1A + " " + (sizeA - d1B) + " " + A : layerSide === "right" ? "C 0 " + (cPoint + relativeRoundness) + " " + d1B + " " + (sizeB - d1A) + " " + A : "C" + sizeA + " " + (cPoint + relativeRoundness) + " " + (sizeA - d1B) + " " + (sizeB - d1A) + " " + A;
  return "M " + A + " " + B + " " + C + " " + D;
}

function getBorderMaskPath({
  sizeA,
  sizeB,
  borderWidth,
  layerSide,
  angle
}) {
  const borderOffset = getWidthBasedOnAngle(angle, borderWidth);

  if (layerSide === "bottom" || layerSide === "top") {
    return "M " + borderWidth + " " + (layerSide === "bottom" ? sizeA : 0) + " H " + (sizeB - borderWidth) + " L " + (sizeB - borderWidth - borderOffset) + " " + (layerSide === "bottom" ? sizeA - borderWidth : borderWidth) + " H " + (borderOffset + borderWidth) + " Z";
  }

  return "M " + (layerSide === "right" ? sizeA : 0) + " " + borderWidth + " V " + (sizeB - borderWidth) + " L " + (layerSide === "right" ? sizeA - borderWidth : borderWidth) + " " + (sizeB - borderWidth - borderOffset) + " V " + (borderOffset + borderWidth) + " Z";
}

const Arrow = ({
  size = 8,
  angle = 45,
  borderWidth = 0,
  borderColor = "black",
  roundness = 0,
  backgroundColor = "white",
  layerSide = "top",
  style = {}
}) => {
  if (layerSide === "center") {
    return null;
  }

  const sizeA = size;
  const sizeB = getWidthBasedOnAngle(angle, size) * 2;
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    style: { ...style,
      transform: "translate" + (layerSide === "left" || layerSide === "right" ? "Y" : "X") + "(-50%)"
    },
    "data-arrow": "true",
    width: layerSide === "left" || layerSide === "right" ? sizeA : sizeB,
    viewBox: getViewBox(sizeA, sizeB, layerSide, borderWidth)
  }, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: backgroundColor,
    strokeWidth: borderWidth,
    stroke: borderColor,
    d: getTrianglePath({
      angle,
      layerSide,
      roundness,
      sizeA,
      sizeB
    })
  }), /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: backgroundColor,
    d: getBorderMaskPath({
      sizeA,
      sizeB,
      angle,
      borderWidth,
      layerSide
    })
  }));
};

function useToggleLayer(renderLayer, {
  onStyle,
  closeOnOutsideClick,
  closeOnDisappear,
  fixed,
  container,
  placement = {},
  environment = typeof window !== "undefined" ? window : undefined,
  ...props
} = {}) {
  /**
   * Tracks trigger element and keeps it in state together with it's
   * relative/absolute positioned parent
   */
  const [setTargetRef, {
    relativeParentElement,
    triggerElement: targetElement,
    scrollParents
  }, normalTriggerRef] = useElementState(container, fixed, environment);
  const {
    styles,
    setStyles,
    lastStyles,
    resetLastStyles
  } = useStyleState(placement.anchor || defaultPlacement.anchor);
  const layerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const triggerRectRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  function getTriggerRect() {
    return typeof triggerRectRef.current === "function" ? triggerRectRef.current() : triggerRectRef.current;
  }

  const [isOpen, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  function close() {
    triggerRectRef.current = null;
    setOpen(false);
  }

  const handlePositioning = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const triggerRect = getTriggerRect();

    if (!triggerRect) {
      return;
    }

    const result = getPositioning({
      triggerRect,
      layerElement: layerRef.current,
      placement,
      relativeParentElement,
      scrollParents,
      fixed,
      environment
    });

    if (!result) {
      return;
    }

    const {
      layerRect,
      styles
    } = result; // only update styles when necessary

    if (shouldUpdateStyles(lastStyles.current, styles)) {
      // is parent in control of styles? (onStyle)
      if (isSet(onStyle)) {
        lastStyles.current = styles;
        onStyle(styles.layer, styles.arrow, styles.layerSide);
      } // ... otherwise set styles internally
      else {
          setStyles(styles);
        }
    }
    /**
     * B.
     * Manage disappearance
     */
    // Should we respond to the layer's partial or full disappearance?
    // (trigger's disappearance when `fixed` props is set)


    if (closeOnDisappear) {
      const allScrollParents = [...scrollParents.map(parent => parent.getBoundingClientRect()), getWindowClientRect(environment)];
      const partial = !doesEntireLayerFitWithinScrollParents(fixed ? triggerRect : layerRect, allScrollParents);
      const full = isLayerCompletelyInvisible(fixed ? triggerRect : layerRect, allScrollParents);

      if (closeOnDisappear === "partial" && partial) {
        close();
      }

      if (closeOnDisappear === "full" && full) {
        close();
      }
    }
  }, [relativeParentElement, isOpen, targetElement, scrollParents, fixed, placement]); // call `handlePositioning` when the layer's / targets's
  // height and / or width changes

  const resizeObserver = useTrackElementResize(props.ResizeObserver, layerRef, targetElement, isOpen, handlePositioning, environment); // On every render, check a few things...

  useIsomorphicLayoutEffect(() => {
    /**
     * A.
     * Ignore when render is caused by internal style change
     */
    const styleIsSetInterally = !isSet(onStyle);
    const effectBecauseOfInternalStyleChange = styles !== lastStyles.current;

    if (effectBecauseOfInternalStyleChange && styleIsSetInterally) {
      lastStyles.current = styles;
      return;
    } // reset `lastStyles` when closed


    if (!isOpen) {
      resetLastStyles();
      return;
    }
    /**
     * B.
     * Prepare to calculate new layer style
     */


    handlePositioning();
  }); // calculate new layer style when window size changes

  useOnWindowResize(handlePositioning, environment, isOpen); // calculate new layer style when user scrolls

  useOnScroll(scrollParents, handlePositioning, environment, isOpen);
  const outsideClickRefs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Set([layerRef, normalTriggerRef])); // handle clicks that are not originated from the trigger / layer
  // element

  useOutsideClick(outsideClickRefs, (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!isOpen) {
      return;
    }

    if (closeOnOutsideClick) {
      close();
    }
  }, [isOpen, setOpen, closeOnOutsideClick]));
  const containerElement = typeof container === "function" ? container() : container;

  function open({
    clientRect,
    target
  }) {
    triggerRectRef.current = clientRect;

    if (isOpen && target === targetElement) {
      handlePositioning();
    } else {
      setTargetRef(target);
      setOpen(true);
    }
  }

  const payload = {
    isOpen,
    close,
    open,
    openFromContextMenuEvent: evt => {
      evt.preventDefault();
      const target = evt.target;
      const clientRect = {
        top: evt.clientY,
        left: evt.clientX,
        bottom: evt.clientY + 1,
        right: evt.clientX + 1,
        width: 1,
        height: 1
      };
      open({
        clientRect,
        target
      });
    },
    openFromMouseEvent: evt => {
      const currentTarget = evt.currentTarget;

      if (!currentTarget || !currentTarget.getBoundingClientRect) {
        return;
      }

      const clientRect = () => currentTarget.getBoundingClientRect();

      open({
        clientRect,
        target: currentTarget
      });
    },
    openFromRef: ref => {
      if (!ref.current) {
        console.error("Error inside useTooltip(): Expected a valid ref to a trigger element, but got " + typeof ref.current);
        return;
      }

      open({
        target: ref.current,
        clientRect: ref.current.getBoundingClientRect()
      });
    },
    openFromSelection: selection => {
      if (!selection.anchorNode || selection.isCollapsed) {
        return;
      }

      const element = getElementFromAnchorNode(selection.anchorNode);

      if (!element) {
        return;
      }

      const range = selection.getRangeAt(0);
      open({
        clientRect: () => range.getBoundingClientRect(),
        target: element
      });
    },
    layerSide: isOpen ? styles.layerSide : null
  };
  const element = relativeParentElement && /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(renderLayer({
    layerProps: {
      ref: element => {
        if (element) {
          // observe the layer for resizing
          // it's ok to observe the same element multiple times
          // since multiple observes of same element are ignored
          resizeObserver.observe(element);
        }

        layerRef.current = element;
      },
      style: { ...(isSet(onStyle) ? EMPTY_STYLE : styles.layer),
        position: fixed ? "fixed" : "absolute",
        willChange: "top, bottom, left, right, width, height"
      }
    },
    arrowStyle: { ...(isSet(onStyle) ? EMPTY_STYLE : styles.arrow),
      position: "absolute",
      willChange: "top, bottom, left, right"
    },
    isOpen,
    layerSide: styles.layerSide,
    triggerRect: getTriggerRect(),
    close: () => {
      close();
    }
  }), containerElement || relativeParentElement);
  return [/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(OutsideClickGroupProvider, {
    refs: outsideClickRefs
  }, element), payload];
}

function useHover(config) {
  const {
    delayEnter = 0,
    delayLeave = 0,
    hideOnScroll = true,
    onShow,
    onHide
  } = config || {};
  const [show, setShow] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const timeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const timeoutState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const hasTouchMoved = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);

  function handleShowHide(show) {
    if (show) {
      if (onShow) {
        onShow();
      }

      setShow(true);
      return;
    }

    if (onHide) {
      onHide();
    }

    setShow(false);
  }

  function onMouseEnter() {
    // if was leaving, stop leaving
    if (timeoutState.current === "leaving" && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      timeoutState.current = null;
    }

    if (show) {
      return;
    }

    timeoutState.current = "entering";
    timeoutRef.current = setTimeout(() => {
      handleShowHide(true);
      timeoutRef.current = null;
      timeoutState.current = null;
    }, delayEnter);
  }

  function onMouseLeave() {
    // if was waiting for entering,
    // clear timeout
    if (timeoutState.current === "entering" && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!show) {
      return;
    }

    timeoutState.current = "leaving";
    timeoutRef.current = setTimeout(() => {
      handleShowHide(false);
      timeoutRef.current = null;
    }, delayLeave);
  } // make sure to clear timeout on unmount


  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const to = timeoutRef.current;

    function clear() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    function onScroll() {
      if (show && hideOnScroll) {
        clear();
        handleShowHide(false);
      }
    }

    function onTouchEnd() {
      if (show) {
        clear();
        handleShowHide(false);
      }
    }

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("touchend", onTouchEnd, true);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("touchend", onTouchEnd, true);

      if (to) {
        clearTimeout(to);
      }
    };
  }, [show, hideOnScroll]);
  const hoverProps = {
    onMouseEnter,
    onMouseLeave,
    onTouchStart: () => {
      hasTouchMoved.current = false;
    },
    onTouchMove: () => {
      hasTouchMoved.current = true;
    },
    onTouchEnd: () => {
      if (!hasTouchMoved.current && !show) {
        handleShowHide(true);
      }

      hasTouchMoved.current = false;
    }
  }; // @ts-ignore

  if (onShow) {
    return hoverProps;
  }

  return [show, hoverProps];
}

function useBreakpoint(maxPixels) {
  const [match, setMatch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(typeof window !== "undefined" ? window.matchMedia("(max-width: " + maxPixels + "px)").matches : false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const matcher = window.matchMedia("(max-width: " + maxPixels + "px)");

    function onMatch(evt) {
      setMatch(evt.matches);
    }

    matcher.addListener(onMatch);
    return () => {
      matcher.removeListener(onMatch);
    };
  }, [maxPixels]);
  return match;
}

function Transition({
  isOpen: isOpenExternal,
  children
}) {
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    isOpenInternal: isOpenExternal,
    isLeaving: false
  });
  const didMount = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isOpenExternal) {
      setState({
        isOpenInternal: true,
        isLeaving: false
      });
    } else if (didMount.current) {
      setState({
        isOpenInternal: false,
        isLeaving: true
      });
    }
  }, [isOpenExternal, setState]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    didMount.current = true;
  }, []);

  if (!isOpenExternal && !state.isOpenInternal && !state.isLeaving) {
    return null;
  }

  return children(state.isOpenInternal, () => {
    if (!state.isOpenInternal) {
      setState(s => ({ ...s,
        isLeaving: false
      }));
    }
  }, state.isLeaving);
}

function useTooltip(renderLayer, {
  delayEnter,
  delayLeave,
  hideOnScroll,
  ...rest
} = {}) {
  const triggerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const [element, {
    openFromRef,
    close
  }] = useToggleLayer(renderLayer, rest);
  const hoverProps = useHover({
    delayEnter,
    delayLeave,
    hideOnScroll,
    onShow: () => openFromRef(triggerRef),
    onHide: close
  });
  const triggerProps = {
    ref: triggerRef,
    ...hoverProps
  };
  return [element, triggerProps];
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = ReactDOM;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************!*\
  !*** ./src/vendors/react-laag.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vendor_react_laag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vendor-react-laag */ "./node_modules/react-laag/dist/index.es.js");

window.ReactLaag = window.ReactLaag || vendor_react_laag__WEBPACK_IMPORTED_MODULE_0__;
})();

/******/ })()
;
//# sourceMappingURL=vendor-react-laag.bundle.js.map