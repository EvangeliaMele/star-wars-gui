import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  // Root route redirects to dashboard page
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return null;
};

export default Home;
