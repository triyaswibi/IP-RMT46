import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function AddVechile() {
  const navigate = useNavigate();
  
  return (
    <>
      <Button
        name={"Add Vechile"}
        buttonClass={"btn btn-outline-primary btn-md"}
        buttonType={"submit"}
        onClick={() => navigate(`/vechile/create`)}
      />
    </>
  );
}
