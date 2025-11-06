const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const container = document.getElementById('post-details');

async function fetchPostDetails() {
  if (!postId) {
    container.innerHTML = "<p>Post not found!</p>";
    return;
  }

  try {
    // Fetch post details
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await postResponse.json();

    // Fetch comments for that post
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = await commentsResponse.json();

    
    const commentsHTML = comments.map(comment => `
      <div class="comment">
        <h4>${comment.name}</h4>
        <p>${comment.body}</p>
        <span> ${comment.email}</span>
      </div>
    `).join('');

    
    container.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <h3> Comments (${comments.length})</h3>
      <div class="comments">${commentsHTML}</div>
      <button onclick="goBack()">⬅️ Back to Posts</button>
    `;
  } catch (error) {
    container.innerHTML = `<p>Error loading post: ${error.message}</p>`;
  }
}

function goBack() {
  window.location.href = "index.html";
}

fetchPostDetails();
