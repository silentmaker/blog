import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Bio from '../components/Bio'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const tags = (post.frontmatter.tags || []).map(tag => 
      <Link style={{ marginLeft: rhythm(1/4) }} key={tag} to={`/tags/${tag}`}>{tag}</Link>)
    const categories = (post.frontmatter.categories || []).map(category => 
      <Link style={{ marginLeft: rhythm(1/4) }} key={category} to={`/categories/${category}`}>{category}</Link>)
    const { previous, next } = this.props.pathContext

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />

        <h1>{post.frontmatter.title}</h1>

        <div style={{ ...scale(-1/10), marginBottom: rhythm(1) }}>
          {post.frontmatter.date && <span style={{ marginRight: rhythm(1) }}>{post.frontmatter.date}</span>}
          {post.frontmatter.tags && <span style={{ marginRight: rhythm(1) }}>Tags:{tags}</span>}
          {post.frontmatter.categories && <span>Categories:{categories}</span>}
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <hr style={{ marginBottom: rhythm(1) }} />

        <Bio />

        <ul style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}>
          <li>
            {previous &&
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            }
          </li>
          <li>
            {next &&
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            }
          </li>
        </ul>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        tags
        categories
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
