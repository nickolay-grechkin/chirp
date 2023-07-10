import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";
import { api } from "~/utils/api";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";

const ProfilePage: NextPage = () => {
  const { data, isLoading } = api.profile.getUserByUserName.useQuery({
    username: "nickolay-grechkin"
  });

  if (isLoading) return <div>Loading...</div>

  if (!data) {
    return <>404</>
  }

  return (
    <>
      <Head>
        <title>Profile page</title>
      </Head>
      <main className="flex justify-center h-screen">
        <div>{data.username}</div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, currentUserId: "" },
    transformer: superjson
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug")

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUserName.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
}

export default ProfilePage;