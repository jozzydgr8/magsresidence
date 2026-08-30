
import { singleAmenities } from "../../../data"
 type ApartmentImage = {
  url: string;
  public_id: string;
};
type displayProp={
     images: ApartmentImage[];
}
export const ApartmentDisplay = ({images}:displayProp)=>{
    return(
        <section>
            <div className="container-fluid">
                


                <div className="row g-2">
                {images.map((image, index) => {
                    let columnClass;

                    if (index === 0) {
                    columnClass = "col-12 col-md-6";
                    } else if (index === 1 || index === 2) {
                    columnClass = "col-6 col-md-3";
                    } else {
                    columnClass = "col-6 col-md-6";
                    }

                    return (
                    <div className={columnClass} key={image.public_id}>
                        <img
                        src={image.url}
                        alt=""
                        className="img-fluid w-100 mb-3"
                        style={{height:'400px',objectFit: "cover",borderRadius:'10px'}}
                        />
                    </div>
                );
                    })}
                </div>
           
            </div>
        </section>
    )
}