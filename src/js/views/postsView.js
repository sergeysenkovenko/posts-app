import { elements } from './elements';

export const renderPost = post => {
    const markup = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h4 class="card-title">${post.title}</h4>
                            <p class="card-text">${post.body}</p>
                            <button class="edit btn btn-warning btn-sm" data-id="${post.id}">Edit</button>
                            <button class="delete btn btn-danger ml-1 btn-sm" data-id="${post.id}">Delete</button>
                        </div>
                    </div>
                   `
    elements.postsContainer.insertAdjacentHTML("beforeend", markup);
}

export const getInputValues = () => {
    let title = elements.postTitle.value,
        body = elements.postBody.value;
    const post = {
        title,
        body
    }
    return post;
}

export const clearInputs = () => {
    elements.postTitle.value = '';
    elements.postBody.value = '';
    elements.postId.value = '';
}

export const hideBtn = el => {
    el.style.display = "none"
}

export const showBtn = el => {
    el.style.display = "block"
}