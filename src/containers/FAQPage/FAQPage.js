import React from 'react';
import Collapsible from 'react-collapsible';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import css from './FAQPage.css';

const FAQPage = () => {

  return (
    <StaticPage
      title="FAQ"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FAQPage',
        description: 'FAQ',
        name: 'FAQ page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1>Have questions? We're here to help!.</h1>

          <div className={css.contentWrapper}>
            <h2>General Questions</h2>

            <Collapsible trigger="What is Lorem Ipsum?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Collapsible>

            <Collapsible trigger="Why do we use it?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </Collapsible>

            <Collapsible trigger="Where does it come from?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock.</p>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Collapsible>

            <Collapsible trigger="Where can I get some?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators.</p>
              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </Collapsible>

            <Collapsible trigger="What is Lorem Ipsum?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Collapsible>

            <Collapsible trigger="Why do we use it?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </Collapsible>

            <Collapsible trigger="Where does it come from?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock.</p>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Collapsible>

            <Collapsible trigger="Where can I get some?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators.</p>
              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </Collapsible>

            <h2>My Account</h2>

            <Collapsible trigger="What is Lorem Ipsum?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Collapsible>

            <Collapsible trigger="Why do we use it?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </Collapsible>

            <Collapsible trigger="Where does it come from?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock.</p>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Collapsible>

            <Collapsible trigger="Where can I get some?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators.</p>
              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </Collapsible>

            <Collapsible trigger="What is Lorem Ipsum?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Collapsible>

            <Collapsible trigger="Why do we use it?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </Collapsible>

            <Collapsible trigger="Where does it come from?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock.</p>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Collapsible>

            <Collapsible trigger="Where can I get some?" transitionCloseTime={200} triggerClassName={css.FAQCollapsible} triggerOpenedClassName={css.FAQCollapsibleOpen} contentInnerClassName={css.FAQCollapsibleOpenContent}>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators.</p>
              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </Collapsible>

          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default FAQPage;
