function Checkbox({type, onClick}) {
  return (
    <input
      type={type ?  type : 'checkbox'}
      onClick={onClick}
    />
  )
}

export default Checkbox;