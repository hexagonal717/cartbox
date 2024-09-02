import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, putUser } from '../../../api/admin/adminApi.js';

const SuperAdminProfilePage = () => {
  const token = useSelector((state) => state.adminAuthSlice.accessToken);

  const [previewImage, setPreviewImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const profileImageInputRef = useRef(null);
  const [adminInfo, setAdminInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    image: '',
  });

  const {
    status,
    error,
    refetch,
    data: dbAdminInfo,
  } = useQuery({
    queryKey: ['dbAdminInfo', token.adminId],
    queryFn: () =>
      getUser(token.adminId).then((data) => {
        setAdminInfo(data);
        return data;
      }),
    enabled: !!token.adminId,
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  const handleEdit = (event) => {
    event.preventDefault();
    if (!isDisabled) {
      setAdminInfo(dbAdminInfo);
    }
    setIsDisabled((prev) => !prev);
  };

  const handleEditImage = () => {
    if (previewImage) {
      profileImageInputRef.current.value = null;
      setPreviewImage(null);
    } else {
      profileImageInputRef.current.click();
    }
  };

  const handleOnChange = (event) => {
    const { name, value, files, type } = event.target;
    if (type === 'file' && files[0]) {
      setPreviewImage(URL.createObjectURL(files[0]));
      setAdminInfo((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setAdminInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await putUser(token.adminId, adminInfo);
      setIsDisabled(true);
      setPreviewImage(null);
      await refetch();
    } catch (err) {
      console.error('Error saving user info:', err);
    }
  };

  const renderInputField = (name, placeholder) => (
    <input
      name={name}
      placeholder={placeholder}
      className={`rounded-md border-none p-3 text-sm font-medium
        ${isDisabled ? 'text-neutral-400 outline outline-1 outline-neutral-700' : 'text-neutral-100 outline outline-1 outline-neutral-500'}
        bg-neutral-800 transition-all`}
      readOnly={isDisabled}
      disabled={isDisabled}
      value={adminInfo[name]}
      onChange={handleOnChange}
    />
  );

  return (
    dbAdminInfo && (
      <div className={'flex h-full flex-row items-center justify-center'}>
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <form
            className="flex flex-col items-center justify-center gap-3"
            onSubmit={handleSave}
            method="post"
            encType="multipart/form-data">
            <label
              className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-full text-center
                outline outline-2 outline-neutral-700">
              {previewImage || dbAdminInfo.image ? (
                <img
                  src={previewImage || dbAdminInfo.image}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="text-xs font-normal text-white">Upload an image</div>
              )}
            </label>

            <div className="mb-6 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleEditImage}
                className="h-8 w-24 cursor-pointer rounded-md border-none bg-[#ffffff15] text-xs text-white
                  transition-all hover:bg-[#ffffff25]">
                {previewImage ? 'Cancel' : 'Edit image'}
              </button>

              {previewImage && (
                <button
                  type="submit"
                  className="h-8 w-24 cursor-pointer rounded-md border-none bg-[#ffffff15] text-xs text-white
                    transition-all hover:bg-[#ffffff25]">
                  Save
                </button>
              )}
            </div>

            <input
              type="file"
              name="image"
              ref={profileImageInputRef}
              onChange={handleOnChange}
              className="hidden"
            />

            {renderInputField('firstName', 'First Name')}
            {renderInputField('lastName', 'Last Name')}
            {renderInputField('email', 'Email')}
            {renderInputField('phone', 'Phone')}

            <button
              type="button"
              onClick={handleEdit}
              className="h-8 w-24 cursor-pointer rounded-md border-none bg-[#ffffff15] text-xs text-white
                transition-all hover:bg-[#ffffff25]">
              {isDisabled ? 'Edit profile' : 'Cancel'}
            </button>
            <button
              type="submit"
              className={`mt-4 cursor-pointer rounded-md border-none bg-[#00ff7615] px-20 py-3 text-xs
                font-bold text-[#00ff76] outline outline-[0.1rem] outline-[#00ff7677] transition-all
                hover:bg-[#00ff7625] ${isDisabled ? 'cursor-not-allowed' : ''}`}
              disabled={isDisabled}>
              Save
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default SuperAdminProfilePage;
