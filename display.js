
function clearScreen()
{
	var canvas = document.getElementById("hellokitty");
	var context = canvas.getContext("2d");

	context.fillStyle = "black";
	context.fillRect(0, 0, 4*64, 4*32);

}

function xorPixel(x, y)
{
	var canvas = document.getElementById("hellokitty");
	var context = canvas.getContext("2d");

	if(pixels[x][y] == 0)
	{
		pixels[x][y] = 1;
		context.fillStyle = "white";
		context.fillRect(x * 4, y * 4, 4, 4);
		//drawCanvas();
		return false;
	}
	else
	{
		pixels[x][y] = 0;
		context.fillStyle = "black";
		context.fillRect(x * 4, y * 4, 4, 4);
		return true;
	}
}


function drawSprite(spriteArray, x, y, n)
{
	var height = n;

	var collision = false;

	if(spriteArray.length > n)
	{

		height = spriteArray.length;
	}

	for(var i = 0; i < height; i++)
	{
		var line = spriteArray[i].toString(2);	

		while(line.length < 8)
		{
			line = "0" + line;
		}

		for(var j = 0; j < line.length; j++)
		{
			if(line.charAt(j) == "1")
			{
				var anyCollision = xorPixel(x+j, y+i);

				if(anyCollision)
				{
					collision = true;
				}
			}
		}
	}

	if(collision)
	{
		chipRegisters[0xF] = 1;
	}
	else
	{
		chipRegisters[0xF] = 0;
	}
}