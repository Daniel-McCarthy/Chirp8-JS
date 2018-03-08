	var pixels = Array(64);

	for(var i = 0; i < 64; i++)
	{
		pixels[i] = Array(32).fill(0);
	}

	var a = 0;
	var b = 0;

	var chipMemory = new Uint8Array(4096).fill(0);
	var chipKeys = Array(16).fill(0);
	var chipRegisters = new Uint8Array(16).fill(0);
	var chipStack = [];
	var memPointer = 0x200;
	var delayTimer = 0;//60
	var soundTimer = 0;
	var I = 0;

	var beep = document.getElementById("beep");
	var textbox = document.getElementById("debuggerTextBox");

	var chickenSprite = [2, 7, 62, 30, 4, 6];
	loadRom();
	loadFontSprites();
	beep.volume = 0.005;

	var paused = false;
	var step = false;
	var gameSpeed = 1;
	var debugging = false;

	//updateKeysDisplay();

function test()
{

	var canvas = document.getElementById("hellokitty");
	var context = canvas.getContext("2d");
	var tempGameSpeed = gameSpeed;



	
	//drawSprite(chickenSprite, 30, 10, 6);
	//drawSprite(chickenSprite, 0, 0, 6);

	if(!paused || step)
	{
		if(debugging)
		{
			updateChipVariables();
		}

		var opcode = ( (chipMemory[memPointer++] << 8) | chipMemory[memPointer++] );
	
		if(debugging)
		{
			if(textbox.value.length > 50000)//50000
			{
				for(var i = 0; i < 30; i++)
				{
					textbox.value = textbox.value.substring(textbox.value.indexOf("\n") + 2, textbox.value.length);
				}
			}
		}

		if(debugging)
		{
			debugOpcode(opcode);
		}

		selectOpcode(opcode);

		if((opcode & 0xF000) == 0xD000)
		{
			tempGameSpeed = 0;
		}

	}

	var nextOp = readMemory(memPointer);
	if((nextOp & 0xF0) == 0xD0)
	{
		tempGameSpeed = 0;
	}

	step = false;

	if(debugging)
	{
		setTimeout(test, tempGameSpeed);
	}
	else
	{
		setTimeout(test, 2);
	}
}


function startTimer()
{
	setInterval(decrementTimers, 1000/60);
	test();
}

function pauseUnpause()
{
	var button = document.getElementById("pauseButton");

	if(paused)
	{
		button.value = "Pause";
		paused = false;
	}
	else
	{
		button.value = "Play";
		paused = true;
	}
}

function decrementTimers()
{
	if(delayTimer > 0)
	{
		delayTimer--;
	}
		
	if(soundTimer > 0)
	{ 
		soundTimer--;
		beep.play();
	}
}

function setGameSpeed(speed)
{
	gameSpeed = speed;
}

function stepOnce()
{
	step = true;
}

function hideShowDebugger()
{
	var debuggerDiv= document.getElementById("debuggerDiv");
       	debuggerDiv.style.display = (debuggerDiv.style.display == 'block') ? 'none' : 'block';

	if(debuggerDiv.style.display == 'none')
	{
		paused = false;
		debugging = false;
	}
	else
	{
		debugging = true;
	}
}