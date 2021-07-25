const fs = require("fs");
const path = require("path");

function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(
      (note) => note.title === query.title
    );
  }
  return filteredResults;
}

function createNewNote(body, notesArray) {
  // our function's main code will go here
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  console.log(path);
  // return finished code to the post route for response
  return note;
}

function validateNote(notes) {
  if (!notes.title || typeof notes.title !== "string") {
    return false;
  }
  if (!notes.text || typeof notes.text !== "string") {
    return false;
  }
}

const getNotes = (noteTitle, noteText = {}) => {
  let queryUrl = "/api/notes?";

  Object.entries(noteTitle, noteText).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });

  fetch(queryUrl)
    .then((response) => {
      if (!response.ok) {
        return alert(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then((notesArr) => {
      console.log(notesArr);
      printResults(notesArr);
    });
};

const handleGetNotesClick = event => {
    event.preventDefault();
    const noteTitleHTML = noteTitle.querySelector('[title="title"]');
    const title = noteTitleHTML.value || document.querySelector('.note-title')

    const noteObject = { title };

    getNotes(noteObject);
}


module.exports = {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
  handleGetNotesClick
};
