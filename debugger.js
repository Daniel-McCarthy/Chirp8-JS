function updateChipVariables()
{
	var textbox = document.getElementById("dataDisplayTextBox");

	textbox.value = "";

	textbox.value += "Registers:\n";

	for(var i = 0; i < chipRegisters.length; i++)
	{
		textbox.value += "Register[" + i.toString(16) + "]: " + chipRegisters[i] + '\n';
	}

	textbox.value += "\nStack Values:\n";

	for(var i = 0; i < chipStack.length; i++)
	{
		textbox.value += "Stack[" + i.toString(16) + "]: " + chipStack[i] + '\n';
	}

	textbox.value += "\nI: " + I + '\n';

	textbox.value += "Memory Pointer:" + memPointer + '\n';

	textbox.value += "delayTimer: " + delayTimer + "\n";

	textbox.value += "soundTimer: " + soundTimer + "\n";

	textbox.value += "Gamespeed: " + gameSpeed + "\n";

		
}

function updateKeysDisplay()
{
	var textbox = document.getElementById("keyDisplayTextBox");

	textbox.value = "Key Input:" + '\n';
	textbox.value += "[1]: " + chipKeys[00] + " [2]: " + chipKeys[01] + " [3]: " + chipKeys[02] + " [4]: " + chipKeys[03] + '\n';
	textbox.value += "[Q]: " + chipKeys[04] + " [W]: " + chipKeys[05] + " [E]: " + chipKeys[06] + " [R]: " + chipKeys[07] + '\n';
	textbox.value += "[A]: " + chipKeys[08] + " [S]: " + chipKeys[09] + " [D]: " + chipKeys[10] + " [F]: " + chipKeys[11] + '\n';
	textbox.value += "[Z]: " + chipKeys[12] + " [X]: " + chipKeys[13] + " [C]: " + chipKeys[14] + " [V]: " + chipKeys[15] + '\n';
}

function debugOpcode(opcode)
{
	var memoryLocation = (memPointer - 2).toString(16);

	while(memoryLocation.length < 4)
	{
		memoryLocation = '0' + memoryLocation;
	}

	var opcodeText = opcode.toString(16);
	while(opcodeText.length < 4)
	{
		opcodeText = '0' + opcodeText;
	}
	textbox.value += memoryLocation + ":  " + opcodeText + '\n';


	switch (opcodeText[0])
	{
		case "0":
		{
			switch ("" + opcodeText[1] + opcodeText[2] + opcodeText[3])
			{
				case "0e0":
				{
					//clear screen
					textbox.value += " Action: Clear Screen";
					break;
				}
				case "0ee":
				{
					//RET
					textbox.value += " Action: Return from Subroutine";
					break;
				}
				default:
				{
					//call NNN
					textbox.value += " Action: Call Program at " + opcodeText[1] + opcodeText[2] + opcodeText[3];
					break;
				}
			}
			break;
		}
		case "1":
		{
			//jump NNN
			textbox.value += " Action: Jump to position in memory at " + opcodeText[1] + opcodeText[2] + opcodeText[3];
			break;
		}
		case "2":
		{
			//call SUB NNN
			textbox.value += " Action: Call subroutine at position in memory " + opcodeText[1] + opcodeText[2] + opcodeText[3];
			break;
		}
		case "3":
		{
			//Conditional opcode skip (if VX == NN)
			textbox.value += " Action: Skip Next Opcode if  register[" + opcodeText[1] + "] is == to " + opcodeText[2] + opcodeText[3];
			break;
		}
		case "4":
		{
			//Conditional opcode skip (if VX != NN)
			textbox.value += " Action: Skip Next Opcode if  register[" + opcodeText[1] + "] is != to " + opcodeText[2] + opcodeText[3];
			break;
		}
		case "5":
		{
			//Conditional opcode skip (if VX == VY)
			textbox.value += " Action: Skip Next Opcode if  register[" + opcodeText[1] + "] is == to register[" + opcodeText[2] + "]";
			break;
		}
		case "6":
		{
			//Set VX = NN
			textbox.value += " Action: Set register[" + opcodeText[1] + "] to " + opcodeText[2] + opcodeText[3];
			break;
		}
		case "7":
		{
			//Set VX += NN
			textbox.value += " Action: Set register[" + opcodeText[1] + "] += to " + opcodeText[2] + opcodeText[3];
			break;
		}
		case "8":
		{
			switch ("" + opcodeText[3])
			{
				case "0":
				{
					//Set VX = VY
					textbox.value += " Action: Set register[" + opcodeText[1] + "] to register[" + opcodeText[2] + "]";
					break;
				}
				case "1":
				{
					//Set VX |= VY
					textbox.value += " Action: Set register[" + opcodeText[1] + "] |= to register[" + opcodeText[2] + "]";
					break;
				}
				case "2":
				{
					//Set VX &= VY
					textbox.value += " Action: Set register[" + opcodeText[1] + "] &= to register[" + opcodeText[2] + "]";
					break;
				}
				case "3":
				{
					//Set VX ^= VY
					textbox.value += " Action: Set register[" + opcodeText[1] + "] ^= to register[" + opcodeText[2] + "]";
					break;
				}
				case "4":
				{
					//Set VX += VY
					textbox.value += " Action: Set register[" + opcodeText[1] + "] += to register[" + opcodeText[2] + "]";
					break;
				}
				case "5":
				{
					//Set VX -= VY
					textbox.value += " Action: Set register[" + opcodeText[1] + "] -= to register[" + opcodeText[2] + "]";
					break;
				}
				case "6":
				{
					//Set VX >>= 1;
					textbox.value += " Action: Set register[" + opcodeText[1] + "] >>= 1";
					break;
				}
				case "7":
				{
					//Set VX = VY - VX
					textbox.value += " Action: Set register[" + opcodeText[1] + "] to register[" + opcodeText[2] + "] - register[" + opcodeText[1] + "]";
					break;
				}
				case "E":
				{
					//Set VX <<= 1
					textbox.value += " Action: Set register[" + opcodeText[1] + "] <<= 1";
					break;
				}
			}
			break;
		}
		case "9":
		{
			//Conditional opcode skip (if VX != VY)
			textbox.value += " Action: Skip Next Opcode if  register[" + opcodeText[1] + "] is != to register[" + opcodeText[2] + "]";
			break;
		}
		case "a":
		{
			//Sets I = NNN
			textbox.value += " Action: Set I to " + opcodeText[1] + opcodeText[2] + opcodeText[3];
			break;
		}
		case "b":
		{
			//Jumps to NNN + V0
			textbox.value += " Action: Jump to position in memory at " + opcodeText[1] + opcodeText[2] + opcodeText[3] + " + register[0]";
			break;
		}
		case "c":
		{
			//Sets VX = rand()&NN
			textbox.value += " Action: Set register[" + opcodeText[1] + "] to rand() &= " + opcodeText[1] + opcodeText[2];
			break;
		}
		case "d":
		{
			//Draw sprite VX, VY from I
			textbox.value += " Action: Draw Sprite at I of " + opcodeText[3] + " height to register[" + opcodeText[1] + "],  to register[" + opcodeText[2] + "]";
			break;
		}
		case "e":
		{
			switch ("" + opcodeText[2] + opcodeText[3])
			{
				case "9e":
				{
					//Conditional opcode skip (if key() == VX)
					textbox.value += " Action: Skip Next Opcode if key in register[" + opcodeText[1] + "] is down";
					break;
				}
				case "a1":
				{
					//Conditional opcode skip (if key() !== VX)
					textbox.value += " Action: Skip Next Opcode if key in register[" + opcodeText[1] + "] is up";
					break;
				}
			}
			break;
		}
		case "f":
		{
			switch ("" + opcodeText[2] + opcodeText[3])
			{
				case "07":
				{
					//Set VX = delayTimer
					textbox.value += " Action: Set register[" + opcodeText[1] + "] to delayTimer";
					break;
				}
				case "0a":
				{
					//cin>>VX //stop operation until input recieved
					textbox.value += " Action: Stop operation until key down";
					break;
				}
				case "15":
				{
					//Sets delayTimer = VX
					textbox.value += " Action: Set delayTimer to register[" + opcodeText[1] + "]";
					break;
				}
				case "18":
				{
					//Sets soundTimer = VX
					textbox.value += " Action: Set soundTimer to register[" + opcodeText[1] + "]";
					break;
				}
				case "1e":
				{
					//Sets I += VX
					textbox.value += " Action: Set I += to register[" + opcodeText[1] + "]";
					break;
				}
				case "29":
				{
					//Sets I to the location of font character in memory
					textbox.value += " Action: Set I to font character memory location of char in register[" + opcodeText[1] + "]";
					break;
				}
				case "33":
				{
					//Stores decimal representation of VX in I
					textbox.value += " Action: Set I to decimal representation of value in register[" + opcodeText[1] + "]";
					break;
				}
				case "55":
				{
					//Stores V0 to VX to memory at I
					textbox.value += " Action: Sets data at I to data from registers[0] to register[" + opcodeText[1] + "]";
					break;
				}
				case "65":
				{
					//Fills V0 to VX with memory from I
					textbox.value += " Action: Fills registers from register[0] to register[" + opcodeText[1] + "] with data from I";
					break;
				}
			}
		break;
		}

	}

	

	textbox.value += '\n\n';
	textbox.scrollTop = textbox.scrollHeight;
}