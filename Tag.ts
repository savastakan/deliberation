import * as _crypto from "crypto";

export class Tag {
    private data: Set<any>;
    private constants: Map<Tag, Tag>;
    private variables: Map<Tag, Tag>;
    private contexts: Set<any>;
    constructor() {
        this.data = new Set<any>();
        this.constants = new Map<Tag, Tag>;
        this.variables = new Map<Tag, Tag>;
        this.contexts = new Set<any>();
    }

    private doStamp() {
        let temp = '';
        for (let data of this.data) {
            temp += data.toString();
        }
        for (let constant of this.constants) {
            temp += constant.toString();
        }
        return _crypto.createHash('sha256').update(temp).digest('base64');
    }

    add_constant(tag1,tag2) {
        this.constants.set(tag1,tag2);
    }

    remove_constant(tag) {
        this.constants.delete(tag)
    }
    lock(){
        let stamp = this.doStamp();
        return this.contexts.has(stamp);
    }
    isLock(){
        return this.contexts.has(this.doStamp());
    }
}
