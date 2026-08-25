import { UseDataContext } from "../../context/UseDataContext";

export const Gallery = () => {
  const { Galleries } = UseDataContext();

  return (
    <section>
      <div className="container-fluid">
        <div className="container">
          <div className="text-center mb-5">
            <h1 style={{color:'var(--burnished-gold)'}}>Our Gallery</h1>
            <p>
              Explore Mags Residences and discover the comfort,
              elegance, and experience we offer.
            </p>
          </div>

          {Galleries && Galleries.length > 0 ? (
            <div className="row g-4">
              {Galleries.map((gallery) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  key={gallery._id}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "280px",
                      overflow: "hidden",
                      borderRadius: "12px",
                    }}
                  >
                    <img
                      src={gallery.image_url}
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
          ) : (
            <div className="text-center">
              <p style={{ color: "gray" }}>
                Gallery images will be available here soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
