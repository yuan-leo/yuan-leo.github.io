/**
 * This File is for setting up the mondrian generator & showing it
 */

/**
 * create a mondrian and draw it
 * @param {HTMLCanvas} canvas
 * @param {object} opts
 */
function createMondrian(canvas, opts) {
   var mondrian = generateMondrian(canvas.width,canvas.height, opts);
   drawMondrian(mondrian, canvas);
   return mondrian;
}

var defaultOpts = {
    minHLines: 1,
    maxHLines: 3,
    minVLines: 2,
    maxVLines: 4,
    minShortLines: 3,
    maxShortLines: 7,
    minSquares: 4,
    maxSquares: 6,
    numUsableSquares: 6,
};

var wideOpts = {
    minHLines: 2,
    maxHLines: 5,
    minVLines: 2,
    maxVLines: 4,
    minShortLines: 3,
    maxShortLines: 7,
    minSquares: 4,
    maxSquares: 6,
};

var narrowOpts = {
    minHLines: 3,
    maxHLines: 6,
    minVLines: 1,
    maxVLines: 3,
    minShortLines: 2,
    maxShortLines: 5,
    minSquares: 2,
    maxSquares: 5,
};

function init() {

};

var narrowOpts = {
    minHLines: 1,
    maxHLines: 4,
    minVLines: 1,
    maxVLines: 3,
    minShortLines: 2,
    maxShortLines: 4,
};

function init() {
   var canvas = document.getElementsByClassName('canvas')[0];
   hideContent();

   var opts = defaultOpts;
   var height = window.innerHeight;
   var width = window.innerWidth;

   // if very narrow, then change values
   if (width < 800) {
      console.log("narrow mode on");
      //height = width * 3;
      opts = _.assign(opts, narrowOpts);
   } else if (width > 1200) {
      console.log("wide mode on");
      opts = _.assign(opts, wideOpts);
   }

   canvas.height = height;
   canvas.width = width;

   var mondrian = createMondrian(canvas, opts);
   insertContent(mondrian);

}

var debouncedInit = _.debounce(init,300, {maxWait: 2000});

window.addEventListener("load", function() {
    debouncedInit();
});

window.addEventListener("resize", function() {
    debouncedInit();
});