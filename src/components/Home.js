import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
        setFilteredTodos(response.data); // Initially, all todos are displayed
      })
      .catch((error) => console.error("Error fetching the todos:", error));
  }, []);

  
  const handleSearchSubmit = (values) => {
    const query = values.search.toLowerCase();
    if (query) {
      const filtered = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query)
      );
      setFilteredTodos(filtered); // Update the displayed todos based on search query
    } else {
      setFilteredTodos(todos); // Show all todos if query is empty
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    search: Yup.string().required("Search query is required"),
  });

  return (
    <div>
      <h2>Todo List</h2>

      {/* Formik for search input */}
      <Formik
        initialValues={{ search: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSearchSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="search">Search Todos: </label>
              <Field type="text" id="search" name="search" />
              {errors.search && touched.search ? (
                <div style={{ color: "red" }}>{errors.search}</div>
              ) : null}
            </div>
            <button type="submit">Search</button>
          </Form>
        )}
      </Formik>

      {/* Render the filtered todos */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "(Completed)" : "(Pending)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
