#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parseArgs } from "node:util";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "data.json");

const options = {
  add: {
    type: "boolean",
    short: "a",
  },
};

const {
  values: { add },
} = parseArgs({ options });

const askQuestion = async () => {
  const data = await fs.readFile(dataPath);
  const parsedData = JSON.parse(data.toString());

  const target = parsedData[Math.floor(Math.random() * parsedData.length)];

  const { question, answer } = target;

  const answers = await inquirer.prompt([
    { type: "input", name: "useranswer", message: question },
  ]);

  target.lastAnsweredCorrect = await checkAnswer(answers.useranswer, answer);
  target.lastAsked = new Date().toISOString();

  const newData = parsedData.filter((item) => item.id !== target.id);
  newData.push(target);

  await fs.writeFile(dataPath, JSON.stringify(newData));
};

const checkAnswer = async (input, answer) => {
  console.log(`User answer: ${input}`);
  console.log(`Correct answer: ${answer}`);

  const response = await inquirer.prompt([
    {
      type: "confirm",
      name: "check",
      message: "Was the answer correct?",
    },
  ]);

  return response.check;
};

const addQuestion = async () => {
  console.log("Adding a question");
  const responses = await inquirer.prompt([
    { type: "input", name: "question", message: "What's the question?" },
    { type: "input", name: "answer", message: "What's the answer?" },
  ]);
  console.log(responses);
  const data = await fs.readFile(dataPath);
  const parsedData = JSON.parse(data.toString());

  const newQuestion = {
    id: parsedData.length + 1,
    question: responses.question,
    answer: responses.answer,
    lastAsked: null,
    lastAnsweredCorrect: null,
  };

  await fs.writeFile(
    "./src/data.json",
    JSON.stringify([...parsedData, newQuestion])
  );
};

if (add) {
  addQuestion();
} else {
  askQuestion();
}
