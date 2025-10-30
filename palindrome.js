let specialPalindrome = function (n) {
    function* interleave(a, b) {
        if (a.length == 0) {
            yield b; return;
        }

        if (b.length == 0) {
            yield a; return;
        }

        if (a.length >= 2) {
            for (const seq of interleave(a.slice(1, a.length - 1), b)) {
                yield a[0] + seq + a[0];
            }
        }

        if (b.length >= 2) {
            for (const seq of interleave(a, b.slice(1, b.length - 1))) {
                yield b[0] + seq + b[0];
            }
        }
    }

    function* generate(d, len, onlyEven = false) {
        if (len <= 0 || d <= 0) return;

        yield* generate(d - 1, len, onlyEven);

        let ddd = [...new Array(d).fill(d)].join('');

        if (d == len && (d % 2 == 0 || !onlyEven)) yield ddd;

        for (const seq of generate(d - 1, len - d, onlyEven | (d % 2 == 1))) {
            yield* interleave(seq, ddd);
        }
    }

    for (let len = 1; len <= 16; len++) {
        const nums = Array.from(generate(9, len)).map(x => parseInt(x)).filter(x => x > n).toSorted();
        if (nums.length > 0) return nums[0];
    }
}
