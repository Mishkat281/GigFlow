import React from 'react'
import './Add.scss'
import { Link } from 'react-router-dom'

const Add = () => {
  return (
    <div className='add'>
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input type="text" name="" id="" placeholder="eg: I will do something I'm really good at " />
            <label htmlFor="">Category</label>
            <select name="cats" id="cats">
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="">Cover Image</label>
            <input type="file" name="" id="" />
            <label htmlFor="">Upload Image</label>
            <input type="file" multiple />
            <label htmlFor="">Description</label>
            <textarea name="" id="" cols="30" rows="15" placeholder='Brief description to introduce your service to customers'></textarea>
            <button>Create</button>
          </div>
          <div className="right">
              <label htmlFor="">Serive Title</label>
              <input type="text" placeholder='eg: One-page web design' />
              <label htmlFor="">SHort Description</label>
              <textarea name="" id="" cols="30" rows="10" placeholder='Short description of your service'></textarea>
              <label htmlFor="">Delivery Time(eg: 3 Days)</label>
              <input type="number" min={1} name="" id="" />
              <label htmlFor="">Revision Number</label>
              <input type="number" min={1} />
              <label htmlFor="">Add Features</label>
              <input type="text" placeholder='eg: page design' />
              <input type="text" placeholder='eg: file uploading' />
              <input type="text" placeholder='eg: setting up a domain' />
              <input type="text" placeholder='eg: hosting' />
              <label htmlFor=""> Price</label>
              <input type="number" min={1} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
