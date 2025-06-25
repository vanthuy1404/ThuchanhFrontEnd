function Button(props) {
    const bntStyle={
        width: "100px",
        height: "30px",
        border: "none",
        display: "block",
        margin:"10px auto",
        padding:"5px",
        backgroundColor: "red",
        color: 'white',
        borderRadius: "3px"
    }
    return(
        <button type="button" style={bntStyle} onClick={props.handleFunction}>{props.content}</button>
    );
}
export default Button