import { useEffect, useState } from "react"

const useForm = (initialValues, submit, validation) => {

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false)

  useEffect(()=>{
    if(submitting){
      if(Object.keys(errors).length===0){
        submit(values);
      }
      setSubmitting(false);
    }
  },[errors]);

  const handleKeyUp = (e)=>{
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(validation){
      setErrors(validation(values));
    }else{
      setErrors({});
    }
    setSubmitting(true);
  }

  return {
    handleKeyUp,
    handleSubmit,
    values,
    errors
  };
}
 
export default useForm;