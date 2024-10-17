
function FormField({name, type, placeholder, value, onChange, label}){
  return(
    <>
      <input id={name} value={value} onChange={onChange} name={name} type={type} placeholder={placeholder} />
      {label ? <label htmlFor={name}>{label}</label> : null}
    </>
  )
}

export default function Form({formFeilds, onSubmit, errMessages, error}) {
  return (
    <form onSubmit={onSubmit} >
        {
            formFeilds.map((field, index) => (
                <div key={field.name}>
                    <FormField value={field.value}  onChange={field.onChange} name={field.name} type={field.type} label={field?.label} placeholder={field?.placeholder}  key={index}  />
                    {error[field.name] ? <p>{errMessages[field.name].message}</p> : null}
                </div>
            ))
        }
        <button type="submit">Submit</button>
    </form>
  )
}





//Crawling inside React DOM tree | Pushing node and golang engines | Crunching psql data and pirating on docker container | Writing and reading about computer science