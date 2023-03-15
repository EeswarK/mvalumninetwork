import { Layout } from "@/components/ui/Layout";
import { useState } from "react";

function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  return (
    <Layout className="flex h-screen w-screen items-center justify-center">
      <div className="w-full max-w-sm md:max-w-md">
        <div className="card overflow-hidden rounded-lg shadow-lg">
          <div className="big-box absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center px-5 py-8 opacity-0">
            <div className="contact flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/shivankdhamija/?hl=en"
                className="footicon"
              >
                <span>
                  <i className="fab fa-instagram"></i>
                </span>
              </a>
              <a href="mailto: shivankdhamija@gmail.com" className="footicon">
                <span>
                  <i className="fas fa-envelope"></i>
                </span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCNPdNHtimZ_xhd5z_WdoORA"
                className="footicon"
              >
                <span>
                  <i className="fab fa-linkedin-in"></i>
                </span>
              </a>
            </div>
          </div>
          <div
            className={`profile ${
              isExpanded ? "profile--expanded" : "profile--unexpanded"
            } relative`}
            onClick={handleClick}
          >
            <div className="profile__banner bg-gradient-to-r from-purple-600 to-purple-800"></div>
            <div className="p-6">
              <div className="profile__pic">
                {/* <Image
                  className={`x ${isExpanded ? "zoom" : "unzoom"}`}
                  src="chess.jpg"
                  alt="profile-pic"
                /> */}
              </div>
              <div
                className={`aboutMe text-gray-600 ${
                  isExpanded ? "bioy" : "bion"
                }`}
              >
                <p>
                  hi im bloo and i do blah rahadhn awdjb adjb awdka dbnawkjdj
                  kwjkw jkwjk adjadajwn blah bl asdja dasld alskd asd aakjs
                  dnakdjn asksjdn asks jdn askjdn ask djnaskj dnad kjdnasj kndak
                  jd na s sda kdsj aa j dsna kjdn asks djnakd jsan ah
                </p>
              </div>
              <div className="profile__info">
                <span
                  className={`profile__info-display text-2xl font-bold ${
                    isExpanded ? "namey" : "namen"
                  }`}
                >
                  Shivakn Dhamija
                </span>
                <span
                  className={`profile__info-username text-gray-600 ${
                    isExpanded ? "instay" : "instan"
                  }`}
                >
                  @sdhamiaj
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

// const UserCard = ({ user }) => {

//   const [isExpanded, setIsExpanded] = useState(false);

//   function handleClick() {
//     setIsExpanded(!isExpanded);
//   }

//   return <div>user cards</div>;
// };
