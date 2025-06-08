import React, { Component } from 'react';

const api = process.env.REACT_APP_API_URL;

function NoteItem({ note, onDelete }) {
  return (
    <div className="d-flex">
      <div style={{ flex: 1 }}>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>
      <div className="align-self-center">
        <button className='btn btn-danger' id={note._id} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.getNotes = this.getNotes.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      notes: [],
    };
  }

  getNotes() {
    fetch(`${api}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  }

  componentDidMount() {
    this.getNotes();
  }

  onAdd(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    if (title && content) {
      let note = {
        title: title,
        content: content,
      };

      fetch(`${api}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      })
        .then((response) => response.json())
        .then((_) => {
          this.getNotes();
        })
        .catch((error) => {
          console.error('Error adding note:', error);
        });
      e.target.reset();
    }
  }

  onDelete(e) {
    e.preventDefault();

    fetch(`${api}/${e.target.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((_data) => {
        this.getNotes();
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <h1 style={{ flex: 1 }}>Notes</h1>
        </div>
        <hr />
        <div>
          {this.state.notes.map((note) => (
            <NoteItem key={note._id} note={note} onDelete={this.onDelete} />
          ))}
        </div>
        <hr />

        <div className="align-self-center">
          <form onSubmit={this.onAdd}>
            <input type="text" name="title" placeholder="Title" className="form-control mb-2" required />
            <textarea name="content" placeholder="Content" className="form-control mb-2" required></textarea>
            <button type="submit" className="btn btn-primary">Add Note</button>
          </form>
        </div>
      </div>
    );
  }
}
