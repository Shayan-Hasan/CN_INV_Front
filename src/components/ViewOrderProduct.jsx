import { MdOutlineCancel } from "react-icons/md";
import { GetOrderProductDetailById } from "../api/Api";
import "../styles/ViewOrderProd.css";
import { useEffect, useState, useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const ViewOrderProduct = ({ close, product_id, store_id }) => {
  const [product, setProduct] = useState("");
  const {
    activeProdMenu,
    setActiveProdMenu,
    activeProdMenuId,
    setActiveProdMenuId,
  } = useStateContext();
  const sidebarRef = useRef(null);

  const handleBackgroundClick = (e) => {
    //e.stopPropagation();
  };

  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      close();
    }
  };

  useEffect(() => {
    async function fetchData() {
      await GetOrderProductDetailById(
        activeProdMenuId.product_id,
        activeProdMenuId.store_id
      )
        .then((resp) => {
          setProduct(resp.data[0] || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();

    // document.addEventListener("mousedown", handleOutsideClick);
    // return () => {
    //   document.removeEventListener("mousedown", handleOutsideClick);
    // };
  }, [activeProdMenu, activeProdMenuId]);
  return (
    <div className=" h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeProdMenu && (
        <aside
        //className="sidebar1"
        //onClick={handleBackgroundClick}
        //ref={sidebarRef}
        >
          <div style={{ paddingTop: "20px" }}>
            <MdOutlineCancel
              style={{ cursor: "pointer" }}
              color="black"
              size={50}
              onClick={() =>
                //close()
                {
                  setActiveProdMenu(false);
                  setActiveProdMenuId({ product_id: null, store_id: null });
                }
              }
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            />
          </div>

          <div>
            <label
              style={{
                fontSize: "22px",
                width: "100%",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              More about {`${product.name}`}
            </label>

            <hr className="line" />
            <div
              className="rounded"
              style={{
                width: "92%",
                height: "256px",
                textAlign: "center",
                backgroundColor: "lightgray",
                margin: "4%",
              }}
            >
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={`product ${product.product_id}`}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  textAlign: "center",
                }}
              />
            </div>
            <hr
              className="line"
              style={{
                paddingBottom: "4px",
                // paddingTop: "20px",
              }}
            />
            <div
              style={{
                width: "100%",
                textAlign: "left",
                paddingLeft: "10%",
              }}
            >
              <span
                style={{
                  fontSize: "19px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >{`${product.code} ${product.name}`}</span>
              <br />

              <span
                style={{
                  fontSize: "13px",
                  textAlign: "left",
                }}
              >{`${product.details}`}</span>
              <br />
              <br />
              <span
                style={{
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >{`Unit: `}</span>
              <span
                style={{
                  fontSize: "18px",
                  textAlign: "left",
                  fontWeight: "lighter",
                }}
              >{`${product.unit_id}`}</span>
              <br />
              <span
                style={{
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >{`Category: `}</span>
              <span
                style={{
                  fontSize: "18px",
                  textAlign: "left",
                  fontWeight: "lighter",
                }}
              >{`${product.category_id}`}</span>
              <br />
              <span
                style={{
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >{`Brand: `}</span>
              <span
                style={{
                  fontSize: "18px",
                  textAlign: "left",
                  fontWeight: "lighter",
                }}
              >{`${product.brand_id}`}</span>
            </div>

            <hr
              className="line"
              style={{
                paddingBottom: "4px",
                // paddingTop: "20px",
              }}
            />

            <div
              style={{
                width: "100%",
                textAlign: "left",
                paddingLeft: "10%",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >{`Inventory InStock: `}</span>
              <span
                style={{
                  fontSize: "18px",
                  textAlign: "left",
                  fontWeight: "lighter",
                }}
              >{`${product.unit_instock}.00`}</span>
              <br />
              <span
                style={{
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >{`Supplier: `}</span>
              {product.vendor ? (
                <span
                  style={{
                    fontSize: "18px",
                    textAlign: "left",
                    fontWeight: "lighter",
                  }}
                >{`${product.vendor}`}</span>
              ) : (
                <span
                  style={{
                    fontSize: "18px",
                    textAlign: "left",
                    fontWeight: "lighter",
                  }}
                >{`N/A`}</span>
              )}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default ViewOrderProduct;
