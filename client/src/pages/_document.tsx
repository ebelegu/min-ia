import "node-fetch";

import {
  Components,
  fetchDecoratorReact,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import getConfig from "next/config";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import React from "react";

const { serverRuntimeConfig } = getConfig();

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (
  initialProps: DocumentInitialProps,
  name: string
) => {
  return initialProps.head?.find((element) => element?.props?.name === name)
    ?.props?.content;
};

interface Props {
  Decorator: Components;
  language: string;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & Props> {
    const initialProps = await Document.getInitialProps(ctx);
    const breadcrumbs = [
      {
        title: "Forebygge fravær",
        url: `${process.env.DECORATOR_BREADCRUMB_THIS_PAGE_URL}`,
      },
    ];
    const Decorator = await fetchDecoratorReact({
      dekoratorenUrl: serverRuntimeConfig.decoratorUrl,
      env: serverRuntimeConfig.decoratorEnv,
      simple: false,
      chatbot: false,
      feedback: false,
      urlLookupTable: false,
      breadcrumbs: breadcrumbs,
    });

    const language = getDocumentParameter(initialProps, "lang");

    return { ...initialProps, Decorator, language };
  }

  render(): JSX.Element {
    const { Decorator, language } = this.props;
    const showDecorator = serverRuntimeConfig.noDecorator != "true";
    return (
      <Html lang={language || "no"}>
        <Head>{showDecorator && <Decorator.Styles />}</Head>
        <body>
          {showDecorator && <Decorator.Header />}
          <Main />
          {showDecorator && (
            <>
              <Decorator.Footer />
              <Decorator.Scripts />
            </>
          )}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;