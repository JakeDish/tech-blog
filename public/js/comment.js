const newComment = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector("#comments").value.trim();
  const post_id = document.querySelector("#post-id").value;

  if (comment_text && post_id) {
    const response = await fetch(`/api/comment/`, {
      method: "POST",
      body: JSON.stringify({
        comment_text,
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create comment");
    }
  }
};

document.querySelector(".new-comment").addEventListener("submit", newComment);
