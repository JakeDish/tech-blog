const signupFormHandler = async function (event) {
  event.preventDefault();

  const user_name = document.querySelector("#name-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  const response = await fetch("api/signup", {
    method: "POST",
    body: JSON.stringify({ user_name, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to sign up.");
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
