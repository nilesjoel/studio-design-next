import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next';
import { useRouter } from 'next/router';
import { Container } from '../components/sharedstyles';
import styled from 'styled-components';
import { Button, FlexCenter, Pod } from '@studiosymmetries/studio-design-system';

type Context = {
  siteBrandName: string;
  pages?: Array<any>;
};

export const getStaticPaths: GetStaticPaths = async () => {

  const token = { site: process.env.STUDIO_SITE };

  const response = await fetch(`${process.env.STUDIO_API_URL}/studio-website/context`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });
  const data = await response.json();

  const paths = data.pages.map((page) => {
    return {
      params: {
        sitePage: page.name.toLowerCase(),
      },
    };
  }
  );

  return {
    // paths: [
    //   {
    //     params: {
    //       sitePage: 'history',
    //     },
    //   },
    //   {
    //     params: {
    //       sitePage: 'ingredients',
    //     },
    //   },
    //   {
    //     params: {
    //       sitePage: 'taste',
    //     },
    //   }
    // ],
    paths,
    fallback: false, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps<{
  context: Context;
}> = async () => {

  try {
    const token = { site: process.env.STUDIO_SITE };

    const response = await fetch(`${process.env.STUDIO_API_URL}/studio-website/context`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    const data = await response.json();

    return {
      props: {
        context: {
          siteBrandName: data.siteBrandName,
          pages: data.pages
        },
      },
    };

  } catch (error) {
    console.log("ERROR", error)
  }


};






export default function Page({
  context,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const router = useRouter();
  const pageContext = context.pages.find(page => page.name.toLowerCase() === router.query['sitePage']);

  return (
    <FlexCenter>
      {/* {JSON.stringify(pageContext.cover)} */}
      <Pod 
      image={pageContext.cover.formats.small.url}
      title={pageContext.title.split('')[0].toUpperCase() + pageContext.title.slice(1)} 
      description={pageContext.description} 
      cta={pageContext.cta}/>
    </FlexCenter>
  );
}
