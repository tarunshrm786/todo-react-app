import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Checkbox, List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/todos`, { title }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTodos([...todos, response.data]);
      setTitle('');
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const handleUpdateTodo = async (id, completed) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/todos/${id}`, { completed }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTodos(todos.map(todo => todo._id === id ? { ...todo, completed } : todo));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleCreateTodo}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 4,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>
        <TextField
          label="New Todo"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: 'black' }}>
          Add
        </Button>
      </Box>
      <List sx={{ mt: 4 }}>
        {todos.map(todo => (
          <ListItem key={todo._id} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={todo.completed}
              onChange={() => handleUpdateTodo(todo._id, !todo.completed)}
              sx={{ mr: 2 }}
            />
            <ListItemText primary={todo.title} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
