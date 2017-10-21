// NOTE we use localStorage in this example to simplify/mock a backend.
// Also we use to illustrate how frontend code can be used on the backend.
// In production you should use a proper data store i.e. mySql, redis, couchdb etc.
const { LocalStorage } = require('node-localstorage');
const uuid = require('uuid/v4');

const localStoragePath = (process.env.NODE_ENV === 'test') ? './test-ls' : './scratch';

const localStorage = new LocalStorage(localStoragePath);


const notes = (localStorage.getItem('noteList')) ?
  JSON.parse(localStorage.getItem('noteList')) : {};

function save() {
  localStorage.setItem('noteList', JSON.stringify(notes));
}

const publicAPI = {};
// Add API
publicAPI.add = (title, infoList, color, whiteboardId) => {
  const guid = uuid();
  notes[guid] = {
    title,
    infoList,
    color,
    whiteboardId,
  };
  save();
  return guid;
};


// Get API
publicAPI.get = id => notes[id];
// Remove API
publicAPI.remove = (id) => {
  delete notes[id];
  save();
};
// Get All API
publicAPI.getAll = () => {
  const notesArray = [];
  Object.keys(notes).forEach((id) => {
    notesArray.push({
      id,
      title: notes[id].title,
      infoList: notes[id].infoList,
      color: notes[id].color,
      whiteboardId: notes[id].whiteboardId,
    });
  });
  return notesArray;
};

publicAPI.getAllWithWhiteboardId = (WhiteboardId) => {
  const notesArray = [];
  Object.keys(notes).forEach((id) => {
    if (WhiteboardId === notes[id].whiteboardId) {
      notesArray.push({
        id,
        title: notes[id].title,
        infoList: notes[id].infoList,
        color: notes[id].color,
        whiteboardId: notes[id].whiteboardId,
      });
    }
  });
  return notesArray;
};

// Update API
publicAPI.update = (note) => {
  notes[note.id].title = note.title;
  notes[note.id].infoList = note.infoList;
  notes[note.id].color = note.color;
  save();
};

module.exports = publicAPI;
