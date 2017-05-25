updateKeysDisplay();

document.addEventListener('keydown', function(event) {

	//hide/show debugger
	if(event.keyCode == 48) {
        	//alert('0 was pressed');
		//var debugger = document.getElementById("debugger");
       		//debugger.style.display = (debugger.style.display == 'block') ? 'none' : 'block';
	}

	if(event.keyCode == 49) {
        	//alert('1 was pressed');
		chipKeys[0] = 1;
	}

	if(event.keyCode == 50) {
  		//alert('2 was pressed');

		chipKeys[1] = 1;
		//setTimeout(function () { chipKeys[1] = 0 }, 250);
	}

	if(event.keyCode == 51) {
		//alert('3 was pressed');
		chipKeys[2] = 1;
	}

	if(event.keyCode == 52) {
        	//alert('4 was pressed');
		chipKeys[3] = 1;
	}

	if(event.keyCode == 81) {
		//alert('Q was pressed');
		chipKeys[4] = 1;
		setTimeout(function () { chipKeys[4] = 0 }, 50);
	}

	if(event.keyCode == 87) {
        	//alert('W was pressed');
		chipKeys[5] = 1;
	}

	if(event.keyCode == 69) {
        	//alert('E was pressed');
		chipKeys[6] = 1;
		setTimeout(function () { chipKeys[6] = 0 }, 250);
	}

	if(event.keyCode == 82) {
		//alert('R was pressed');
		chipKeys[7] = 1;
		setTimeout(function () { chipKeys[7] = 0 }, 250);
	}

	if(event.keyCode == 65) {
        	//alert('A was pressed');
		chipKeys[8] = 1;
	}

	if(event.keyCode == 83) {
        	//alert('S was pressed');
		chipKeys[9] = 1;
	}

	if(event.keyCode == 68) {
        	//alert('D was pressed');
		chipKeys[0xA] = 1;
	}

	if(event.keyCode == 70) {
        	//alert('F was pressed');
		chipKeys[0xB] = 1;
	}
    
	if(event.keyCode == 90) {
        	//alert('Z was pressed');
		chipKeys[0xC] = 1;
	}

	if(event.keyCode == 88) {
        	//alert('X was pressed');
		chipKeys[0xD] = 1;
	}

	if(event.keyCode == 67) {
        	//alert('C was pressed');
		chipKeys[0xE] = 1;
	}

	if(event.keyCode == 86) {
        	//alert('V was pressed');
		chipKeys[0xF] = 1;
	}

	updateKeysDisplay();

});

document.addEventListener('keyup', function(event) {

	if(event.keyCode == 49) {
        	//alert('1 was released');
		chipKeys[0] = 0;
	}

	if(event.keyCode == 50) {
  		//alert('2 was released');

		chipKeys[1] = 0;
		
	}

	if(event.keyCode == 51) {
		//alert('3 was released');
		chipKeys[2] = 0;
	}

	if(event.keyCode == 52) {
        	//alert('4 was released');
		chipKeys[3] = 0;
	}

	if(event.keyCode == 81) {
		//alert('Q was released');
		chipKeys[4] = 0;
	}

	if(event.keyCode == 87) {
        	//alert('W was released');
		chipKeys[5] = 0;
	}

	if(event.keyCode == 69) {
        	//alert('E was released');
		chipKeys[6] = 0;
		//setTimeout(function () { chipKeys[6] = 0 }, 250);
	}

	if(event.keyCode == 82) {
		//alert('R was released');
		chipKeys[7] = 0;
		//setTimeout(function () { chipKeys[7] = 0 }, 250);
	}

	if(event.keyCode == 65) {
        	//alert('A was released');
		chipKeys[8] = 0;
	}

	if(event.keyCode == 83) {
        	//alert('S was released');
		chipKeys[9] = 0;
	}

	if(event.keyCode == 68) {
        	//alert('D was released');
		chipKeys[0xA] = 0;
	}

	if(event.keyCode == 70) {
        	//alert('F was released');
		chipKeys[0xB] = 0;
	}
    
	if(event.keyCode == 90) {
        	//alert('Z was released');
		chipKeys[0xC] = 0;
	}

	if(event.keyCode == 88) {
        	//alert('X was released');
		chipKeys[0xD] = 0;
	}

	if(event.keyCode == 67) {
        	//alert('C was released');
		chipKeys[0xE] = 0;
	}

	if(event.keyCode == 86) {
        	//alert('V was released');
		chipKeys[0xF] = 0;
	}

	updateKeysDisplay();

});