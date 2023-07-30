import crypto from "crypto";

export class Tag {
    constructor(meta, data, tags = new Map()) {
        this.meta = meta;
        this.data = data;
        this.tags = tags;
        this.stamp = 0;
    }

    #stamp() {
        let data = this.data;
        if (this.tags !== null) {
            for (let tag of this.tags.keys()) {
                data += tag.stamp.toString();
            }
        }
        return crypto.createHash('sha256').update(data).digest('base64');
    }

    add(tag1, tag2) {
        if (this.tags.has(JSON.stringify(tag1))) return this;
        this.tags.set(JSON.stringify(tag1), tag2);
        return this;
    }

    remove(tag1) {
        this.tags.delete(JSON.stringify(tag1));
        return this;
    }

    getCurrentStamp(){
        return this.#stamp();
    }
    getSavedStamp(){
        return this.stamp;
    }
    lock(){
        this.stamp = this.#stamp();
        return this.stamp;
    }
    isLock(){
        return this.stamp === this.#stamp();
    }
}