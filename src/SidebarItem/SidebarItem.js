import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

class SidebarItem extends React.Component {
  render() {
    const { classes, selectedNoteIndex, note, index } = this.props;

    return (
      <div key={index}>
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === index}
          alignItems="flex-start"
          onClick={() => this.selectNote(note, index)}
        >
          <div className={classes.textSection}>
            <ListItemText
              primary={note.title}
              secondary={removeHTMLTags(note.body.substring(0, 30) + "...")}
            />

            <DeleteIcon
              className={classes.deleteIcon}
              onClick={() => this.deleteNote(note)}
            />
          </div>
        </ListItem>
      </div>
    );
  }

  selectNote = (note, index) => {
    this.props.selectNote(note, index);
  };

  deleteNote = note => {
    window.confirm(
      `Are you sure you want to delete the note: ${note.title}?`
    ) && this.props.deleteNote(note);
  };
}

export default withStyles(styles)(SidebarItem);
