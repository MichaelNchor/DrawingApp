//Displays and handles the colour palette.
function ColourPalette(){
    
	//make the start colour be black
	this.selectedColour = 'rgba(0,0,0,255)';
    
    //load in the colours
	this.loadColours = function(){
        setColor(Alpha(select('#alpha').value()));
    }

    //This function extracts the red blue and green 
    //components of the current hex string value from the color picker

    function setColor(alphaVal){
        c = select('#colorpicker').value();
        
        //extract red value from current color
        var redHexa = red(c);
        
        //extract green value from current color
        var greenHexa = green(c);
        
        //extract blue value from current color
        var blueHexa = blue(c);
        
        var color = 'rgba(' + [redHexa , greenHexa , blueHexa , alphaVal].join(',') + ')';

        //update Colorpicker
        select('#colorpicker').html(color);     
        this.selectedColour = color;
        stroke(color);
        
    }
    
    //Concatenates the value of alpha with the current color value
    function Alpha(alpha){
        var alphaVal = alpha;  
        return alphaVal;
    }
    
    //call loadcolors when the color picker value changes
    select('#colorpicker').changed(this.loadColours);
    select('#alpha').changed(this.loadColours);
}
