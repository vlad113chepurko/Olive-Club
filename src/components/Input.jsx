function Input({type, name, holder, value, complete, func, minLength, maxLength}) {
 return (
   <input
     type={type ?  type : 'text'}
     name={name}
     placeholder={holder}
     value={value ? value.trim() : ''}
     onChange={func}
     autoComplete={complete}
   />
 )
}

export default Input;