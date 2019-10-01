import { elements } from './views/elements';
import { deletePost, editPost, getPosts, addPost } from "./http"
import * as postsView from './views/postsView'

const state = {};

window.addEventListener("load", () => {
   postsView.hideBtn(elements.update) 
   updatePosts();
});

const updatePosts = async () => {
    state.posts = await getPosts();
    state.posts.forEach(post => {
        postsView.renderPost(post);
    });
}

const createPost = async () => {
    const newPost = postsView.getInputValues();
    if(newPost.title && newPost.body) {
        const post = await addPost(newPost);
        state.posts.push(post);
        postsView.renderPost(post);
    }else {
        alert("Empty fields")
    }
}

const removePost = async id => {
    await deletePost(id)
    const index = state.posts.findIndex(el => el.id == id)
    state.posts.splice(index, 1);
}

const enableEdit = id => {
    const index = state.posts.findIndex(el => el.id == id)
    elements.postTitle.value = state.posts[index].title;
    elements.postBody.value = state.posts[index].body;
    elements.postId.value = state.posts[index].id;
}

const editingPost = async (id, post) => {
    await editPost(id, post)
    state.posts = await getPosts();
}

const updatePost = () => {
    const newPost = postsView.getInputValues();
    if(newPost.title && newPost.body) {
        newPost.id = parseInt(elements.postId.value);
        editingPost(newPost.id, newPost);
        const id = document.querySelector(`.edit[data-id="${newPost.id}"`);
        id.parentElement.children[0].textContent = `${newPost.title}`;
        id.parentElement.children[1].textContent = `${newPost.body}`;
        postsView.hideBtn(elements.update);
        postsView.showBtn(elements.submit);
        postsView.clearInputs();
    }else {
        alert("Empty fields")
    }
}

elements.update.addEventListener("click", e => {
    updatePost();
});

elements.submit.addEventListener("click", e => {
    createPost();
    postsView.clearInputs();
});

elements.postsContainer.addEventListener("click", e => {
    if(e.target.matches(".delete, .delete *")){
        const id = e.target.dataset.id;
        const card = e.target.closest(".card")
        card.parentNode.removeChild(card);
        removePost(id);
    }else if(e.target.matches(".edit, .edit *")){
        const id = e.target.dataset.id;
        enableEdit(id);
        postsView.hideBtn(elements.submit);
        postsView.showBtn(elements.update);
    }
});
