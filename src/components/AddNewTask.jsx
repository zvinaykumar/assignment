'use client';
import { useState } from "react";
// import "./styles.css";

export default function AddNewTask() {
  const [questions, setQuestions] = useState([]);
  console.log("compleate quations==>",questions)

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { type: "Short Answer", question: "", childQuestions: [] },
    ]);
  };

  const handleQuestionTypeChange = (index, event) => {
    const { value } = event.target;
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].type = value;
      if (value === "True/False") {
        updatedQuestions[index].childQuestions = [{ question: "", answer: "" }];
      } else {
        updatedQuestions[index].childQuestions = [];
      }
      return updatedQuestions;
    });
  };

  const handleQuestionChange = (index, event) => {
    const { value } = event.target;
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].question = value;
      return updatedQuestions;
    });
  };

  const addSubQuestion = (parentIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.map((question, index) => {
        if (index === parentIndex) {
       
          return {
            ...question,
            childQuestions: [
              ...question.childQuestions,
              { question: "", answer: "" }
            ]
          };
        }
        return question;
      });
      return updatedQuestions;
    });
  };
  

  const handleSubQuestionChange = (parentIndex, subIndex, event) => {
    const { name, value } = event.target;
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[parentIndex].childQuestions[subIndex][name] = value;
      return updatedQuestions;
    });
  };

  const deleteQuestion = (index) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
  };

  const deleteSubQuestion = (parentIndex, subIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[parentIndex].childQuestions.splice(subIndex, 1);
      return updatedQuestions;
    });
  };
  return (
    <div className="dynamic-question-form">
      <h1>Add your Quation here</h1>
      <button className="btn" onClick={addQuestion}>Add New Question</button>

      {questions.map((question, index) => (
        <div key={index} className="question">
          <div className="questionparant" >

          
          <select
            className=""
            value={question.type}
            onChange={(event) => handleQuestionTypeChange(index, event)}
          >
            <option value="Short Answer">Short Answer</option>
            <option value="True/False">True/False</option>
          </select>
          <input
            type="text"
            className="input"
            value={question.question}
            onChange={(event) => handleQuestionChange(index, event)}
            placeholder="Enter your question"
          />
          <button className="delete-btn" onClick={() => deleteQuestion(index)}>
            Delete
          </button>
        
          </div>
          {question.type === "True/False" && (
            <div>
              <h4>Sub Questions</h4>
              <button className="btn" onClick={() => addSubQuestion(index)}>
                Add Sub Question
              </button>
              {question.childQuestions.map((subQuestion, subIndex) => (
                <div key={subIndex} className="sub-question">
                  <input
                    type="text"
                    name="question"
                    className="input"
                    value={subQuestion.question}
                    onChange={(event) =>
                      handleSubQuestionChange(index, subIndex, event)
                    }
                    placeholder="Enter sub question"
                  />
                  <input
                    type="text"
                    className="input"
                    name="answer"
                    value={subQuestion.answer}
                    onChange={(event) =>
                      handleSubQuestionChange(index, subIndex, event)
                    }
                    placeholder="Enter answer"
                  />
                  <button
                    className="delete-btn"
                    onClick={() => deleteSubQuestion(index, subIndex)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
