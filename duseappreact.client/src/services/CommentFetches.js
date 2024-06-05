
export const getCommentsByCollegeId = async (id) => {
try {
    const response = await fetch(`/comment/getcommentbycollegeid/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    console.log(response.statusText !== 'No Content');

    if(response.statusText !== 'No Content')
      return await response.json();
    else
      return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getCommentsByCollegeId;


export const addComment = async (id, commentRequest) => {
    try {
        const response = await fetch(`/comment/addcomment/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(commentRequest)
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
    
        const data = await response.json();
    
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
};

export const editComment = async (commentRequest) => {
    try {
        const response = await fetch(`/comment/editcomment`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(commentRequest)
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
    
        const data = await response.json();
    
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
};

export const deleteComment = async (id) => {
    try {
        const response = await fetch(`/comment/deletecomment/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
    
        const data = await response.json();
    
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
};
