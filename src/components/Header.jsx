import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {
  BriefcaseBusiness,
  Heart,
  HeartIcon,
  PenBox,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

function Header() {
  const [showSignIN, setshowSignIN] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setshowSignIN(true);
    }
  }, [search]);
  const handelOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setshowSignIN(false);
      setSearch({});
    }
  };
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logosos.png" alt="" className="h-14" />
        </Link>
        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setshowSignIN(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox className="mr-2" size={20} />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIN && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={handelOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
}

export default Header;
