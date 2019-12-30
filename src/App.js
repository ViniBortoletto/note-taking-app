import React from "react";
import ReactQuill from "react-quill";

import Sidebar from "./Sidebar/Sidebar";
import Editor from "./Editor/Editor";

import "./App.css";

const firebase = require("firebase");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNote: null,
      selectedNoteIndex: null,
      notes: []
    };
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        this.setState({ notes: notes });
      });
  };

  render() {
    const { selectedNote, selectedNoteIndex, notes } = this.state;

    return (
      <div className="app-container">
        <Sidebar
          submitNewNote={this.submitNewNote}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          notes={notes}
          selectedNoteIndex={selectedNoteIndex}
        />

        {selectedNote ? (
          <Editor
            selectedNote={selectedNote}
            selectedNoteIndex={selectedNoteIndex}
            notes={notes}
            noteUpdate={this.noteUpdate}
          />
        ) : (
          <ReactQuill readOnly={true} />
        )}
      </div>
    );
  }

  submitNewNote = async title => {
    const { notes } = this.state;

    // saves new note in a const
    const newNote = {
      title: title,
      body: ""
    };

    // saves new note in firebase
    const newNoteFromDB = await firebase
      .firestore()
      .collection("notes")
      .add({
        title: newNote.title,
        body: newNote.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    // get note's new id
    const newNoteID = newNoteFromDB.id;

    // saves all old notes along with new note
    await this.setState({ notes: [...notes, newNote] });

    // gets new note index
    const newNoteIndex = notes.indexOf(
      notes.filter(note => note.id === newNoteID)[0]
    );

    // select the new note
    this.setState({
      selectedNote: notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    });
  };

  selectNote = (note, index) => {
    this.setState({
      selectedNote: note,
      selectedNoteIndex: index
    });
  };

  deleteNote = async note => {
    const { notes, selectedNoteIndex, selectedNote } = this.state;

    // gets the index of deleted note
    const noteIndex = notes.indexOf(note);

    // saves all the notes that is different from the note being deleted
    await this.setState({ notes: notes.filter(note => note !== note) });

    // if the note being deleted is selected, deselect it
    if (selectedNoteIndex === noteIndex) {
      notes.length > 1
        ? this.selectNote(notes[0], 0)
        : this.selectNote(null, null);
    } else {
      this.selectNote(selectedNote, selectedNoteIndex);
    }

    // delete note from firebase
    firebase
      .firestore()
      .collection("notes")
      .doc(note.id)
      .delete();
  };

  noteUpdate = (id, noteObject) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .update({
        title: noteObject.title,
        body: noteObject.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };
}

export default App;
