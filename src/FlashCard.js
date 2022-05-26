import {React, useState, useEffect, useRef } from "react";

function FlashCard( { flashCard } ) {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');

    const frontE1 = useRef();
    const backE1 = useRef();

    function setMaxHeight(){
        const frontHeight = frontE1.current.getBoundingClientRect().height;
        const backHeight = backE1.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100));
    }

    useEffect(setMaxHeight, [flashCard.question, flashCard.answer]);
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight);
        return () => window.removeEventListener('resize', setMaxHeight);
    }, []);
  return (
    <div 
        className={`card ${flip ? "flipped" : ""}`}
        style={{height: height}}
        onClick={() => setFlip(!flip)}
    >
        <div className="card-front" ref={frontE1}>
            <p>{flashCard.question}</p>
            {flashCard.imgQuestion && 
                <img className="card-img" src={flashCard.imgQuestion} alt="question-mark" />
            }
        </div>
        <div className="card-back" ref={backE1}>
            <p>{flashCard.answer}</p>
            {flashCard.imgAnswer && 
                <img className="card-img" src={flashCard.imgAnswer} alt="question-mark" />
            }
        </div>
    </div>
  );
}

export default FlashCard;