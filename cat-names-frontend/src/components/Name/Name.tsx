import "./name.css";

export default function Name(props:Props) {
  return (
    <ol>
      {props.names.map((catName, i) => <li key={i}>{catName.name} {catName.surname && catName.surname}</li>)}
    </ol>
  );
}

interface CatName {
  name:string;
  surname?:string;
  sex: "Male" | "Female";
}

interface Props {
  names: CatName[];
}
