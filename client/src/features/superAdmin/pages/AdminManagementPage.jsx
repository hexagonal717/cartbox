import { useQueries } from '@tanstack/react-query';
import { getProductList } from '../../../api/customer/customerApi.js';
import { useEffect, useState } from 'react';
import { addProduct, deleteProduct } from '../../../api/admin/adminApi.js';

const AdminManagementPage = () => {
  const [adminList, setAdminList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    subCategory: '',
  });

  const availableCategories = {
    electronics: ['mobiles', 'laptops', 'headphones', 'smartwatches', 'televisions'],
    grocery: ['vegetables', 'fruits', 'dairy', 'snacks', 'beverages'],
    fashion: ['men', 'women', 'kids', 'accessories'],
    books: ['fiction', 'nonFiction', 'educational', 'comics'],
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: ['adminProductList'],
        queryFn: () => getAdminList().then((data) => data.payload),
      },
    ],
  });

  const [productQuery] = queries;

  useEffect(() => {
    if (productQuery.data) {
      setAdminList(adminQuery.data);
      setFilteredProducts(productQuery.data);
    }
  }, [productQuery.data]);

  useEffect(() => {
    const filtered = adminList.filter(
      ({ name, category }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === '' || category === selectedCategory),
    );
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, adminList]);

  if (productQuery.isLoading) return <div>Loading...</div>;
  if (productQuery.error)
    return <div>Error loading data: {productQuery.error?.message}</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'price' ? value || '' : value,
    }));
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deleteProduct(productId);
      if (response.status === 'success') {
        // Update the product list by filtering out the deleted product
        setProductList((prevList) =>
          prevList.filter((product) => product._id !== productId),
        );
      } else {
        console.error('Failed to delete product:', response.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  async function handleAddProduct(event) {
    console.log(newProduct, 'NEW PROUDCT');
    event.preventDefault();
    try {
      const response = await addProduct(newProduct).then((data) => data);

      console.log(response, 'responseeeeeeeeeee');

      if (response.status === 'success') {
        console.log('success');
        setProductList((prevList) => [...prevList, response.payload]);
        setIsModalOpen(false);
      } else {
        console.error('Failed to add product:', response.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const tableHeaders = [
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Stock Status',
    'Actions',
  ];
  const inputs = [
    { name: 'firstName', placeholder: 'First Name' },
    { name: 'lastName', placeholder: 'Last Name' },
    { name: 'phone', placeholder: 'Phone' },
    { name: 'email', placeholder: 'Email' },
  ];

  return (
    <div className="flex h-full flex-row justify-center overflow-y-auto">
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-blue-500 px-4 py-2 text-xs text-white hover:bg-blue-600">
            Add New Product
          </button>
        </div>

        <div className="mb-4 flex justify-between text-xs">
          <input
            type="text"
            placeholder="Search products..."
            className="w-1/2 rounded-lg border border-neutral-600 bg-neutral-950 px-4 py-3 outline-0
              focus:border-neutral-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="space-x-2 text-sm">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border-r-8 border-r-transparent p-2 outline outline-1 outline-neutral-700">
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="grocery">Grocery</option>
              <option value="books">Books</option>
            </select>
            <select className="rounded-md border-r-8 border-r-transparent p-2 outline outline-1 outline-neutral-700">
              <option value="">Stock Status</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="h-4/5 overflow-x-auto overflow-y-auto border-y border-neutral-600">
          <table className="min-w-full table-fixed bg-neutral-800 text-white">
            <thead className="sticky top-0 bg-neutral-800">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="border-x border-b border-neutral-600 px-4 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-neutral-300">
              {filteredProducts.map((product) => {
                const values = [
                  product.name,
                  product.price,
                  product.category,
                  product.subCategory,
                  'In Stock', // This can be dynamically determined if needed
                  <>
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="ml-2 text-red-500 hover:underline">
                      Delete
                    </button>
                  </>,
                ];

                return (
                  <tr key={product._id}>
                    {values.map((value, index) => (
                      <td
                        key={index}
                        className="border-x border-y border-neutral-600 px-4 py-2 text-center">
                        {value}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          {['Previous', 'Next'].map((label) => (
            <button
              key={label}
              className="ml-2 rounded border border-neutral-600 px-4 py-2 text-sm hover:border-neutral-400
                hover:bg-neutral-800">
              {label}
            </button>
          ))}
        </div>

        {isModalOpen && (
          <form
            onSubmit={handleAddProduct}
            method="post"
            encType="multipart/form-data"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}>
            <div
              className="w-full max-w-lg rounded-lg border border-neutral-500 bg-neutral-900 p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}>
              <h2 className="mb-4 text-xl font-bold">Add New Product</h2>
              <div className="space-y-4 text-sm">
                {inputs.map(({ name, placeholder }) => (
                  <input
                    key={name}
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    className="w-full rounded-lg bg-neutral-950 px-3 py-2 outline outline-1 outline-neutral-700"
                    value={newProduct[name]}
                    onChange={handleInputChange}
                  />
                ))}

                <select
                  name="category"
                  className="w-full rounded-lg border-r-8 border-r-transparent bg-neutral-950 p-2 outline
                    outline-1 outline-neutral-700"
                  value={newProduct.category}
                  onChange={(e) => {
                    handleInputChange(e);
                    setNewProduct((prevProduct) => ({
                      ...prevProduct,
                      subCategory: '',
                    }));
                  }}>
                  <option value="">Select Category</option>
                  {Object.keys(availableCategories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  name="subCategory"
                  className="w-full rounded-lg border-r-8 border-r-transparent bg-neutral-950 p-2 outline
                    outline-1 outline-neutral-700"
                  value={newProduct.subCategory}
                  onChange={handleInputChange}
                  disabled={!newProduct.category}>
                  <option value="">Select Subcategory</option>
                  {availableCategories[newProduct.category]?.map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end gap-2 pt-8 text-xs">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminManagementPage;
