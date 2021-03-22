const { Router } = require("express");
const { Question } = require("../../../models");
const { Answer } = require("../../../models");


exports.filter = (needle, haystack, field) =>
{
    console.log("got into filter");
    const truc = haystack.filter((i) => i[field] === needle);
    return truc;
};
exports.filterFirst = (needle, haystack, field) =>
{
    const truc = haystack.filter((i) => i[field] === needle)[0];
    return truc;
};

exports.createEmptyQuestion = (reqbody, quizid) =>
{
    const question = Question.create({ ...reqbody, quizId: quizid, answers: [] });
    return question;
};

function filterr(needle, haystack, field)
{
    console.log("got into local filter");
    return haystack.filter((i) => i[field] === needle);
}

exports.findAnswers = (question) =>
{
    const answers = Answer.get();
    return filterr(question.id, answers, "questionId");
};
