import React, { useContext, useState, useEffect } from "react";
import chalk from 'chalk';


const fetchError = chalk.hex('#308fd3');
const studioLog = ({ message, context }) => {
    return (console.log(fetchError("studioLog --- START")), console.log(context, message), console.log(fetchError("studioLog --- END")))
}


import { MenuContextData, MenuSegmentContext, StudioFooterContext, StudioHeaderContext, StudioSiteContext } from '@studiosymmetries/studio-design-system';

interface SiteMetadata {
    menu?: Array<MenuContextData>,
    ads?: any,
    pages?: any,
}

interface StudioContextData {
    loading?: boolean,
    brand?,
    site?: StudioSiteContext,
    header?: StudioHeaderContext,
    menu?: Array<MenuContextData>,
    footer?: StudioFooterContext,
    metadata?: SiteMetadata,
    debug?: boolean
};

interface StudioUpdateContextData {
    toggleTheme: () => void;
    setDisplayMetadata: (displayMetadata: boolean) => void;
};

const StudioContext = React.createContext<StudioContextData | undefined>(undefined);
const StudioUpdateContext = React.createContext<StudioUpdateContextData | undefined>(undefined);


export function useStudioContext() {
    const context = useContext(StudioContext);
    if (!context) {
        throw new Error("useStudioContext must be used within a StudioContextProvider");
    }
    return context;
}
export function useStudioContextUpdate() {
    const context = useContext(StudioUpdateContext);
    if (!context) {
        throw new Error("useStudioContextUpdate must be used within a StudioContextProvider");
    }
    return context;
}

type StudioContextProviderProps = {
    children: React.ReactNode;
    state: StudioContextData;
};

export function StudioContextProvider({ children, state }: StudioContextProviderProps) {

    // Display Settings
    const [darkTheme, setDarkTheme] = useState(true);
    const [displayMetadata, setDisplayMetadata] = useState(false);
    const [loading, setLoading] = useState(true);

    // Site Settings
    const [siteBrandName, setSiteBrandName] = useState<string>("");
    const [siteMetadata, setSiteMetadata] = useState<SiteMetadata>({});

    // Site Contexts
    const [siteContext, setSiteContext] = useState<StudioSiteContext>({});
    const [headerContext, setHeaderContext] = useState<StudioHeaderContext>({ menuSegments: { site: [], social: [] } });
    const [footerContext, setFooterContext] = useState({});

    /**  Copyright Copy */
    const footerCopyright = `${siteBrandName} © ${new Date().getFullYear()}`;

    /**
     * FOOTER CONFIG
     */
    const displayMenu = true;
    const displaySocialLinks = true;
    const displaySiteLinks = true;
    const displaySubscription = true;

    /**
     * PANEL CONFIG
     */
    const subscriptionPanel = {
        display: true,
        subHeading: `Follow your breath. Enter your email to track your progress, and to receive optional reminders.`,
        subText: `You can stop at any time.`,
    };



    function toggleTheme() {
        setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    }

    const contextData: StudioContextData & { darkTheme: boolean } = { ...state, darkTheme };

    // fetch a context from Studio Symmetries API
    useEffect(() => {
        const fetchWebContext = () => {
            fetch(`/api/website/context`)
                .then((response) => response.json())
                .then((json) => {
                    if (!json.error) {
                        const {
                            siteBrandName,
                            uid,
                            name,
                            weblinks,
                            pages,
                            ads,
                            metadata
                        } = json;
                        // studioLog({ message: { json }, context: "fetchWebContext" })
                        studioLog({
                            message: {
                                siteBrandName,
                                uid,
                                name,
                                weblinks,
                                pages,
                                ads,
                                metadata
                            }, context: "fetchWebContext - siteBrandName,uid,id,name,weblinks,pages,ads,metadata"
                        })
                        
                        setSiteContext({ siteBrandName, uid, name, weblinks, pages, ads, metadata })
                        // BRAND NAME
                        setSiteBrandName(siteBrandName);
                        // FOOTER CONTEXT
                        setFooterContext({
                            ...footerContext,
                            brand: siteBrandName,
                            copyright: footerCopyright,
                            panel: subscriptionPanel,
                            config: {
                                displayMenu,
                                displaySocialLinks,
                                displaySiteLinks,
                                displaySubscription
                            }
                        })
                        // HEADER CONTEXT
                        setHeaderContext({
                            ...headerContext,
                            config: {
                                displayMenu,
                                displaySocialLinks,
                                displaySiteLinks
                            }
                        })
                        setSiteMetadata(metadata);

                        setLoading(false);
                        // setTimeout(()=> {}, 2000)

                    }
                    if (json.error) console.error(json.error, "error?", json)
                })
                .catch((error) => console.error('An error occurred', error.message));
        };
        fetchWebContext();
        // fetchUser();
    }, []);


    // const test = {
    //     siteLinks: [
    //         {
    //             title: "Artist",
    //             slug: "/artist"
    //         },
    //         {
    //             title: "Gallery",
    //             slug: "/"
    //         },
    //         {
    //             title: "Contact",
    //             slug: "/contact"
    //         },

    //         {
    //             title: "Swipe",
    //             slug: "/swipe"
    //         },
    //         {
    //             title: "Slides",
    //             slug: "/slide"
    //         }
    //     ],
    //     socialLinks: [
    //         //   {
    //         //     name: 'Instagram',
    //         //     icon: <FaInstagram />,
    //         //     href: ''
    //         //   }, {
    //         //     name: 'Facebook',
    //         //     icon: <FaFacebook />,
    //         //     href: ''
    //         //   },
    //         //   {
    //         //     name: 'YouTube',
    //         //     icon: <FaYoutube />,
    //         //     href: ''
    //         //   },
    //         //   {
    //         //       name: 'LinkedIn',
    //         //       icon: <FaLinkedin/>,
    //         //       href: ''
    //         //   },
    //     ],
    //     footerMenuSegments: [
    //         {
    //             title: "Links",
    //             data: 'siteLinks'
    //         }
    //     ]
    // }




    return (
        <StudioContext.Provider value={{
            ...contextData,
            loading,
            brand: siteBrandName,
            // menu: menu, //Array<MenuSegmentData>,
            site: siteContext, //StudioSiteContext,
            header: headerContext, //StudioHeaderContext,
            footer: footerContext, //StudioFooterContext,
            metadata: siteMetadata, //Array<StudioLinkData>,
            debug: displayMetadata
        }}>
            <StudioUpdateContext.Provider value={{ toggleTheme, setDisplayMetadata }}>
                {children}
            </StudioUpdateContext.Provider>
        </StudioContext.Provider>
    );
}












