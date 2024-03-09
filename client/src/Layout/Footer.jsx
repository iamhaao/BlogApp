import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { SiAboutdotme } from "react-icons/si";

function FooterComponent() {
  return (
    <Footer container className="">
      <div className="w-full mx-auto">
        <div className="grid w-full sm:flex md:grid-cols-1 gap-8">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-bold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Iamhaao
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-4 sm:gap-6">
            <div className="col-span-2">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <p className="-ml-" target="_blank" href="#">
                  <div className="flex flex-col text-sm">
                    Iamhaao Blog App is not just another blogging platform; it's
                    a hub of creativity where writers and content creators
                    converge to share their unique perspectives and insights.
                    With a sleek and intuitive interface, the app provides a
                    seamless browsing experience, allowing you to explore a vast
                    array of articles, stories, and visual content effortlessly.
                  </div>
                </p>
                <Footer.Link
                  target="_blank"
                  href="https://www.linkedin.com/in/sw-lehao/"
                >
                  <div className="flex items-center gap-2">
                    <MdOutlineMailOutline /> Email:sw.lehao@gmail.com
                  </div>
                </Footer.Link>
                <Footer.Link target="_blank" href="https://github.com/iamhaao">
                  <div className="flex items-center gap-2">
                    <FaSquarePhone /> Phone:+84 899202235
                  </div>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  target="_blank"
                  href="https://www.linkedin.com/in/sw-lehao/"
                >
                  <div className="flex items-center gap-2">
                    <FaLinkedin /> LinkedIn
                  </div>
                </Footer.Link>
                <Footer.Link target="_blank" href="https://github.com/iamhaao">
                  <div className="flex items-center gap-2">
                    <FaGithub /> GitHub
                  </div>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link target="_blank" href="#">
                  Term & Conditions
                </Footer.Link>
                <Footer.Link target="_blank" href="#">
                  Private Policy
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div>
          <Footer.Copyright
            href="#"
            by="Iamhaao Blog "
            year={2024}
          ></Footer.Copyright>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComponent;
