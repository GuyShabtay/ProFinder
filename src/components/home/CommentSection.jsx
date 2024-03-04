import React, { useState } from 'react';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <div>
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleInputChange}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
