import { UseDataContext } from "../../context/UseDataContext";
import { useParams } from "react-router-dom";

export const Amenity = () => {
  const {id} = useParams();
  const { Amenities } = UseDataContext();

  const currentAmenity = Amenities?.find((Amenity)=> Amenity._id === id);
    if(!currentAmenity){
        return(
            <section style={{padding:'2rem', textAlign:'center'}}>
                <h2 className="sub-heading">Amenity not found</h2>
            </section>
        )
    }

  return (
    <section>
      <div className="container-fluid">
        <div className="container">
          <div className="text-center mb-5">
            <h1 style={{color:'var(--burnished-gold)'}}>{currentAmenity.title}</h1>
            <p>
              {currentAmenity.description}
            </p>
          </div>


            <div className="row g-4 justify-content-center">
              {currentAmenity.images.map((picture, index) => (
                <div
                  className="col-12 col-sm-6 col-md-4"
                  key={index}
                >
                    
                  <div
                    style={{
                      width: "100%",
                      height: "480px",
                      overflow: "hidden",
                      borderRadius: "12px",
                    }}
                  >
                    <img
                      src={picture.url}
                      alt="Mags Residences"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
         
        </div>
      </div>
    </section>
  );
};
