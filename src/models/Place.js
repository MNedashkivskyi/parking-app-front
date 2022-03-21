class Place {
    id;
    status;
    level;
    key;

    static fromAnother({ id, status, level }) {
        return new this(id, status, level);
    }

    constructor(id, status, level) {
        this.id = id;
        this.status = status;
        this.level = level;
        this.key = Math.random();
    }

    isEmpty() {
        if (this.id == -1 && this.status == -1 && this.level == -1)
            return true;
        else return false;
    }
}

export default Place;