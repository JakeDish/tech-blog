const deleteHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const delete_post = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    if (delete_post.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

document.getElementById(".deleteBtn").forEach(function (item) {
  item.addEventListener("click", deleteHandler);
});
