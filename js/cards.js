async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error("Failed to fetch posts");

    const posts = await response.json();
    renderCards(posts.slice(0, 10)); // limit to 10 cards for clarity
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function renderCards(posts) {
  const container = document.getElementById("card-container");
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="../images/download.jpeg" alt="Image" />
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", fetchPosts);
