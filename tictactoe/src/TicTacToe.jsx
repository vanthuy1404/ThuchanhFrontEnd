import React, { useState } from "react";
import Button from "./component/Button";
function TicTacToe(){
    const cells = Array.from({length:9});
    const boardStyle ={
        display: 'grid',
        width: '310px',
        gridTemplateColumns: 'repeat(3,100px)',
        gridTemplateRows: 'repeat(3,100px)',
        gap: '5px',
        margin: '0 auto'

    }
    const cellStyle ={
        width: "100px",
        height: "100px",
        border: "1px solid black",
        backgroundColor: "#f0f0f0",
        fontFamily: "Arial",
        fontSize: "24px",
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const [board, setBoard] = useState(Array(9).fill(''));
    const [turn, setTurn] = useState('X');
    const [isActive, setIsActive] = useState(true);
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);
    const [history, setHistory] = useState([]);
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    const checkWinner = (board)=>{
        for(const combination of winningCombinations){
            if(board[combination[0]] !== '' && 
               board[combination[0]] === board[combination[1]] && 
               board[combination[0]] === board[combination[2]]){
                for(let index of combination){
                    document.querySelectorAll('.cell')[index].style.backgroundColor = 'yellow';
                }
                return true;
            }
        }
        return false;
    }
    const cellHandleClick = (index) => {
        if (isActive && board[index] === '') {
            // Xử lí history
            const newHistory = [
                ...history,
                { turn, cell: index + 1 }
            ];
            setHistory(newHistory);

            // Tạo thẻ p hiển thị lượt chơi
            const p = document.createElement('p');
            p.innerHTML = `Lượt chơi thứ ${newHistory.length}: ${turn} đi vào ô số ${index + 1}`;
            document.querySelector('.history').appendChild(p);

            const newBoard = [...board];
            newBoard[index] = turn;
            setBoard(newBoard);

            document.querySelectorAll('.cell')[index].style.color = turn === 'X' ? 'red' : 'blue';

            if (checkWinner(newBoard)) {
                setIsActive(false);
                setWinner(turn);
                return;
            }
            if (newBoard.every(cell => cell !== '')) {
                setDraw(true);
                setIsActive(false);
                return;
            }
            setTurn(turn === 'X' ? 'O' : 'X');
        }
        return;
    }
    const handleReplay = () =>{
        console.log('Replay');
        setBoard(Array(9).fill(''));
        setIsActive(true);
        setTurn('X');
        setWinner(null);
        setDraw(false);
        setHistory([]);
        const cells= document.querySelectorAll('.cell');
        cells.forEach(cell=> {
            cell.style.backgroundColor = '#f0f0f0';
            cell.style.color = 'black';
            cell.innerHTML = '';
        })
        document.querySelector('.history').innerHTML = '';
    }
    
    return(<>
        <h2 style={{textAlign: 'center'}}>Tic Tac Toe</h2>
        <p id="turn" style={{textAlign: 'center'}}>Lượt chơi tiếp theo: {turn}</p>
        <div className="board" style={boardStyle}>
        {
            cells.map((_,index)=>(
                <div className="cell" style={cellStyle} key={index} onClick={()=>cellHandleClick(index)}>{board[index]}</div>
            ))
        }
        </div>
        <p style={{textAlign:'center'}}>
            {winner && <span>Người chiến thắng là {winner}</span>}
            {draw && <span>Trò chơi kết thúc. Kết quả Hòa</span>}
        </p>
        <Button content="Replay" handleFunction = {handleReplay} />
        <div className="history"></div>
    </>);
}
export default TicTacToe