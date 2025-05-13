import { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className={props.className}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button
          onClick={toggleVisibility}
          className="btn btn-secondary mt-3 d-block mx-auto"
        >
          cancel
        </button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  className: PropTypes.string, // add this
  children: PropTypes.node     // and this
}

export default Togglable
