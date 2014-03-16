//game     = [1,1,1,1,0,0,9,9,9,9];
//winboard = [9,9,9,9,0,0,1,1,1,1];
// stack overflow

game     = [1,1,1,0,0,9,9,9];
winboard = [9,9,9,0,0,1,1,1];
// stack overflow

//game     = [1,1,0,0,9,9];
//winboard = [9,9,0,0,1,1];
// 2984 winners, 218 losers

//game     = [1,1,0,9,9];
//winboard = [9,9,0,1,1];
// 2 winners, 10 losers

//game     = [1,0,0,0,9];
//winboard = [9,0,0,0,1];
// 30 winners, 0 losers

//game     = [1,0,0,9];
//winboard = [9,0,0,1];
// 8 winners, 0 losers

winners = []
losers = []


function dagnode(board, par, winners, losers) {
  this.board = board;
  // the parent of this node
  this.par = par;
	this.doit = doit;
  this.printchain = printchain;
    
  function printchain() {
    if (this.par === null) {
      print(this.board);
      return;
    }
    print(this.board);
    par.printchain();
  }
	function doit() {
	  if (win(this.board)) {
		  winners.push(this);
      return;
	  }
    if (lose(this.board)) {
      losers.push(this);
      return;
    }
    for (var i = 0, l=this.board.length; i < l; i++) {
      var moves = legalmoves(i, this.board); 
      if (moves.length > 0) {
        for (var j = 0, k=moves.length; j < k; j++) {
          var newboard = makemove(i, moves[j], this.board);
          new dagnode(newboard, this, winners, losers);
        }
      }
    }
	}
	this.doit();
}

function makemove(from, to, board) {
  var newboard = []
  for (var i = 0, l=board.length; i < l; i++) {
    newboard[i] = board[i];
  }
  newboard[to] = newboard[from];
  newboard[from] = 0;
  return newboard;
}
	
function win(game) {
  return game.compare(winboard);
}

function lose(game) {
  var remlegalmoves = 0;
  for (var i = 0, l=game.length; i < l; i++) {
    remlegalmoves = remlegalmoves + legalmoves(i, game).length;
  }
  if (remlegalmoves === 0) {
    var result = win(game);
    return !result;
  }
  return false;
}
   	 
function legalmoves(from, game) {
  var moves = []
  if (game[from] === 1) { //must move right
	  if (canstep(from, game)) {
		  moves.push(from+1);
	  }
		if (canjump(from, game)) {
		  moves.push(from+2);
	  }
	}
  if (game[from] === 9) { //must move left
	  if (canstep(from, game)) {
		  moves.push(from-1);
	  }
		if (canjump(from, game)) {
		  moves.push(from-2);
	  }
	}
	return moves;
}
  

function canstep (from, game) {
  if (game[from] === 1) { //must move right
	  return legal(from, from+1, game);
	}
  if (game[from] === 9) { //must move left
	  return legal(from, from-1, game);
	}
}

function canjump(from, game) {
  // no jumping over blanks (i.e. 0) allowed
  if (game[from] === 1) { //must move right
	  return (game[from+1] !== 0) && legal(from, from+2, game);
	}
  if (game[from] === 9) { //must move left
	  return (game[from-1] !== 0) && legal(from, from-2, game);
	}
}


function legal(from, to, board) {
	if (board[from] !== 0) {
		if (board[to] === 0) {
			if (Math.abs(from - to) <= 2) {
				return true;
			}
		}
	} 
  return false;
}

// from Tomáš Zato: http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
// attach the .compare method to Array's prototype to call it on any array
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}


////////////  MAIN  /////////////
new dagnode(game, null, winners, losers);

print("WINNERS");
for (var i = 0, l=winners.length; i < l; i++) {
  winners[i].printchain();
  print();
}
print("Total winners: " + winners.length);

print("====================");

print("LOSERS");
//losers[0].printchain();
for (var i = 0, l=losers.length; i < l; i++) {
  losers[i].printchain();
  print();
}
print("Total losers: " + losers.length);
