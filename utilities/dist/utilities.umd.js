(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue")) : typeof define === "function" && define.amd ? define(["exports", "vue"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2["@sedum/utilities"] = {}, global2.Vue));
})(this, function(exports2, vue) {
  "use strict";
  var _a;
  const isClient = typeof window !== "undefined";
  const isString = (val) => typeof val === "string";
  const noop = () => {
  };
  isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function resolveUnref(r) {
    return typeof r === "function" ? r() : vue.unref(r);
  }
  function identity(arg) {
    return arg;
  }
  function tryOnScopeDispose(fn) {
    if (vue.getCurrentScope()) {
      vue.onScopeDispose(fn);
      return true;
    }
    return false;
  }
  function unrefElement(elRef) {
    var _a2;
    const plain = resolveUnref(elRef);
    return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
  }
  const defaultWindow = isClient ? window : void 0;
  isClient ? window.document : void 0;
  isClient ? window.navigator : void 0;
  isClient ? window.location : void 0;
  function useEventListener(...args) {
    let target;
    let event;
    let listener;
    let options;
    if (isString(args[0])) {
      [event, listener, options] = args;
      target = defaultWindow;
    } else {
      [target, event, listener, options] = args;
    }
    if (!target)
      return noop;
    let cleanup = noop;
    const stopWatch = vue.watch(() => unrefElement(target), (el) => {
      cleanup();
      if (!el)
        return;
      el.addEventListener(event, listener, options);
      cleanup = () => {
        el.removeEventListener(event, listener, options);
        cleanup = noop;
      };
    }, { immediate: true, flush: "post" });
    const stop = () => {
      stopWatch();
      cleanup();
    };
    tryOnScopeDispose(stop);
    return stop;
  }
  const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  const globalKey = "__vueuse_ssr_handlers__";
  _global[globalKey] = _global[globalKey] || {};
  _global[globalKey];
  function useElementVisibility(element, { window: window2 = defaultWindow, scrollTarget } = {}) {
    const elementIsVisible = vue.ref(false);
    const testBounding = () => {
      if (!window2)
        return;
      const document2 = window2.document;
      const el = unrefElement(element);
      if (!el) {
        elementIsVisible.value = false;
      } else {
        const rect = el.getBoundingClientRect();
        elementIsVisible.value = rect.top <= (window2.innerHeight || document2.documentElement.clientHeight) && rect.left <= (window2.innerWidth || document2.documentElement.clientWidth) && rect.bottom >= 0 && rect.right >= 0;
      }
    };
    vue.watch(() => unrefElement(element), () => testBounding(), { immediate: true, flush: "post" });
    if (window2) {
      useEventListener(scrollTarget || window2, "scroll", testBounding, {
        capture: false,
        passive: true
      });
    }
    return elementIsVisible;
  }
  var SwipeDirection;
  (function(SwipeDirection2) {
    SwipeDirection2["UP"] = "UP";
    SwipeDirection2["RIGHT"] = "RIGHT";
    SwipeDirection2["DOWN"] = "DOWN";
    SwipeDirection2["LEFT"] = "LEFT";
    SwipeDirection2["NONE"] = "NONE";
  })(SwipeDirection || (SwipeDirection = {}));
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  const _TransitionPresets = {
    easeInSine: [0.12, 0, 0.39, 0],
    easeOutSine: [0.61, 1, 0.88, 1],
    easeInOutSine: [0.37, 0, 0.63, 1],
    easeInQuad: [0.11, 0, 0.5, 0],
    easeOutQuad: [0.5, 1, 0.89, 1],
    easeInOutQuad: [0.45, 0, 0.55, 1],
    easeInCubic: [0.32, 0, 0.67, 0],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeInQuart: [0.5, 0, 0.75, 0],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInQuint: [0.64, 0, 0.78, 0],
    easeOutQuint: [0.22, 1, 0.36, 1],
    easeInOutQuint: [0.83, 0, 0.17, 1],
    easeInExpo: [0.7, 0, 0.84, 0],
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    easeInCirc: [0.55, 0, 1, 0.45],
    easeOutCirc: [0, 0.55, 0.45, 1],
    easeInOutCirc: [0.85, 0, 0.15, 1],
    easeInBack: [0.36, 0, 0.66, -0.56],
    easeOutBack: [0.34, 1.56, 0.64, 1],
    easeInOutBack: [0.68, -0.6, 0.32, 1.6]
  };
  __spreadValues({
    linear: identity
  }, _TransitionPresets);
  const isVisible = (element) => {
    let isVisible2 = useElementVisibility(element).value;
    isVisible2 = isVisible2 && element.offsetHeight > 0;
    return isVisible2;
  };
  const isFocusable = (element) => {
    return element.tabIndex >= 0;
  };
  const getUpCell = (event) => {
    const $target = event.target;
    return _getUpCell($target);
  };
  const _getUpCell = (element) => {
    var _a2;
    let $upCell;
    if (element instanceof HTMLTableCellElement) {
      const $prevRow = (_a2 = element.parentElement) == null ? void 0 : _a2.previousElementSibling;
      if ($prevRow) {
        const $prevRowCells = Array.from($prevRow.children);
        const $prevCell = $prevRowCells[element.cellIndex];
        if ($prevCell) {
          $upCell = $prevCell;
        }
      }
    }
    if ($upCell && (!isFocusable($upCell) || !isVisible($upCell))) {
      return _getUpCell($upCell);
    }
    return $upCell;
  };
  const getTopCell = (event) => {
    var _a2;
    const $target = event.target;
    let $topCell;
    if ($target instanceof HTMLTableCellElement) {
      const $table = (_a2 = $target.parentElement) == null ? void 0 : _a2.parentElement;
      if ($table) {
        const $firstRow = $table.firstElementChild;
        const $navCell = $firstRow.children[$target.cellIndex];
        if ($navCell) {
          $topCell = $navCell;
        }
      }
    }
    if ($topCell && (!isFocusable($topCell) || !isVisible($topCell))) {
      return _getDownCell($topCell);
    }
    return $topCell;
  };
  const getDownCell = (event) => {
    const $target = event.target;
    return _getDownCell($target);
  };
  const _getDownCell = (element) => {
    var _a2;
    let $downCell;
    if (element instanceof HTMLTableCellElement) {
      const $nextRow = (_a2 = element.parentElement) == null ? void 0 : _a2.nextElementSibling;
      if ($nextRow) {
        const $nextRowCells = Array.from($nextRow.children);
        const $nextCell = $nextRowCells[element.cellIndex];
        if ($nextCell) {
          $downCell = $nextCell;
        }
      }
    }
    if ($downCell && (!isFocusable($downCell) || !isVisible($downCell))) {
      return _getDownCell($downCell);
    }
    return $downCell;
  };
  const getBottomCell = (event) => {
    var _a2;
    const $target = event.target;
    let $bottomCell;
    if ($target instanceof HTMLTableCellElement) {
      const $table = (_a2 = $target.parentElement) == null ? void 0 : _a2.parentElement;
      if ($table) {
        const $lastRow = $table.lastElementChild;
        const $navCell = $lastRow.children[$target.cellIndex];
        if ($navCell) {
          $bottomCell = $navCell;
        }
      }
    }
    if ($bottomCell && (!isFocusable($bottomCell) || !isVisible($bottomCell))) {
      return _getUpCell($bottomCell);
    }
    return $bottomCell;
  };
  const getPrevCell = (event) => {
    const $target = event.target;
    return _getPrevCell($target);
  };
  const _getPrevCell = (element) => {
    var _a2;
    let $prevCell;
    if (element.previousElementSibling) {
      $prevCell = element.previousElementSibling;
    } else {
      const $prevRow = (_a2 = element.parentElement) == null ? void 0 : _a2.previousElementSibling;
      $prevCell = $prevRow == null ? void 0 : $prevRow.lastElementChild;
    }
    if ($prevCell && (!isFocusable($prevCell) || !isVisible($prevCell))) {
      return _getPrevCell($prevCell);
    }
    return $prevCell;
  };
  const getNextCell = (event) => {
    const $target = event.target;
    return _getNextCell($target);
  };
  const _getNextCell = (element) => {
    var _a2;
    let $nextCell;
    if (element.nextElementSibling) {
      $nextCell = element.nextElementSibling;
    } else {
      const $nextRow = (_a2 = element.parentElement) == null ? void 0 : _a2.nextElementSibling;
      $nextCell = $nextRow == null ? void 0 : $nextRow.firstElementChild;
    }
    if ($nextCell && (!isFocusable($nextCell) || !isVisible($nextCell))) {
      return _getNextCell($nextCell);
    }
    return $nextCell;
  };
  const getFirstCell = (event) => {
    const $target = event.target;
    const $parent = $target.parentElement;
    const $firstCell = $parent.firstElementChild;
    if ($firstCell && (!isFocusable($firstCell) || !isVisible($firstCell))) {
      return _getNextCell($firstCell);
    }
    return $firstCell;
  };
  const getLastCell = (event) => {
    const $target = event.target;
    const $parent = $target.parentElement;
    const $lastCell = $parent.lastElementChild;
    if ($lastCell && (!isFocusable($lastCell) || !isVisible($lastCell))) {
      return _getPrevCell($lastCell);
    }
    return $lastCell;
  };
  const modifierKeys = ["alt", "control", "shift", "meta"];
  const eventKeyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right"
  };
  const defaultKeypressHandlers = {
    "keydown.up": (event) => {
      const $upCell = getUpCell(event);
      if ($upCell) {
        event.preventDefault();
        event.stopPropagation();
        $upCell.focus();
      }
    },
    "keydown.down": (event) => {
      const $downCell = getDownCell(event);
      if ($downCell) {
        event.preventDefault();
        event.stopPropagation();
        $downCell.focus();
      }
    },
    "keydown.left": (event) => {
      const $prevCell = getPrevCell(event);
      event.preventDefault();
      event.stopPropagation();
      if ($prevCell) {
        $prevCell.focus();
      }
    },
    "keydown.right": (event) => {
      const $nextCell = getNextCell(event);
      event.preventDefault();
      event.stopPropagation();
      if ($nextCell) {
        $nextCell.focus();
      }
    },
    "keydown.control.up": (event) => {
      const $topCell = getTopCell(event);
      if ($topCell) {
        event.preventDefault();
        event.stopPropagation();
        $topCell.focus();
      }
    },
    "keydown.control.down": (event) => {
      const $bottomCell = getBottomCell(event);
      if ($bottomCell) {
        event.preventDefault();
        event.stopPropagation();
        $bottomCell.focus();
      }
    },
    "keydown.control.left": (event) => {
      const $firstCell = getFirstCell(event);
      if ($firstCell) {
        event.preventDefault();
        event.stopPropagation();
        $firstCell.focus();
      }
    },
    "keydown.control.right": (event) => {
      const $lastCell = getLastCell(event);
      if ($lastCell) {
        event.preventDefault();
        event.stopPropagation();
        $lastCell.focus();
      }
    },
    "keydown.end": (event) => {
      const $lastCell = getLastCell(event);
      if ($lastCell) {
        event.preventDefault();
        event.stopPropagation();
        $lastCell.focus();
      }
    },
    "keydown.enter": (event) => {
      const $target = event.target;
      if ($target instanceof HTMLTableCellElement) {
        event.preventDefault();
        event.stopPropagation();
        const $downCell = getDownCell(event);
        if ($downCell) {
          $downCell.focus();
        }
      }
    },
    "keydown.shift.enter": (event) => {
      const $target = event.target;
      if ($target instanceof HTMLTableCellElement) {
        event.preventDefault();
        event.stopPropagation();
        const $upCell = getUpCell(event);
        if ($upCell) {
          $upCell.focus();
        }
      }
    },
    "keydown.home": (event) => {
      const $firstCell = getFirstCell(event);
      if ($firstCell) {
        event.preventDefault();
        event.stopPropagation();
        $firstCell.focus();
      }
    },
    "keydown.tab": (event) => {
      const $nextCell = getNextCell(event);
      if ($nextCell) {
        event.preventDefault();
        event.stopPropagation();
        $nextCell.focus();
      }
    },
    "keydown.shift.tab": (event) => {
      const $prevCell = getPrevCell(event);
      if ($prevCell) {
        event.preventDefault();
        event.stopPropagation();
        $prevCell.focus();
      }
    }
  };
  function useKeyboardNav(options) {
    const getSelectors = (option) => {
      let $parent = null;
      if (option.parent) {
        if (typeof option.parent === "string") {
          $parent = document.querySelector(option.parent);
        } else if (option.parent instanceof Element) {
          $parent = option.parent;
        } else {
          $parent = option.parent.value;
        }
      }
      let selectors = [];
      if (option.selectors) {
        if (typeof option.selectors === "string") {
          selectors = $parent ? Array.from($parent.querySelectorAll(option.selectors)) : Array.from(document.querySelectorAll(option.selectors));
        } else if (option.selectors instanceof Element) {
          selectors.push(option.selectors);
        } else {
          if (Array.isArray(option.selectors.value)) {
            for (const element of option.selectors.value) {
              if (element instanceof Element) {
                selectors.push(element);
              } else {
                selectors.push(element.$el);
              }
            }
          } else {
            selectors.push(option.selectors.value);
          }
        }
      } else {
        const $children = Array.from($parent.children);
        selectors = $children.filter((selector) => {
          return isFocusable(selector) && isVisible(selector);
        });
      }
      return selectors;
    };
    const getEventListener = (option) => {
      return (event) => {
        const activeKey = eventKeyMap[event.key] || event.key.toLowerCase();
        if (modifierKeys.includes(activeKey))
          return;
        const handlers = option.handlers || defaultKeypressHandlers;
        for (const key of Object.keys(handlers)) {
          const [eventType, ...keys] = key.split(".");
          if (eventType !== "keydown") {
            continue;
          }
          if (keys.includes(activeKey)) {
            const listener = handlers[key];
            const hasModifier = keys.filter((key2) => modifierKeys.includes(key2));
            const isModifierActive = modifierKeys.some((key2) => {
              const modifierKey = key2.charAt(0).toUpperCase() + key2.slice(1);
              return event.getModifierState(modifierKey);
            });
            if (hasModifier.length > 0) {
              if (isModifierActive) {
                for (const modifier of modifierKeys) {
                  if (keys.includes(modifier)) {
                    const modifierKey = modifier.charAt(0).toUpperCase() + modifier.slice(1);
                    if (event.getModifierState(modifierKey)) {
                      listener(event);
                    }
                  }
                }
              }
            } else {
              if (!isModifierActive) {
                listener(event);
              }
            }
          }
        }
      };
    };
    vue.onMounted(() => {
      for (const option of options) {
        const selectors = getSelectors(option);
        for (const selector of selectors) {
          selector.addEventListener("keydown", getEventListener(option));
        }
      }
    });
    vue.onBeforeUnmount(() => {
      for (const option of options) {
        const selectors = getSelectors(option);
        for (const selector of selectors) {
          selector.removeEventListener("keydown", getEventListener(option));
        }
      }
    });
  }
  function install(app) {
  }
  exports2.defaultKeypressHandlers = defaultKeypressHandlers;
  exports2.install = install;
  exports2.useKeyboardNav = useKeyboardNav;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
