import { useEffect, useState } from 'react';
import AddAddressModal from '../../../components/common/customer/AddAddressModal.jsx';
import EditAddressModal from '../../../components/common/customer/EditAddressModal.jsx';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { AddOutlined } from '@mui/icons-material';
import {
  addAddress,
  deleteAddress,
  getAddress,
  putAddress,
} from '@/api/v1/customer/profile/profileApi.js';
import {
  Button
} from '@/components/ui-custom/button.jsx';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui-custom/card.jsx';

const AddressPage = () => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );
  const [addressInfo, setAddressInfo] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);

  const {
    status,
    error,
    data: dbCustomerInfo,
  } = useQuery({
    queryKey: ['dbAddressInfo', customerId],
    queryFn: () => getAddress(customerId).then((data) => data.payload),
    enabled: !!customerId,
  });

  useEffect(() => {
    if (dbCustomerInfo) {
      setAddressInfo(dbCustomerInfo);
    }
  }, [dbCustomerInfo]);

  const updateDefaultAddress = (newDefaultId) => {
    setAddressInfo((prev) =>
      prev.map((addr) =>
        addr._id === newDefaultId
          ? { ...addr, isDefault: true }
          : { ...addr, isDefault: false },
      ),
    );
  };

  const handleSaveAddress = (newAddress) => {
    addAddress(customerId, newAddress).then((res) => {
      if (res.status === 'success') {
        if (newAddress.isDefault) {
          updateDefaultAddress(newAddress._id);
        } else {
          setAddressInfo([...addressInfo, newAddress]);
        }
        setIsAddModalOpen(false);
      }
    });
  };

  const handleEditAddress = (updatedAddress) => {
    putAddress(customerId, updatedAddress._id, updatedAddress).then((res) => {
      if (res.status === 'success') {
        // If the address is set as default, update all addresses
        if (updatedAddress.isDefault) {
          // Update all addresses to ensure only one is default
          setAddressInfo((prev) =>
            prev.map((addr) =>
              addr._id === updatedAddress._id
                ? { ...updatedAddress, isDefault: true }
                : { ...addr, isDefault: false },
            ),
          );
        } else {
          // Otherwise, just update the single address
          setAddressInfo((prev) =>
            prev.map((addr) =>
              addr._id === updatedAddress._id ? updatedAddress : addr,
            ),
          );
        }
        setIsEditModalOpen(false); // Close the modal
      }
    });
  };

  const handleDeleteAddress = (customerId, addressId) => {
    deleteAddress(customerId, addressId).then((res) => {
      if (res.status === 'success') {
        setAddressInfo((prev) =>
          prev.filter((address) => address._id !== addressId),
        );

        // If the deleted address was the default, set another address as default
        const isDeletedAddressDefault = addressInfo.find(
          (address) => address._id === addressId && address.isDefault,
        );

        if (isDeletedAddressDefault) {
          const newDefaultAddress = addressInfo.find(
            (address) => address._id !== addressId,
          );
          if (newDefaultAddress) {
            handleEditAddress({ ...newDefaultAddress, isDefault: true });
          }
        }
      }
    });
  };

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="flex h-full w-screen justify-center">
      <div className="flex flex-col items-center gap-4 p-4">
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className={`flex items-center justify-center gap-2 rounded-md bg-neutral-800 p-4 text-sm
            shadow-sm hover:bg-neutral-700/50`}>
          <AddOutlined />
          <div>Add new address</div>
        </Button>

        {addressInfo.map((address) => (
          <Card
            key={address?._id}
            className="w-full sm:w-96 rounded-md bg-neutral-800 shadow-sm">
            <CardHeader className="text-lg font-semibold text-neutral-200">
              {address?.fullName}
            </CardHeader>
            <CardContent>

            <p className="text-sm text-neutral-400">{address?.addressLine1}</p>
            <p className="text-sm text-neutral-400">{address?.addressLine2}</p>
            <p className="text-sm text-neutral-400">
              {address?.city}, {address?.state} - {address?.zipCode}
            </p>
            <p className="text-sm text-neutral-400">{address?.country}</p>
            <p className="text-sm text-neutral-400">{address?.phone}</p>
            {address?.isDefault && (
              <p className="text-sm text-yellow-500">Default Address</p>
            )}
            <div
              className="mt-6 flex w-max items-center gap-2 rounded-full bg-neutral-900 px-3 py-2 text-sm
                text-white">
              <button
                onClick={() => {
                  setAddressToEdit(address);
                  setIsEditModalOpen(true);
                }}
                className="px-2 text-neutral-100 hover:text-neutral-200 focus:outline-none">
                Edit
              </button>
              <div className="h-4 border-r border-neutral-500"></div>
              <button
                onClick={() => handleDeleteAddress(customerId, address._id)}
                className="px-2 text-red-500 hover:text-red-400 focus:outline-none">
                Delete
              </button>
            </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddAddressModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveAddress}
      />

      {addressToEdit && (
        <EditAddressModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          address={addressToEdit}
          onSave={handleEditAddress}
        />
      )}
    </div>
  );
};

export default AddressPage;
