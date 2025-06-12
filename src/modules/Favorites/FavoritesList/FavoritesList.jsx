
import Table from 'react-bootstrap/Table';
import headerImg from '../../../assets/images/Group 48102127.png';
import { useEffect, useState } from 'react';
import { axiosInstance, BASE_IMAGE_URL, USER_RECIPE_URLS } from '../../../Constants/CONTENT-END-POINTS';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ViewDetailsModal from '../../Shared/Components/ViewDetailsModal/ViewDetailsModal';
import ViewDetailsImg from '../../../assets/images/Group 48102098.png'
import NoData from '../../Shared/Components/NoData/NoData';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Header from '../../Shared/Components/Header/Header';
import DeleteConfirmation from '../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
export default function FavoritesList() {
  const [isGridView, setIsGridView] = useState(true);
  const toggleView = () => {
    setIsGridView(true);
  };
  const toggleViewList = () => {
    setIsGridView(false);
  };
      const [isLoading, setIsLoading] = useState(true);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [favoriteRecipeDetails, setFavoriteRecipeDetails] = useState({});
    const [showDetails, setShowDetails] = useState(false);
      const [favoriteRecipeId, setFavoriteRecipeId] = useState(null);
    const handleShowDetails = () => setShowDetails(true);
      // delete modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
      setShow(true);
      setFavoriteRecipeId(id);
    };
      // get all user Recipes
        const getAllUserRecipes = async () => {
          try {
            setIsLoading(true);
            const response = await axiosInstance.get(USER_RECIPE_URLS.getAllUserRecipes); 
        
            // console.log(response.data.data);
            
      setFavoriteRecipes(response.data.data);
          } catch (error) {
            console.log(error.response?.data?.message || error.message);
          } finally {
            setIsLoading(false);
          }
        }; 
  // get Recipe by id
    const getFavoriteRecipeById =  (favoriteRecipeId) => {
       const recipe = favoriteRecipes.find((fav) => fav.id === favoriteRecipeId);
  if (recipe) {
    setFavoriteRecipeDetails(recipe);
    setShowDetails(true);
  } else {
    toast.error("Recipe not found", {
      position: 'top-center'
    });
  }
        
    };
     useEffect(() => {
  getAllUserRecipes();
  }, []);

        const handleViewDetails = (favRecipe) => {
        getFavoriteRecipeById(favRecipe.id);
        handleShowDetails();
      };
     const handleDelete = async () => {
          try {
            setIsLoading(true);
            await axiosInstance.delete(USER_RECIPE_URLS.deleteUserRecipe(favoriteRecipeId));
           
            toast.success("Recipe deleted successfully", {
              position: 'top-center'
            });
            handleClose();
            getAllUserRecipes();
          } catch (error) {
            console.log(error);
            toast.error("Failed to delete Recipe", {
              position: 'top-center'
            });
          } finally {
            setIsLoading(false);
          }
        };
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
         <Header title={'Favorite Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} image={headerImg} />
         <div className='d-flex align-items-center justify-content-between py-4'>
           <div>
             <h6>Recipe Table Details</h6>
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
             <DeleteConfirmation deleteItem='favorite Recipe' />
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
     <div className='d-flex align-items-center justify-content-end  mb-4'>    
     <i class="fa-solid fa-grip mx-3 view" onClick={toggleView}></i>
         <i class="fa-solid fa-list-ul view" onClick={toggleViewList}></i>

     </div>
{favoriteRecipes.length === 0 ? (
  <NoData />
) : (
  isGridView ? (
    <div className='row justify-content-center align-items-center'>
      {favoriteRecipes.map((favRecipe) => (
        <div className='col-md-3' key={favRecipe.id}>
          <div className='favRecipe text-center position-relative'>
            <i onClick={() => handleViewDetails(favRecipe)} className='fa-solid fa-eye btns-icon position-absolute top-0 start-0 bg-light p-1 rounded-2 m-2'></i>
            <i onClick={() => handleShow(favRecipe.id)} className='fa-solid fa-heart btns-icon position-absolute top-0 end-0 bg-light p-1 rounded-2 m-2'></i>
            <img className='rounded-2' src={`${BASE_IMAGE_URL}${favRecipe?.recipe?.imagePath || ViewDetailsImg}`} alt="" />
            <h5>{favRecipe?.recipe?.name}</h5>
            <h6>{favRecipe?.recipe?.price} $</h6>
            <p className='pb-3'>{favRecipe?.recipe?.description}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
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
          <th>Image</th>
          <th>Price</th>
          <th>Description</th>
          <th>Tag</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {favoriteRecipes.length === 0 ? (
          <tr>
            <td colSpan='7'>
              <NoData />
            </td>
          </tr>
        ) : (
          favoriteRecipes.map((favRecipe) => (
            <tr key={favRecipe?.id}>
              <td>{favRecipe?.recipe?.name}</td>
              <td><img className='recipeImage' src={`${BASE_IMAGE_URL}${favRecipe?.recipe?.imagePath}`} alt="favorite recipe image" /></td>
              <td>{favRecipe?.recipe?.price} $</td>
              <td>{favRecipe?.recipe?.description}</td>
              <td>{favRecipe?.recipe?.tag?.name}</td>
              <td>{favRecipe?.recipe?.category?.[0]?.name}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant='transparent' id='dropdown-basic'>
                    <i className='fa-solid fa-ellipsis'></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleViewDetails(favRecipe)}
                    >
                      <span className='btns-icon mx-1'>
                        <i className='fa-solid fa-eye'></i>
                      </span>{' '}
                      View
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShow(favRecipe.id)}>
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
      </tbody>
    </Table>
  )
)}
          <ViewDetailsModal
               img={`${BASE_IMAGE_URL}${favoriteRecipeDetails?.recipe?.imagePath || ViewDetailsImg}`}
               head='Recipe'
               title={favoriteRecipeDetails?.recipe?.name}
               description={
                 <>Recipe Description: <span className='title-span fw-bold'>{favoriteRecipeDetails?.recipe?.description}</span></>
               }
               info={
                 <>Recipe Price: <span className='title-span fw-bold'>{favoriteRecipeDetails?.recipe?.price} $</span></>
               }
               show={showDetails}
               setShow={setShowDetails}
             >
             <p>Recipe Tag: <span className='title-span fw-bold'>{favoriteRecipeDetails?.recipe?.tag?.name}</span></p>
           <p>Recipe Category: <span className='title-span fw-bold'>{favoriteRecipeDetails?.recipe?.category?.[0]?.name}</span></p>
              <p>Creation Date: <span className='title-span fw-bold'>{favoriteRecipeDetails?.recipe?.creationDate}</span></p>
             <p>Modification Date: <span className='title-span fw-bold'>{favoriteRecipeDetails?.recipe?.modificationDate}</span></p>
             </ViewDetailsModal>
       </div>
  )
}
