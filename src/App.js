import { React, useState, useEffect, useRef } from "react";
import FlashCardList from "./FlashCardList";
import './App.css';
import axios from "axios";

function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryE1 = useRef();
  const amountE1 = useRef();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then(res => {
        setCategories(res.data.trivia_categories);
      })
    }, []);
  useEffect(() => {
    ;
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }
  function handleSubmit(e){
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountE1.current.value,
          category: categoryE1.current.value
        }
      })
      .then(res => {
        setFlashCards(res.data.results.map((questionItem, index) => {
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: decodeString(questionItem.correct_answer),
          }
        }));
      })
  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryE1}>
            {categories.map(category => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            } )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type='number' id="amount" min='1' step="1" defaultValue="10" ref={amountE1}/>
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div> 
      </form>
      <div className="container">
        <FlashCardList flashCards={flashCards} />
      </div>
    </>
    
    
  )
}

// const SAMPLE_FLASHCARDS = [
//   {
//     id: 1,
//     question: "What is the capital of Brazil?",
//     imgQuestion: "https://ae01.alicdn.com/kf/HTB1gy3NQpXXXXX.apXXq6xXFXXXX/nh-m-i-nh-t-g-n-n-150x150-cm-Studio-Nhi-p-nh-Ph.jpg_Q90.jpg_.webp",
//     answer: "Brasilia",
//     imgAnswer: "https://ae01.alicdn.com/kf/HTB1gy3NQpXXXXX.apXXq6xXFXXXX/nh-m-i-nh-t-g-n-n-150x150-cm-Studio-Nhi-p-nh-Ph.jpg_Q90.jpg_.webp"
//   }
// ];

export default App;
