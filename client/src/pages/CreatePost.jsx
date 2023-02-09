import React, {useState, useRef } from 'react'
import {useNavigate} from "react-router-dom"

import { preview, test } from "../assets"
import { getRandomPrompt } from "../utils"
import { FormField, Loader } from "../components"


const CreatePost = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
                          name: "",
                          prompt: "",
                          photo: ""                        
  })
  const [generatingImg, setGeneratingImg ] = useState(false)
  const [loading, setLoading ] = useState(false)

  const [selected, setSelected ] = useState("")
  const [definitiva, setDefinitiva ] = useState("")
  {/* const [file, setFile] = useState(""); */}

  const selectRef = useRef()

  const generateImage = async () => {
    if (form.prompt ) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
            n: +selectRef.current.value 
          }),
        });

        const data = await response.json();
        console.log(data.photo)
        const arrayPhoto = data.photo.map(item => item === null ? item : `data:image/jpeg;base64,${item}`)
        console.log(arrayPhoto)
          setForm({ ...form, photo: arrayPhoto })
        
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };


  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(form.prompt && form.photo){

      setLoading(true);

      try{
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({...form, photo: definitiva })
        })
        await response.json();
        alert('Success')
        navigate('/');
      }catch( err ){
        alert(err)
      } finally {
        setLoading(false)
      }
    } else {
        alert('Please enter a prompt and generate an image')

    }
  }

  const handleChange = (e) =>{
    setForm( {...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () =>{
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt: randomPrompt})
  }

  const handleSelect = (e) =>{
    console.log(e.target.value)
    console.log(selectRef.current.value)
  }

  const selectPhoto = (e) => {
    form.photo.map(picture =>{
      if(`${picture}` === e.target.id ){ 
        console.log(e.target.id)
        setSelected(e.target.id)
        setDefinitiva(picture)
      }
    })
  }
{/* }  const handleFileChange = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0])
      setFile(e.target.files[0]);
    }
  }
*/}
    const showArray = (array) => {
    if(array){
      return (<>
      {array[0] && <img src = {array[0]}
            id = {`${array[0]}`}
            alt = {form.prompt}
            className={array[0] === selected ?'w-full h-full object-contain mr-5 cursor-pointer ring ring-4 ring-green-400' : "w-full h-full object-contain mr-5 cursor-pointer" }
            onClick={selectPhoto}/>}
      {array[1] && <img src = {array[1]}
            id = {`${array[1]}`}
            alt = {form.prompt}
            className={array[1] === selected ?'w-full h-full object-contain mr-5 cursor-pointer ring ring-4 ring-green-400' : "w-full h-full object-contain mr-5 cursor-pointer" }
            onClick={selectPhoto} /> }   
      {array[2] && <img src = {array[2]}
            id = {`${array[2]}`}
            alt = {form.prompt}
            className={array[2] === selected ?'w-full h-full object-contain mr-5 cursor-pointer ring ring-4 ring-green-400' : "w-full h-full object-contain mr-5 cursor-pointer" }
            onClick={selectPhoto} />}  
      {array[3] && <img src = {array[3]}
            id = {`${array[3]}`}
            alt = {form.prompt}
            className={array[3] === selected ?'w-full h-full object-contain mr-5 cursor-pointer ring ring-4 ring-green-400' : "w-full h-full object-contain mr-5 cursor-pointer" }
            onClick={selectPhoto} /> } 
      {array[4] && <img src = {array[4]}
            id = {`${array[4]}`}
            alt = {form.prompt}
            className={array[4] === selected ?'w-full h-full object-contain mr-5 cursor-pointer ring ring-4 ring-green-400' : "w-full h-full object-contain mr-5 cursor-pointer" }
            onClick={selectPhoto} /> }  
      {array[5] && <img src = {array[5]}
            id = {`${array[5]}`}
            alt = {form.prompt}
            className={array[5] === selected ?'w-full h-full object-contain mr-5 cursor-pointer ring ring-4 ring-green-400' : "w-full h-full object-contain mr-5 cursor-pointer" }
            onClick={selectPhoto} /> }       
      </>
       )
    }
  }
  return (
    <section className="max-w-7xl mx-auto">
      <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
            <p className ="mt-2 text-[#666e75] text-[16px] max-w-[500px]"> Create imaginative and visually stunning images through DALL-E AI and share them with the community</p>
        </div>
      <form className="mt-16 max-w-3xl" onSubmit ={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField 
              labelName="Your name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              handleChange={handleChange}
          />
          <FormField 
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="A plush toy robot sitting against a yellow wall"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
          />
   {/*}       <div className="flex-col items-center gap-2 mb-2">
            <label htmlFor="tuimagen" className="block text-sm font-medium text-gray-900 mb-3">
                Sube una imagen que ya tengas para usar de referencia (opcional)
            </label>
            <div>
             <input onChange={handleFileChange} name="tuimagen" type="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 select-text"></input>
            </div>
          </div>
  */}    
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm font-medium text-gray-900">
                Cuántas versiones quieres?
            </label>
            <div>
              <select ref={selectRef} onChange={handleSelect}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
          </div>
          
          <div className="relative bg-gray-50 border border-gray-900 text-gray-900 
                          text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                          w-364 p-3 h-64 flex overflow-x-scroll">
                            {form.photo.length > 0 ? showArray(form.photo) : (
                              <img src= {preview}
                                   alt="preview"
                                   className="w-9/12 h-9/12 object-contain opacity-40" />
                            )}
                            

                            {generatingImg && (
                              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg"> 
                                <Loader />
                              </div>
                            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
            <button
                type="button"
                onClick={generateImage}
                className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" >
                   {generatingImg ? "Generating..." : "Generate" }
            </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[12px]">Once you have selected the image you want, and enter your name, you can share it with others in the community </p>
          <button
              type="submit"
              className="mt-3 text-white bg-[#6369ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 py-2.5 text-center">
                {loading ? "Sharing..." : "Share with the community"}
              </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
