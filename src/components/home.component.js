import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);

    this.state = {
      notes: [],
    };
  }

  onDelete(e) {
    e.preventDefault();

    const noteId = e.target.id;

    fetch(`http://localhost:5000/api/notes/${noteId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Note deleted:', data);
        this.setState((prevState) => ({
          notes: prevState.notes.filter((note) => note._id !== noteId),
        }));
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });

    window.location.reload();
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/notes')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ notes: data });
        console.log('data fetched', data);
        console.log('data fetched', this.state.notes);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  }

  render() {
    return (
      <div>
        <h2>Welcome to the Notes App</h2>
        <p>This is a simple notes application built with React and Express.</p>
      </div>
    );
  }
}
