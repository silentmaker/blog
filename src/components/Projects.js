import React from 'react'
import spriteImage from '../images/sprite.png'

class Projects extends React.Component {
  render() {
    const { hidden } = this.props;
    const projects = ['butler', 'tailor', 'earth', 'vision', 'todos', 
      'wolvrine', 'lecturer', 'sprite-generator', 'calculator', 'gallery', 
      'fiction', 'hero', 'icon-studio'];

    return (
      <ul style={{
        margin: 0,
        display: 'flex',
        visibility: hidden ? 'hidden' : 'visible',
        opacity: hidden ? 0 : 1,
        maxHeight: hidden ? 0 : 1000,
        listStyle: 'none',
        flexWrap: 'wrap',
        transition: 'all 0.5s ease',
        textAlign: 'center',
        fontSize: '0.8rem',
        lineHeight: '2rem',
        }}>
        {projects.map((project, index) => 
          <li key={project} style={{ flex: '0 1 100px' }}>
            <a target="blank" href={`https://silentmaker.github.io/${project}`}>
              <div style={{
                width: 64,
                height: 64,
                margin: '0 auto',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${spriteImage})`,
                backgroundSize: `auto 125px`,
                backgroundPosition: `${-64 * index}px 0`,
              }}></div>
              <div style={{ color: '#999' }}>
                {project.charAt(0).toUpperCase() + project.slice(1)}
              </div>
            </a>
          </li>
        )}
      </ul>
    )
  }
}

export default Projects
