
function selectOpcode(opcode)
{
	var test = opcode & 0xF000;

	switch (opcode & 0xF000)
	{
	case 0x0000:
	{
		switch (opcode & 0x0FFF)
		{
			case 0x00E0:
			{
				//clear screen
				opcode00E0();
				break;
			}
			case 0x00EE:
			{
				//RET
				opcode00EE();
				break;
			}
			default:
			{
				//call NNN
				//Not likely to implement
				break;
			}
		}
		break;
	}
	case 0x1000:
	{
		//jump NNN
		opcode1NNN(opcode & 0x0FFF);
		break;
	}
	case 0x2000:
	{
		//call SUB NNN
		opcode2NNN(opcode & 0x0FFF);
		break;
	}
	case 0x3000:
	{
		//Conditional opcode skip (if VX == NN)
		opcode3XNN((opcode & 0x0F00) >> 8, opcode & 0x00FF);
		break;
	}
	case 0x4000:
	{
		//Conditional opcode skip (if VX != NN)
		opcode4XNN((opcode & 0x0F00) >> 8, opcode & 0x00FF);
		break;
	}
	case 0x5000:
	{
		//Conditional opcode skip (if VX == VY)
		opcode5XYN((opcode & 0x0F00) >> 8, (opcode & 0x00F0) >> 4);
		break;
	}
	case 0x6000:
	{
		//Set VX = NN
		opcode6XNN((opcode & 0x0F00) >> 8, opcode & 0x00FF);
		break;
	}
	case 0x7000:
	{
		//Set VX += NN
		opcode7XNN((opcode & 0x0F00) >> 8, opcode & 0x00FF);
		break;
	}
	case 0x8000:
	{
		switch (opcode & 0x000F)
		{
			case 0x0000:
			{
				//Set VX = VY
				opcode8XY0((opcode & 0x0F00) >> 8, (opcode & 0x00F0) >> 4);
				break;
			}
			case 0x0001:
			{
				//Set VX |= VY
				opcode8XY1((opcode & 0x0F00) >> 8, (opcode & 0x00F0) >> 4);
				break;
			}
			case 0x0002:
			{
				//Set VX &= VY
				opcode8XY2((opcode & 0x0F00) >> 8, (opcode & 0x00F0) >> 4);
				break;
			}
			case 0x0003:
			{
				//Set VX ^= VY
				opcode8XY3((opcode & 0x0F00) >> 8, (opcode & 0x00F0) >> 4);
				break;
			}
			case 0x0004:
			{
				//Set VX += VY
				opcode8XY4((opcode & 0x0F00) >> 8, (opcode & 0x00F0) >> 4);
				break;
			}
			case 0x0005:
			{
				//Set VX -= VY
				opcode8XY5((opcode & 0x0F00) >> 8, (opcode & 0x00F0) >> 4);
				break;
			}
			case 0x0006:
			{
				//Set VX >>= 1;
				opcode8XY6((opcode & 0x0F00) >> 8);
				break;
			}
			case 0x0007:
			{
				//Set VX = VY - VX
				opcode8XY7((opcode & 0x0F00) >> 8, (opcode & 0x00F0) >> 4);
				break;
			}
			case 0x000E:
			{
				//Set VX <<= 1
				opcode8XYE((opcode & 0x0F00) >> 8);
				break;
			}
		}
		break;
	}
	case 0x9000:
	{
		//Conditional opcode skip (if VX != VY)
		opcode9XY0((opcode & 0x0F00) >> 8, (opcode & 0x00F0) >> 4);
		break;
	}
	case 0xA000:
	{
		//Sets I = NNN
		opcodeANNN(opcode & 0x0FFF);
		break;
	}
	case 0xB000:
	{
		//Jumps to NNN + V0
		opcodeBNNN(opcode & 0x0FFF);
		break;
	}
	case 0xC000:
	{
		//Sets VX = rand()&NN
		opcodeCXNN((opcode & 0x0F00) >> 8, opcode & 0x00FF);
		break;
	}
	case 0xD000:
	{
		//Draw sprite VX, VY from I
		//set VF = 1 if a set pixel is unset, else 0
		opcodeDXYN((opcode & 0x0F00) >> 8, (opcode & 0x00F0) >> 4, opcode & 0x000F);
		break;
	}
	case 0xE000:
	{
		switch (opcode & 0x00FF)
		{
			case 0x009E:
			{
				//Conditional opcode skip (if key() == VX)
				opcodeEX9E((opcode & 0x0F00) >> 8);
				break;
			}
			case 0x00A1:
			{
				//Conditional opcode skip (if key() !== VX)
				opcodeEXA1((opcode & 0x0F00) >> 8);
				break;
			}
		}
		break;
	}
	case 0xF000:
	{
		switch (opcode & 0x00FF)
		{
			case 0x0007:
			{
				//Set VX = delayTimer
				opcodeFX07((opcode & 0x0F00) >> 8);
				break;
			}
			case 0x000A:
			{
				//cin>>VX //stop operation until input recieved
				opcodeFX0A((opcode & 0x0F00) >> 8);
				break;
			}
			case 0x0015:
			{
				//Sets delayTimer = VX
				opcodeFX15((opcode & 0x0F00) >> 8);
				break;
			}
			case 0x0018:
			{
				//Sets soundTimer = VX
				opcodeFX18((opcode & 0x0F00) >> 8);
				break;
			}
			case 0x001E:
			{
				//Sets I += VX
				opcodeFX1E((opcode & 0x0F00) >> 8);
				break;
			}
			case 0x0029:
			{
				//Sets I to the location of font character in memory
				opcodeFX29((opcode & 0x0F00) >> 8);
				break;
			}
			case 0x0033:
			{
				//Stores decimal representation of VX in I
				opcodeFX33((opcode & 0x0F00) >> 8);
				break;
			}
			case 0x0055:
			{
				//Stores V0 to VX to memory at I
				opcodeFX55((opcode & 0x0F00) >> 8);
				break;
			}
			case 0x0065:
			{
				//Fills V0 to VX with memory from I
				opcodeFX65((opcode & 0x0F00) >> 8);
				break;
			}
		}
		break;
		}
	}

}

function opcode00E0()
{
	//Clear Screen
	clearScreen();
}

function opcode00EE()
{
	//Return from subroutine
	memPointer = chipStack.pop();
}

function opcode1NNN(NNN)
{
	//Jump to address NNN
	memPointer = NNN;
}

function opcode2NNN(NNN)
{
	//Call subroutine at address NNN
	chipStack.push(memPointer);
	memPointer = NNN;
}

function opcode3XNN(x, NN)
{
	//Conditional opcode skip (if VX == NN)
	if (chipRegisters[x] == NN)
	{
		memPointer += 2;
	}
}

function opcode4XNN(x, NN)
{
	//Conditional opcode skip (if VX != NN)
	if (chipRegisters[x] != NN)
	{
		memPointer += 2;
	}
}

function opcode5XYN(x, y)
{
	//Conditional opcode skip (if VX == VY)
	if (chipRegisters[x] == chipRegisters[y])
	{
		memPointer += 2;
	}
}

function opcode6XNN(x, nn)
{
	//Set VX = NN
	chipRegisters[x] = nn;
}

function opcode7XNN(x, nn)
{
	//Set VX += NN
	chipRegisters[x] += nn;
}



function opcode8XY0(x, y)
{
	//Set VX = VY
	chipRegisters[x] = chipRegisters[y];
}


function opcode8XY1(x, y)
{
	//Set VX |= VY
	chipRegisters[x] |= chipRegisters[y];
}

function opcode8XY2(x, y)
{
	//Set VX &= VY
	chipRegisters[x] &= chipRegisters[y];
}

function opcode8XY3(x, y)
{
	//Set VX ^= VY
	chipRegisters[x] ^= chipRegisters[y];
}

function opcode8XY4(x, y)
{
	//Set VX += VY
	chipRegisters[x] += chipRegisters[y];
}

function opcode8XY5(x, y)
{
	//Set VX -= VY
	chipRegisters[x] -= chipRegisters[y];
}

function opcode8XY6(x)
{
	//Set VX >>= 1
	chipRegisters[x] >>= 1;
}

function opcode8XY7(x, y)
{
	//Set VX = VY - VX
	chipRegisters[x] = chipRegisters[y] - chipRegisters[x];
}

function opcode8XYE(x)
{
	//Set VX <<= 1
	chipRegisters[x] <<= 1;
}

function opcode9XY0(x, y)
{
	//Conditional opcode skip (if VX != VY)
	if (chipRegisters[x] != chipRegisters[y])
	{
		memPointer += 2;
	}
}

function opcodeANNN(nnn)
{
	//Set I = NNN
	I = nnn;
}

function opcodeBNNN(nnn)
{
	//Jump to NNN + V0
	memPointer = nnn + chipRegisters[0];
}

function opcodeCXNN(x, nn)
{
	//Set VX = rand() & NN
	
	var randNum = (Math.random() * (32767 - 0 + 1)) + 0;
	chipRegisters[x] = randNum & nn;
}

function opcodeDXYN(x, y, n)
{
	//Draw sprite at I to X Y coordinates
	drawSprite(readSprite(I, n), chipRegisters[x], chipRegisters[y], n);
}

function opcodeEX9E(x)
{
	//Skips next instruction if key x is down
	if (chipKeys[chipRegisters[x]] == 1)
	{
		memPointer += 2;
		chipKeys[chipRegisters[x]] = 0;//expirimental
	}

}

function opcodeEXA1(x)
{
	//Skips next instruction if key x is not down
	if (chipKeys[chipRegisters[x]] == 0)
	{
		memPointer += 2;
		chipKeys[chipRegisters[x]] = 0;//expirimental
	}
}

function opcodeFX07(x)
{
	//Sets VX to the value of the delay timer
	chipRegisters[x] = delayTimer;
}

function opcodeFX0A(x)
{
	//Stop operations until key input stored into VX
	var keyFound = false;
	for(var i = 0; i < 16 && !keyFound; i++)
	{
		if (chipKeys[i] == 1)
		{
			keyFound = true;
			chipRegisters[x] = i;
			chipKeys[i] = 0;//expirimental
		}
	}
	
	if (!keyFound)
	{
		memPointer -= 2;
	}
}

function opcodeFX15(x)
{
	//sets the delay timer to VX
	delayTimer = chipRegisters[x];
}

function opcodeFX18(x)
{
	//sets the sound timer to VX
	soundTimer = chipRegisters[x];
}

function opcodeFX1E(x)
{
	//Adds VX to I
	I += chipRegisters[x];
}

function opcodeFX29(x)
{
	//Set I to position in memory of X Font Character
	I = chipRegisters[x] * 5;
}

function opcodeFX33(x)
{
	//Stores decimal representation of VX at I

	writeMemory(I, Math.floor( chipRegisters[x] / 100 ));
	writeMemory(I + 1,  Math.floor( (chipRegisters[x]/ 10) % 10));
	writeMemory(I + 2, chipRegisters[x] % 10);


}

function opcodeFX55(x)
{
	//stores data from registers V0 to VX in memory at address I

	for (var i = 0; i <= x; i++)
	{	
		writeMemory(I + i, chipRegisters[i]);
	}

}

function opcodeFX65(x)
{
	//copies data from memory at address I into registers V0 to VX
	for (var i = 0; i <= x; i++)
	{
		chipRegisters[i] = readMemory(I + i);
	}

}