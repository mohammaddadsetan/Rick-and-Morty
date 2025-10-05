import { Url } from "next/dist/shared/lib/router/router";

interface paramsProps {
  params: Url;
}

const page = ({ params }: paramsProps) => {
  return <div></div>;
};

export default page;
