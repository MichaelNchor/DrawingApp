///////////ADD IMAGES TO CANVAS/////////////////

function AddImagesTool(){
    this.name = 'addImagesTool';
    this.icon = '/assets/addImage.jpg';
       
    var selectedImage;
    var editform;
    var imgbutton;

    var move;
    var form;
    
    var imageMode = 0;
    var imageArr = {x: 200, y: 100, w: width/5, h: height/2};
    var moveArr = {x: imageArr.x + 50, y: imageArr.y + 20};
    var formArr = {x: imageArr.x + imageArr.w + 60, y: imageArr.y + imageArr.h + 30};
    
    this.draw = function(){
        ///////////////////////////////////////////////////////////////////////
        if(imageMode == 1){
            ///draw the image chosen from explorefile
                   image(imageSelected, imageArr.x ,imageArr.y ,imageArr.w ,imageArr.h);
        if(mouseIsPressed){
            ///move the image as the move control is moved
            ///the position of the image must be related
            ///directly to the position of the move control
            ///the position of the move control must be the
            ///mouseX and mouseY positions.     

            if(dist(mouseX, mouseY, move.x - 15, move.y + 5) < 70){
                   move.x = mouseX + 40;
                   move.y = mouseY + 20;
                   form.x = imageArr.x + imageArr.w + 60;
                   form.y = imageArr.y + imageArr.h + 30;
                   imageArr.x = mouseX;
                   imageArr.y = mouseY;
                
                   updatePixels();  
                   move.position(move.x, move.y);                
                   form.position(form.x, form.y);
                   cursor('grab');
            };

            ///change thw width and height of the image 
            ///as the move control is moved
            ///the position of the image must be related
            ///directly to the position of the form control
            ///the position of the form control must be the
            ///mouseX and mouseY positions.               
            if(dist(mouseX, mouseY, form.x, form.y) < 70){
                   form.x = mouseX + 40;
                   form.y = mouseY + 20;
                   var w = mouseX - imageArr.x - 15;
                   var h = mouseY - imageArr.y - 10;

                   imageArr.w = w;
                   imageArr.h = h;           

                   updatePixels(); 
                   move.position(move.x, move.y);
                   form.position(form.x, form.y);
                   cursor('grab');
              }
            }
          }else{
                   cursor(ARROW)
          }
    };
    
    this.populateOptions = function(){
        
        select('.options').html('<div id="imgdiv"><div id="imgbuttons"><div id="addimg"></div><div id="explorefiles"></div></div><div id="currentimg"></div></div>');
        
        //////////Addimages button///////////////
        imgbutton = createButton('add images');
        imgbutton.parent('#addimg');
        
        /////////Editform button//////////
        editform = createButton('edit Form');
        editform.parent('#addimg');
        editform.hide();
        
        //form and move 
        move = createImg('/assets/move.png','');
        move.attribute('id','move');
        move.size(30,30); 
        
        form = createImg('/assets/form.png',''); 
        form.attribute('id','form');
        form.size(25,25);    
        
        move.hide();
        form.hide();
        
            imgbutton.mousePressed(function(){
            //////////As imgbutton is pressed show explore files/////////////
            //////////to choose image from file explorer//////////////
            if(imageMode == 0){
                imgbutton.hide();

                explorefile = createFileInput(getfiles);
                explorefile.attribute('id','explore');
                explorefile.parent('#explorefiles');
                explorefile.attribute('accept','image/*');

             explorefile.changed(function(){
                imgbutton.show();
                imgbutton.html('finish');

                explorefile.hide();
                editform.show();
                imageMode = 1;
            });
            ////As expore files loads the image it displays the image and///////
            ////there is an option to edit form, which when clicked you can/////
            ////edit the form .i.e size and position of the image///////////////
            }else if(imageMode == 1){
                imgbutton.html('add images');
                editform.hide();

                imageMode = 0;                
                imageArr = {x: 200, y: 100, w: width/5, h: height/2};
                moveArr = {x: imageArr.x + 50, y: imageArr.y + 20};
                formArr = {x: imageArr.x + imageArr.w + 60, y: imageArr.y + imageArr.h + 30};               
            }
            });
        
            ///draw the move and form controls when the edit form is pressed
            editform.mousePressed(function(){
            if(imageMode == 1){
                form.position(formArr.x, formArr.y);
                move.position(moveArr.x, moveArr.y);
                form.show();
                move.show();
                editform.hide();
                imgbutton.html('Done');
                                
                imgbutton.mousePressed(function(){
                loadPixels();
                imgbutton.html('add images');    
                editform.html('edit Form')
                editform.hide();
                move.hide();
                form.hide();
                    
                imageMode = 0;
                imageArr = {x: 200, y: 100, w: width/5, h: height/2};
                moveArr = {x: imageArr.x + 50, y: imageArr.y + 20};
                formArr = {x: imageArr.x + imageArr.w + 60, y: imageArr.y + imageArr.h + 30};                   
                });
            }
            });
    }

    //this function must process the file from explorer
    function getfiles(file){
    if(file.type === 'image') {
        print(file);
        imgsource = file.data.toString();
        imageSelected = createImg(file.data,'');
        imageSelected.hide();
    }else{
        imageSelected = null;
      } 
    }

    this.unselectTool = function(){
        updatePixels();
        ///reset .options div when unselected
        imageMode = 0;
        select('.options').html('');
    }
}