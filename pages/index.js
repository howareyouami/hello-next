import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import react,{ useEffect, useState } from 'react';

const Index = props => {
  const [x,fx]=useState(0)

  useEffect(()=>{
    console.log("Effect")
  })
  return(
  <>
<h1>Batman TV Shows +{x}</h1>

    <button onClick={()=>fx(x+1)}></button>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href="/p/[id]" as={`/p/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
    </>
);}

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;