"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  return <div>Success Page - Site ID: {params.id}</div>;
}
