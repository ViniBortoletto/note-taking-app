import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles";

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      id: ""
    };
  }

  componentDidMount = () => {
    // when component mount, the selected note will show in body/title
    this.setState({
      title: this.props.selectedNote.title,
      body: this.props.selectedNote.body,
      id: this.props.selectedNote.id
    });
  };

  componentDidUpdate = () => {
    // when another note is clicked, it'll select it
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        title: this.props.selectedNote.title,
        body: this.props.selectedNote.body,
        id: this.props.selectedNote.id
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { title } = this.state;

    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon} />

        <input
          className={classes.titleInput}
          type="text"
          placeholder="Note title..."
          value={title ? title : ""}
          onChange={e => this.updateTitle(e.target.value)}
        ></input>

        <ReactQuill value={this.state.body} onChange={this.updateBody} />
      </div>
    );
  }

  updateTitle = async newTitle => {
    await this.setState({ title: newTitle });
    this.noteUpdate();
  };

  updateBody = async newBody => {
    await this.setState({ body: newBody });
    this.noteUpdate();
  };

  noteUpdate = debounce(() => {
    const { title, body, id } = this.state;

    this.props.noteUpdate(id, { body: body, title: title });
  }, 1500);
}

export default withStyles(styles)(Editor);
