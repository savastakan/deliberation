import crypto from "crypto";

export class Tag {
    constructor(meta, data, tags = []) {
        this.meta = meta;
        this.data = data;
        this.tags = tags;
        this.impact = 1;
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

    add(tag, coefficient) {
        if (this.tags.has(JSON.stringify(tag))) return this;
        this.tags.set(JSON.stringify(tag), coefficient);
        this.impact += (coefficient * tag.impact);
        return this;
    }

    remove(tag) {
        const coefficient = this.tags.get(JSON.stringify(tag));
        this.impact -= (coefficient * tag.impact);
        this.tags.delete(JSON.stringify(tag));
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
