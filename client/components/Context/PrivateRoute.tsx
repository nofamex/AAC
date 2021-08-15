/* eslint-disable react-hooks/exhaustive-deps */
import { isAuthenticated } from "@lib/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PrivateRoute({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/");
    }
  }, []);

  if (isAuthenticated()) {
    return children;
  }

  return <></>;
}
