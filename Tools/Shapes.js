/////////////DRAW SHAPES////////////////

function Shapes(){
    //    icon loaded to screen
	this.icon = "assets/2dShapes.jpg";
	this.name = "Shapes";
      
    var rectangleTool;
    var ellipseTool;
    var starTool;
    var triangleTool;
    
    var colorfilled = false;
    var drawing = false; 
    var rectSelected = false;
    var elSelected = false;
    var starSelected = false;
    var triSelected = false;
    
    var startMouseX = -1;
    var startMouseY = -1;
    
    this.draw = function(){
    //////////////////////////////////////////////////
		if(mouseIsPressed){
			if(startMouseX == -1){
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                loadPixels();
			}else{
                
                updatePixels();
                
            if(colorfilled == true){
                fill(colourP.selectedColour);
            }else{
                noFill();
            }

            if(rectSelected == true){
                
                ///Rectangle
				rect(startMouseX, startMouseY, abs(startMouseX - mouseX),abs(startMouseY - mouseY));
                
            }else if(elSelected == true){
                
                ///Ellipse
                ellipse(startMouseX, startMouseY, abs(startMouseX - mouseX),abs(startMouseY - mouseY));
                
            }else if(starSelected == true){
                
                ///Star
                
                beginShape();
                ////outerpoints
                vertex(startMouseX, startMouseY)
                
                vertex(mouseX - abs(mouseX - startMouseX) * 3/4 , mouseY - abs(mouseY - startMouseY)*3/4 )
                
                vertex(mouseX, mouseY - abs(mouseY - startMouseY)*3/4)
                
                vertex(mouseX - abs(mouseX - startMouseX)/2 , mouseY - abs(mouseY - startMouseY)/2)
                
                vertex(mouseX - 10 , mouseY - 10)
                
                vertex(mouseX - abs(mouseX - startMouseX) , mouseY - abs(mouseY - startMouseY) * 2/8)
                
                vertex(mouseX - abs(mouseX - startMouseX) * 2 + 10, mouseY - 10)
                
                vertex(mouseX - abs(mouseX - startMouseX)*12/8 , mouseY - abs(mouseY - startMouseY)/2)
                
                vertex(mouseX - abs(mouseX - startMouseX) * 2 , mouseY - abs(mouseY - startMouseY)*3/4)
                
                vertex(mouseX - abs(mouseX - startMouseX) * 2 * 5/8, mouseY - abs(mouseY - startMouseY)*3/4  )
                
                vertex(startMouseX, startMouseY)
                
                endShape();
                
            }else{ 
                
                ///Triangle
                triangle(mouseX, mouseY, startMouseX - abs(startMouseX - mouseX) ,startMouseY + abs(mouseY - startMouseY), startMouseX, startMouseY - abs(mouseY - startMouseY));
            }
            
            }
        
        }else if(drawing){
                 drawing = false;
                 startMouseX = -1;
                 startMouseY = -1;
        }			
}
    
 	//adds a button and click handler to the options area. When clicked
    
	this.populateOptions = function() {
        
        //Add Shapes
        //Shapes must have an icon, name , draw function.
        //Each Shape displays in the box options div
        //When a shape is clicked its properities are available
        
        select('.options').html("<div id='Shapes'></div>");
        
        rectangleTool = createButton('');
        rectangleTool.size(70,70);
        rectangleTool.parent('#Shapes');
        
        ellipseTool = createButton('');
        ellipseTool.size(70,70);
        ellipseTool.parent('#Shapes');
        
        starTool = createButton('');
        starTool.size(70,70);
        starTool.parent('#Shapes');
        
        triangleTool = createButton('');
        triangleTool.size(70,70);
        triangleTool.parent('#Shapes')
                
        //click handler
		var Fill = createButton('Colour-filled Shape');
        Fill.parent('#Shapes');
        
        //default shape should have no fill
        noFill();
        
        //Check the fill button to change when its clicked to fill and not fill
        Fill.mousePressed(function() {
			if(colorfilled == false) {
                colorfilled = true;                                
                Fill.html('No Fill');
            }else if(colorfilled == true){
                colorfilled = false;
                Fill.html('Colour-filled Shape');
			}
		});
        
        ///set booleans for each shape back ones its double pressed
        
        rectangleTool.mousePressed(function(){
            if(rectSelected == false){
                rectSelected = true;
                elSelected = false;
                starSelected = false;
                triSelected = false;
        }else{
                rectSelected = false;
                elSelected = false;
                starSelected = false;
                triSelected = false;
        }});

        ellipseTool.mousePressed(function(){
            if(elSelected == false){
                rectSelected = false;
                elSelected = true;
                starSelected = false;
                triSelected = false;
        }else{
                rectSelected = false;
                elSelected = false;
                starSelected = false;
                triSelected = false;
        }});
        starTool.mousePressed(function(){
            if(starSelected == false){
                rectSelected = false;
                elSelected = false;
                starSelected = true;
                triSelected = false;
        }else{
                rectSelected = false;
                elSelected = false;
                starSelected = false;
                triSelected = false;
        }});
        triangleTool.mousePressed(function(){
            if(triSelected == false){
                rectSelected = false;
                elSelected = false;
                starSelected = false;
                triSelected = true;    
        }else{
                rectSelected = false;
                elSelected = false;
                starSelected = false;
                triSelected = false;
        }});     
}
  
this.unselectTool = function() {
    updatePixels();
    //clear options
        select(".options").html("");
        noFill();
};
}