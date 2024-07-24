import { redirect } from "next/navigation";

const Homepage = () => {
  redirect("/home/users");
};

export default Homepage;
