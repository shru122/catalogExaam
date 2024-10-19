const fs = require('fs');

function decodeValue(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, k) {
    let constantTerm = 0;
    for (let i = 0; i < k; i++) {
        let term = points[i][1];
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - points[j][0]) / (points[i][0] - points[j][0]);
            }
        }
        constantTerm += term;
    }
    return constantTerm;
}

fs.readFile('input.json', 'utf8', (err, data) => {
    if (err) throw err;
    const root = JSON.parse(data);
    const n = root.keys.n;
    const k = root.keys.k;
    const points = [];

    for (let i = 1; i <= n; i++) {
        if (root[i]) {
            const x = i;
            const base = parseInt(root[i].base);
            const y = decodeValue(root[i].value, base);
            points.push([x, y]);
        }
    }

    const constant = lagrangeInterpolation(points, k);
    console.log('Constant term (c):', constant);
});
