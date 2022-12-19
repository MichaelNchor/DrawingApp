/////////////DRAW TEXT  TO CANVAS/////////////

function textTool(){
    this.name = 'textTool';
    this.icon = '/assets/textTool.jpg';

    var textMode = 0;
    var textPosition = {x: 220, y: 120};
    var moveArr = {x: textPosition.x + 50, y: textPosition.y - 20};

    var texttotype;
    var textDiv;

    var SizeFont;
    var Style;
    var move;
    
    var underline = false;
    var linethrough = false;
    var overline = false;
    
    var width;
    var lineY;
    
    this.draw = function(){
        fill(colourP.selectedColour);
            if(textMode == 0){
                textMode = 1;
            }else if(textMode == 1){
                loadPixels();
                textPosition.x = 230;
                textPosition.y = 120;

                textMode = 2;
            }
        if(textMode == 2){
                updatePixels();
            ///update text as delete or backscpace is pressed
                text(texttotype.value(),textPosition.x, textPosition.y);
                if(keyCode == BACKSPACE || keyCode == DELETE){
                    text(texttotype.value(),textPosition.x , textPosition.y);
                }
            ///call function Apply fonts
                Applyfonts();
            
                if(underline == true){
                        width = textWidth(texttotype.value());
                        lineY = textPosition.y + 5;
                        line(textPosition.x, lineY, textPosition.x + width, lineY);
                }
                
                if(linethrough == true){
                        width = textWidth(texttotype.value());
                        lineY = textPosition.y - textAscent()*1/3;
                        line(textPosition.x, lineY, textPosition.x + width, lineY);
                }
            
                if(overline == true){
                        width = textWidth(texttotype.value());
                        lineY = textPosition.y - textAscent() + 7;
                        line(textPosition.x, lineY, textPosition.x + width, lineY);
                }

                if(mouseIsPressed){
                    if(dist(mouseX, mouseY, move.x - 15, move.y - 15) < 70){
                       cursor('grab');
                       move.x = mouseX + 50;
                       move.y = mouseY + 15;
                       textPosition.x = mouseX + 20;
                       textPosition.y = mouseY + 40;
                       move.position(move.x, move.y);
                }
            }
        }
    }

        this.populateOptions = function(){
            
        ///add buttons an html to the .options div
        select('.options').html('<div id="textTool"><div id="font"></div><div id="sizenfont"></div><div id="text"><input type="text" placeholder="Type Some Text Here...Drag the move control to move text..." id="textarea"></div></div>');
        
        ///Set the various font style and formatting options 
		select('#font').html('<input type="checkbox" name="fonttype" id="text-cmd-bold">Bold<input type="checkbox" name="fonttype" id="text-cmd-italic">Italic<input type="checkbox" name="fonttype" id="text-cmd-underline" >Underline<input type="checkbox" name="fonttype"  id="text-cmd-linethrough">Linethrough<input type="checkbox" name="fonttype"  id="text-cmd-overline" >Overline');

        texttotype = select('#textarea');
        texttotype.style("font-size","11pt");
            
        move = createImg('/assets/move.png','');
        move.size(30, 30);
        move.position(moveArr.x, moveArr.y);
        
        SizeFont = createInput('50','number');
        SizeFont.size(280,30);
        SizeFont.style('background-image','none');
        SizeFont.style('background-color','white');
        SizeFont.parent('#sizenfont');

        Style = createSelect();
        Style.size(288,30);
        Style.parent('#sizenfont');
        Style.style('background-image','none');
        Style.style('background-color','white');
        Style.option('TimesNewRoman');
        Style.option('Calibri');        
        Style.option('Jokerman');
        Style.option('BrightCandy');
    }

    this.unselectTool = function(){
        //////////disable options/////////////
        select('.options').html('');
        textMode = 0;
        move.hide();
        texttotype.value = "";
    }
    
    function Applyfonts(){
        
        /////////////////TEXT FORMATTING OPTIONS/////////////////////
            textFont(Style.value());    
            textSize(parseInt(SizeFont.value()));
        ///get all elements with name font type and check 
        ///if theyre selected if yes apply formatting else remove formatting 
        var radios5 = document.getElementsByName("fonttype");
            for(var i = 0, max = radios5.length; i < max; i++) {
                radios5[i].onclick = function() {
            
            if(document.getElementById(this.id).checked == true) {
                if(this.id == "text-cmd-bold") {
                    textStyle(BOLD);
                }
                if(this.id == "text-cmd-italic") {
                    textStyle(ITALIC);
                }
                if(this.id == "text-cmd-underline") {
                    underline = true;
                }
				if(this.id == "text-cmd-linethrough") {
                    linethrough = true;
                }
				if(this.id == "text-cmd-overline") {
                    overline = true;
                }
              
            } else {
                if(this.id == "text-cmd-bold") {
                    textStyle(NORMAL);
                }
                if(this.id == "text-cmd-italic") {
                    textStyle(NORMAL);
                }  
                if(this.id == "text-cmd-underline") {
                    underline = false;
                }
				if(this.id == "text-cmd-linethrough") {
                    linethrough = false;
                }  
                if(this.id == "text-cmd-overline") {
                    overline = false;
                }
            }
        }
    }        
}
}