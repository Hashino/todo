import React, { Component } from 'react';

const api = 'http://localhost:5000/api/notes';

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

    this.onDelete = this.onDelete.bind(this);

    this.state = {
      notes: [],
    };
  }

  addNote(note) {
    fetch(`${api}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          notes: [...prevState.notes, data],
        }));
        window.location.reload(); // Reload to fetch the latest notes
      })
      .catch((error) => {
        console.error('Error adding note:', error);
      });
  }

  onDelete(e) {
    e.preventDefault();

    fetch(`${api}/${e.target.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((_data) => {
        this.setState((prevState) => ({
          notes: prevState.notes.filter((note) => note._id !== e.target.id),
        }));
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  }

  componentDidMount() {
    // gets notes
    fetch(`${api}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <h1 style={{ flex: 1 }}>Notes</h1>
          <div className="align-self-center">
            <button className="btn btn-primary"
              onClick={() => {
                const title = prompt('Enter note title:');
                const content = prompt('Enter note content:');
                if (title && content) {
                  this.addNote({ title, content });
                }
              }}>
              Add Note
            </button>
          </div>
        </div>
        <hr />
        <div>
          {this.state.notes.map((note) => (
            <NoteItem key={note._id} note={note} onDelete={this.onDelete} />
          ))}
        </div>
      </div>
    );
  }
}
