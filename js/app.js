$(document).ready( function() {

	var itemsOnList = 0;
	var itemsPurchased = 0;

	// Hide instructions if clicked
	$('#hideButton').click( function() {
		$('#instructionsSection').fadeToggle("fast","linear", function() {
			$('#buttonReadInstructions').fadeToggle("slow","linear");
		});
	});

	// Reveal instructions if clicked
	$('#buttonReadInstructions').click( function() {
		$('#buttonReadInstructions').fadeToggle("fast","linear", function() {
			$('#instructionsSection').fadeToggle("slow","linear");
		});
	});

	// Add an item to the list
	$('#interfaceAddButton').click( function(){
		
		// Get the string in the input field
		var itemToAdd = $('#addListItem').filter(':input').val();
		
		// Check if itemToAdd is valid.
		if( !itemToAdd )
		{
			//if error message not displayed, display it
			if( !$('#addListItem').next('p').length ) {
				$('#addListItem').after("<p class=\"spaceAbove10 centerText hidden\">Please type in the name of the item</p>");
				$('#addListItem').next('p').fadeToggle("fast","linear");
			}
			//otherwise flash the error message for UI
			else
			{
				$('#addListItem').next('p').fadeToggle("fast","linear");
				$('#addListItem').next('p').fadeToggle("fast","linear");
			}
		}
		// item is valid, now add to list
		else {

			itemsOnList++; //increment itemsOnList
			
			//Append to shoppingList, with custom ID based on itemsOnList
			$('#shoppingList').append("<li id=\"listedItem" + itemsOnList + "\" class=\"listItem grid12 spaceAbove20 hidden\"><i class=\"fa fa-bars grid1 roundedRectangle leftRounded centerText\"></i><input class=\"grid11 rightRounded paddingRight50 centerText\" type=\"text\" id=\"editListItem" + itemsOnList + "\" value=\"" + itemToAdd + "\"/></li>");
			$('#listedItem' + itemsOnList).fadeToggle("fast", "linear");

			//delete text from input field
			$('#addListItem').filter(':input').val("");

			//Remove error message if previously displayed
			if( $('#addListItem').next('p').length ) {
				$('#addListItem').next('p').fadeToggle("fast","linear",function() {
					$('#addListItem').next('p').remove();	
				});
			}	
		}
	});

	// delete an item from the shopping list
	$('#shoppingList').on("keyup", "li input", function(event) {
		
		//If enter detected, begin delete process
		if(event.keyCode == 13) {
			deleteListItem( this );
		}	
		itemsOnList--;
	});

	// delete an item from the purchased list
	$('#purchasedList').on("keyup", "li input", function(event) {

		//If enter detected, begin delete process
		if(event.keyCode == 13) {
			deleteListItem( this );
		}
		itemsPurchased--;	
	});

	// Enable sorting
	$( "#shoppingList, #purchasedList" ).sortable({
      connectWith: ".connectedSortable"
    });

    $('#purchasedList').on("sortstop", "li input")
      if ()

});

// deleteListItem argument is a list item in the form of input.
// This function deletes items on both shopping and purchased list
function deleteListItem ( whichItem ) {

	// if focus is on input not in the interface, then proceed
	if( $(whichItem).parents('#shoppingList').length || $(whichItem).parents('#purchasedList').length ) {
			
		//if text is deleted, delete the item
		if( !$(whichItem).val() ) {
			$(whichItem).parent('li').fadeToggle(300,"linear", function(){ 
				$(whichItem).parent('li').remove();
			});								
		}
	}
};