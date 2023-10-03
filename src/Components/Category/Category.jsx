import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

const Category = () => {
  // const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/category`);

      let categoryList = data.data.map((cat) => {
        return [cat.name, cat.children.map((item) => item.name)];
      });

      setCategories(categoryList);
      console.log(data);
    }
    getData();
  }, []);
  console.log(categories);
  return (
    <>
      <h2 className="text-center my-4">Our Products</h2>

      <div className=" d-flex justify-content-center flex-wrap gap-2">
        {categories.map((cat) => {
          console.log(cat);
          return (
            <Dropdown key={cat[0]}>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                {cat[0]}
              </Dropdown.Toggle>
              {cat[1].length !== 0 && (
                <Dropdown.Menu>
                  {cat[1].map((item) => {
                    return <Dropdown.Item key={item}>{item}</Dropdown.Item>;
                  })}
                </Dropdown.Menu>
              )}
            </Dropdown>
          );
        })}
      </div>
    </>
  );
};

export default Category;
