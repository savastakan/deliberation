"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZDD = void 0;
const Node_1 = require("./Node");
class ZDD {
    constructor() {
        this.nodes = new Map();
        this.nodes.set([0, null, null], new Node_1.Node(0, null, null));
        this.nodes.set([1, null, null], new Node_1.Node(1, null, null));
        ZDD.zero = this.nodes.get([0, null, null]);
        ZDD.one = this.nodes.get([1, null, null]);
    }
    get(top, lo, hi) {
        if (hi === ZDD.one)
            return lo;
        this.nodes.set([top, lo, hi], new Node_1.Node(top, lo, hi));
        return this.nodes.get([top, lo, hi]);
    }
    print() {
        console.log(this.nodes);
    }
    subset1(p, top) {
        if (p === ZDD.zero || p == ZDD.one)
            return p;
        if (p.top < top)
            return p;
        if (p.top === top)
            return p.hi;
        //if (p.top > top)
        return this.get(p.top, this.subset1(p.lo, top), this.subset1(p.hi, top));
    }
    subset0(p, top) {
        if (p == ZDD.zero || p === ZDD.one)
            return p;
        if (p.top < top)
            return p;
        if (p.top === top)
            return p.lo;
        // if (p.top > top)
        return this.get(p.top, this.subset0(p.lo, top), this.subset0(p.hi, top));
    }
    change(p, top) {
        if (p.top < top)
            return this.get(top, ZDD.zero, p);
        if (p.top == top)
            return this.get(top, p.hi, p.lo);
        // if (p.top > top)
        return this.get(p.top, this.change(p.lo, top), this.change(p.hi, top));
    }
    union(p, q) {
        if (p === ZDD.zero)
            return q;
        if (q === ZDD.zero)
            return p;
        if (p == q)
            return p;
        if (p.top < q.top)
            return this.union(q, p); // union is Commutative, for hit cache by memoize        
        if (p.top > q.top)
            return this.get(p.top, this.union(p.lo, q), p.hi);
        // if  (p.top == q.top)
        return this.get(p.top, this.union(p.lo, q.lo), this.union(p.hi, q.hi));
    }
    intersec(p, q) {
        if (p === ZDD.zero)
            return 0;
        if (q === ZDD.zero)
            return 0;
        if (p === q)
            return p;
        if (p.top < q.top)
            return this.intersec(q, p);
        if (p.top > q.top)
            return this.intersec(p.lo, q);
        // if  p.top == q.top:
        return this.get(p.top, this.intersec(p.lo, q.lo), this.intersec(p.hi, q.hi));
    }
    diff(p, q) {
        if (p === ZDD.zero)
            return 0;
        if (q === ZDD.zero)
            return p;
        if (p === q)
            return 0;
        if (p.top < q.top)
            return this.diff(p, q.lo);
        if (p.top > q.top)
            return this.get(p.top, this.diff(p.lo, q), p.hi);
        return this.get(p.top, this.diff(p.lo, q.lo), this.diff(p.hi, q.hi));
    }
    count(p) {
        if (p === ZDD.zero)
            return 0;
        if (p === ZDD.one)
            return 1;
        return this.count(p.lo) + this.count(p.hi);
    }
}
exports.ZDD = ZDD;
//# sourceMappingURL=ZDD.js.map