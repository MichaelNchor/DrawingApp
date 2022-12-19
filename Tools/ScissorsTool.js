/////////////SCISSORS TOOL////////////////////

function ScissorsTool(){

    this.name = "ScissorsTool";
    this.icon = "assets/scissors.jpg"
    
    var selectMode;
    var selectedArea;

    var selectButton;
    var selectedPixels;
    
    var finalX;
    var finalY;
    var finalW;
    var finalH;
    
    selectMode = 0;
	selectedArea = {x: -1, y: -1, w: 100, h: 100};
    
    this.draw = function(){

    if(mouseIsPressed){
        
        if(selectMode == 0){
        /////////////////////
            
        }else if (selectMode == 1){
            if(selectedArea.x == -1){
            loadPixels();
            selectedArea.x = mouseX;
            selectedArea.y = mouseY;     

            }else{
                
            //refresh screen                
			updatePixels();

			//store the pixels
			selectedPixels = get(selectedArea.x , selectedArea.y , selectedArea.w, selectedArea.h);    
            
		    var w = mouseX - selectedArea.x;
		    var h = mouseY - selectedArea.y;

		    selectedArea.w = w;
		    selectedArea.h = h;
			
			noStroke();
			fill(0,0,255,100);
			rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
        
            finalX = selectedArea.x;
            finalY = selectedArea.y;
            finalW = selectedArea.w;
            finalH = selectedArea.h;

            }
            
		}else if(selectMode == 2){
		    image(selectedPixels, mouseX, mouseY);  
        };
        
    }else{
        if(selectMode == 1){
            loadPixels();
        	selectedArea = {x: -1, y: -1, w: 100, h: 100};
        }
    };
    
    }

    this.populateOptions = function(){
    
    selectButton = createButton('select area');
    select('.options').html('<div id="scissors"></div>');
    selectButton.parent('#scissors');
    
    selectButton.mousePressed(function(){		

		if(selectMode == 0){
			selectMode += 1;
			selectButton.html("cut");
		}else if(selectMode == 1){
			selectMode += 1;
			selectButton.html("end paste");
			
			//draw a rectangle over it
			fill(255);
			noStroke();
			rect(finalX, finalY, finalW, finalH);
		}else if(selectMode == 2){
			selectMode = 0;
			selectedArea = {x: -1, y: -1, w: 100, h:100};
			selectButton.html("select area");
		}
    });

    }

    this.unselectTool = function() {
         //reset stroke color
         stroke(colourP.selectedColour);
         //reset fill
         noFill();
         //reset selectmode boolean
         selectMode = 0;
         //remove buttons from button area
         select(".options").html("");
    }; 
}