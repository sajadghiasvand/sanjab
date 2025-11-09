import './App.css';
import HeaderComponent from './components/HeaderComponent';
import HeroComponent from './components/HeroComponent';
import DemoComponent from './components/DemoComponent';
import ProsComponent from './components/ProsComponent';
import FeatureComponent from './components/FeatureComponent';
import AboutComponent from './components/AboutComponent';
import FaqComponent from './components/FaqComponent';
import LearnComponent from './components/LearnComponent';
import CommentsComponent from './components/CommentsComponent';
import AppsComponent from './components/AppsComponent';
import CollaborateComponent from './components/CollaborateComponent';
import DescComponent from './components/DescComponent';
import FooterComponent from './components/FooterComponent';
export default function Home() {
    return (
        <>
            <div className="container max-w-[1440px] mx-auto font-yekan">
                <img src="/images/Background.svg" className="w-full h-auto object-contain absolute -top-[10px] left-0 right-0 z-[1]" />
                <HeaderComponent />
                <HeroComponent />
                <AboutComponent />
                <ProsComponent />
                <FeatureComponent />
                <DemoComponent />
                <FaqComponent />
                <LearnComponent />
                <CommentsComponent />
                <AppsComponent />
                <CollaborateComponent />
                <DescComponent />
                <FooterComponent />
            </div>
        </>
    );
}
