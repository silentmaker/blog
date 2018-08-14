import React from 'react'

import 'typeface-montserrat'
import 'typeface-merriweather'

import Projects from "./Projects"
import profileImage from '../images/profile.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHideProjects: true }
    this.showProjects = this.showProjects.bind(this)
  }
  showProjects() {
    this.setState({ isHideProjects: !this.state.isHideProjects })
  }
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <img src={profileImage} style={{
            marginRight: rhythm(1/2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }} />
        <div style={{ flex: '1 1 0' }}>
          <p>
            Written by <strong>Elvin Ma</strong><br/>Living, working and building 
            <span style={{ cursor: 'pointer', color: '#007acc' }} 
              onClick={this.showProjects}> interesting stuff</span>.
          </p>
          <Projects hidden={this.state.isHideProjects} />
        </div>
      </div>
    )
  }
}

export default Bio
