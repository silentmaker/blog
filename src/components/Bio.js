import React from 'react'
import profileImage from '../images/profile.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        <img src={profileImage} style={{
            marginRight: rhythm(1/2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }} />
        <div style={{ flex: '1 1 0' }}>
          <p>
            Written by <strong>Elvin Ma</strong><br/>Living, Working and Building Interesting Stuff.
          </p>
        </div>
      </div>
    )
  }
}

export default Bio
