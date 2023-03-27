import React from "react";

function Login() {
  return (
    <div class="container mt-3 p-4">
      <h2>Đăng nhập</h2>
      <div>
        <form action="/action_page.php">
          <div class="mb-3 mt-3">
            <label for="email">Email:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div class="mb-3">
            <label for="pwd">Password:</label>
            <input
              type="password"
              class="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
