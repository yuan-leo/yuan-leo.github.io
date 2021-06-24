var MIN_ACCEPTABLE_SQUARE_WIDTH = 200;
var MIN_ACCEPTABLE_SQUARE_HEIGHT = 200;
var MAX_ITERATIONS = 50;
var MIN_LINE_SEPARATION = 40;

function generateMondrian(width, height, opts) {
   var mondrian;
   for(var itr=0;itr<MAX_ITERATIONS;itr++) {
      mondrian = generateMondrianWork(width, height, opts);

      if (validateMondrian(mondrian, opts)) {
         console.log("valid mondrian generated from " + itr + " iterations");
         return mondrian;
      }
   }
   console.log("mondrian failed to validate, showing last attempt");
   return mondrian;
}

function generateMondrianWork(width, height, opts) {
   var mondrian = new Mondrian(width, height);

   opts = _.assign(defaultOpts, opts);

   mondrian.addLine(new Line(new Point(0,0), new Point(mondrian.width,0)));
   mondrian.addLine(new Line(new Point(mondrian.width,0), new Point(mondrian.width,mondrian.height)));
   mondrian.addLine(new Line(new Point(0,0), new Point(0, mondrian.height)));
   mondrian.addLine(new Line(new Point(0,mondrian.height), new Point(mondrian.width,mondrian.height)));

   _.times(getRand(opts.minHLines, opts.maxHLines), function() {
      mondrian.addLine(generateLine(mondrian, {isHorizontal: true, full:true}));
   });
   _.times(getRand(opts.minVLines, opts.maxVLines), function() {
      mondrian.addLine(generateLine(mondrian, {isHorizontal: false, full:true}));
   });
   _.times(getRand(opts.minShortLines, opts.maxShortLines), function() {
      mondrian.addLine(generateLine(mondrian, {full:false}));
   });

   getSquares(mondrian);

   _.times(getRand(opts.minSquares,opts.maxSquares), function() {
      colorSquare(mondrian, opts.numUsableSquares);
   })

   return mondrian;
}

function validateMondrian(mondrian, opts) {
   return _.all(mondrian.squares, function(square, idx) {
      if (idx >= opts.numUsableSquares) {
         return true;
      } else if (_.isNaN(square.width) || _.isNaN(square.height)) {
         return true;
      }
      //console.log("debug: validateMondrian", mondrian, idx, square.color, square.width, square.height);

      return !square.color &&
         square.width > MIN_ACCEPTABLE_SQUARE_WIDTH &&
         square.height > MIN_ACCEPTABLE_SQUARE_HEIGHT;


   });
}

//-----------SQUARE CODE-------------------------------------------------------------

/**
 * Get all the squares in the mondrian.
 *
 * The algorithm goes clockwise:
 * top left corner, top right corner, bottom right, bottom left,
 * but via top left corner and bottom right corner
 *
 * @param {Mondrian} mondrian
 */
function getSquares(mondrian) {
   var hLines = _(mondrian.lines).filter('isHorizontal').sortBy('start.y').run();
   var vLines = _(mondrian.lines).filter({isHorizontal: false}).sortBy('start.x').run();
   //console.log(mondrian);

   _.forEach(hLines, function(hLine, idx) {
      // for each horizonal line, pick the top left point
      var x1 = hLine.start.x;
      var y1 = hLine.start.y;
      while(_.isNumber(x1) && x1 < mondrian.width && x1 < hLine.end.x) {

         var x2;
         var y2;

         // find y2 via. going down.
         _.forEach(hLines, function(hLine2) {
            if (hLine2.start.x <= x1 && hLine2.end.x > x1 && hLine2.start.y > y1) {
               y2 = hLine2.start.y;
               return false;
            }
         });

         // find x2 via. going right
         _.forEach(vLines, function(vLine) {
            if (vLine.start.y <= y1 && vLine.end.y >= y1 && vLine.start.x > x1) {
               x2 = vLine.start.x;
               return false;
            }
         });

         if (_.isNumber(x1) && _.isNumber(y1) && _.isNumber(x2) && _.isNumber(y2)) {
            var square = new Square(new Point(x1,y1), new Point(x2, y2));
            mondrian.addSquare(square);
         }

         x1 = x2;
      }
   });
   // _.remove(mondrian.squares, {width: undefined});
   // _.remove(mondrian.squares, {height: undefined});

   mondrian.squares = _.sortByOrder(mondrian.squares, ['area'], ['desc']);
}

function colorSquare(mondrian, minSquareIdx) {
   if (mondrian.squares.length - 1 < minSquareIdx) {
         return;
   }
   var colors = ['#c70000', '#f4b600', '#2d2bb4', '#000000'];
   var square = mondrian.squares[getRand(minSquareIdx,mondrian.squares.length-1)];
   square.color = colors[getRand(0,colors.length-1)];

}

//-----------LINE CODE---------------------------------------------------------------
/**
 * opts.isHorizontal
 * opts.full
 */
function generateLine(mondrian, opts) {
   var line;
   for(var itr=0; itr < 10; itr++) {
      line = generateLineWork(mondrian, opts);

      line = extendLine(mondrian, line);
      if (isLineAcceptable(mondrian, line)) {
         break;
      } else if (itr === 9) {
         console.log("line not acceptable", itr);
      }
   }

   return line;
}


function extendLine(mondrian, line) {
   if (line.isHorizontal) {
      var point1 = line.start;
      var point2 = line.end;

      while(point1.x >= 0) {
         if (_.any(mondrian.lines, function(curLine) {
            return !curLine.isHorizontal &&
               point1.x === curLine.start.x &&
               point1.y > curLine.start.y &&
               point1.y < curLine.end.y;
         })) {
            break;
         }
         point1.x--;
      }
      while(point2.x <= mondrian.width) {
         if (_.any(mondrian.lines, function(curLine) {
            return !curLine.isHorizontal &&
               point2.x === curLine.start.x &&
               point2.y > curLine.start.y &&
               point2.y < curLine.end.y;
         })) {
            break;
         }
         point2.x++;
      }
   } else {
      var point1 = line.start;
      var point2 = line.end;

      while(point1.y >= 0) {
         if (_.any(mondrian.lines, function(curLine) {
            return curLine.isHorizontal &&
               point1.y === curLine.start.y &&
               point1.x > curLine.start.x &&
               point1.x < curLine.end.x;
         })) {
            break;
         }
         point1.y--;
      }
      while(point2.y <= mondrian.height) {
         if (_.any(mondrian.lines, function(curLine) {
            return !curLine.isHorizontal &&
               point2.y === curLine.start.y &&
               point2.x > curLine.start.x &&
               point2.x < curLine.end.x;
         })) {
            break;
         }
         point2.y++;
      }
   }

   //find nearest end line to begin and end
   return line;
}

function isLineAcceptable(mondrian, line) {
   if (line.isHorizontal) {
      return !_(mondrian.lines).filter('isHorizontal').any(function(curLine) {
         return Math.abs(line.start.y - curLine.start.y) < MIN_LINE_SEPARATION;
      });
   } else {
      return !_(mondrian.lines).filter({isHorizontal: false}).any(function(curLine) {
         return Math.abs(line.start.x - curLine.start.x) < MIN_LINE_SEPARATION;
      });
   }
}

function generateLineWork(mondrian, opts) {
   if (_.isUndefined(opts.isHorizontal)) {
         opts.isHorizontal = getRand(0,1);
   }

   var x = getRand(0, mondrian.width);
   var y = getRand(0, mondrian.height);

   var startPoint, endPoint;

   if (opts.full) {
      if (opts.isHorizontal) {
         startPoint = new Point(0, y);
         endPoint = new Point(mondrian.width, y);
      } else {
         startPoint = new Point(x, 0);
         endPoint = new Point(x, mondrian.height);
      }
   } else {
      var length = (opts.isHorizontal) ? getRand(0, mondrian.width) : getRand(0, mondrian.height);
      if (opts.isHorizontal) {
         startPoint = new Point(Math.floor(x-length/2), y);
         if (startPoint.x < 0) {
               startPoint.x = 0;
         }
         endPoint = new Point(Math.floor(x+length/2), y);
         if (endPoint.x > mondrian.width) {
               endPoint.x = mondrian.width;
         }
      } else {
         startPoint = new Point(x, Math.floor(y-length/2));
         if (startPoint.y < 0) {
               startPoint.y = 0;
         }
         endPoint = new Point(x, Math.floor(y+length/2));
         if (endPoint.y > mondrian.height) {
               endPoint.y = mondrian.height;
         }
      }
   }
   return new Line(startPoint, endPoint);
}
