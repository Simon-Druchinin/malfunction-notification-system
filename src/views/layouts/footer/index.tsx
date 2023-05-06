const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        © {new Date().getFullYear()}{' '}
        <a href='' target='_blank' rel='noopener noreferrer'>
          MFNS
        </a>
        <span className='d-none d-sm-inline-block'>, Все права защищены</span>
      </span>
    </p>
  )
}

export default Footer
