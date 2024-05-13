var turn = true;
var player1 = "Player 1";
var player2 = "Player 2";
var p1_icon = 1;
var p2_icon = 2;
var winner = "";
var gameover = false;
var board = [0, 0, 0, 0, 1, 2, 0, 0, 0];
var icon = {
	x: '<div class="icon"><i class="fa-solid fa-xmark fa-5x"></i></div>',
	o: '<div class="icon"><i class="fa-solid fa-o fa-5x"></i></div>',
};

window.onload = () => {
	init();
	console.log("Initiated");
};

function nameChange(e) {
	if (e.target.id == "player1") {
		player1 = e.target.value;
		if (player1 == "") player1 = "Player 1";
	} else {
		player2 = e.target.value;
		if (player2 == "") player2 = "Player 2";
	}
	show_turn();
}

function show_turn() {
	if(!gameover){
		if (turn) {
			document.getElementById("message").innerText = player1 + "'s turn";
		} else {
			document.getElementById("message").innerText = player2 + "'s turn";
		}
	}
}

function show_board() {
	for (let i = 0; i < 9; i++)
		document.getElementById("" + i).innerHTML =
			board[i] == 1 ? icon.x : board[i] == 2 ? icon.o : "";
}

function celebrate() {
	party.sparkles(document.getElementById("message"), {
		shapes: ["square", "rectangle"],
		count: party.variation.range(50, 200),
		spread: 40,
		speed: party.variation.range(50, 200),
		size: party.variation.skew(0.5, 2),
		rotation: () => party.random.randomUnitVector().scale(180),
		color: () =>
			party.random.pick([
				party.Color.fromHex("#238446"),
				party.Color.fromHex("#1D7DB2"),
				party.Color.fromHex("#FFC800"),
				party.Color.fromHex("#FFFFFF"),
			]),
	});
}

function isWinner(p) {
	for(let i=0; i<9; i+=3)
		if(board[i]==p && board[i+1]==p && board[i+2]==p)
			return true;
	for(let i=0; i<3; i++)
		if(board[i]==p && board[i+3]==p && board[i+6]==p)
			return true;
	if(board[0]==p && board[4]==p && board[8]==p)
		return true;
	if(board[2]==p && board[4]==p && board[6]==p)
		return true;
	return false;
}

function result() {
	block_board();
	if(winner!="")
		document.getElementById("message").innerText = winner + " Won!!!";
	else
		document.getElementById("message").innerText = "No one won, Try again...";
	celebrate();
	document.getElementById("restart").innerText = "Play Again";
}

function isBoardFull() {
	for(let i=0; i<9; i++)
		if(!board[i]) return false;
	return true;
}

function check() {
	let flag = false;
	if(turn && isWinner(p1_icon)){
		flag = true; 
		winner = player1;
	}
	if(!turn && isWinner(p2_icon)) {
		flag = true;
		winner = player2;
	}
	if(!flag && isBoardFull()) {
		flag = true;
		winner = "";
	}
	if(flag) {
		gameover = true;
		result();
	}
}

function play(e) {
	let id = Number.parseInt(e.target.id);
	if (id>=0 && id<9 && !board[id]) {
		if (turn) board[id] = p1_icon;
		else board[id] = p2_icon;
		show_board();
		check();
		if(gameover) return;
		turn = !turn;
		show_turn();
	}
}

function block_board() {
	if (gameover) document.getElementById("gameover").style.display = "flex";
	else document.getElementById("gameover").style.display = "none";
}

function restart() {
	document.getElementById("restart").innerText = "Restart";
	board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	gameover = false;
	winner = "";
	turn = Math.floor(Math.random() * 2) ? true : false;
	if (turn) {
		p1_icon = 1;
		p2_icon = 2;
	} else {
		p1_icon = 2;
		p2_icon = 1;
	}
	block_board();
	show_board();
	show_turn();
	celebrate();
}

function init() {
	document.getElementById("player1").addEventListener("input", nameChange);
	document.getElementById("player2").addEventListener("input", nameChange);
	document.getElementById("restart").addEventListener("click", restart);
	for (let i = 0; i < 9; i++)
		document.getElementById("" + i).addEventListener("click", play);
	restart();
}
