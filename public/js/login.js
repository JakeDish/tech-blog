const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const user_name = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (user_name && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ user_name, password }),
      headers: { "Content-Type": "application/json" },
    })
    console.log(JSON.stringify({ 
        user_name: user_name, 
        password: password }));

    if (response.ok) {
      // session: async (session, user, sessionToken) => {
      //   session.user = user.user
      //   return Promise.resolve(session)
      // }
      // console.log(session)
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector("#login-form").addEventListener("submit", loginFormHandler);
