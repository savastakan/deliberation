import * as _crypto from "crypto";

export class Tag {
    private data: any;
    private meta: any;
    private network: Tag[];
    private stamp : string = '0';
    constructor(meta:any, data: any, network: Tag[] = []) {
        this.meta = meta;
        this.data = data;
        this.network = network;
    }

    private doStamp() {
        let data = this.data;
        if (this.network !== null) {
            for (let tag of this.network) {
                data += tag.stamp.toString();
            }
        }
        return _crypto.createHash('sha256').update(data).digest('base64');
    }

    add(tag) {
        if (this.network.includes(tag)) return this;
        this.network.push(tag);
        return this;
    }

    remove(tag) {
        this.network = this.network.filter(item => item !== tag);
        return this;
    }

    getCurrentStamp(){
        return this.doStamp();
    }
    getSavedStamp(){
        return this.stamp;
    }
    lock(){
        this.stamp = this.doStamp();
        return this.stamp;
    }
    isLock(){
        return this.stamp === this.doStamp();
    }
}