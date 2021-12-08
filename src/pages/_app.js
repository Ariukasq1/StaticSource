import React from "react";
import "../public/styles/style.min.css";
import "../public/styles/fontawesome/css/all.min.css";
import Router from "next/router";
import NProgress from "nprogress";
import Layout from "../components/layouts/Layout";
import { Config, fetcher } from "../config";
import WPAPI from "wpapi";

const wp = new WPAPI({ endpoint: Config.apiUrl });

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, botMenu, topMenu, contact }) {
  return (
    <Layout botMenu={botMenu} topMenu={topMenu} contact={contact[0]}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async () => {
  const botMenu = await fetcher(`${Config.menuUrl}/nav-menu`);
  const topMenu = await fetcher(`${Config.menuUrl}/nav-menu-top`);
  const contact = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=235`
  );
  return {
    botMenu,
    topMenu,
    contact,
  };
};

export default MyApp;
