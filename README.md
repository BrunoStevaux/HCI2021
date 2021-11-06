# COMP 3583 HUMAN COMPUTER INTERACTIONS PROJECT

## What is it?

Our group project's goal is to automate the authentication of discord members as University students.

## How does it work?

Using OCR (Open Character Recognition), your student Name and ID can be validated and authenticated.

We use two different OCR engines:

- Google Vision Label
- Tesseract OCR

DiscordJS handles the interactions between users and the OCR engines while also handling the validation process.

## How to use

Work in progress

## Requirements

1. Discord developers account associated with a bot account.
2. Google Cloud Vision API
3. Tesseract OCR + TesseractJS
4. NodeJS v16+ + npm v7+

## Installation

1. Install [NodeJS](https://nodejs.org/en/)
2. Install [TesseractOCR](https://github.com/tesseract-ocr/tesseract) 
3. Create [Discord Developer Application](https://discord.com/developers/applications/)
4. Create [Google Cloud](https://cloud.google.com/vision/) account
5. Create two files: `.env` and `GoogleKey.json`
    - The `.env` file should contain the following: ```token = 'abc123'```
    - The `GoogleKey.json` file should just be the JSON file you get once you register your Google Cloud Vision API.
6. run `npm install`
7. run `node index.js`

### Authors

[Bruno Stevaux](https://github.com/BrunoStevaux), [Jonathan Scott](https://github.com/VBJDAS), [Sarah Reid](https://github.com/Dshorty), William Lawrence
