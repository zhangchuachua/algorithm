"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
function pacificAtlantic(heights) {
    var set = new Set();
    function dfs(_a) {
        var _b = __read(_a, 2), f = _b[0], s = _b[1];
        var current = heights[f][s];
        console.log(current);
        var prevRow = heights[f - 1][s];
        var nextRow = heights[f + 1][s];
        var prevCol = heights[f][s - 1];
        var nextCol = heights[f][s + 1];
        if (prevRow && prevRow <= current && !set.has(f - 1 + "," + s)) {
        }
    }
    for (var i = 0; i < heights.length; i++) {
    }
}
;
