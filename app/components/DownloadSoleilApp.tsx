import AppStoreIcon from "/appstore.svg"
import PlayStoreIcon from "/playstore.svg"
import Image from 'next/image'

interface DownloadAppProps {}

const DownloadSoleilApp = () => (
    <DownloadAppContainer>
        <a href="https://apps.apple.com/us/app/soleilspace/id6451213978?itsct=apps_box_badge&amp;itscg=30200">
            <Image
                src="/soleil-app-store.png"
                alt="Download on App Store"
                width={200}
                height={60}
                className="h-12 w-auto"
            />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.soleilspace.app">
            <Image
                src="/soleil-play-store.png"
                alt="Get it on Google Play"
                width={200}
                height={60}
                className="h-12 w-auto"
            />
        </a>
    </DownloadAppContainer>
);

interface DownloadAppContainerProps {
    children: React.ReactNode;
}

const DownloadAppContainer: React.FC<DownloadAppContainerProps> = (props) => (
    <div style={{ display: 'flex', maxWidth: '394px', justifyContent: 'space-between', marginTop: '16px', gap: '12px' }}>
        {props.children}
    </div>
);

interface AppstoreIconContainerProps {
    src: string;
    alt: string;
}

const AppstoreIconContainer: React.FC<AppstoreIconContainerProps> = (props) => (
    <img style={{ width: '100%', maxWidth: '180px' }} src={props.src} alt={props.alt} />
);

interface PlayStoreIconContainerProps {
    src: string;
    alt: string;
}

const PlayStoreIconContainer: React.FC<PlayStoreIconContainerProps> = (props) => (
    <img style={{ width: '100%', maxWidth: '203px' }} src={props.src} alt={props.alt} />
);

export default DownloadSoleilApp;
