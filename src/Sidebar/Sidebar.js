import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "../SidebarItem/SidebarItem";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.createNewNoteInput = React.createRef();
    this.state = {
      addingNote: false,
      title: null,
      warning: false
    };
  }

  render() {
    const { classes, notes, selectedNoteIndex } = this.props;
    const { addingNote, title, warning } = this.state;

    return (
      <div className={classes.sidebarContainer}>
        <Button className={classes.newNoteBtn} onClick={this.createNewNote}>
          {addingNote ? "cancel" : "new note"}
        </Button>

        {addingNote && (
          <div>
            <input
              className={classes.newNoteInput}
              type="text"
              placeholder="New note title"
              onKeyUp={e => this.updateTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && this.submitNewNote()}
              ref={this.createNewNoteInput}
            />
          </div>
        )}

        <Button
          className={classes.newNoteSubmitBtn}
          onClick={this.submitNewNote}
        >
          submit
        </Button>

        <List>
          {notes.map((note, index) => {
            return (
              <div key={index}>
                <SidebarItem
                  note={note}
                  index={index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={this.selectNote}
                  deleteNote={this.deleteNote}
                />
                <Divider />
              </div>
            );
          })}
        </List>

        {warning && (
          <div className={classes.warningContainer}>
            <p className={classes.warningText}>
              You must creat a note before submitting it.
            </p>
          </div>
        )}
      </div>
    );
  }

  createNewNote = () => {
    this.setState({
      addingNote: !this.state.addingNote,
      warning: false
    });

    setTimeout(() => {
      this.createNewNoteInput.current.focus();
    }, 0);
  };

  updateTitle = newNoteTitle => {
    this.setState({ title: newNoteTitle, input: newNoteTitle });
  };

  submitNewNote = () => {
    if (this.state.title !== null) {
      this.props.submitNewNote(this.state.title);

      this.setState({
        addingNote: false,
        title: null,
        warning: false
      });
    } else {
      this.setState({ warning: true });
    }
  };

  selectNote = (note, index) => {
    this.props.selectNote(note, index);
  };

  deleteNote = note => {
    this.props.deleteNote(note);
  };
}

export default withStyles(styles)(Sidebar);
