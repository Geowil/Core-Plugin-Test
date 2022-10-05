/*:
* @plugindesc Core plugin for plugins created by LMPGames
* @author LMPGames
*
*
*
*/


var LMPGamesCore = {};

//Add common functions into core object
LMPGamesCore.functions = {};
LMPGamesCore.functions.genereateEffectStr = function(effects, obfuscated){
	let effectStr = "Effects:";
	if (obfuscated){
		effectStr = LMPGamesCore.functions.obfuscateText(effectStr);
	}
	effectStr = addXShift(effectStr, 5);
	effectStr = addBreak(effectStr, 'end');

	effStates = effects.states;
	effBuffs = effects.buffs;
	effRmvBuffs = effects.rmvbuffs;
	effRmvDebuffs = effects.rmvdebuffs;
	effGrowth = effects.growth;
	effSpecEff = effects.speceffs;
	effComEvts = effects.comevts;
	effHPRecov = effects.hpRecov;
	effMPRecov = effects.mpRecov;
	effTPRecov = effects.tpRecov;
	effLrnSkills = effects.skills;

	if (effStates.length > 0) {
		let effectStateStr = this.buildDataList("States:", effStates, 25, 35, 0, obfuscated);
		effectStr += effectStateStr;
	}

	if (effBuffs.length > 0) {
		let effectBuffStr = this.buildDataList("Buffs:", effBuffs, 25, 35, 0, obfuscated);
		effectStr += effectBuffStr;
	}

	if (effRmvBuffs.length > 0) {
		let effectRmvBuffStr = this.buildDataList("Remove Buffs:", effRmvBuffs, 25, 35, 0, obfuscated);
		effectStr += effectRmvBuffStr;
	}

	if (effRmvDebuffs.length > 0) {
		let effectRmvDebuffStr = this.buildDataList("Remove Debuffs:", effRmvDebuffs, 25, 35, 0, obfuscated);
		effectStr += effectRmvDebuffStr;
	}

	if (effSpecEff.length > 0){
		let effectSpecialStr = this.buildDataList("Special Effects:", effSpecEff, 25, 35, 0, obfuscated);
		effectStr += effectSpecialStr;
	}

	if (effGrowth.length > 0){
		let effectGrowthStr = this.buildDataList("Growth Effects:", effGrowth, 25, 35, 0, obfuscated);
		effectStr += effectGrowthStr;
	}

	if (effComEvts.length > 0 && LMPGamesCore.settings.debug){
		let effectCommonEvsStr = this.buildDataList("Common Events:", effComEvts, 25, 35, 0, obfuscated);
		effectStr += effectCommonEvsStr;
	}

	if (effHPRecov.length > 0 || effMPRecov.length > 0 || effTPRecov.length > 0) {
		let effectRecovStr = "Recovery:";
		if (obfuscated){
			effectRecovStr = LMPGamesCore.functions.obfuscateText(effectRecovStr);
		}
		effectRecovStr = LMPGamesCore.functions.addXShift(effectRecovStr, 25);
		effectRecovStr = LMPGamesCore.functions.addBreak(effectRecovStr, 'end');

		if (effHPRecov.length > 0){
			let effectHPRecovStr = LMPGamesCore.functions.buildDataList("HP:", effHPRecov, 35, 45, 0, obfuscated);
			effectRecovStr += effectHPRecovStr;
		}

		if (effMPRecov.length > 0){
			let effectMPRecovStr = LMPGamesCore.functions.buildDataList("MP:", effMPRecov, 35, 45, 0, obfuscated);
			effectRecovStr += effectMPRecovStr;
		}

		if (effTPRecov.length > 0){
			let effectTPRecovStr = this.buildDataList("TP:", effTPRecov, 35, 45, 0, obfuscated);
			effectRecovStr += effectTPRecovStr;
		}

		effectStr += effectRecovStr;
	}

	if (effLrnSkills.length > 0) {
		let effectSkillStr = this.buildDataList("Skills:", effLrnSkills, 25, 35, 0, obfuscated);
		effectStr += effectSkillStr;
	}

	return effectStr;
};

LMPGamesCore.functions.buildDataList = function(dataTitle, data, titleXShift, dataXShift, dataYShift, obfuscated){
	let builtStr = "";

	if (dataTitle.length > 0){
		if (obfuscated){
			dataTitle = LMPGamesCore.functions.obfuscateText(dataTitle);
		}

		dataTitle = LMPGamesCore.functions.addXShift(dataTitle, titleXShift);
		dataTitle = LMPGamesCore.functions.addBreak(dataTitle, 'end');
	}

	let dataStr = "";
	for (let i1 = 0; i1 < data.length; i1++){
		let newData = "";
		if (obfuscated){
			newData += LMPGamesCore.functions.obfuscateText(data[i1]);
		} else {
			newData += data[i1];
		}

		newData = LMPGamesCore.functions.addXShift(newData, dataXShift);
		newData = LMPGamesCore.functions.addBreak(newData, 'end');

		dataStr += newData;
	}

	if (dataTitle.length > 0) {
		dataStr = LMPGamesCore.functions.addBreak(dataStr, 'end');
	}

	builtStr = (dataTitle.length > 0 ? dataTitle : "");
	builtStr += dataStr;
	return builtStr;
};

LMPGamesCore.functions.buildEffectList = function(effects){
	var tempObj = {
		"hpRecov" : [],
		"mpRecov" : [],
		"tpRecov": [],
		"states" : [],
		"parms" : [],
		"buffs" : [],
		"rmvbuffs" : [],
		"rmvdebuffs": [],
		"growth" : [],
		"skills" : [],
		"speceffs" : [],
		"comevts" : []
	};

	var hpRecov = [];
	var mpRecov = [];
	var tpRecov = [];
	var states = [];
	var parms = [];
	var buffs = [];
	var rmvbuffs = [];
	var rmvdebuffs = [];
	var growth = [];
	var skls = [];
	var speceffs = [];
	var comevts = [];

	if (effects.length > 0) {effects = orderEffects(effects); }

	for (var i1 = 0; i1 < effects.length; i1++){
		if (effects[i1].code == 11){ //Recov HP
			hpRecov.push(effects[i1]);
		} else if (effects[i1].code == 12){ //Recov MP
			mpRecov.push(effects[i1]);
		} else if (effects[i1].code == 13){ //Recov TP
			tpRecov.push(effects[i1]);
		} else if (effects[i1].code == 21){ //Add State
			states.push(effects[i1]);
		} else if (effects[i1].code == 22){ //Remove State
			states.push(effects[i1]);
		}else if (effects[i1].code == 31){ //Add Parm Buff
			buffs.push(effects[i1]);
		} else if (effects[i1].code == 32){ //Add Parm Debuff
			buffs.push(effects[i1]);
		}else if (effects[i1].code == 33){ //Remove Parm Buff
			rmvbuffs.push(effects[i1]);
		} else if (effects[i1].code == 34){ //Remove Parm Debuff
			rmvdebuffs.push(effects[i1]);
		} else if (effects[i1].code == 41){ //Spec Eff
			speceffs.push(effects[i1]);
		} else if (effects[i1].code == 42){ //Stat Growth
			growth.push(effects[i1]);
		} else if (effects[i1].code == 43){ //Learn Skill
			skls.push(effects[i1]);
		} else if (effects[i1].code == 44){ //Common Event
			comevts.push(effects[i1]);
		}
	}

	if (hpRecov.length > 0 ) { tempObj = processHpRecov(hpRecov, tempObj); }
	if (mpRecov.length > 0 ) { tempObj = processMpRecov(mpRecov, tempObj); }
	if (tpRecov.length > 0 ) { tempObj = processTpRecov(tpRecov, tempObj); }
	if (states.length > 0 ) { tempObj = processStates(states, tempObj); }
	if (buffs.length > 0 ) { tempObj = processBuffs(buffs, tempObj); }
	if (rmvbuffs.length > 0 ) { tempObj = processRmvBuffs(rmvbuffs, tempObj); }
	if (rmvdebuffs.length > 0 ) { tempObj = processRmvDebuffs(rmvdebuffs, tempObj); }
	if (speceffs.length > 0 ) { tempObj = processEffSpecEffs(speceffs, tempObj); }
	if (growth.length > 0 ) { tempObj = processGrowth(growth, tempObj); }
	if (skls.length > 0 ) { tempObj = processLrnSkils(skls, tempObj); }
	if (comevts.length > 0 ) { tempObj = processComEvts(comevts, tempObj); }

	return tempObj;
};

LMPGamesCore.functions.processHpRecov = function(hpRecov, tempObj){
	for (var i1 = 0; i1 < hpRecov.length; i1++){
		var rPerc = hpRecov[i1].value1;
		var rInt = hpRecov[i1].value2;
		var recovStr = "";

		if (rPerc != 0.0){
			if(Math.sign(rPerc) == 1){
				recovStr = "\\c[11]+\\c[0] " + (rPerc * 100) + "% of Max HP";
			} else if (Math.sign(rPerc) == -1){
				recovStr = "\\c[18]-\\c[0] " + (rPerc * 100) + "% of Max HP";
			}
		}

		if (rInt != 0.0){
			if (recovStr.length > 0){
				recovStr += " and ";
			}

			if(Math.sign(rInt) == 1){
				recovStr += "\\c[11]+\\c[0] " + rInt + " HP";
			} else if (Math.sign(rInt) == -1){
				recovStr += "\\c[18]-\\c[0] " + rInt + " HP";
			}
		}

		tempObj.hpRecov.push(recovStr);
	}

	return tempObj;
};

LMPGamesCore.functions.processMpRecov = function(mpRecov, tempObj){
	for (var i1 = 0; i1 < mpRecov.length; i1++){
		var rPerc = mpRecov[i1].value1;
		var rInt = mpRecov[i1].value2;
		var recovStr = "";

		if (rPerc != 0.0){
			if(Math.sign(rPerc) == 1){
				recovStr = "\\c[11]+\\c[0] " + (rPerc * 100) + "% of Max MP";
			} else if (Math.sign(rPerc) == -1){
				recovStr = "\\c[18]-\\c[0] " + (rPerc * 100) + "% of Max MP";
			}
		}

		if (rInt != 0.0){
			if (recovStr.length > 0){
				recovStr += " and ";
			}

			if(Math.sign(rInt) == 1){
				recovStr += "\\c[11]+\\c[0] " + rInt + " MP";
			} else if (Math.sign(rInt) == -1){
				recovStr += "\\c[18]-\\c[0] " + rInt + " MP";
			}
		}

		tempObj.mpRecov.push(recovStr);
	}

	return tempObj;
};

LMPGamesCore.functions.processTpRecov = function(tpRecov, tempObj){
	for (var i1 = 0; i1 < tpRecov.length; i1++){
		var rPerc = tpRecov[i1].value1;
		var rInt = tpRecov[i1].value2;
		var recovStr = "";

		if (rPerc != 0.0){
			if(Math.sign(rPerc) == 1){
				recovStr = "\\c[11]+\\c[0] " + (rPerc * 100) + "% of Max TP";
			} else if (Math.sign(rPerc) == -1){
				recovStr = "\\c[18]-\\c[0] " + (rPerc * 100) + "% of Max TP";
			}
		}

		if (rInt != 0.0){
			if (recovStr.length > 0){
				recovStr += " and ";
			}

			if(Math.sign(rInt) == 1){
				recovStr += "\\c[11]+\\c[0] " + rInt + " TP";
			} else if (Math.sign(rInt) == -1){
				recovStr += "\\c[18]-\\c[0] " + rInt + " TP";
			}
		}

		tempObj.tpRecov.push(recovStr);
	}

	return tempObj;
};

LMPGamesCore.functions.processStates = function(effstates, tempObj){
	for (var i1 = 0; i1 < effstates.length; i1++){
		if (effstates[i1].dataId > 0) {
			var stId = effstates[i1].dataId;
			var st = $dataStates[stId];
			var stVal = effstates[i1].value1;
			var stText = "";

			if (effstates[i1].code == 21){
				stText = "\\c[11]+\\c[0] \\i[" + st.iconIndex + "] " + st.name + " (" + (stVal * 100) + "%)";
			} else if (effstates[i1].code == 22){
				stText = "\\c[18]-\\c[0] \\i[" + st.iconIndex + "] " + st.name + " (" + (stVal * 100) + "%)";
			}

			tempObj.states.push(stText);
		}
	}

	return tempObj;
};

LMPGamesCore.functions.processBuffs = function(buffs, tempObj){
	for (var i1 = 0; i1 < buffs.length; i1++){
		var parmId = buffs[i1].dataId;
		var parmName = staticTraits["21"][parmId];
		var buffVal = buffs[i1].value1;
		var buffText = "";

		if (buffs[i1].code == 31){
			buffText = "\\c[11]+\\c[0] " + parmName + " (" + buffVal + " turns)";
		} else if (buffs[i1].code == 32){
			buffText = "\\c[18]-\\c[0] " + parmName + " (" + buffVal + " turns)";
		}

		tempObj.buffs.push(buffText);
	}

	return tempObj;
}

LMPGamesCore.functions.processRmvBuffs = function(rmvbuffs, tempObj){
	for (var i1 = 0; i1 < rmvbuffs.length; i1++){
		var parmId = rmvbuffs[i1].dataId;
		var parmName = staticTraits["21"][parmId];
		var rmvbuffText = "";

		rmvbuffText = "\\c[18]-\\c[0] " + parmName;

		tempObj.rmvbuffs.push(rmvbuffText);
	}

	return tempObj;
};

LMPGamesCore.functions.processRmvDebuffs = function(rmvdebuffs, tempObj){
	for (var i1 = 0; i1 < rmvdebuffs.length; i1++){
		var parmId = rmvdebuffs[i1].dataId;
		var parmName = staticTraits["21"][parmId];
		var rmvdebuffText = "";

		rmvdebuffText = "\\c[11]+\\c[0] " + parmName;

		tempObj.rmvdebuffs.push(rmvdebuffText);
	}

	return tempObj;
};

LMPGamesCore.functions.processEffSpecEffs = function(speceffs, tempObj){
	for (var i1 = 0; i1 < speceffs.length; i1++){
		var specEffId = speceffs[i1].dataId;
		var specEffName = specEffLst[specEffId];
		var specEffText = "";

		specEffText = "\\c[11]+\\c[0] " + specEffName;

		tempObj.speceffs.push(specEffText);
	}

	return tempObj;
};

LMPGamesCore.functions.processGrowth = function(growth, tempObj){
	for (var i1 = 0; i1 < growth.length; i1++){
		var parmId = growth[i1].dataId;
		var parmName = staticTraits["21"][parmId];
		var parmIncVal = growth[i1].value1;
		var growthText = "";

		growthText = parmName + " \\c[11]+" + parmIncVal + "\\c[0]";

		tempObj.growth.push(growthText);
	}

	return tempObj;
};

LMPGamesCore.functions.processLrnSkils = function(skls, tempObj){
	for (var i1 = 0; i1 < skls.length; i1++){
		var skId = skls[i1].dataId;
		var sk = $dataSkills[skId];
		var skText = "";

		skText = "\\c[11]+\\c[0] " + sk.name;

		tempObj.skills.push(skText);
	}

	return tempObj;
};

LMPGamesCore.functions.processComEvts = function(comevts, tempObj){
	for (var i1 = 0; i1 < comevts.length; i1++){
		var ceId = comevts[i1].dataId;
		var ce = $dataCommonEvents[ceId];
		var comevtText = "";

		comevtText = "Calls CE: " + ce.name;

		tempObj.comevts.push(comevtText);
	}

	return tempObj;
};

LMPGamesCore.functions.orderEffects = function(effects){
	for (var i1 = 0; i1 < effects.length; i1++){
		for (var i2 = 0; i2 < effects.length; i2++){
			var e1 = effects[i1];
			var e2 = effects[i2];
			var storage;

			if (e1.value > e2.value){
				storage = e1;
				effects[i1] = e2;
				effects[i2] = storage;
			}
		}
	}

	return effects;
};

LMPGamesCore.functions.hasNoEffects = function(entryEffects){
	let isEmpty = true;

	if (entryEffects == undefined || entryEffects == null){
		return true;
	}

	for (var k of Object.keys(entryEffects)){
		if (Object.values(entryEffects[k]).length > 0){
			isEmpty = false;
		}
	}

	return isEmpty;
};

LMPGamesCore.functions.addBreak = function(text, pos){
	if (pos == "start"){
		text = "<br>" + text;
	} else if (pos == "end"){
		text += "<br>";
	} else {
		text = "<br>" + text + "<br>";
	}

	return text;
};

LMPGamesCore.functions.addXShift = function(text, shiftAmount){
	return "\\px[" + String(shiftAmount) +"]" + text;
};

LMPGamesCore.functions.addYShift = function(text, shiftAmount){
	return "\\py[" + String(shiftAmount) +"]" + text;
};

LMPGamesCore.functions.changeFontSize = function(text, fontSize){
	return "\\fs[" + String(fontSize) + "]" + text;
};

LMPGamesCore.functions.resetFontSize = function(text){
	return "\\fr " + text;
};

LMPGamesCore.functions.changeTextColor = function(text, pos, startColor, endColor){
	if (pos == "start"){
		text = "\\hc[" + startColor + "]" + text;
	} else if (pos == "end"){
		text += "\\hc[" + endColor + "]";
	} else if (pos == "both"){
		text = "\\hc[" + startColor + "]" + text + "\\hc[" + endColor + "]";
	}

	return text;
};

LMPGamesCore.functions.setObfuscationSettings = function(char, maxChars){
	LMPGamesCore.settings.obfuscationChar = char;
	LMPGamesCore.settings.maxObfuscationChars = maxChars;
};

LMPGamesCore.functions.obfuscateText = function(text){
	let obfuscatedText = "";
	let stringLen = 0;

	if (LMPGamesCore.settings.maxObfuscationChars == 0){
		stringLen = text.length;
	} else {
		stringLen = LMPGamesCore.settings.maxObfuscationChars;
	}

	for (let i1 = 0; i1 < stringLen; i1++){
		let char = text[i1];
		if (char != " "){
			obfuscatedText += LMPGamesCore.settings.obfuscationChar;
		} else {
			obfuscatedText += " ";
		}
	}

	return obfuscatedText;
};

LMPGamesCore.functions.getDisplayName = function(wndWidth, data, contents){
	let finalName = "";
	let textWidth = contents.measureTextWidth(data.name);
	if (textWidth > wndWidth - 15 && bEnableNameAlias && data.Alias && data.Alias != ""){
		finalName = data.Alias;
	} else {
		finalName = data.name;
	}

	return finalName;
}

//Conditonal Aliases
/* TouchInput Functions and Aliases */
var LMPGamesCore_TouchImput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
	LMPGamesCore_TouchImput_onMouseMove.call(this, event);
	if (LMPGamesCore.settings.enableWindowScrolling){
		this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
		this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
	}
};

