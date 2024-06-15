import Navbar from "@/components/navbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>

        <script src="/path/to/flowbite/dist/datepicker.js"></script>
      </Head>
      <body>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
