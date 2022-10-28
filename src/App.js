import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    form.reset();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" id="" />
        <br></br>
        <input type="email" name="email" placeholder="email" id="" />
        <br></br>
        <input type="submit" value="send" />
      </form>

      <h1>users:{users.length}</h1>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {" "}
            {user.name} {user.email}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
