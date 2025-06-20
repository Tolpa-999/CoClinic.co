import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BookUrl } from '../utils/serverURL';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';

const CreateBook = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: '',
    description: '',
    author: '',
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [id]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Validate file types and size
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 2 * 1024 * 1024; // 5MB
    const invalidFiles = selectedFiles.filter(
      (file) => !allowedTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      setError('Only JPEG, JPG, PNG, or GIF files up to 5MB are allowed');
      return;
    }

    if (selectedFiles.length + formData.imageUrls.length > 6) {
      setError('You can only upload up to 6 images per listing');
      return;
    }

    setFiles(selectedFiles);
    setError(null);
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length + files.length < 1) {
      setError('You must upload at least one image');
      return;
    }
    if (+formData.regularPrice < +formData.discountPrice && formData.offer) {
      setError('Discount price must be lower than regular price');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      // Append form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('regularPrice', formData.regularPrice);
      formDataToSend.append('discountPrice', formData.discountPrice);
      formDataToSend.append('offer', formData.offer);
      formDataToSend.append('userRef', currentUser._id);
      // Append existing image URLs
      formData.imageUrls.forEach((url, index) => {
        formDataToSend.append(`imageUrls[${index}]`, url);
      });
      // Append new files
      files.forEach((file) => {
        formDataToSend.append('images', file);
      });

      const res = await axiosInstance.post(BookUrl.create, formDataToSend, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const data = res.data;
setLoading(false);

if (data.status !== 'success') {
  setError(data?.message);
} else {
        toast.success(data?.message || 'Book created successfully');
      }
    } catch (error) {
      setError('Failed to create book. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Post a Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Title"
            className="border p-3 rounded-lg"
            id="title"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Author"
            className="border p-3 rounded-lg"
            id="author"
            required
            onChange={handleChange}
            value={formData.author}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">$</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">$</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={handleFileChange}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              multiple
            />
          </div>
          {error && error.includes('image') && (
            <p className="text-red-700 text-sm">{error}</p>
          )}
          {formData.imageUrls.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Uploaded Images:</p>
              {formData.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="Book image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
          {files.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Selected Images:</p>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Creating...' : 'Post Book'}
          </button>
          {error && !error.includes('image') && (
            <p className="text-red-700 text-sm">{error}</p>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateBook;