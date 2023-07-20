import { FormEvent, useEffect, useState } from "react";
import "./form.css";
import Name from "../Name/Name";

export default function Form() {

  const tempArr:CatName[] = [];
  const [catName, setCatName] = useState({
    name: "",
    surname: "",
    sex: ""
  });
  const [names, setNames] = useState(tempArr);
  useEffect(() => {
    async function getNames() {
      const response = await fetch("http://localhost:3000/getallnames");
      const fetchedNames: CatName[] = await response.json();
      setNames(fetchedNames);
    }
    getNames();
  }, []);


  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setCatName((prevCatName) => {
      return {
        ...prevCatName,
        [name]: value
      }
    });
  }

const submitForm = async (e:FormEvent) => {
    e.preventDefault();
    console.log(catName);
    const response = await fetch("http://localhost:3000/createname", {
      method: "POST",
      body: JSON.stringify({...catName}),
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const responseArr:CatName[] = await response.json();
    if(response.status === 200) {
    setCatName({
      name: "",
      surname: "",
      sex: ""
    });
    setNames(responseArr);
    }
  }

  return (
    <>
    <section className="form-sec">
      <form className="name-form" onSubmit={submitForm}>
        <section className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" onChange={handleChange} value={catName.name} name="name" id="name" />
        </section>
        <section className="form-control">
          <label htmlFor="surname">Surname</label>
          <input type="text" onChange={handleChange} value={catName.surname} name="surname" id="surname" />
        </section>
        <section className="form-radio">
          <h3 className="sex-title">Sex</h3>
          <label htmlFor="sex-1">Male</label>
          <input type="radio" onChange={handleChange} value="Male" name="sex" checked={catName.sex === "Male"} id="sex-1" />
          <label htmlFor="sex-2">Female</label>
          <input type="radio" onChange={handleChange} value="Female" name="sex" checked={catName.sex === "Female"} id="sex-2" />
        </section>
        <button className="create-btn" type="submit">Create</button>
      </form>
    </section>
     <Name names={names} />
    </>
  );
}

interface CatName {
  name:string;
  surname?:string;
  sex: "Male" | "Female";
}
