import { Quiz } from "../models/quiz.model";
import { Question } from "../models/question.model";

export const QUESTION_ACTOR: Question = {
    label: "Jean Gabin a joué dans...",
    answers: [
        {
            value: "Les tuches II",
            isCorrect: false,
        },
        {
            value: "La grande illusion",
            isCorrect: true,
        }
    ]
};

export const QUESTION_SPORT: Question = {
    label: "... a eu un accident de ski en 2013",
    answers: [
        {
            value: "Michael Schumacher",
            isCorrect: true,
        },
        {
            value: "Franz Schubert",
            isCorrect: false,
        }
    ]
};

export const QUIZ_LIST: Quiz[] = [
    {
        id: "1",
        name: "Les Acteurs", // What's happening if I change this value..?
        theme: "Actor",
        questions: [QUESTION_ACTOR],
    },
    {
        id: "2",
        name: "Les Sports",
        theme: "Sport",
        questions: [QUESTION_SPORT],
    }
];
