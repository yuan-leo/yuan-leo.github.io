var assert = chai.assert;
var expect = chai.expect;

var defaultOptions = {
    minHLines: 1,
    maxHLines: 1,
    minVLines: 1,
    maxVLines: 1,
    minShortLines: 1,
    maxShortLines: 1,
    minSquares: 1,
    maxSquares: 1,
    numUsableSquares: 1,
};

describe('test mondrian generator', function () {

    it('can generate empty mondrian', function () {
        var options = _.clone(defaultOptions);
        options.minHLines = 0;
        options.maxHLines = 0;
        options.minVLines = 0;
        options.maxVLines = 0;
        options.minShortLines = 0;
        options.maxShortLines = 0;
        options.minSquares = 0;
        options.maxSquares = 0;
        options.numUsableSquares = 0;

        var m = generateMondrian(1000, 1000, options);
        assert.strictEqual(m.lines.length, 4);
        assert.strictEqual(m.squares.length, 1);
        verifyMondrian(m);
    });

    it('can generate simple mondrian', function () {
        var options = _.clone(defaultOptions);
        options.minHLines = 1;
        options.maxHLines = 1;
        options.minVLines = 1;
        options.maxVLines = 1;
        options.minShortLines = 0;
        options.maxShortLines = 0;
        options.minSquares = 0;
        options.maxSquares = 0;
        options.numUsableSquares = 0;

        var m = generateMondrian(1000, 1000, options);
        assert.strictEqual(m.lines.length, 6);
        assert.strictEqual(m.squares.length, 4);
        verifyMondrian(m);
    });

    it('test random mondrian', function () {
        var options = _.clone(defaultOptions);
        options.minHLines = 10;
        options.maxHLines = 10;
        options.minVLines = 10;
        options.maxVLines = 10;
        options.minShortLines = 5;
        options.maxShortLines = 5;
        options.minSquares = 5;
        options.maxSquares = 10;
        options.numUsableSquares = 5;

        var m = generateMondrian(10000, 10000, options);
        assert.strictEqual(m.lines.length, 29);
        verifyMondrian(m);
    });

    function verifyMondrian(m) {
        _.forEach(m.squares, function (square) {
            assert(verifySquare(m, square), 'square missing edge');
        });
    }

    function verifySquare(m, square) {
        var numFound = 0;
        _.forEach(m.lines, function (line) {
            if (line.isHorizontal) {
                if (line.start.y === square.start.y || line.start.y === square.end.y) {
                    if (line.start.x <= square.start.x && line.end.x >= square.end.x) {
                        numFound++;
                    }
                }
            } else {
                if (line.start.x === square.start.x || line.start.x === square.end.x) {
                    if (line.start.y <= square.start.y && line.end.y >= square.end.y) {
                        numFound++;
                    }
                }
            }
        });
        var res = numFound === 4;
        if (!res) {
            console.log("Failed Verification:", m, square);
        }
        return res;
    }
});