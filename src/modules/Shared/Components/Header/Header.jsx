
export default function Header({title,description, image}) {
  
  return ( 
  
    <div className=" header rounded-3">

   
         <div className='row align-items-center justify-content-around px-5'>
         <div className='col-md-8 text-white'>
        <h3 className="fw-bold">{title}</h3>
        <p>{description}</p>
      </div>
      <div className='col-md-4'>
     <img src={image} alt="header-img" />
      </div>
         </div>
</div>

   

  )
}
