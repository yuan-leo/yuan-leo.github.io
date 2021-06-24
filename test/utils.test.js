var assert = chai.assert;
var expect = chai.expect;

describe('test utils', function () {
	describe('test point', function () {
		it('can create point', function () {
			var p = new Point(0, 0);
			assert.strictEqual(p.x, 0);
			assert.strictEqual(p.y, 0);
		});
		it('cant create bad points', function () {
			expect(function () { new Point() }).to.throw('point must have x and y coords');
			expect(function () { new Point(0) }).to.throw('point must have x and y coords');
			expect(function () { new Point(0, 'a') }).to.throw('point must have x and y coords');
		});
	});
	describe('test line', function () {
		it('can create line', function () {
			var p1 = new Point(0, 5);
			var p2 = new Point(5, 5);
			var l = new Line(p1, p2);

			assert.strictEqual(l.start.x, p1.x);
			assert.strictEqual(l.start.y, p1.y);
			assert.strictEqual(l.end.x, p2.x);
			assert.strictEqual(l.end.y, p2.y);
			assert(l.isHorizontal);

			var p1 = new Point(5, 0);
			var p2 = new Point(5, 5);
			var l = new Line(p1, p2);

			assert.strictEqual(l.start.x, p1.x);
			assert.strictEqual(l.start.y, p1.y);
			assert.strictEqual(l.end.x, p2.x);
			assert.strictEqual(l.end.y, p2.y);
			assert(!l.isHorizontal);
		});
		it('line start and end are done right', function () {
			var p1 = new Point(8, 0);
			var p2 = new Point(3, 4);
			var l = new Line(p1, p2);

			assert.strictEqual(l.start.x, p2.x);
			assert.notEqual(l.start.x, p1.y);
			assert.strictEqual(l.start.y, p2.y);
			assert.notEqual(l.start.y, p1.x);
			assert.strictEqual(l.end.x, p1.x);
			assert.strictEqual(l.end.y, p1.y);

			var p1 = new Point(1, 9);
			var p2 = new Point(3, 4);
			var l = new Line(p1, p2);

			assert.strictEqual(l.start.x, p2.x);
			assert.notEqual(l.start.x, p1.y);
			assert.strictEqual(l.start.y, p2.y);
			assert.notEqual(l.start.y, p1.x);
			assert.strictEqual(l.end.x, p1.x);
			assert.strictEqual(l.end.y, p1.y);
		});
	});
	describe('test square', function () {
		it('can make square', function () {
			var p1 = new Point(0, 0);
			var p2 = new Point(5, 5);
			var s = new Square(p1, p2);

			assert.strictEqual(s.start.x, p1.x);
			assert.strictEqual(s.start.y, p1.y);
			assert.strictEqual(s.end.x, p2.x);
			assert.strictEqual(s.end.y, p2.y);
			assert.strictEqual(s.width, p2.x - p1.x);
			assert.strictEqual(s.height, p2.y - p1.y);
			assert.strictEqual(s.area, s.width * s.height);
			assert.strictEqual(s.filled, false);
		});
	});

	describe('testRand is in bounds', function () {
		it('test rand', function () {
			var start = 0;
			var end = 10;
			_.times(10, function () {
				var res = getRand(start, end);
				assert(res >= start && res <= end);
			});
			start = 5;
			end = 7;
			_.times(10, function () {
				var res = getRand(start, end);
				assert(res >= start && res <= end);
			});

			assert.strictEqual(getRand(3,3),3);
			expect(function(){getRand(7,5)}).to.throw('can not get rand of negative range');
		});
	});

	describe('mondrian', function() {
		it('can create mondrian', function() {
			var m = new Mondrian(100,200);
			assert.strictEqual(m.width, 100);
			assert.strictEqual(m.height, 200);
			assert.strictEqual(m.lines.length, 0);
			assert.strictEqual(m.squares.length, 0);

			m.addLine('A');
			assert.strictEqual(m.lines[0], 'A');
			m.addSquare('B');
			assert.strictEqual(m.squares[0], 'B');

		});
	});
});