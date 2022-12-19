function HelperFunctions() {
    
	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background(255, 255, 255);
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

    //droplist
    var droplist = createSelect();
    droplist.option('jpg');    
    droplist.option('png');
    droplist.option('bmp');
    
    droplist.size(80,23);
    droplist.style('display','none');
    droplist.style('margin-right','15px');
    droplist.style('border-style','groove');
    select('.box header').child(droplist);
    
    //savebutton
    var save = createButton('save');
    save.style('display','none');
    select('.box header').child(save);
    
	//event handler for the save image button. saves the canvas to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
        select("#clearButton").style('display','none');
        select("#saveImageButton").style('display','none');
        save.style('display','');
        droplist.style('display','');
	});
 
    var extension = 'jpg';
    
    //droplist to choose image type;
    droplist.changed(function(){
        extension = droplist.value().toString();           
    });

    save.mouseClicked(function(){
        select("#saveImageButton").style('display','none');
        var savename = prompt('Enter file name please','mySketch');
        saveCanvas(savename, extension);
        
        save.style('display','none');
        droplist.style('display','none');
        select("#clearButton").style('display','');
        select("#saveImageButton").style('display','');
    });
}