import { useRouter } from 'next/router';

import { useStudioContext } from '../../contexts/StudioContext';
import styled from 'styled-components';
import { FlexCenter, Pod } from '@studiosymmetries/studio-design-system';
import Link from 'next/link';


const AdContainer = styled.div`
  // background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  margin:1rem;
  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
`;

interface AdProps {
  title: string;
  description: string;
  cta: string;
  image: string;
}

const StudioAd: React.FC<AdProps> = ({ title, description, cta, image }) => {
  return (
    <AdContainer>
      <h2>{title}</h2>
      <p>{description}</p>
      <button>{cta}</button>
    </AdContainer>
  );
};


export default function Ad() {

  const { site } = useStudioContext();
  const router = useRouter()
  const { slug, comment } = router.query
  const adData = site.ads.find(ad => ad.slug === slug);
  const { title, description, cta, cover } = adData;

  const { ads } = site;


  return (<>
    <FlexCenter>

      <Pod
        image={cover.formats.small.url}
        title={title}
        description={description}
        cta={cta} />

    </FlexCenter>
    <FlexCenter>
      <ul>
      {ads.map((ad) => {
        return (<li><Link href={`/ad/${ad.slug}`}>{ad.title}</Link></li>);
      })}
    </ul>

    </FlexCenter>
  </>
  );
}
