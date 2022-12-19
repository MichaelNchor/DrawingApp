///////////STAMP TOOL///////////////

function StampTool(){
	this.name = "StampTool";
	this.icon = "assets/StampTool.jpg";
    var view = null;

this.draw = function(){
    ///////////////////////////////////////////////////////////////////////////
    //Draws images to canvas
    if(mouseIsPressed){
                for(var i = 0; i < nimgSlider.value(); i ++){
                var imgX = random((mouseX - size/2) - 10, (mouseX - size/2) + 10);
                var imgY = random((mouseY - size/2) - 10,(mouseY - size/2) + 10);
                var size = imgSizeSlider.value();
                image(imgPicked, imgX, imgY, size, size);
			}
    }
}


this.populateOptions = function(){
    //embed divs to place sliders for stampsize and stamp concentration into
    select('.options').html("Concentration<div id='nimageRange'></div>Size<div id='imageRange'></div><div id='file'></div>")

    ///create sliders for stamp size and stamp concentration
    imgSizeSlider = createSlider(5 , 50 , 20);
    nimgSlider = createSlider(2 , 20 , 5);
    nimgSlider = createSlider(2 , 20 , 5);
    
    //embed the sliders into the divs
    imgSizeSlider.parent("#imageRange");
    nimgSlider.parent("#nimageRange"); 
    
    //create File input 
    fileInput = createFileInput(handleFile);
    fileInput.parent('#file');
    fileInput.attribute('id','fileinput');
    fileInput.attribute('accept','image/*');
    
    //create display showing curreent image
    view = createImg(source,'');
    view.attribute('class','view');
    view.parent('#file');
    
    fileInput.changed(function(){
    view.remove();
    });
}

function handleFile(file){
    
if (file.type === 'image') {
    source = file.data.toString();
    imgPicked = createImg(file.data,'');
    imgPicked.hide();
    
    //image to show which you selected 
    view = createImg(source,'');
    view.attribute('class','view');
    view.parent('#file');
    
  } else {
    imgPicked = null;
  }
    
  fileInput.changed(function(){
    view.remove();
  });  
}

this.unselectTool = function() {
    updatePixels();
    //clear options
    select(".options").html("");
};
    

}