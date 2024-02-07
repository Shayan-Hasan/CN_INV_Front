import { MdOutlineCancel } from "react-icons/md";
import { GetOrderProductDetailById } from "../api/Api";
import "../styles/ViewOrderProd.css";
import { useEffect, useState } from "react";

const ViewOrderProduct = ({ close, product_id, store_id }) => {
  const [product, setProduct] = useState("");

  const handleBackgroundClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    async function fetchData() {
      await GetOrderProductDetailById(product_id, store_id)
        .then((resp) => {
          setProduct(resp.data[0] || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);
  return (
    <aside className="sidebar1" onClick={handleBackgroundClick}>
      <div style={{ paddingTop: "20px" }}>
        <MdOutlineCancel
          style={{ cursor: "pointer" }}
          color="black"
          size={50}
          onClick={() => close()}
          className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
        />
      </div>

      <div>
        <label
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          More about {`${product.name}`}
        </label>

        <hr
          className="line"
          style={{
            paddingBottom: "20px",
            paddingTop: "20px",
          }}
        />
        <div
          className="rounded-full"
          style={{
            paddingLeft: "160px",
          }}
        >
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={`product ${product.product_id}`}
            style={{
              maxWidth: "60%",
              maxHeight: "60%",
              objectFit: "contain",
            }}
          />
        </div>
        <hr
          className="line"
          style={{
            paddingBottom: "20px",
            // paddingTop: "20px",
          }}
        />
        <div
          style={{
            textAlign: "left",
            paddingLeft: "10px",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >{`     ${product.code} ${product.name}`}</span>
          <br />

          <span
            style={{
              fontSize: "18px",
              textAlign: "left",
            }}
          >{`     ${product.details}`}</span>
          <br />
          <span
            style={{
              fontSize: "18px",
              textAlign: "left",
            }}
          >{`     Unit: `}</span>
          <span
            style={{
              fontSize: "22px",
              textAlign: "left",
              fontWeight: "lighter",
            }}
          >{`     ${product.unit_id}`}</span>
          <br />
          <span
            style={{
              fontSize: "18px",
              textAlign: "left",
            }}
          >{`     Category: `}</span>
          <span
            style={{
              fontSize: "22px",
              textAlign: "left",
              fontWeight: "lighter",
            }}
          >{`     ${product.category_id}`}</span>
          <br />
          <span
            style={{
              fontSize: "18px",
              textAlign: "left",
            }}
          >{`     Brand: `}</span>
          <span
            style={{
              fontSize: "22px",
              textAlign: "left",
              fontWeight: "lighter",
            }}
          >{`     ${product.brand_id}`}</span>
        </div>

        <hr
          className="line"
          style={{
            paddingBottom: "20px",
            // paddingTop: "20px",
          }}
        />

        <div
          style={{
            textAlign: "left",
            paddingLeft: "10px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              textAlign: "left",
            }}
          >{`     Inventory InStock: `}</span>
          <span
            style={{
              fontSize: "22px",
              textAlign: "left",
              fontWeight: "lighter",
            }}
          >{`     ${product.unit_instock}.00`}</span>
          <br />
          <span
            style={{
              fontSize: "18px",
              textAlign: "left",
            }}
          >{`     Supplier: `}</span>
          <span
            style={{
              fontSize: "22px",
              textAlign: "left",
              fontWeight: "lighter",
            }}
          >{`     ${product.vendor}`}</span>
        </div>
      </div>
    </aside>
  );
};

export default ViewOrderProduct;
