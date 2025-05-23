import Table from 'react-bootstrap/Table';
import Header from '../../../Shared/Components/Header/Header';
import headerImg from '../../../../assets/images/Group 48102127.png';
import { useEffect, useState } from 'react';
import { axiosInstance, CATEGORY_URLS } from '../../../../Constants/CONTENT-END-POINTS';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import { useForm } from 'react-hook-form';
import { name } from '../../../../Constants/VALIDATION';
import ViewDetailsModal from '../../../Shared/Components/ViewDetailsModal/ViewDetailsModal';
import ViewDetailsImg from '../../../../assets/images/Group 48102098.png'
import NoData from '../../../Shared/Components/NoData/NoData';
import {Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export default function CategoriesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () => setShowDetails(true);
// get category by id
  const getCategoryById = async (categId) => {
    try {
      const response = await axiosInstance.get(CATEGORY_URLS.getCategoryById(categId));
      setIsLoading(true);
      setCategoryDetails(response.data);
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };

  // form handling
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const [mode, setMode] = useState('add'); // "add" or "update"
  const [categId, setCategId] = useState(null);

  const addOrUpdateCategory = async (data) => {
    try {
     
      if (mode === 'add') {
        await axiosInstance.post(CATEGORY_URLS.addCategory, data);
      } else if (mode === 'update') {
        await axiosInstance.put(CATEGORY_URLS.updateCategory(categId), data);
      }
       setIsLoading(true);
      if (mode === 'add') {
        toast.success("Category added successfully",{
          position:'top-center'
        });
      } else {
        toast.success("Category updated successfully",{
          position:'top-center'
        });
      }
      reset();
      getAllCategories();
      handleCloseMutateModule();
    } catch (error) {
      console.log(error);
      if (mode === 'add') {
        toast.error("Failed to add category",{
          position:'top-center'
        });
      } else {
        toast.error("Failed to update category",{
          position:'top-center'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    addOrUpdateCategory(data);
  };

  // delete modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setCategId(id);
  };

  // add modal
  const [showMutateModule, setShowMutateModule] = useState(false);
  const handleCloseMutateModule = () => {
    setShowMutateModule(false);
    setMode('add');
    setCategId(null);
  };
  const handleShowMutateModule = () => setShowMutateModule(true);

  // get all categories
  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(CATEGORY_URLS.getAllCategories);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(CATEGORY_URLS.deleteCategory(categId));
      getAllCategories();
      toast.success("Category deleted successfully",{
          position:'top-center'
        });
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category",{
          position:'top-center'
        });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category) => {
    setMode('update');
    setCategId(category.id);
    setShowMutateModule(true);
    // populate form
    setValue('name', category.name);
  };

  const handleViewDetails = (category) => {
    getCategoryById(category.id);
    handleShowDetails();
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // When mode changes to 'update', populate form if editing
  useEffect(() => {
    if (mode === 'update' && categId) {
      // load category details if needed
      const category = categories.find(c => c.id === categId);
      if (category) {
        setValue('name', category.name);
      }
    }
  }, [mode, categId, categories, setValue]);

  if (isLoading) return ( <div className='d-flex align-items-center justify-content-center'>
      <Oval
  visible={true}
  height="100vh"
  width="100"
  color="#009247" 
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> </div>
    );

  return (
    <div className='container-fluid'>
      <Header
        title='Categories Items'
        description='You can now add your items that any user can order from the Application and you can edit'
        image={headerImg}
      />

      <div className='d-flex align-items-center justify-content-between py-4'>
        <div>
          <h6>Categories Table Details</h6>
          <p>You can check all details</p>
        </div>
        {/* Add New Category Button */}
        <button
          className='btn submit-btn'
          onClick={() => {
            setMode('add');
            setCategId(null);
            reset();
            handleShowMutateModule();
          }}
        >
          Add New Category
        </button>
      </div>

      {/* Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <i
          onClick={handleClose}
          className='fa-regular fa-circle-xmark text-danger text-end p-3 fs-4'
        ></i>
        <Modal.Body>
          <DeleteConfirmation deleteItem='Category' />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='text-danger bg-transparent border-danger fw-medium'
            onClick={handleDelete}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add / Update Modal */}
      <Modal show={showMutateModule} onHide={handleCloseMutateModule}>
        <div className='d-flex align-items-center justify-content-between p-4'>
          <h6>{mode === 'add' ? 'Add' : 'Update'} Category</h6>
          <div>
            <i
              onClick={handleCloseMutateModule}
              className='fa-regular fa-circle-xmark text-danger fs-4'
            ></i>
          </div>
        </div>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type='text'
              placeholder='Category Name'
              className='form-control'
              {...register('name', { required: name.required })}
            />
            <span className='text-danger'>{errors?.name?.message}</span>
            <Modal.Footer>
              <button type='submit' className='btn submit-btn' disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Table
        className='table'
        striped
        bordered
        hover
        style={{ textAlign: 'center' }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Creation date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan='3'>
                <NoData />
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.creationDate}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant='transparent' id='dropdown-basic'>
                      <i className='fa-solid fa-ellipsis'></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleViewDetails(category)}
                      >
                        <span className='btns-icon mx-1'>
                          <i className='fa-solid fa-eye'></i>
                        </span>{' '}
                        View
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() => handleEdit(category)}
                      >
                        <span className='btns-icon mx-1'>
                          <i className='fa-solid fa-pen-to-square'></i>
                        </span>{' '}
                        Edit
                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => handleShow(category.id)}>
                        <span className='btns-icon mx-1'>
                          <i className='fa-solid fa-trash-can'></i>
                        </span>{' '}
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
          <ViewDetailsModal
            img={ViewDetailsImg}
            head='Category'
            title={categoryDetails.name}
            description={
              <>Creation Date : {categoryDetails.creationDate}</>
            }
            info={
              <>Modification Date : {categoryDetails.modificationDate}</>
            }
            show={showDetails}
            setShow={setShowDetails}
          />
        </tbody>
      </Table>
    </div>
  );
}