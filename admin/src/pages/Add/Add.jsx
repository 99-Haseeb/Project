import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios"
import { toast } from 'react-toastify';

const Add = ({url}) => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"salad"
    })
    const onChangeHandler = (event)=> {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('price',Number(data.price))
        formData.append('category',data.category)
        formData.append("image",image)
        const response = await axios.post(`${url}/api/oil/add`,formData);
        if (response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Blended Oils"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="Upload area" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} name="description" rows='6' placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price flex-row">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" required>
              <option value="" disabled selected>Category</option>
              <option value="Extra Light">Extra Light</option>
              <option value="Extra Virgin">Extra Virgin</option>
              <option value="Blended Oils">Blended Oils</option>
              <option value="Black Olives">Black Olives</option>
              <option value="Green Olives">Green Olives</option>
              <option value="Apero Range">Apero-Range</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='PKR 2000' min="0" step="0.01" required />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
