$( document ).ready(function() {


	var solvedItems = [];
	var initialUnsolvedItems = [];

	$('.solved').each(function(index, element){
		solvedItems.push({correct: $(element).attr('correct'), position: $(element).offset()});
	});


	$('.unsolved').each(function(index, element){
		initialUnsolvedItems.push({block: $(element).attr('block'), position: $(element).offset()})
	});

	var getInitialPosition = function(id){
		var coord = null;
		
		initialUnsolvedItems.forEach(function(item) {
			if(item.block == id){
				coord = item.position;
			}
		});

		return coord;
	};

	var checkIfCorrect = function(id, position){
		var snapToCoord = false;
		
		solvedItems.forEach(function(item) {
			if(item.correct == id){
				if(
					position.top < item.position.top + 30 
					&& position.top > item.position.top - 30
					&& position.left < item.position.left + 30
					&& position.left > item.position.left -30){
					snapToCoord = { top: item.position.top, left: item.position.left};
				}
			}
		});

		return snapToCoord;
	};

	function init() {
	  $('.unsolved').draggable({
		start: function(event, ui) {
			//console.log("start", event, ui, $(this));
    	},
    	stop: function(event, ui) {
        	var block = $(ui.helper[0]).attr('block');
        	var position = ui.offset;

        	var result =checkIfCorrect(block, position); 

        	if(result){
        		$(ui.helper[0]).offset(result);
        		$(ui.helper[0]).removeClass("grey");
        	}else{
        		$(ui.helper[0]).offset(getInitialPosition(block));
        	}
    	}
	  });
	}

	init();

});
