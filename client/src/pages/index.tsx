import Head from "next/head";
import { getPageProps, PageProps } from "../pageProps";
import { Layout } from "../komponenter/Layout/Layout";
import { Forside } from "../Forside/Forside";
import * as Sentry from '@sentry/browser';

const Home = (props: { page: PageProps }) => {
    Sentry.init({
        dsn: 'https://fd232b69e0994f30872d69130d694491@sentry.gc.nav.no/122',
        environment: process.env.NODE_ENV,
        enabled: process.env.NODE_ENV === 'production',
    });

    return (
    <div>
      <Head>
        <title>{props.page.appTitle}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <Layout
          title={props.page ? props.page.title : "kunne ikke hente tittel"}
          isFrontPage={true}
          decoratorParts={props.page.decorator}
        >
          <Forside />
        </Layout>
      </main>
      <footer />
    </div>
  );
};

interface StaticProps {
  props: {
    page: PageProps;
  };
  revalidate: number;
}

// NextJS kaller denne
export const getStaticProps = async (): Promise<StaticProps> => {
  const page = await getPageProps(
    "Forebygge sykefravær",
    "SLUG: Du får hjelp til å forebygge sykefravær"
  );

  return {
    props: { page },
    revalidate: 60,
  };
};

export default Home;
