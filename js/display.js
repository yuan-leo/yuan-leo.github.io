

/**
 * Draw the given mondrian onto a canvas.
 *
 * @param {Mondrian} mondrian
 * @param {Canvas} canvas
 */
function drawMondrian(mondrian, canvas) {
    var colors = ['#c70000', '#f4b600', '#2d2bb4', '#000000'];
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    _.forEach(mondrian.squares, function (square) {
        drawSquare(context, square);
    });
    _.forEach(mondrian.lines, function (line) {
        drawLine(context, line);
    });

    function clearMondrian(canvas) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawLine(context, line) {
        context.beginPath();
        context.moveTo(line.start.x, line.start.y);
        context.lineTo(line.end.x, line.end.y);
        context.lineWidth = 4;
        context.strokeStyle = '#000000';
        context.stroke();
    }

    function drawSquare(context, square) {
        if (square.color) {
            var x = square.start.x;
            var y = square.start.y;
            var width = square.width;
            var height = square.height;

            context.fillStyle = square.color;
            context.fillRect(x, y, width, height);
            context.stroke();
        }
    }

}