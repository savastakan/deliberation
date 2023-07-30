export class Node  {
    top: any;
    lo: Node;
    hi: Node;
    constructor(top, lo, hi) {
        this.top = top;
        this.lo = lo;
        this.hi = hi;
    }
}