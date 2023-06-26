const fs = require('fs');

class Counter {
    constructor() {
        this.counter = {}
    }
    count(name) {
        if (this.counter[name] === undefined) {
            this.counter[name] = 1;
        } else {
            this.counter[name] += 1;
        }
    }
    get(name) {
        return this.counter[name];
    }
    keys() {
        return Object.keys(this.counter)
    }
    obj() {
        return this.counter;
    }
}

class VulnDb {
    constructor(data) {
        this.issues = data.split('\n').filter(l => l.trim().length > 0).map(l => JSON.parse(l))
    }
}

async function main() {
    const db = new VulnDb(fs.readFileSync("../../dataset/vulns.json", 'utf-8'));
    const counter = new Counter();
    db.issues.forEach(i => counter.count(i.severity))
    console.log(`total issues: ${db.issues.length}`);
    console.log(counter.obj())
}

main();