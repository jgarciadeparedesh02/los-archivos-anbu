import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <Card className="mt-6 border-2">
        <CardHeader>
          <CardTitle>¡Quiz completado!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Tu puntuación final es: **{score} de {questions.length}**
          </p>
          <Button onClick={handleRestart} className="mt-4">
            Volver a empezar
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="mt-6 border-2">
      <CardHeader>
        <CardTitle>
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = currentQuestion.correctAnswer === index;
            
            let classNames = 'justify-start text-left h-auto whitespace-normal transition-colors';
            if (showFeedback) {
              if (isCorrect) {
                classNames += ' border-green-500 text-green-700 bg-green-50/50 hover:bg-green-50/80';
              } else if (isSelected) {
                classNames += ' border-red-500 text-red-700 bg-red-50/50 hover:bg-red-50/80';
              }
            } else if (isSelected) {
              classNames += ' bg-muted hover:bg-muted/80';
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={classNames}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
              >
                {option}
              </Button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={`mt-4 p-4 rounded-md border-2 ${selectedAnswer === currentQuestion.correctAnswer ? 'border-green-500 bg-green-50/50' : 'border-red-500 bg-red-50/50'}`}>
            <p className="font-semibold">
              {selectedAnswer === currentQuestion.correctAnswer
                ? '¡Correcto! 🎉'
                : 'Incorrecto.'}
            </p>
            <p className="text-sm">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {showFeedback ? (
            <Button onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1 ? 'Siguiente' : 'Finalizar'}
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
              Comprobar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Quiz;
