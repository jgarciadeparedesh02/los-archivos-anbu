import React, { useReducer } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

// Interfaz para una sola pregunta
interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Props del componente Quiz
interface QuizProps {
  questions: Question[];
}

// --- Lógica del Reducer ---

// 1. Definición del estado
interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  score: number;
  quizFinished: boolean;
}

// 2. Definición de las acciones
type QuizAction = 
  | { type: 'SELECT_ANSWER'; payload: number }
  | { type: 'SUBMIT' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESTART' };

// 3. Estado inicial
const initialState: QuizState = {
  currentQuestionIndex: 0,
  selectedAnswer: null,
  showFeedback: false,
  score: 0,
  quizFinished: false,
};

// --- Componente Principal ---

const Quiz: React.FC<QuizProps> = ({ questions }) => {

  // 4. Función Reductora (definida dentro para acceder a `questions`)
  const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
    switch (action.type) {
      case 'SELECT_ANSWER':
        if (state.showFeedback) return state; // No cambiar selección si ya se mostró el feedback
        return { ...state, selectedAnswer: action.payload };

      case 'SUBMIT': {
        if (state.selectedAnswer === null) return state;
        const isCorrect = state.selectedAnswer === questions[state.currentQuestionIndex].correctAnswer;
        return {
          ...state,
          showFeedback: true,
          score: isCorrect ? state.score + 1 : state.score,
        };
      }

      case 'NEXT_QUESTION': {
        const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
        if (isLastQuestion) {
          return { ...state, quizFinished: true };
        }
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          selectedAnswer: null,
          showFeedback: false,
        };
      }

      case 'RESTART':
        return initialState;

      default:
        return state;
    }
  };

  // 5. Inicialización del reducer
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { currentQuestionIndex, selectedAnswer, showFeedback, score, quizFinished } = state;

  // --- Renderizado ---

  if (quizFinished) {
    const finalPercentage = (score / questions.length) * 100;
    let feedbackMessage = '';
    if (finalPercentage === 100) {
      feedbackMessage = '¡Excelente! Eres un auténtico maestro Jonin.';
    } else if (finalPercentage >= 70) {
      feedbackMessage = '¡Muy bien! Tienes potencial de Chunnin.';
    } else if (finalPercentage >= 50) {
      feedbackMessage = 'No está mal, pero un Genin necesita seguir entrenando.';
    } else {
      feedbackMessage = 'Necesitas repasar los conceptos básicos.';
    }

    return (
      <Card className="mt-6 overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle>¡Quiz Completado!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="text-muted-foreground">Tu puntuación final es:</p>
            <p className="text-4xl font-bold">{score} / {questions.length}</p>
          </div>
          <p className="text-lg text-muted-foreground">{feedbackMessage}</p>
          <Button onClick={() => dispatch({ type: 'RESTART' })} className="mt-4">
            Volver a empezar
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="mt-6 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle as="h3" className="text-xl">Autoevaluación</CardTitle>
          <Badge variant="secondary">Pregunta {currentQuestionIndex + 1} de {questions.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold mb-6">{currentQuestion.question}</p>
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = currentQuestion.correctAnswer === index;

            return (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  'justify-start text-left h-auto whitespace-normal p-4 transition-colors',
                  {
                    'bg-muted ring-2 ring-ring': isSelected && !showFeedback,
                    'bg-primary text-primary-foreground': showFeedback && isCorrect,
                    'bg-destructive text-destructive-foreground': showFeedback && isSelected && !isCorrect,
                    'opacity-50': showFeedback && !isSelected && !isCorrect,
                  }
                )}
                onClick={() => dispatch({ type: 'SELECT_ANSWER', payload: index })}
                disabled={showFeedback}
              >
                {option}
              </Button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-6 p-4 rounded-lg border bg-muted/50">
            <div className="flex items-center gap-3">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <Badge className="bg-primary hover:bg-primary/90">¡Correcto! 🎉</Badge>
              ) : (
                <Badge variant="destructive">Incorrecto...</Badge>
              )}
            </div>
            <p className="mt-3 text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-2 flex justify-end">
        {showFeedback ? (
          <Button onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>
            {currentQuestionIndex < questions.length - 1 ? 'Siguiente' : 'Finalizar'}
          </Button>
        ) : (
          <Button onClick={() => dispatch({ type: 'SUBMIT' })} disabled={selectedAnswer === null}>
            Comprobar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Quiz;