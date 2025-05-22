
export default function Header({title,description, image}) {
  
  return ( 
  
    <div className=" header rounded-3">

   
         <div className='d-flex align-items-center justify-content-between px-5'>
         <div className='text-white'>
        <h3 className="fw-bold">{title}</h3>
        <p>{description}</p>
      </div>
      <div className=''>
     <img  src={image} alt="header-img" />
      </div>
         </div>
</div>

   

  )
}
