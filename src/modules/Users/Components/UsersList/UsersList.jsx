import Table from 'react-bootstrap/Table';
import Header from '../../../Shared/Components/Header/Header';
import headerImg from '../../../../assets/images/Group 48102127.png';
import { useEffect, useState } from 'react';
import { axiosInstance, BASE_IMAGE_URL, USERS_URLS } from '../../../../Constants/CONTENT-END-POINTS';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import ViewDetailsModal from '../../../Shared/Components/ViewDetailsModal/ViewDetailsModal';
import ViewDetailsImg from '../../../../assets/images/Group 48102098.png'
import NoData from '../../../Shared/Components/NoData/NoData';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { Pagination } from 'react-bootstrap';

export default function UsersList() {
     const [arrayOfPages, setArrayOfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () => setShowDetails(true);
  const [userId, setUserId] = useState(null);

   // get User by id
  const getUserById = async (userId) => {
    try {
      const response = await axiosInstance.get(USERS_URLS.getUserById(userId));
      setIsLoading(true);
      setUserDetails(response.data);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };



 

  // delete modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setUserId(id);
  };
  // get all Users
 const getAllUsers= async (pageSize,pageNumber) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(USERS_URLS.getAllUsers,{params:{pageSize, pageNumber}});
      setUsers(response?.data?.data);
      setArrayOfPages(Array(response?.data?.totalPages).fill().map((_, index) => index + 1));
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(USERS_URLS.deleteUser(userId));
      getAllUsers();
      toast.success("User deleted successfully", {
        position: 'top-center'
      });
      handleClose();
    } catch (error) {
      setShow(false)
      console.log(error);
      toast.error("Failed to delete User", {
        position: 'top-center'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleViewDetails = (user) => {
    getUserById(user.id);
    handleShowDetails();
  };

  useEffect(() => {
    getAllUsers(10,1);
  }, []);
    if (isLoading) return (<div className='d-flex align-items-center justify-content-center'>
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
        title='Users List'
        description='You can now add your items that any user can order from the Application and you can edit'
        image={headerImg}
      />

      <div className='d-flex align-items-center justify-content-between py-4'>
        <div>
          <h6>Users Table Details</h6>
          <p>You can check all details</p>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <i
          onClick={handleClose}
          className='fa-regular fa-circle-xmark text-danger text-end p-3 fs-4'
        ></i>
        <Modal.Body>
          <DeleteConfirmation deleteItem='User' />
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

      <Table
        className='table'
        striped
        bordered
        hover
        style={{ textAlign: 'center' }}
      >
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>phoneNumber</th>
            <th>Country</th>
            <th>Role</th> 
            <th>Creation Date</th>
            <th>Modification Date</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan='3'>
                <NoData />
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user?.userName}</td>
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>
                <td>{user?.country}</td>
                <td>{user?.group?.name}</td>
                <td>{user?.creationDate}</td>
                <td>{user?.modificationDate}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant='transparent' id='dropdown-basic'>
                      <i className='fa-solid fa-ellipsis'></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleViewDetails(user)}
                      >
                        <span className='btns-icon mx-1'>
                          <i className='fa-solid fa-eye'></i>
                        </span>{' '}
                        View
                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => handleShow(user.id)}>
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
                     img={userDetails.imagePath ? `${BASE_IMAGE_URL}${userDetails.imagePath}` : ViewDetailsImg}
                     head='User'
                     title={userDetails?.userName}
                     description={
                       <>Email: <span className='title-span fw-bold'>{userDetails?.email}</span></>
                     }
                     info={
                       <>Phone Number: <span className='title-span fw-bold'>{userDetails?.phoneNumber}</span></>
                     }
                     show={showDetails}
                     setShow={setShowDetails}
                   >
                   <p>Country: <span className='title-span fw-bold'>{userDetails?.country}</span></p>
                 <p>Role: <span className='title-span fw-bold'>{userDetails?.group?.name}</span></p>
                    <p>Creation Date: <span className='title-span fw-bold'>{userDetails?.creationDate}</span></p>
                   <p>Modification Date: <span className='title-span fw-bold'>{userDetails?.modificationDate}</span></p>
                   </ViewDetailsModal>
        </tbody>
      </Table>
             <Pagination className='d-flex justify-content-end my-4'>
      <Pagination.Prev
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            getAllUsers(pageSize, currentPage - 1);
          }
        }}
        disabled={currentPage === 1}
      >Previous</Pagination.Prev>
      {arrayOfPages.map((pageNo) => (
        <Pagination.Item
          key={pageNo}
          active={pageNo === currentPage}
          onClick={() => {
            setCurrentPage(pageNo);
            getAllUsers(pageSize, pageNo);
          }}
        >
          {pageNo}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => {
          if (currentPage < arrayOfPages.length) {
            setCurrentPage(currentPage + 1);
            getAllUsers(pageSize, currentPage + 1);
          }
        }}
        disabled={currentPage === arrayOfPages.length}
      >Next</Pagination.Next>
    </Pagination>
    </div>
  )
}
