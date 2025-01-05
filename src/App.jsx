import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  // Variabili reattive
  const [postList, setPostList] = useState([])
  const [postTitle, setPostTitle] = useState('')

  // Funzioni
  function handleSubmit(event) {
    event.preventDefault();
    const newPost = {
      id: Date.now(),
      title: postTitle
    }
    const newPostList = [...postList, newPost]
    setPostList(newPostList)
    setPostTitle('')
  }

  function removePost(itemToRemove) {
    const updutePostList = postList.filter((curPost) => curPost.id !== itemToRemove)
    setPostList(updutePostList)
  }

  return (
    <>
      {/* Title */}
      <h1 className='text-center my-3'>Blog form multifield</h1>
      {/* Form section */}
      <section className='container'>
        <h3 className='my-3'>Crea il tuo post!</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className='form-label'>Titolo del post</label>
          <input type="text" className='form-control' id='title' placeholder='Inserisci il titolo del post' value={postTitle} onChange={(e) => { setPostTitle(e.target.value) }} />
          <button type='submit' className='btn btn-primary my-3'>Invia</button>
        </form>
      </section>
      {/* PostsList section */}
      <section className='container'>
        {postList.length > 0 ? (
          <ul className="list-group">
            {postList.map((curPost) => (
              <li key={curPost.id} className="list-group-item">
                <span>{curPost.title}</span>
                <button className='btn d-block' onClick={() => removePost(curPost.id)}>🗑️</button>
              </li>
            ))}
          </ul>
        ) : (
          <span>Nessun post creato!</span>
        )}
      </section>
    </>
  )
}

export default App