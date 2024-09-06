import { useState, useEffect } from 'react';

const EditAddressModal = ({ isOpen, onClose, address, onSave }) => {
  const [updatedAddress, setUpdatedAddress] = useState(address);

  useEffect(() => {
    setUpdatedAddress(address);
  }, [address]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUpdatedAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setUpdatedAddress((prev) => ({ ...prev, isDefault: !prev.isDefault }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    onSave(updatedAddress);
  };

  const renderInputField = (name, placeholder) => (
    <input
      name={name}
      placeholder={placeholder}
      className={`rounded-md border-none bg-neutral-800 p-3 text-sm font-medium text-neutral-100
        outline outline-1 outline-neutral-700 transition-all`}
      value={updatedAddress[name] || ''}
      onChange={handleOnChange}
    />
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-5/6 rounded-lg bg-neutral-900 p-8 shadow-lg sm:w-3/5 md:w-1/2 lg:w-2/6">
        <h2 className="mb-4 text-lg font-bold text-white">Edit Address</h2>
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

          {!address.isDefault && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={updatedAddress.isDefault}
                onChange={handleCheckboxChange}
                className="h-4 w-4"
              />
              <label className="text-sm text-neutral-100">Set as default</label>
            </div>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
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

export default EditAddressModal;
