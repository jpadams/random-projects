#!/usr/bin/js

//I'm using Rhino for my js interpreter executable


////////////////////////////////////////////////////////////////////////////////////////////
// 
// copyleft Jeremy Adams, Sept 2012
//
// This function was created to solve a problem  posed to 5th graders at 
// my daughter's elementary school. 
// The problem is: given the numbers 1_2_3_4_5_6_7_8_9 and the operators {+, -, *, /},
// can some combination of of operators be put where the underscores are such that the 
// after calculating in accordance with standard operator precedence rules (P.E.M.D.A.S)
// the result is exactly 100?
//
// Many kids were frustrated by this problem, and many others found the most common (I'm guessing)
// solution which involves 7 of one operator and 1 of another.
//
// I wanted to find all of the solutions to every combination of operators and then I can use grep
// on the output to find the 15 solutions out of 65,000+ that equal precisely 100.
//
// The exact number of solutions to the original problem is 4^8, that is, 4 operators to the power of 
// 8 "gaps" between the numbers 1-9. The numbers themselves never change position or value, so that's it.
// 4 to the eighth power is 65536.
//
// The function is parameterized so that you can enter an array of 2 or more numbers and an array of 1 or more operators
// as quoted strings.
//
// My quick and dirty strategy was to form all of the possbile strings which represented the 65K+ options
// and then let js eval them all to give me the answers. I spew the results out on the stdout so the 
// results can be captured in a file or piped to grep etc for analysis.
/////////////////////////////////////////////////////////////////////////////////////////////////////
function doo (numArray, oppsArray) {
	var numbers = numArray,
		numGaps = numbers.length - 1, //"gaps" between numbers where we'll put diff operators
		opps = oppsArray,//binary math operators like "+", "-", "*" as quoted single char strings in array
		numOpps = opps.length,
		numLines = power(numOpps, numGaps), //how many possible permutations of numbers&opps
		numCols = new Array(numbers.length),//multi-dim array of the numbers
		gapCols = new Array(numGaps),//mult-dim array of all of the possible operator combos
		strings = new Array(numLines),//to hold the output of the merger of the two col sets
		colNum = 0, block = 0, step =0, //tons of indexers & counters
		i=0, i2=0, j=0, j2=0, j3=0,k=0, l1=0,l2=0,l3=0,l4=0, oppInd =0;
	for (i = 0; i < numCols.length; i++) {//fill up the numCols array with all of the numbers
		numCols[i] = new Array(numLines);
		for (i2=0; i2<numLines; i2++) {
			numCols[i][i2] = numbers[i];
		}
	}
	
	for (j2 = 0; j2 < gapCols.length; j2++) {//prepare the multi-dim array of "gaps" for the operators
		gapCols[j2] = new Array(numLines);
	}
	for (j = 0; j < gapCols.length; j++) {
		oppInd = 0; //which operator is inserted into gap
		block = numLines/power(numOpps, (j+1));
		for (step = 0; step<numLines; ) {
			for (j3=0; j3<block; j3++) {
				gapCols[j][step] = opps[oppInd%numOpps];
				step++;
			}
			oppInd++;
		}
	}
	for (l1=0; l1<strings.length; l1++) { //merges the numCols and the gapCols into all combos as strings
		strings[l1]="";
		for (l2=0; l2<numbers.length; l2++) {
			strings[l1] = strings[l1] + numCols[l2][l1];
			// print(strings[l1]);
			if (l2 < gapCols.length) {
				strings[l1] = strings[l1] + gapCols[l2][l1];
				// print(strings[l1]);
			}
		}
	}
	for (l4=0; l4<strings.length; l4++) {
		print(strings[l4] + " = " + eval(strings[l4]) + " <<"); //print out the string, & eval the string to see what it comes to.
	}
}

function power (x, y) { //used by doo above
	var result = x;
	for (var i = y-1; i > 0; i--) {
		result = result * x;
	}
	return result;
}


// MAIN
// Here's the original problem
doo([1,2,3,4,5,6,7,8,9], ['+','-','*','/']);

// Here are some examples to explore
// doo([1,2,3,4,5,6,7,8,9], ['+', '*']);
// doo([2,4,6,8,10,12,14,16,18,20], ["*","/","+","-"]);












// a bunch of random javascript math stuffs

function numsUpTo(n) {
	var results = [];
	for (var i=0; i<n; i++) {
		results[i] = i+1;
	}
	return results;
}

function firstN(n,a) {
	if (a === undefined) {
		return numsUpTo(n);
	}
	var results = [];
	for (var i=0; i<n; i++) {
		results[i]=a[i];
	}
	return results;
}

function firstNEvens(n,a) {
	if (a === undefined) {
		a = numsUpTo(n*2);
	}
	return evens(firstN(n*2,a));
}

function firstNOdds(n,a) {
	if (a === undefined) {
		a = numsUpTo(n*2-1);
	}
	return odds(firstN(n*2-1,a));
}

function arcsin(x, its) { //not right yet
	var nums = numsUpTo(its+1);
	var result = 0;
	var even = evens(nums);
	var odd = odds(nums);
	while (its > 0) {
		result += (odd[its]*power(x, odd[its]))/(even[its]*odd[its]);
		its--;
	}
}



var plus = {
	name: "plus",
	fn: function (a,b) {return a+b;}
};

var minus = {
	name: "minus",
	fn: function (a,b) {return a-b;}
};

var times = {
	name: "times",
	fn: function (a,b) {return a*b;}
};

var dividedBy = {
	name: "dividedBy",
	fn: function (a,b) {return a/b;}
};

var opps = [plus, minus, times, dividedBy];




function find100 (numArray, total) {
	if (total === 100) {
		return numArray;
	}
	for (var i = 0; i < numArray.length; i++) {
		total = total + numArray[i];
	}
	return total;
}

function fact (x) {
	if (x < 2) {
		return 1;
	}
	return (x * fact(x-1));
}

function tri (n) {return (n * (n+1))/2;}

function test (r, step, n) {
	for (var j = 0; j < opps.length; j++) {
		print(r.value+" "+opps[j].name+" "+step(r).value+" = "+opps[j].fn(r.value,step(r).value));

	}
}

var root = {
	parents: [null, null],
	opp: null,
	value: 1
};

function incr (n) {
	return node(root, n, plus);
}

function node (p1,p2,o) {
	return {
		parents: [p1, p2],
		opp: o,
		value: o.fn(p1.value,p2.value)
	};
}

function doIt (rt, tgt, n) {

	function helper (r) {

		if (r.value === tgt) {
			return r;
		}
		if (r.parents[1] !== null && n === r.parents[1].value) {
			return r;
		}
		for (var i = 0; i < opps.length; i++) {
			return helper(node(r, incr(r.parents[1]), opps[i]));
		}
	}
	return helper(rt);
}


function evens (a) { //given an array of ints, return an array of the even ones
	var r = [];
	var rInd = 0;
	for (var i=0; i<a.length; i++) {
		if ((a[i] % 2) === 0) {
			r[rInd] = a[i];
			rInd++;
		}
	}
	return r;
}

function odds (a) { //given an array of ints, return an array of the odd ones
	var r = [];
	var rInd = 0;
	for (var i=0; i<a.length; i++) {
		if ((a[i] % 2) !== 0) {
			r[rInd] = a[i];
			rInd++;
		}
	}
	return r;
}


