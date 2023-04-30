const editPost = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#post-title").textContent;
  const postText = document.querySelector("#post-text").textContent;
 

  // get post id from url
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("not able to update");
  }
};

document.getElementById("#save-button").addEventListener("click", editPost);
