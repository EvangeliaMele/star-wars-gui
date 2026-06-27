import Head from "next/head";

type HeadProps = {
  title: string;
};

const PageTitle = ({ title }: HeadProps) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default PageTitle;
