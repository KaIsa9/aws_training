import './App.css';
// src/App.js
import React, { useState, useEffect } from "react";

// import API from Amplify library
import { Amplify } from "aws-amplify";

// import query definition
import { listPosts } from "./graphql/queries";
// src/App.js, import the withAuthenticator component and associated CSS
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";


function App({ signOut, user }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);
  async function fetchPosts() {
    try {
      const postData = Amplify.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items);
    } catch (err) {
      console.log({ err });
    }  
  }

  async function checkUser() {
    try {
        const user = await Amplify.currentAuthenticatedUser();
        console.log("user:", user);
        console.log("user attributes:", user.attributes);
    } catch (err) {
        console.log(err);
    }
}
  return (
    <div>
      <h1>Hello World</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.name}</h3>
          <p>{post.location}</p>
          <p>{post.description}</p>
        </div>
      ))}
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default withAuthenticator(App);