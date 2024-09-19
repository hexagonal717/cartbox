import { useState, useEffect } from 'react';

const AddAddressModal = ({ isOpen, onClose, onSave }) => {
  const initialAddressState = {
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    type: '',
    isDefault: false,
  };

  const [address, setAddress] = useState(initialAddressState);

  useEffect(() => {
    if (!isOpen) {
      setAddress(initialAddressState);
    }
  }, [ isOpen]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setAddress((prev) => ({ ...prev, isDefault: !prev.isDefault }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    onSave(address);
  };

  const handleClose = () => {
    setAddress(initialAddressState); // Reset fields when closing the modal
    onClose();
  };

  const renderInputField = (name, placeholder) => (
    <input
      name={name}
      placeholder={placeholder}
      className={`rounded-md border-none bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-100
        outline outline-1 outline-neutral-700 transition-all`}
      value={address[name]}
      onChange={handleOnChange}
    />
  );

  const renderSelectField = (name, placeholder, options) => (
    <select
      name={name}
      className={`rounded-md border border-r-8 border-neutral-800 bg-neutral-800 p-3 text-sm
        font-medium text-neutral-100 outline outline-1 outline-neutral-700 transition-all`}
      value={address[name]}
      onChange={handleOnChange}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-5/6 rounded-lg bg-neutral-900 p-8 shadow-lg sm:w-3/5 md:w-1/2 lg:w-2/6">
        <h2 className="mb-4 text-lg font-bold text-white">Add New Address</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSave}>
          {renderInputField('fullName', 'Full Name')}
          {renderInputField('addressLine1', 'Address Line 1')}
          {renderInputField('addressLine2', 'Address Line 2')}
          {renderInputField('landmark', 'Landmark (optional)')}
          {renderInputField('city', 'City')}
          {renderInputField('state', 'State')}
          {renderInputField('zipCode', 'Zip Code')}
          {renderInputField('country', 'Country')}
          {renderInputField('phone', 'Phone')}
          {renderSelectField('type', 'Select Address Type', ['home', 'work'])}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={address.isDefault}
              onChange={handleCheckboxChange}
              className="h-4 w-4"
            />
            <label htmlFor="isDefault" className="text-sm text-neutral-100">
              Set as default address
            </label>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="h-8 w-24 cursor-pointer rounded-md border-none bg-[#ffffff15] text-xs text-white
                outline outline-[0.1rem] outline-white/40 transition-all hover:bg-[#ffffff25]">
              Cancel
            </button>
            <button
              type="submit"
              className="h-8 w-24 cursor-pointer rounded-md border-none bg-[#00ff7615] text-xs font-bold
                text-[#00ff76] outline outline-[0.1rem] outline-[#00ff7677] transition-all
                hover:bg-[#00ff7625]">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
