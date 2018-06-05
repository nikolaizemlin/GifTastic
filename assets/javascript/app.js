
  // Initial array of cartoons
  var cartoons = ['cars 3', 'Cats', 'thor', 'Death Note', 'Bugs Bunny', 'Batman', 
  'Dogs', 'Superman', 'X-Men', 'Spiderman', 'The Flash'];

  // ========================================================

  // displaycartoonInfo function now re-renders the HTML to display the appropriate content. 
  function displaycartoonInfo(){

    //clear container
    //$('#cartoonsView').html("");     
    $('#cartoonsView').empty();     

    var cartoon = $(this).attr('data-name');
    //var queryURL = "http://www.omdbapi.com/?t=" + cartoon + "&y=&plot=short&r=json";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
       .done(function(response) {
           var results = response.data;

           for(var i=0; i < results.length; i++){


              if (results[i].rating == "r" || results[i].rating == "pg-13")
              {

              }
              else {
               //var gifDiv = $('<div class="item">')
               // Creates a generic div to hold the cartoon

               console.log(response)

               //var cartoonDiv = $('<div class="cartoon">');
               //var cartoonDiv = $('<div>').attr('class','cartoon');             
               //var cartoonImage = $('<img class="cartoonImage">');
               //var cartoonImage = $('<div>').attr('class','cartoon');

               var rating = results[i].rating;
               var p = $('<p>').text( "Rating: " + rating);
               var cartoonImage = $('<img>');

               //cartoonImage.attr('src', results[i].images.fixed_height.url);
               cartoonImage.attr('src', results[i].images.fixed_height_still.url);
               cartoonImage.attr('data-still', results[i].images.fixed_height_still.url);
               cartoonImage.attr('data-animate', results[i].images.fixed_height.url);
               cartoonImage.attr('data-state', 'still');
               cartoonImage.addClass('cartoonImage');
               
               //cartoonDiv.append(p)
               //cartoonDiv.append(cartoonImage)

               $('#cartoonsView').append(p);
               $('#cartoonsView').append(cartoonImage);

               //$('#cartoonsView').prepend(cartoonDiv);
               //$('#cartoonsView').html(cartoonDiv);
               //$('#cartoonsView').append(cartoonDiv);
               
               // PAUSE / ANIMATE GIFS

                // loop through all gifs and extract url data
                // use trim or similar function to add -s to gif url
                // assign all gifs with data-still -s.gif url  
                // assign all gifs with data-animate regular.gif url 
                // display all gifs as paused with -s.gif extension
                // create toggle pause-animate state when click on cartoonImage
              }
           }
      $('.cartoonImage').on('click', function(){
        //STEP ONE: study the html above. Look at all the data attributes. Run the file in the browser. Look at the images. After you fill in steps 1 and 2 you'll be able to pause gifs from giphy.

        //STEP TWO: make a variable named state and then reference the button's data-state into it. Do not use .data('state'). It won't work the way we expect.

        //---------------FILL IN CODE HERE FOR STEP TWO----------------------------
          var state = $(this).attr('data-state'); 
            console.log(state);
          //----------------------------------------------------

          /*STEP THREE: 
            * if variable state is equal to 'still' then 
              * update the src attribute of this image that you clicked on to what data-animate is equal to for this image
              * and update the data-state attribute to 'animate'
            * if state does not equal 'still' then 
              * update the src attribute of this image that you clicked on to what data-still is equal to for this image
              * and update the data-state attribute to 'still'
      */

          //---------------FILL IN CODE HERE FOR STEP THREE----------------------------
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
            //----------------------------------------------------
            //STEP FOUR: open the file in the browser and click on the images. Then click again to pause.
      });
      });   
  }
  // ========================================================

  // Generic function for displaying cartoon data 
  function renderButtons(){ 

    // Deletes the cartoons prior to adding new cartoons (this is necessary otherwise you will have repeat buttons)
    $('#buttonsView').empty();

    // Loops through the array of cartoons
    for (var i = 0; i < cartoons.length; i++){

      // Then dynamicaly generates buttons for each cartoon in the array

      // Note the jQUery syntax here... 
        var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        a.addClass('cartoon'); // Added a class 
        a.addClass("btn btn-success"); // Added a class 
        a.addClass("btn btn-primary btn-lg");
        a.attr('data-name', cartoons[i]); // Added a data-attribute
        a.text(cartoons[i]); // Provided the initial button text
        $('#buttonsView').append(a); // Added the button to the HTML
    }
  }
  // This function handles events where one button is clicked
  $('#addcartoon').on('click', function(){

    //clear container
    //$('#cartoonsView').html("");     

    // This line of code will grab the input from the textbox
    var cartoon = $('#cartoon-input').val().trim();

    // The cartoon from the textbox is then added to our array
    cartoons.push(cartoon);
    
    // Our array then runs which handles the processing of our cartoon array
    renderButtons();
    // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
    return false;
  })
  // ========================================================
  // Generic function for displaying the cartoonInfo
  $(document).on('click', '.cartoon', displaycartoonInfo);
  // ========================================================

  // This calls the renderButtons() function
  renderButtons();
  //displaycartoonInfo();
