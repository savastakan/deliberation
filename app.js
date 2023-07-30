"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ZDD_1 = require("./core/ZDD");
const node1 = ZDD_1.ZDD.one;
const node2 = ZDD_1.ZDD.zero;
const zdd = new ZDD_1.ZDD();
const resultNode = zdd.union(node1, node2);
zdd.print();
console.log('bitti');
//# sourceMappingURL=app.js.map