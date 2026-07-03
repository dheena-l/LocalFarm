import { useState } from 'react';

function AddProduct() {

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      title,
      price,
      description,
      location,
      phone,
      image
    });

    // here you will send data to backend using axios
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-body">

          <h3>Add Product</h3>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Title"
              className="form-control mb-3"
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              className="form-control mb-3"
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="form-control mb-3"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
              type="text"
              placeholder="Location"
              className="form-control mb-3"
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone"
              className="form-control mb-3"
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="file"
              className="form-control mb-3"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button className="btn btn-primary w-100">
              Submit
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddProduct;