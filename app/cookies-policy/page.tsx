import { Metadata } from "next";
import Cookiepage from "./Cookiepage";
export const metadata: Metadata = {
  title: "Cookies Policy & Usage | Zoiko Broadband",
  description:
    "Read Zoiko Broadband’s Cookies Policy to understand how we use cookies to enhance your browsing experience and how you can manage or disable them."

};
export default function page(){
  return <Cookiepage/>
}