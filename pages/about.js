import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

export default function About(props) {

  const markdownBody = props.content
  const frontmatter = props.data

  console.log("props-->",props)
    return (
      <div>
        <article>
        <h1>{frontmatter.title}</h1>
        <div>
          <ReactMarkdown source={markdownBody} />
        </div>
      </article>
        <p>This is the about page</p>
      </div>
    );
  }



  About.getInitialProps = async function(context) {
  // context contains the query param
  // const { slug } = context.query
  const slug = "test"
  // grab the file in the posts dir based on the slug
  const content = await import(`../src/${slug}.md`)
  // also grab the config file so we can pass down siteTitle
  //gray-matter parses the yaml frontmatter from the md body
  const data = matter(content.default)
  return {
    ...data
  }
}