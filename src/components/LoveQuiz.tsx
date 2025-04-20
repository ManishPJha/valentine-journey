
import { useState } from "react";
import { Heart } from "lucide-react";

const questions = [
  {
    question: "Where did we first meet?",
    options: ["Add option 1", "Add option 2", "Add option 3", "Add option 4"],
    correctAnswer: 0
  },
  {
    question: "What's my favorite food that you cook?",
    options: ["Add option 1", "Add option 2", "Add option 3", "Add option 4"],
    correctAnswer: 0
  },
  {
    question: "Where was our first vacation together?",
    options: ["Add option 1", "Add option 2", "Add option 3", "Add option 4"],
    correctAnswer: 0
  }
];

const LoveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto text-center">
        <Heart className="w-12 h-12 mx-auto mb-4 text-secondary animate-float" />
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-secondary mb-12">
          Our Love Quiz
        </h2>

        <div className="bg-white p-8 rounded-2xl romantic-shadow">
          {showScore ? (
            <div className="space-y-4">
              <h3 className="text-2xl font-playfair font-bold text-secondary">
                Score: {score}/{questions.length}
              </h3>
              <p className="text-secondary/80">
                {score === questions.length
                  ? "Perfect! You know me so well! ❤️"
                  : "Let's make more memories together! ❤️"}
              </p>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowScore(false);
                }}
                className="px-6 py-2 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition-colors mt-4"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-playfair font-semibold text-secondary">
                {questions[currentQuestion].question}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    className="p-4 rounded-lg border-2 border-primary hover:bg-primary/10 transition-colors text-secondary"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="text-secondary/60">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoveQuiz;
