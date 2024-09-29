import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const BreadCrumb = ({ links }) => {
  return (
    <nav className="flex">
      <ol className="inline-flex items-center">
        {links?.map((link, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="text-gray-400 size-5" />}
            <Link
              to={link?.path}
              className={`inline-flex items-center text-sm ${
                index === links.length - 1
                  ? "text-gray-500 cursor-default"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {link?.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
