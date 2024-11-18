import React, {useState} from 'react'
import './mainpage.css'
import { evaluate } from 'mathjs';
const HomePage = () => { 
    const operators = ['+', '-', '*', '/', '%'];
    const [expression, setexpression] = useState("");
    const [equalty, setequalty] = useState("");
    const [expressionClass, setexpressionClass] = useState("");
    const [equalityClass, setequalityClass] = useState("");
    const MAX_LENGTH = 18;

    // This function handle the clicks of number buttons
    const handleClick = (value)=>{
        if(equalty){
            setexpression(value);
            setequalty("");
            resetClasses();
        }
        else{
            if(expression === "0" && value !== "0" && value !== ".")
                {
                setexpression(value);
            }
            else if (expression === "0" && value === "."){
                setexpression("0.");
            }
            else if (expression.length <= MAX_LENGTH){
                setexpression((prev)=>prev + value);
            }
        }
    }

    // This function handle the clicks of operator buttons
    const handleOpertion = (op) =>{
        if(expression.length === 0 || !isOperator(expression.charAt(expression.length -1))){
            if (equalty){
                setexpression(equalty + op);
                setequalty("");
                resetClasses();
                // setequalty(equalty + op);
                // setexpression("hello")
            }
            else{
                setexpression((prev)=> prev + op);
            }
        } 
        else{
            setexpression((prev)=>prev.slice(0, -1) + op)
        }
        }

    // This function checks if the operator is present in the operators array
    const isOperator = (char) =>{
        return operators.includes(char);
    }

    // This function clears the screen on clicking the AC button
    const clearAll = () =>{
        setexpression("");
        setequalty("");
        resetClasses();
    }

    // This function removes the single last digit in an expression after clicking C button
    const clear = () =>{
        setexpression(expression.slice(0, -1));
    }

    // This function calculates the value of an expression using evaluate function 
    const calculateValue = () =>{
        try {
            if (expression && !isOperator(expression.charAt(expression.length - 1))) {
                const result = evaluate(expression);
                setequalty(result);
                setexpressionClass("afresult");
                setequalityClass("afequality"); 
              }
        } catch (error) {
            setequalty("Expression Error");
        }
        }
        const resetClasses = () => {
            setexpressionClass(""); // Reset expression class
            setequalityClass(""); // Reset equalty class
        };

      // This function displays the value on screen  
    const displayValue = () => {
        return (
            <div className="display">
                <span className={`result ${expressionClass}`}>{expression}</span>
                <br />
                {equalty && (
                    <div>
                        <span className={`result ${equalityClass}`}>{equalty}</span>
                    </div>
                )}
            </div>
        );
    };    
  return (
        <div className="calc-box">
        <div className="screen"  >{displayValue()}</div>
        <div className="buttons">
        <button className="topBox" onClick={clearAll}>AC</button>
        <button disabled={equalty} className="topBox" onClick={clear}>C</button>
        <button disabled={expression.length===0?true:false}value="%" className="topBox" onClick={(e)=>handleOpertion(e.target.value)}>%</button>
        <button disabled={expression.length===0?true:false}value="/"className="op-button" onClick={(e)=>handleOpertion(e.target.value)}>/</button>
        <button value="7" className="box" onClick={(e)=>handleClick(e.target.value)}>7</button>
        <button value="8" className="box" onClick={(e)=>handleClick(e.target.value)}>8</button>
        <button value="9" className="box" onClick={(e)=>handleClick(e.target.value)}>9</button>
        <button disabled={expression.length===0?true:false}value="*" className="op-button" onClick={(e)=>handleOpertion(e.target.value)}>*</button>
        <button value="4" className="box" onClick={(e)=>handleClick(e.target.value)}>4</button>
        <button value="5" className="box" onClick={(e)=>handleClick(e.target.value)}>5</button>
        <button value="6" className="box" onClick={(e)=>handleClick(e.target.value)}>6</button>
        <button disabled={expression.length===0?true:false}value="-" className="op-button" onClick={(e)=>handleOpertion(e.target.value)}>-</button>
        <button value="1" className="box" onClick={(e)=>handleClick(e.target.value)}>1</button>
        <button value="2" className="box" onClick={(e)=>handleClick(e.target.value)}>2</button>
        <button value="3" className="box" onClick={(e)=>handleClick(e.target.value)}>3</button>
        <button disabled={expression.length===0?true:false}value="+" className="op-button" onClick={(e)=>handleOpertion(e.target.value)}>+</button>
        <button disabled={true} className="box">M</button> {/*this button is for decoration purposes and doesn't have any functionaliy*/}
        <button disabled={expression === "0"}value="0" className="box" onClick={(e)=>handleClick(e.target.value)}>0</button>
        <button disabled={expression.length===0 || expression.includes(".")} value="." className="box" onClick={(e)=>handleClick(e.target.value)}>.</button>
        <button disabled={expression.length===0 || isOperator(expression.charAt(expression.length - 1)) || !(operators.some((op) => expression.includes(op)))} value="=" className="op-button" onClick={(e)=>{calculateValue(e.target.value);}}>=</button>
        </div>
        </div>
  )
}
export default HomePage