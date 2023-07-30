import { Node } from "./core/Node";
import { ZDD } from "./core/ZDD";


const node1 = ZDD.one;
const node2 = ZDD.zero;

const zdd = new ZDD();
const resultNode = zdd.union(node1, node2);

zdd.print()

console.log('bitti')