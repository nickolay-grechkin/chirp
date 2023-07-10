import Head from "next/head";
import { type NextPage } from "next";

const PostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post page</title>
      </Head>
      <main className="flex justify-center h-screen">
        <div>Post page</div>
      </main>
    </>
  );
}

export default PostPage;