import {
  Footer,
  Header,
  FooterContextConfig,
  HeaderContextConfig,
  Main,
  MenuContextData,
  MenuSegmentContext,
  StudioLayout,
  StyledMetadataPanel,
  StudioMetadataPanel
} from '@studiosymmetries/studio-design-system';
import { useStudioContext, useStudioContextUpdate } from '../contexts/StudioContext';


/**
 * Build Context Menus
 * @param contextConfig 
 * @param contextMenu 
 * @returns MenuSegmentContext
 */
function buildContextMenu(contextConfig: FooterContextConfig | HeaderContextConfig, contextMenu: MenuContextData[]): MenuSegmentContext {

  // MenuSegmentContext
  const menu = {
    social: [],
    site: []
  };

  // Build Menu Segments
  if (contextMenu && contextConfig.displayMenu) {
    // Social Links
    if (contextConfig.displaySocialLinks) {
      contextMenu.forEach((segment) => {
        console.log({ segment }, segment.segments, segment.type)
        if (contextConfig.displaySocialLinks && segment.type === "social") {
          menu['social'] = segment.segments;
        }
      });
    }
    // Site Links
    if (contextConfig.displaySiteLinks) {
      contextMenu.forEach((segment) => {
        if (contextConfig.displaySiteLinks && segment.type === "site") {
          menu['site'] = segment.segments;
        }
      });
    }
  }
  console.log("AFTER COMPILATION", { menu })
  return menu;
}



export const StudioApp = ({ children }) => {
  const studioContext = useStudioContext();
  const studioUpdateContext = useStudioContextUpdate();

  const { setDisplayMetadata } = studioUpdateContext;
  const { loading, brand, metadata, footer, header, debug } = studioContext;
  const { config : headerConfig } = header;
  const { copyright, panel, config : footerConfig } = footer;
  const { menu } = metadata;

  const footerContextMenu = buildContextMenu(footerConfig, menu);//MenuSegmentContext
  const headerContextMenu = buildContextMenu(headerConfig, menu);//MenuSegmentContext
  return (
    <StudioLayout>
      <Header headerContext={{
        brand,
        menuSegments: headerContextMenu,
        config : headerConfig,
        debug
      }}/>
      {/* <Main> */}
        {(loading ? <div>loading...</div> :children )}
      {/* </Main> */}

      {/* TODO: // Define Footer links from footer menu config and context links */}


      <StudioMetadataPanel debug={debug} context={metadata} name="Studio CONTEXT METADATA"/>
      <Footer footerContext={{
        brand,
        copyright,
        panel,
        menuSegments: footerContextMenu,
        config: footerConfig,
        debug
      }} />

<div onClick={()=> setDisplayMetadata(!debug)}>{(debug ? "HIDE-IT" : "SHOW-IT")}</div>

    </StudioLayout>
  )
}