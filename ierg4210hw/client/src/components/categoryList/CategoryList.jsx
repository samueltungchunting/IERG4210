import { useEffect, useState } from "react";
import "./CategoryList.css";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [allCatagories, setAllCatagories] = useState([]);

  useEffect(() => {
    axios.get("/catagory/get_catagories").then((res) => {
      setAllCatagories(res.data);
    });
  }, []);

  return (
    <>
      <ul className="category_list">
        <h2>All Categories</h2>
        {allCatagories && allCatagories.map((catagory) => {
          return (
            <li key={catagory.cid}>
              {/* maybe try a tag */}
              <Link to={`/?cid=${catagory.cid}`} key={catagory.cid}>
                {catagory.name}
              </Link>
            </li>
          );
          })}
      </ul>
    </>
  );
};

export default CategoryList;
