//global variables that will store the toolbox colour palette
//amnd the helper functions

var toolbox = null;
var colourP = null;
var helpers = null;

var Strokesize;
var color; 

var imgPicked;
var imgSizeSlider;
var nimgSlider;
var fileInput;
var handleFile;
var source = '/assets/smile.png';
var imgsource = '/assets/beforeload.png';

var imageSelected;
var explorefile;
var getfiles;

//////DEFINE FONT  NAMES////
var BrightCandy;
var Calibri;
var Jokerman;
var TimesNewRoman;

var canvas;

////LOAD FONTS AND IMAGES//////
function preload(){
    ///////LOAD IMAGES FROM FILE///////////
    imgPicked = loadImage(source);
    imageSelected = loadImage(imgsource);

    ///////LOAD FONTS////////////
    BrightCandy = loadFont('/fonts/BrightCandy-2OWPW.ttf');
    Calibri = loadFont('/fonts/calibri.ttf');
    Jokerman = loadFont('/fonts/JOKERMAN.TTF');
    TimesNewRoman = loadFont('/fonts/timesbi.ttf');
}

function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    c.attribute('id','canvas');
	c.parent("content");
    canvas = c;
    
	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();
    
    
	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
    toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new ScissorsTool());
    toolbox.addTool(new Eraser());    
	toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new StampTool());
    toolbox.addTool(new textTool());
    toolbox.addTool(new Shapes());
    toolbox.addTool(new AddImagesTool());
    
	background(255);
}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
    
    //Call the strokesize function whenever we draw
     strokeWeight(Strokesize());
    
    //Update selected Color from Colorpicker
    colourP.selectedColour = select('#colorpicker').value();
}

    ////font size/////////
function Strokesize(){
    var t = document.getElementById('strokesize')
    return parseInt(t.value);
}