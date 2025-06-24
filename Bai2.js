let board =["","","","","","","","",""]
let currentPlayer = "X";
let gameActive = true;
document.getElementById('turn').innerHTML= currentPlayer
const cells = document.querySelectorAll('.cell');
cells.forEach((cell,index)=>{
    cell.addEventListener('click', () =>{
        console.log(`Bạn vừa nhấn vào ô số ${index}`);
        handleclick(index, cell);
    } );
})
const handleclick = (index, cell)=>{
    if(cell.innerHTML===''&& gameActive == true){
        cell.innerHTML = currentPlayer;
        board[index]= currentPlayer;
        if(checkWinner()){
            document.getElementById('turn').innerHTML= `Người chiến thắng là ${currentPlayer}`;
            gameActive = false;
            return;
        }
        if(board.every(c => c!='')){
            document.getElementById('turn').innerHTML= `Trò chơi kết thúc. Kết quả Hòa`;
            gameActive = false;
            return;
        }
        currentPlayer= currentPlayer === 'X'?'O':'X';
        document.getElementById('turn').innerHTML= currentPlayer

    }
    else{
        return;
    }
}
const winningCombinations =[
   [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6] 
]
function checkWinner(){
    for(c of winningCombinations) {
        if(board[c[0]]!='' && board[c[0]]===board[c[1]]&& board[c[0]]===board[c[2]]){
        
            return true;
        }
    };
    return false;
}
document.getElementById("replay").onclick = function(){
    gameActive = true;
    currentPlayer= 'X';
    board =["","","","","","","","",""]
    cells.forEach(cell=>cell.innerHTML='');
    document.getElementById('turn').innerHTML= currentPlayer

}