import React, { useRef, useState } from 'react'
import useToggle from '../hooks/useToggle'
import Button from '../components/ui/Button'
import useWindowWidth from '../hooks/useWindowWidth'
import { nanoid } from '@reduxjs/toolkit'

const Ts = ({length = 6}) => {
  const [post, setPost] = useState("")
  const [postCard, setPostCard] = useState([]);
  const [list, setList] = useState([]);
  
  const addPostCard = (e) => {
    let newPost = e.target.value;
    console.log(newPost.length)
    setPost(newPost);
    if(newPost === ""){
      return;
    }

    if (newPost.length > 10) {
      setPostCard((prevPostCard) => [...prevPostCard, newPost]);
      setPost('');
    }
    console.log(postCard)
  };

  return (
    <div>
      {postCard}
      <h2>Test</h2>
      <textarea 
        onChange={addPostCard}
        placeholder="write here"
        value={post}
      />

      <Button text={"Post"} handleEvent={addPostCard}/>

      <div style={{border: ".1rem solid #333", width: "20rem", height: "10rem"}}>
        <p>{post}</p>
      </div>

      {/* {list.map(li => (li))} */}
      <Button text="Add list" handleEvent={() => {
        setList(oldValue => {
          return [
            ...oldValue, {li: Math.random() * 4}]
        })
      }} />

      <br />
      <br />
      <br />
      <hr />

      <TopLevelComment />
    </div>
  )
}

export default Ts


function createPostcards(text, maxCharacters) {
  const postcards = [];
  const words = text.split(' ');

  let currentPostcard = '';
  for (const word of words) {
      if (currentPostcard.length + word.length + 1 <= maxCharacters) {
          // Add word to current postcard
          currentPostcard += (currentPostcard.length === 0 ? '' : ' ') + word;
      } else {
          // Start a new postcard
          postcards.push(currentPostcard);
          currentPostcard = word;
      }
  }

  // Add the last postcard
  postcards.push(currentPostcard);

  return postcards;
}

const CommentTextarea = ({handleSubmit, commentBody, setCommentBody}) => {
  // const [commentBody, setCommentBody] = useState("")

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        border: ".1rem solid black", width: "20rem", height: "10rem",
        display: "grid",
        padding: ".6rem .8rem",
      }}
    >
      <textarea
        name="comment"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder="comment"
        style={{
          height: "7rem"
        }}
      />

      <button
        style={{
          width: "fit-content",
          height: "2rem",
          border: ".1rem solid blue",
          borderRadius: ".8rem",
          padding: ".2rem .5rem"
        }} 
      >
        Comment
      </button>
    </form>
  )
}

const TopLevelComment = () => {
  const [commentList, setCommentList] = useState([
    {
      id: nanoid(),
      body: "This is the first comment",
      comments: []
    },
    {
      id: nanoid(),
      body: "This is the second comment",
      comments: []
    },
    {
      id: nanoid(),
      body: "This is the third comment",
      comments: []
    },
  ])
  const [commentBody, setCommentBody] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setCommentList(prevValue => {
      return [
        ...prevValue,
        {
          id: nanoid(),
          body: commentBody,
          comments: []
        }
      ]
    })
    setCommentBody("")
    console.log("submit")
  }

  return (
    <div className="top-level-comment">
      <h1>Nested Comment</h1>
      <CommentTextarea handleSubmit={handleSubmit} commentBody={commentBody}  setCommentBody={setCommentBody} />

      <br />
      <div>
        {commentList.map(comment => {
          return <CommentItem key={comment.id} comment={comment} />
        })}
      </div>
    </div>
  )
}

const CommentItem = ({comment}) => {
  const [isReply, setIsReply] = useState(false);
  const [commentBody, setCommentBody] = useState("")
  const [commentList, setCommentList] = useState(comment.comments)

  const handleSubmit = (e) => {
    e.preventDefault()
    setCommentList(prevValue => {
      return [
        ...prevValue,
        {
          id: nanoid(),
          body: commentBody,
          comments: []
        }
      ]
    })
  }

  return (
    <div
      style={{
        padding: "1rem",
        borderLeft: ".1rem solid black",
        backgroundColor: "burlywood",
        marginTop: ".4rem",
      }}
    >
      <p>{comment.body}</p>
      <button onClick={() => setIsReply(prevValue => !prevValue)}>
        {isReply ? "Cancel" : "Reply"}
      </button>
      <br />
      <hr />
      <div
        style={{
          padding: "1rem"
        }}
      >
        {isReply && <CommentTextarea commentBody={commentBody} setCommentBody={setCommentBody} handleSubmit={handleSubmit} />}
        {commentList.map(comment => {
          return <div>
            <CommentItem comment={comment} />
          </div>
        })}
        </div>
    </div>
  )
}
