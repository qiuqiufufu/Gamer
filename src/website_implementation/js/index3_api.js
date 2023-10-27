/* constant variables */
const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/";
const my_website_code = "yiqing_sheng";
const commentsContainer = document.getElementById('comments_from_api');
const commentForm = document.getElementById('comment-form');
let comments_list;



/* constant functions */
// document.getElementById('comment-form').addEventListener('submit', function (e) {
//     e.preventDefault();
//     var name = document.getElementById('name').value;
//     var comment = document.getElementById('comment').value;

//     if (name && comment) {
//         var newComment = document.createElement('div');
//         newComment.className = 'comment';
//         newComment.innerHTML = '<h3><strong>' + name + '</strong></h3><p>' + comment + '</p>';
//         document.querySelector('.comments').appendChild(newComment);

//         document.getElementById('name').value = '';
//         document.getElementById('comment').value = '';
//     }
// });

const handleFormSubmit = event => {
    event.preventDefault();

    let formData = new FormData(event.target);
    formData.append("website_code", my_website_code);
    formData.append("rating", 5);

    const requestOptions = {
        method: "POST",
        body: formData,
        redirect: 'follow'
    }

    fetch(baseURL, requestOptions)
    .then(response => response.json().then(data => {
        if (!response.ok) {
            console.log("Server response: ", data);
            throw new Error("Network response was not okay");
        }
        return data;
    }))
    .then(data => {
        console.log(data.comment);
        alert('Your comment has been added to our website! Thanks!');
        commentForm.reset();
        return data;
    })
    .then(data => {
        getComments();
    })
    .catch(error => {
        console.error("There was a problem with Fetch POST: ", error.message);
        alert("Error sending your comment.  Please try again");
    })
}

const getComments = () => {
    const queryParams = {
        website_code : my_website_code,
    }
    const queryString = new URLSearchParams(queryParams).toString();
    const urlWithParams = baseURL+"?"+queryString;
    const requestOptions = {
        method: "GET",
        redirect: 'follow'
    }

    fetch(urlWithParams, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not okay");
        }
        return response.json();
    })
    .then(comments => {
        comments_list = comments;
        console.log(comments_list);
        renderComments(comments_list);
    })
    .catch(error => {
        console.error("Error receiving comments from API:", error.message);
        alert("There was a problem loading comments.  Please refresh and try again.");
    })
}

const renderComments = (commentsToRender) => {
    while (commentsContainer.firstChild) {
        commentsContainer.removeChild(commentsContainer.firstChild);
    }

    commentsToRender.forEach(comment => {
        const commentTemplate = `
            <article class="usercomment">
                <h3>User: ${comment.username}</h3>
                <p>${comment.comment}</p>
            </article>
            <hr class="custom-hr">
        `;
        commentsContainer.innerHTML += commentTemplate;
    });
}

/* listeners */
commentForm.addEventListener('submit', handleFormSubmit);

/* Run when page loads */
getComments();