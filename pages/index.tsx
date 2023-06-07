import Head from 'next/head'
import {
  Container,
  Main,
  Title,
  Description,
  CodeTag,
} from '../components/sharedstyles'
import Cards from '../components/cards'
import { Button, FlexCenter, Pod, StudioMetadataPanel } from '@studiosymmetries/studio-design-system'
import { StudioWidget } from '@studiosymmetries/studio-design-system'
import styled, { useTheme } from 'styled-components'
import { useStudioContext } from '../contexts/StudioContext'
import Link from 'next/link'

export default function Home() {

  const theme = useTheme();
  const context = useStudioContext();
  const { site } = context;
  const pageContext = site.pages.find(page => page.name.toLowerCase() === 'landing');

  const { ads } = site;

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        {/* <Title>
          Welcome to the <a href="https://studiosymmetries.com">Studio Starter!</a>
        </Title>
        <Description>
          Studio Design is a design system for Studio Symmetries
        </Description> */}

        <FlexCenter>
          {/* {JSON.stringify(pageContext.cover)} */}
          <Pod
            image={pageContext.cover.formats.small.url}
            title={pageContext.title.split('')[0].toUpperCase() + pageContext.title.slice(1)}
            description={pageContext.description}
            cta={pageContext.cta} />
        </FlexCenter>
        <StudioMetadataPanel id={"STUDIO"} debug={false} name="Studio Metadata" context={context} />



        <ul>
          {ads.map((ad) => {
            return (<li><Link href={`/ad/${ad.slug}`}>{JSON.stringify(Object.keys(ad))}</Link></li>);
          })}
        </ul>

        {/* 
        <Cards /> */}
      </Main>
    </Container>
  )
}
