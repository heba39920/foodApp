import modalImg from '../../../../assets/images/Group 48102290.png';


export default function NoData() {
  return (
    <div className='row flex-column align-items-center justify-content-center text-center'>
   <div className='col-md-4'>
    <img src={modalImg} alt="no data image" />
     
   </div> 
   <h3 className='mt-3'>No Data!</h3>
      <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}
