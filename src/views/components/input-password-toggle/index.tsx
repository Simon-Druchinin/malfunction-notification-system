// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Eye, EyeOff } from 'react-feather'
import { InputGroup, Input, InputGroupText, Label } from 'reactstrap'

interface InputPasswordToggleProps {
  label?: string,
  hideIcon?: boolean,
  showIcon?: boolean,
  visible?: boolean,
  className?: any,
  htmlFor?: string,
  placeholder?: string,
  iconSize?: number,
  inputClassName?: any,
  ref?: any,
  rest?: any
}

const InputPasswordToggle = (props: InputPasswordToggleProps): JSX.Element => {
  // ** Props
  const {
    label,
    hideIcon,
    showIcon,
    visible,
    className,
    htmlFor,
    placeholder,
    iconSize,
    inputClassName,
    ...rest
  } = props

  // ** State
  const [inputVisibility, setInputVisibility] = useState(visible)

  // ** Renders Icon Based On Visibility
  const renderIcon = () => {
    const size = iconSize ? iconSize : 14

    if (inputVisibility === false) {
      return hideIcon ? hideIcon : <Eye size={size} />
    } else {
      return showIcon ? showIcon : <EyeOff size={size} />
    }
  }

  return (
    <>
      {label ? <Label for={htmlFor}>{label}</Label> : null}
      <InputGroup
        className={classnames({
          [className]: className
        })}
      >
        <Input
          type={inputVisibility === false ? 'password' : 'text'}
          placeholder={placeholder ? placeholder : '············'}
          className={classnames({
            [inputClassName]: inputClassName
          })}
          /*eslint-disable */
          {...(label && htmlFor
            ? {
                id: htmlFor
              }
            : {})}
          {...rest}
          /*eslint-enable */
        />
        <InputGroupText onClick={() => setInputVisibility(!inputVisibility)} className='cursor-pointer'>{renderIcon()}</InputGroupText>
      </InputGroup>
    </>
  )
}

export default InputPasswordToggle

// ** PropTypes
InputPasswordToggle.propTypes = {
  hideIcon: PropTypes.node,
  showIcon: PropTypes.node,
  visible: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  iconSize: PropTypes.number,
  inputClassName: PropTypes.string,
  label(props:any, propName: string, componentName: string) {
    // ** If label is defined and htmlFor is undefined throw error
    if (props[propName] && props['htmlFor'] === 'undefined') {
      throw new Error('htmlFor prop is required when label prop is present')
    }
  },
  htmlFor(props:any, propName: string, componentName: string) {
    // ** If htmlFor is defined and label is undefined throw error
    if (props[propName] && props['label'] === 'undefined') {
      throw new Error('label prop is required when htmlFor prop is present')
    }
  }
}

// ** Default Props
InputPasswordToggle.defaultProps = {
  visible: false
}
