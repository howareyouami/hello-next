import fetch from 'isomorphic-unfetch';
import react,{ useEffect, useState } from 'react';

const Post = props =>{
  
  const [x,fx]=useState(0)

  useEffect(()=>{
    console.log("Effect")
  })
  
  return (
  <>
    <h1>{props.show.name}+{x}</h1>
    <button onClick={()=>fx(x+1)}>add</button>
    <p>{props.show.summary.replace(/<[/]?[pb]>/g, '')}</p>
    <img src={props.show.image.medium} />
  </>
);}

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;