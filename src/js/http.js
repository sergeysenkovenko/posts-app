const url = 'http://localhost:3004/posts/';

export const addPost = async post =>{
  const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(post)
    });

    const res = await response.json();
    return res
}

export const getPosts = async () => {
  const response = await fetch(url)
  const res = await response.json();
  return res;
}


export const deletePost = async id => {
    const response = await fetch(`${url}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
}

export const editPost = async (id, post) => {
    const response = await fetch(`${url}${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(post)
    });
}