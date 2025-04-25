import { useState } from "react";
import { Heart } from "lucide-react";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number | number[];
};

const questions: Question[] = [
  {
    question: "Who is more romantic among us?",
    options: [
      "Me",
      "You",
      "Koi Nahi",
      "Hum dono ko aaata hi nahi ya maloom hi nahi kon jyada romantic hai",
    ],
    correctAnswer: 3,
  },
  {
    question: "What's my favorite food that you cook?",
    options: ["Butter Chicken", "Biryani", "Pasta", "Dal Makhani"],
    correctAnswer: 2,
  },
  {
    question: "Who is more comedian among us?",
    options: [
      "Me",
      "Me Aganin",
      "Maan le main hi hoon",
      "Ab to maan lo mein hoon",
    ],
    correctAnswer: [0, 1, 2, 3],
  },
  {
    question: "Kya tum mere Subham aur Shrishti ki maa banogi?",
    options: [
      "Yes",
      "Aur koi option nahi hai",
      "Ji bilkul! Mein toh kab se hun ready taiyaar!",
      "Aap bole ho to taal nahi sakti",
    ],
    correctAnswer: [0, 1, 2, 3],
  },
  {
    question: "Who said 'I love you' Most?",
    options: [
      "Me",
      "You",
      "We said it simultaneously",
      "Neither of us has said it",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is our first movie to watch together in Theator?",
    options: ["Pushpa 2", "Pathan", "Salaar", "Kalki 2898 AD"],
    correctAnswer: 3,
  },
  {
    question:
      "Tumhe meri konsi aadat nahi pasand? (I know tum kya select krne wali ho)",
    options: [
      "Naak mein ungli daalna",
      "Tumhare gussa hone par late se manana",
      "Mera Bachpana (isme game bhi aata hai)",
      "Tumhe pasta banane bolna",
    ],
    correctAnswer: 2,
  },
  {
    question: "Inmein se konsi title tere pe jyada suit karegi mere hhisab se?",
    options: ["Sherni", "Sweetu", "Tube light par cute", "Koi bhi nahi"],
    correctAnswer: 2,
  },
  {
    question:
      "Kya tum chahogi ki mein apne future ke liye foreign opportunities seek karun?",
    options: ["Yes", "No", "Dubara mat puchna", "Bilkul bhi nahi"],
    correctAnswer: [1, 2, 3],
  },
  {
    question: "Mujhe kya jyada pasand hai aap ki?",
    options: ["Cooking", "Aap ki smile", "Aap ki eyes", "Aap ka gussa"],
    correctAnswer: [1, 2],
  },
];

const LoveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showCorrect, setShowCorrect] = useState(false);

  const isMultipleChoice = (question: Question) =>
    Array.isArray(question.correctAnswer);

  const handleAnswerClick = (selectedAnswer: number) => {
    const currentQ = questions[currentQuestion];

    if (isMultipleChoice(currentQ)) {
      const newSelectedAnswers = selectedAnswers.includes(selectedAnswer)
        ? selectedAnswers.filter((ans) => ans !== selectedAnswer)
        : [...selectedAnswers, selectedAnswer];
      setSelectedAnswers(newSelectedAnswers);
    } else {
      const isCorrect = selectedAnswer === currentQ.correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }
      setShowCorrect(true);
      setTimeout(() => {
        moveToNextQuestion();
      }, 1000);
    }
  };

  const handleSubmitAnswers = () => {
    const currentQ = questions[currentQuestion];
    const correctAnswers = currentQ.correctAnswer as number[];

    const isCorrect =
      selectedAnswers.every((ans) => correctAnswers.includes(ans)) &&
      !selectedAnswers.some((ans) => !correctAnswers.includes(ans));

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowCorrect(true);
    setTimeout(() => {
      moveToNextQuestion();
    }, 1000);
  };

  const moveToNextQuestion = () => {
    setSelectedAnswers([]);
    setShowCorrect(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const isSelected = (index: number) => selectedAnswers.includes(index);

  const isCorrectAnswer = (index: number) => {
    const correct = questions[currentQuestion].correctAnswer;
    if (Array.isArray(correct)) return correct.includes(index);
    return correct === index;
  };

  return (
    <section className="py-20 bg-love-secondary/20">
      <div className="max-w-2xl mx-auto text-center px-4">
        <Heart className="w-12 h-12 mx-auto mb-4 text-love-primary animate-floating" />
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-love-accent mb-12">
          Our Love Quiz
        </h2>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {showScore ? (
            <div className="space-y-4">
              <h3 className="text-2xl font-playfair font-bold text-love-accent">
                Score: {score}/{questions.length}
              </h3>
              <p className="text-love-accent/80">
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
                className="px-6 py-2 bg-love-primary text-white rounded-full font-medium hover:bg-love-primary/90 transition-colors mt-4"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-playfair font-semibold text-love-accent">
                {questions[currentQuestion].question}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelectedAnswer = isSelected(index);
                  const isCorrect = isCorrectAnswer(index);
                  const highlight =
                    showCorrect && isCorrect
                      ? "bg-green-100 border-green-500"
                      : isSelectedAnswer
                      ? "bg-love-primary/10 border-love-primary"
                      : "border-love-primary hover:bg-love-primary/10";

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={showCorrect}
                      className={`p-4 rounded-lg border-2 transition-colors text-love-accent ${highlight}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {isMultipleChoice(questions[currentQuestion]) &&
                selectedAnswers.length > 0 &&
                !showCorrect && (
                  <button
                    onClick={handleSubmitAnswers}
                    className="px-6 py-2 bg-love-primary text-white rounded-full font-medium hover:bg-love-primary/90 transition-colors mt-4"
                  >
                    Submit Answers
                  </button>
                )}
              <p className="text-love-accent/60">
                {isMultipleChoice(questions[currentQuestion])
                  ? "Select all that apply"
                  : "Select one answer"}
              </p>
              <p className="text-love-accent/60">
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
