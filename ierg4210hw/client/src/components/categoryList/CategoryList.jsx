import { useEffect, useState } from "react";
import "./CategoryList.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../../features/category/categorySlice";


const CategoryList = () => {
  const [allCatagories, setAllCatagories] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/catagory/get_catagories").then((res) => {
      setAllCatagories(res.data);
      dispatch(setCategory(res.data));
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
