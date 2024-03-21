import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";

export default function UploadImage() {
  const { vechileId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Button
        name={"Upload Image"}
        buttonClass={"btn btn-outline-warning btn-md"}
        buttonType={"submit"}
        onClick={() => navigate(`/vechile/imgUrl/${vechileId}`)}
      />
    </>
  );
}
