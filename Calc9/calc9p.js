var    expr = '',
    scope = {
             x: 0
//	     ,
//	     t: 0
	     },
   tree, code2;
var graphedAlready = false;   
var tmpY = [];
var piStr = "\u03C0";
var WIDTH = parseInt("600");
var HEIGHT = WIDTH;
var xMargin = (650 - WIDTH) / 2;
var yMargin = (650 - HEIGHT) / 2;
var yMn = "0";
var yMx = "0";
var nSteps = Number("1");
var stepLngth = Number("1.1");
var Pi = math.PI / 1.0;
var overPi = 1.0 / Pi;
var MaxY = "0",
    MinY = "0";

var k = 0;

var LINES = new Array(4);
var yMax = new Array(4);
var yMin = new Array(4);
var yLngth = new Array(4);
var xMax = new Array(4);
var xMin = new Array(4);
var xLngth = new Array(4);
var dMax = new Array(4);
var dMin = new Array(4);
var dLngth = new Array(4);
var theDenomintr = new Array(4);
var goTrace = true;

vectrCp([2, 3, 4, 6], theDenomintr);
vectrCp([8 * math.PI / 2, 9 * math.PI / 3, 8 * math.PI / 4, math.PI], dMax);
vectrCp([-8 * math.PI / 2, -9 * math.PI / 3, -8 * math.PI / 4, -math.PI], dMin);
vectrCp([16 * math.PI / 2, 18 * math.PI / 3, 16 * math.PI / 4, 2 * math.PI], dLngth);

vectrCp([8, 9, 8, 12], yMax);
scalrPrdct(2, vectrCp([8, 9, 8, 6], LINES));
scalrPrdct(-1, vectrCp([8, 9, 8, 6], yMin));
scalrPrdct(2, vectrCp([8, 9, 8, 6], yLngth));

vectrCp(yMax, xMax);
vectrCp(yMin, xMin);
vectrCp(yLngth, xLngth);

//console.log("yMin  = " + yMin[0] + " " + yMin[1] + " " + yMin[2] + " " + yMin[3]);
//console.log("yMax  = " + yMax[0] + " " + yMax[1] + " " + yMax[2] + " " + yMax[3]);
//console.log("LINES = " + LINES[0] + " " + LINES[1] + " " + LINES[2] + " " + LINES[3]);
//console.log("yLngth = " + yLngth[0] + " " + yLngth[1] + " " + yLngth[2] + " " + yLngth[3]);
//console.log("xMax  = " + xMax[0] + " " + xMax[1] + " " + xMax[2] + " " + xMax[3]);
//console.log("xMin  = " + xMin[0] + " " + xMin[1] + " " + xMin[2] + " " + xMin[3]);
//console.log("xLngth = " + xLngth[0] + " " + xLngth[1] + " " + xLngth[2] + " " + xLngth[3]);
//console.log("dMax  = " + dMax[0] + " " + dMax[1] + " " + dMax[2] + " " + dMax[3]);
//console.log("dMin  = " + dMin[0] + " " + dMin[1] + " " + dMin[2] + " " + dMin[3]);
//console.log("dLngth  = " + dLngth[0] + " " + dLngth[1] + " " + dLngth[2] + " " + dLngth[3]);
//console.log("theDenomintr  = " + theDenomintr[0] + " " + theDenomintr[1] + " " + theDenomintr[2] + " " + theDenomintr[3]);


var pxlBetwnLins;
var canLyr1 = document.getElementById("layer1");
var ctx1 = canLyr1.getContext("2d");
var canLyr2 = document.getElementById("layer2");
var ctx2 = canLyr2.getContext("2d");
var canLyr3 = document.getElementById("layer3");
var ctx3 = canLyr3.getContext("2d");
var colors = ["#00688B", "#660000", "#9900CC", "#E68A2E", "#006600", "#FF33CC"];
var fxMap;
var but1 = document.getElementById('one');
var but2 = document.getElementById('two');
var but3 = document.getElementById('three');
var but4 = document.getElementById('four');

function showTrace(){ 
if (document.getElementById('mouseTrace').checked == 1){ goTrace = true}
else{  goTrace = false}
	  }

function init() {
    graphedAlready = false;
    centerCanvasLayer(canLyr1);
    centerCanvasLayer(canLyr2);
    centerCanvasLayer(canLyr3);
    pxlBetwnLins = WIDTH / LINES[k];
    drawAxes();
    initMouse();
    console.log("");
    console.log(" --- Running calc7p.js --- ");
}

function centerCanvasLayer(aLyr) {
    // For IE compatibility http://www.google.com/search?q=get+viewport+size+js
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var canvasWidth = WIDTH + 2 * xMargin;
    aLyr.style.display = "block";
    aLyr.style.left = math.round((viewportWidth - canvasWidth) / 2) + "px";
    aLyr.style.margin = "0px";
    aLyr.style.position = "absolute";
    aLyr.setAttribute("width", canvasWidth);
}

function init2() {
    //     yMAX = document.getElementById("MxY").value;
    //     yMIN = document.getElementById("MnY").value;

    //  console.log("MaxY MinY in init2   " + MaxY + "  " + MinY);
    k = checkedRadioBtn("numbr");
    //  console.log("checkedRadioBtn  in init2   " + k);
    nSteps = document.getElementById("nSteps").value;

    stepLngth = (dMax[k] - dMin[k]) / nSteps;
    stepLngth = stepLngth.toFixed(7);
    console.log("stepLngth = " + stepLngth);

    yMn = Number(document.getElementById("yMIN").value);
    yMx = Number(document.getElementById("yMAX").value);
    yMin[k] = toOneSignfcntDigit(yMn);
    yMax[k] = toOneSignfcntDigit(yMx);
    yLngth[k] = yMax[k] - yMin[k];
    //    console.log ( "yMin = " + yMin);


    yMin[k] = toOneSignfcntDigit(yMin[k]);
    yMax[k] = toOneSignfcntDigit(yMax[k]);
    //  console.log("Ready to drawAxes ");
    drawAxes();
    parseFn();
}
 function parseFn() {
     ctx2.clearRect(0, 0, WIDTH, HEIGHT);
     init();
     var unparsed = document.getElementById("functionString").value;
     console.log("unparsed = " + unparsed)
     tree = math.parse(unparsed,scope);
     code2=tree.compile();
     console.log("math.parse = " + tree);
     genData();
 }

function evaluateMathExpr(mathX){
 // Set values on the scope visible inside the math expression.
    console.log("mathX   = " + mathX);
    scope.x = mathX;
    console.log("scope.x = " +scope.x);
//    scope.t = 0
 // Evaluate the previously parsed math expression with the
 // new values for 'x' and 't' and return it.
console.log("tree.eval()   = " + tree.eval().toFixed(7));
    return tree.eval().toFixed(7);
	  }

 function enterCheck(e) {
     if (e.keyCode == 13) {
         parseFn();
         return false;
     }
 }



//define radio buttons, each with a common 'name' and distinct 'id'. 
//       eg- <input type="radio" name="storageGroup" id="localStorage">
//           <input type="radio" name="storageGroup" id="sessionStorage">
//param-sGroupName: 'name' of the group. eg- "storageGroup"
//return: 'id' of the checked radioButton. eg- "localStorage"
//return: can be 'undefined'- be sure to check for that
function checkedRadioBtn(sGroupName) {
    var group = document.getElementsByName(sGroupName);

    for (var i = 0; i < group.length; i++) {
        if (group.item(i).checked) {
            //          console.log("in checked RadioBtn group.item(i).value = " + group.item(i).value);
            return group.item(i).value;
        } else if (group[0].type !== 'radio') {
            //if you find any in the group not a radio button return null
            return null;
        }
    }
}


/*--------------------------------------------------*/
var sX, sY, canX, canY, mouseIsDown = 0;

function initMouse() {
    // canLyr3.addEventListener("mousedown",mouseDown, false);
    canLyr3.addEventListener("mousemove", mouseXY, false);
    //  canLyr3.addEventListener("touchstart", touchDown, false);
    //  canLyr3.addEventListener("touchmove", touchXY, true);
    //  canLyr3.addEventListener("touchend", touchUp, false);
    // document.body.addEventListener("mouseup", mouseUp, false);
    // document.body.addEventListener("touchcancel", touchUp,false);
}

function mouseUp() {
    mouseIsDown = 0;
    mouseXY();
}

function touchUp() {
    mouseIsDown = 0; // no touch to track, so just show state
    showPos();
}

function mouseDown() {
    mouseIsDown = 1;
    mouseXY();
}

function touchDown() {
    mouseIsDown = 1;
    touchXY();
}

function mouseXY(e) {
    var rect = canLyr3.getBoundingClientRect();
    canX = math.round(e.clientX - rect.left);
    canY = math.round(e.clientY - rect.top);
    //	console.log("canX   =   "+canX +"   canY   =   "+canY);

    showPos();
}

function touchXY(e) {
    if (!e) var e = event;
    e.preventDefault();
    //        canX = e.targetTouches[0].pageX - canLyr3.offsetLeft;
    //        canY = e.targetTouches[0].pageY - canLyr3.offsetTop;
    var rect = canLyr3.getBoundingClientRect();
    canX = math.round(e.clientX - rect.left);
    canY = math.round(e.clientY - rect.top);
    showPos();
}

function keepOnScrn(scr) {
    if (scr < 0) return 0;
    else {
        if (scr > 600) return 600;
        else return scr;
    }
}


function showPos() {  if (goTrace) { //console.log("goTrace = " + goTrace);
    var i=0, x=xMin, yInterpolatd, xScrn = canX - xMargin, yScr0 , yScr1, xMov = xMargin ;
    //large, centered, bright green text
    // ctx.font = "24pt Helvetica";
    ctx3.font = "regular 20px Droid Sans";
    ctx3.textAlign = "center";
    ctx3.textBaseline = "middle";
    ctx3.fillStyle = "rgb(64,155,64)";
    if (canX < xMargin) return;
    if (canX > (xMargin + WIDTH)) return;
    if (canY < yMargin) return;
    if (canY > (yMargin + HEIGHT)) return;
    var sX = keepOnScrn(canX - xMargin);
    var sY = keepOnScrn(canY - yMargin);
    var cX = math.round(toCrdXdivPI(sX) * 100) / 100;
    var cY = math.round(toCrdY(sY) * 100) / 100;
    var str = "Screen Pixls: "  + cX + piStr + ", " + cY;
    var str1 = "(" + cX +piStr + ", " + cY + ")";
    // if (mouseIsDown) str += " down";
    // if (!mouseIsDown) str += " up";
    ctx3.clearRect(0, 0, canLyr3.width, canLyr3.height);
    // draw text at center, max length to fit on canLyr3.s
    ctx3.fillText(str, canLyr3.width / 2, yMargin / 2, canLyr3.width - 10);
    if (graphedAlready) //drawVerticLin(canX,canY); 
    {    
   var pxlsPerStep = 600/nSteps;
   console.log ( "Vertical line at: canX = " + canX + " -------- canY =  " +canY);
   for (i=i; i < nSteps; i++){
     if (xMov > canX) break 
     xMov  = xMov + pxlsPerStep;
     }
     console.log("found i = " + i); 
     console.log("tmpY[i], tmp[i-1] = " +  tmpY[i] +" ---- "+ tmpY[i-1]         ); 
     if ((isNaN(tmpY[i-1]))||(isNaN(tmpY[i]))) console.log("no graph at " + xScrn);
     else{ 
      yScr0 = toScrY(tmpY[i-1]);
      yScr1 = toScrY(tmpY[i]);
     yInterpolatd =  math.round(yScr1 - (yScr1 - yScr0)*(xMov - canX)/pxlsPerStep)  ;
      console.log (" yInterpolatd = " +  yInterpolatd  );
     ctx3.lineWidth = 1;
     ctx3.strokeStyle = "#7A5252";
     ctx3.beginPath();
     ctx3.arc(canX,yInterpolatd,2,0,2*math.PI,false);
     ctx3.fillStyle = "#7A5252";
     ctx3.fill();
     ctx3.closePath();
     ctx3.stroke();
     ctx3.fillText(str1, canX , yInterpolatd - 20, canLyr3.width - 10);
     console.log ("Closing path at  "+ canX + " , "  +yInterpolatd );
      } } } //goTrace is TRUE
      else
      { //console.log("goTrace = " + goTrace);
    ctx3.font = "regular 20px Droid Sans";
    ctx3.textAlign = "center";
    ctx3.textBaseline = "middle";
    ctx3.fillStyle = "rgb(64,155,64)";
    var sX = keepOnScrn(canX - xMargin);
    var sY = keepOnScrn(canY - yMargin);
    var cX = math.round(toCrdXdivPI(sX) * 100) / 100;
    var cY = math.round(toCrdY(sY) * 100) / 100;
    var str = "Screen Coords: " + sX + ", " + sY + "           xy-Coords: " + cX + piStr + ", " + cY;
    ctx3.clearRect(0, 0, canLyr3.width, canLyr3.height);
    ctx3.fillText(str, canLyr3.width / 2, yMargin / 2, canLyr3.width - 10);
      }//goTrace is FALSE
      }


/*-----------------------
function showPos() {
    //large, centered, bright green text
    // ctx.font = "24pt Helvetica";
    ctx3.font = "regular 20px Droid Sans";
    ctx3.textAlign = "center";
    ctx3.textBaseline = "middle";
    ctx3.fillStyle = "rgb(64,155,64)";
    var sX = keepOnScrn(canX - xMargin);
    var sY = keepOnScrn(canY - yMargin);
    var cX = math.round(toCrdXdivPI(sX) * 100) / 100;
    var cY = math.round(toCrdY(sY) * 100) / 100;
    var str = "Screen Coords: " + sX + ", " + sY + "           xy-Coords: " + cX + piStr + ", " + cY;
    // if (mouseIsDown) str += " down";
    // if (!mouseIsDown) str += " up";
    ctx3.clearRect(0, 0, canLyr3.width, canLyr3.height);
    // draw text at center, max length to fit on canLyr3.s
    ctx3.fillText(str, canLyr3.width / 2, yMargin / 2, canLyr3.width - 10);
    // plot cursor
}
---------------------------*/

function checkValue(aVal) {
    if ((isNaN(aVal) || (aVal > yMax[k])) || (aVal < yMin[k])) {
        return NaN;
    } else {
        // return math.round(aVal * 1000000) / 1000000;
        return aVal;
    }
}

function clearCanvs() {
    ctx2.clearRect(0, 0, WIDTH + 2 * xMargin, HEIGHT + 2 * yMargin);
}

function tenTo(j) {
    return math.pow(10, j)
}

function sci2dec(n) {
    n = String(n);
    var info = /([\d\.]+)e-(\d+)/i.exec(n);
    if (!info) {
        return n;
    }

    var num = info[1].replace('.', ''),
        numDecs = info[2] - 1;
    var output = "0.";
    for (var i = 0; i < numDecs; i++) {
        output += "0";
    }
    output += num;
    return output;
}

////console.log ( "begN = " + begN);
////console.log ( "agN = " + agN);
////console.log ( "sagN = " + sagN);
//// console.log ( "math.ceil(agN*tenTo(-i))  = " + math.ceil(agN*tenTo(-i)));
//// console.log ( "return  = " + (tenTo(-i)*sagN*math.ceil(agN*tenTo(-i)) ))  ;}


function toOneSignfcntDigit(begN) {
    begN = Number(begN);
    if (begN == 0) return begN;
    if (begN > 0) return toOneSignfcntDigitPositve(begN);
    else return (-toOneSignfcntDigitPositve(-begN));
}

function toOneSignfcntDigitPositve(begN) {
    var i = Number("0");
    var agN = math.abs(begN);
    var sagN = begN / agN;
    for (i = -2; i < 12; i++) { //console.log("i = " + i );
        if (Number(agN * tenTo(-i)) < Number("10")) {
            break;
        }
    }
    return Number((tenTo(i)) * sagN * math.ceil(agN * tenTo(-i)));
}

function drawAxes() {
    var AXIS_COLOR = "#404040";
    var LINE_COLOR = "#c0c0a0";
    fStyle1 =     "#444444";
    fStyle2 =     "#999999";
    ctx1.fillStyle = fStyle2;
    ctx1.font = "regular 11px Droid Sans";
    //  console.log("Arrived in drawAxes");
    for (var i = 0; i <= LINES[k]; i++) {
        if (ctx1.fillStyle === fStyle2) ctx1.fillStyle = fStyle1;
        else ctx1.fillStyle = fStyle2;
        xPosn = xMargin + i * pxlBetwnLins;
        yPosn = yMargin + i * pxlBetwnLins;

        ctx1.fillRect(xPosn, yMargin, 1, HEIGHT);

        //console.log("yMax[k] = " + yMax[k]); 
        //console.log("yMin[k] = " + yMin[k]); 
        //console.log("LINES[k] = " + LINES[k]); 

        ctx1.fillText((yMax[k] - i * (yMax[k] - yMin[k]) / LINES[k]).toFixed(2), 1, math.round(1.1 * yMargin) + HEIGHT / LINES[k] * i);

        ctx1.fillRect(xMargin, yPosn, WIDTH, 1);
        ctx1.fillText(String(i - LINES[k] / 2) + "\u03C0", math.round(xMargin - 8 + pxlBetwnLins * i), yMargin + HEIGHT + 11);
        ctx1.fillText(" ___", math.round(xMargin - 8 + pxlBetwnLins * i), yMargin + HEIGHT + 11);
        ctx1.fillText("  " + theDenomintr[k], math.round(xMargin - 8 + pxlBetwnLins * i), yMargin + HEIGHT + 22);
    }
}

function toScrX(x) {
    //    return xMargin + math.round(WIDTH * (x - dMin[k]) / dLngth[k]);
    return math.round(xMargin + WIDTH * (x - dMin[k]) / dLngth[k]);
}

function toScrY(y) {
    //    return yMargin + math.round(HEIGHT - HEIGHT * (y - yMin[k]) / yLngth[k]);
    return math.round(yMargin + HEIGHT - HEIGHT * (y - yMin[k]) / yLngth[k]);
}

function toCrdX(xScrn) {
    return (xMin[k] + xScrn * (xMax[k] - xMin[k]) / WIDTH).toFixed(7);
}

function toCrdXdivPI(xScrn) {
    return math.round(((xMin[k] + xScrn * (xMax[k] - xMin[k]) / WIDTH) / theDenomintr[k]) * 100) / 100;
}

function toCrdY(yScrn) {
    return -(yMin[k] + yScrn * (yMax[k] - yMin[k]) / WIDTH).toFixed(3);
}

function plotGraph(crdsX, crdsY, color, width, nOmit) {
    var scrnX, scrnY, crrntY;
    var prevYisNum = false;
    var crrntYisNum = false;
    graphedAlready = true;
    scrnX = toScrX(crdsX[nOmit]);
    ctx2.lineWidth = width;
    //    ctx2.lineJoin = "mitre";
    ctx2.lineJoin = "bevel";
    ctx2.strokeStyle = color;

    for (var i = nOmit; i <= nSteps - nOmit; i += 1) {
        scrnX = toScrX(crdsX[i]);
        crrntY = crdsY[i];
        crrntYisNum = !isNaN(crrntY);
        //      console.log("i = " + i + " -- prevYisNumber = " + prevYisNum + " crdsY[i] = " + crdsY[i]);
        //      console.log("i = " + i + " --  crdsX[i] = " + crdsX[i]);
        if (!prevYisNum) //prevYisNum is false
        {
            if (crrntYisNum) { //console.log("IN 1 --prevYisNum = " + prevYisNum  + "  -- current is " + crrntYisNum );
                ctx2.beginPath();
                ctx2.moveTo(scrnX, toScrY(crdsY[i]));
                prevYisNum = true
            } else { //console.log("IN 2 --prevYisNum = " + prevYisNum + "  -- current is " + crrntYisNum );
                prevYisNum = false
            }
        } else //prevYisNum is true	
        if (!crrntYisNum) { //console.log("IN 3 --prevYisNum = " + prevYisNum + "  -- current is " + crrntYisNum );
            ctx2.stroke();
            ctx2.closePath();
            prevYisNum = false
        } else { //console.log("IN 4 --prevYisNum = " + prevYisNum + "  -- current is " + crrntYisNum );
            scrnY = toScrY(crdsY[i]);
            ctx2.lineTo(scrnX, toScrY(crdsY[i]));
            prevYisNum = true
        }
    }
    if (prevYisNum) {
        ctx2.stroke();
        ctx2.closePath();
    }
}


	
function evaluateMathExpr(mathX){
 // Set values on the scope visible inside the math expression.
    console.log("mathX   = " + mathX);
    scope.x = mathX;
    console.log("scope.x = " +scope.x);
//    scope.t = 0
 // Evaluate the previously parsed math expression with the
 // new values for 'x' and 't' and return it.
 //console.log("tree.eval()   = " + tree.eval());
   // return (tree.eval()).toFixed(7);
      code2=tree.compile();
   return code2.eval(scope);
	  }
			  
function genData(fxString) {
    var tmpX = [nSteps];
    var tmpD1 = [nSteps];
    var tmpD2 = [nSteps];
    var tmpAD = [nSteps];
    tmpD1[0] = NaN;
    tmpD1[nSteps] = NaN;
    tmpD2[0] = NaN;
    tmpD2[1] = NaN;
    tmpD1[nSteps] = NaN;
    tmpD1[nSteps - 1] = NaN;

    var x = Number(dMin[k].toFixed(7));
    tmpX[0] = x;
//    x = 1.1;
    console.log("tmpX[0] =  " + tmpX[0]);
    tmpY[0] =  evaluateMathExpr(x);
    for (var i = 1; i <= nSteps; i += 1) {
        tmpX[i] = math.round(10000000*tmpX[i - 1] +10000000*stepLngth)/10000000;
        console.log("tmpX[i]  =  " + tmpX[i]);
        x = tmpX[i];
        tmpY[i] = evaluateMathExpr(x);
        console.log("tmpY[i] before checkValue = " + tmpY[i]);
        tmpY[i] = checkValue(tmpY[i]);
        console.log("tmpY[i] after = " + tmpY[i]);
    }
    plotGraph(tmpX, tmpY, "#000088", 1, 0);

    if (document.getElementById("minus").checked) {
        tmpAD[0] = 0.0;
        for (var i = 1; i <= nSteps; i += 1) {
            if (isNaN(tmpY[i - 1])) {
                if (isNaN(tmpY[i])) tmpAD[i] = NaN;
                else tmpAD[i] = 0;
            } else tmpAD[i] = checkValue(tmpAD[i - 1] + tmpY[i - 1] * stepLngth);
            // console.log ("i = "+i+" --  tmpAD[i]  = " + tmpAD[i]);	
        }
        plotGraph(tmpX, tmpAD, "#00dd00", 1, 0);
    }

    if (document.getElementById("first").checked) {
        for (var i = 1; i < nSteps; i += 1) {
            tmpD1[i] = checkValue((tmpY[i + 1] - tmpY[i - 1]) / stepLngth / 2);
        }
        plotGraph(tmpX, tmpD1, "#880000", 1, 1);
    }

    if (document.getElementById("second").checked) {
        if (!(document.getElementById("first").checked)) {
            for (var i = 1; i < nSteps; i += 1) {
                tmpD1[i] = checkValue((tmpY[i + 1] - tmpY[i - 1]) / stepLngth / 2);
            }
        }
        for (var i = 2; i < (nSteps - 1); i += 1) {
            tmpD2[i] = checkValue((tmpD1[i + 1] - tmpD1[i - 1]) / stepLngth / 2);
        }
        plotGraph(tmpX, tmpD2, "#004466", 1, 2);
    }
}



init();
