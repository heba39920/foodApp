import Table from 'react-bootstrap/Table';
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/images/Group 48102127.png';
export default function RecipesList() {
  return (
    <div className='container-fluid'>
      <Header title={'Recipes Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} image={headerImg} />
      <div className='d-flex align-items-center justify-content-between py-4'>
        <div>
          <h6>Recipe Table Details</h6>
          <p>You can check all details</p>
        </div>
        <button className='btn submit-btn'>Add New Item</button>
      </div>



      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>

    </div>
  )
}
