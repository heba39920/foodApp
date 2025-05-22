import modalImg from '../../../../assets/images/Group 48102290.png';

export default function DeleteConfirmation({deleteItem}) {

  return (
    <div className='text-center p-3'>
   <img className='w-50' src={modalImg} alt="modal img" />
        <h5 className='mt-3'>Delete This {deleteItem} ?</h5>
        <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}
