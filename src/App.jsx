import { useState, useEffect } from 'react'

const initialFormData = {
  title: "",
  description: "",
  author: "",
  image: "",
  category: "",
  state: "",
  check1: false,
  check2: false
}

function App() {
  // Variabili reattive
  const [postList, setPostList] = useState([])
  const [checkboxMessage1, setCheckboxMessage1] = useState('')
  const [checkboxMessage2, setCheckboxMessage2] = useState('')


  // Variabili reattive per Input
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    // console.log("componente Mounting");
    if (formData.check1) {
      setCheckboxMessage1(" - Dovrai eseguire l'accesso al social")
    } else if (formData.check2) {
      setCheckboxMessage2(" - Dovrai eseguire l'accesso al social")
    } else {
      setCheckboxMessage1("")
      setCheckboxMessage2("")
    }
    // return console.log("componente Unmounting");
  }, [formData.check1, formData.check2])

  // Funzioni
  function handleInputChange(event) {
    const keyToChange = event.target.name
    const valueToChange =
      event.target.type === "checkbox" ?
        event.target.checked : event.target.value

    const newData = {
      ...formData,
      [keyToChange]: valueToChange
    }
    setFormData(newData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newPost = {
      ...formData,
      id: Date.now()
    }

    const newPostList = [...postList, newPost]

    setPostList(newPostList)

    setFormData(initialFormData)
  }

  function removePost(itemToRemove) {
    const updutePostList = postList.filter((curPost) => curPost.id !== itemToRemove)
    setPostList(updutePostList)
  }

  return (
    <>
      <header className='bg-danger'>
        {/* Title */}
        <h1 className='text-center py-3 m-0'>Blog form multifield</h1>
      </header>
      <main className='bg-danger-subtle'>
        {/* Form section */}
        <section className='container py-3'>
          <h3 className='my-3'>Crea il tuo post!</h3>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className='form-label'>Titolo del post</label>
              <input className='form-control' type="text" id='title' name='title' value={formData.title} onChange={handleInputChange} placeholder='Inserisci il titolo del post' />
            </div>
            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descrizione del post</label>
              <textarea className="form-control" id="description" rows="3" name='description' value={formData.description} onChange={handleInputChange} placeholder="Inserisci la descrizione del post"></textarea>
            </div>
            {/* Author */}
            <div className="mb-3">
              <label htmlFor="author" className='form-label'>Autore del post</label>
              <input className='form-control' type="text" id='author' name='author' value={formData.author} onChange={handleInputChange} placeholder="Inserisci l'autore del post" />
            </div>
            {/* Image */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Default file input example</label>
              <input className="form-control" type="file" id="image" name='image' value={formData.image} onChange={handleInputChange} />
            </div>
            {/* Category */}
            <div>
              <select className="form-select" aria-label="Default select example" name='category' value={formData.category} onChange={handleInputChange}>
                <option>Categoria</option>
                <option value="Travel">Travel</option>
                <option value="Tech">Tech</option>
                <option value="Business">Business</option>
              </select>
            </div>
            {/* Checkbox */}
            <div className="form-check mt-3">
              <label className="form-check-label" htmlFor="instagramCheck">
                <span>Condividi su Instagram </span>
                <span>{checkboxMessage1}</span>
              </label>
              <input className="form-check-input" type="checkbox" id="instagramCheck" name='check1' checked={formData.share} onChange={handleInputChange} />
            </div>
            <div className="form-check mt-3">
              <label className="form-check-label" htmlFor="facebookCheck">
                <span>Condividi su Facebook </span>
                <span>{checkboxMessage2}</span>
              </label>
              <input className="form-check-input" type="checkbox" id="facebookCheck" name='check2' checked={formData.share} onChange={handleInputChange} />
            </div>
            {/* Submit btn */}
            <button type='submit' className='btn btn-danger my-3'>Invia</button>
          </form>
        </section>
        {/* PostsList section */}
        <section className='container pb-3'>
          {postList.length > 0 ? (
            <ul className="list-group">
              {postList.map((curPost) => (
                <li key={curPost.id} className="list-group">
                  <div className="card text-bg-danger mb-3">
                    <div className="card-header">{curPost.author}</div>
                    <div className="card-body">
                      <h3 className="card-title">{curPost.title}</h3>
                      <p className="card-text">{curPost.description}</p>
                      <h5>Categoria: {curPost.category}</h5>
                    </div>
                    <button className='btn text-end' onClick={() => removePost(curPost.id)}>Elimina</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h5>Completa il form per creare un post</h5>
          )}
        </section>
      </main>
    </>
  )
}

export default App