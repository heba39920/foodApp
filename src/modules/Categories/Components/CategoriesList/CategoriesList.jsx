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
import useMutateData from '../../../../Hooks/useMutateData';


export default function CategoriesList() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { mutate, addStatus, updateStatus } = useMutateData();
  const [mode, setMode] = useState('add');
const onsubmit =  (data) => {
  try {
    if (mode === 'add') {
       mutate({ mode: 'add', url: CATEGORY_URLS.addCategory, data });   
    } else if (mode === 'update') {
       mutate({ mode: 'update', url: CATEGORY_URLS.updateCategory(categId), data });
    }
    reset();
    getAllCategories();
    handleCloseMutateModule();
  } catch (error) {
console.log(error);

  }
}
  //delete modal 
  const [categId, setCategId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true)
    setCategId(id)

  };
  // add modal
  const [showMutateModule, setShowMutateModule] = useState(false);
  const handleCloseMutateModule = () => setShowMutateModule(false);
  const handleShowMutateModule = () => setShowMutateModule(true);
  // get all categories
  const getAllCategories = async () => {
    try {
      const response = await axiosInstance.get(CATEGORY_URLS.getAllCategories,);
      setCategories(response.data.data);

    } catch (error) {
      console.log(error.response.data.message);

    }
  }



  // delete category
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(CATEGORY_URLS.deleteCategory(categId));
      getAllCategories();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, [])

  return (
    <div className='container-fluid'>
      <Header title={'Categories Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} image={headerImg} />
      <div className='d-flex align-items-center justify-content-between py-4'>
        <div>
          <h6>Categories Table Details</h6>
          <p>You can check all details</p>
        </div>
        <button className='btn submit-btn' onClick={() => {
          handleShowMutateModule();
          setMode('add');
          setCategId(null);
        }}>Add New Category</button>
      </div>
      {/*delete modal*/}
      <Modal show={show} onHide={handleClose}>

        <i onClick={handleClose} className="fa-regular fa-circle-xmark text-danger text-end p-3 fs-4" ></i>

        <Modal.Body>
          <DeleteConfirmation deleteItem={'Category'} />
        </Modal.Body>
        <Modal.Footer>
          <Button className='text-danger bg-transparent border-danger fw-medium' onClick={handleDelete}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      {/*add modal*/}
      <Modal show={showMutateModule} onHide={handleCloseMutateModule}>

        <div className='d-flex align-items-center justify-content-between p-4'>
          <h6>{mode === 'add' ? 'Add' : 'Update'} Category</h6>
          <div> <i onClick={handleCloseMutateModule} className="fa-regular fa-circle-xmark text-danger fs-4"></i></div>
        </div>
        <Modal.Body>
          <form onSubmit={handleSubmit(onsubmit)}>
            <input type="text" placeholder="Category Name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              {...register("name", {
                required: name.required

              })} />
            <span className="text-danger">{errors?.name?.message}</span>
            <Modal.Footer>
              <button type='submit' className='btn submit-btn' disabled={addStatus === 'loading' || updateStatus === 'loading'}
              >
                {addStatus === 'loading' || updateStatus === 'loading'
                  ? 'Saving...'
                  : 'Save'}
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Table className='table' striped bordered hover style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Creation date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.creationDate}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                      <i className="fa-solid fa-ellipsis"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item > <span className='btns-icon mx-1'><i className="fa-solid fa-eye"></i></span> View</Dropdown.Item>
                      <Dropdown.Item onClick={() => {
                        handleShowMutateModule();
                        setMode('update');
                        setCategId(category.id);
                      }}> <span className='btns-icon mx-1'><i className="fa-solid fa-pen-to-square"></i></span> Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleShow(category.id)}> <span className='btns-icon mx-1'><i className="fa-solid fa-trash-can"></i></span> Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          }

        </tbody>
      </Table>

    </div>
  )
}
