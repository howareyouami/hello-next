import * as React from 'react'
import { useCMS, useLocalForm } from 'tinacms'

export default function Page(props) {


     // grab the instance of the CMS to access the registered git API
  let cms = useCMS()

  // add a form to the CMS; store form data in `post`
  let [post, form] = useLocalForm({
    id: props.fileRelativePath, // needs to be unique
    label: 'Edit Post',

    // starting values for the post object
    initialValues: {
      title: props.title,
    },

    // field definition
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
    ],

    // save & commit the file when the "save" button is pressed
    onSubmit(data) {
      return cms.api.git
        .writeToDisk({
          fileRelativePath: props.fileRelativePath,
          content: JSON.stringify({ title: data.title }),
        })
        .then(() => {
          return cms.api.git.commit({
            files: [props.fileRelativePath],
            message: `Commit from Tina: Update ${data.fileRelativePath}`,
          })
        })
    },
  })


  return (
    <>
      <h1>{post.title}</h1>
    </>
  )
}

Page.getInitialProps = function(ctx) {
//   const { slug } = ctx.query
  const slug =  "hello_world"
  let content = require(`../src/${slug}.json`)

  return {
    fileRelativePath: `/src/${slug}.json`,
    title: content.title,
  }
}