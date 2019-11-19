import React, { Component } from "react";
import { startPage } from "../../data/startPage.json";
import { sections } from "../../data/sections.json";

import Layout from "../../components/Layout";
import Paragraph from "../../components/Paragraph";
import StartLink from "../../components/StartLink";
import Title from "../../components/Title";
import UnorderedList from "../../components/UnorderedList";
import ListItem from "../../components/ListItem";

class StartPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    sessionStorage.removeItem("assessment");
  }

  render() {
    return (
      <Layout>
        <Title>{startPage.title}</Title>
        <Paragraph>{startPage.paragraphOne}</Paragraph>
        <Paragraph>{startPage.unorderedListItem.title}</Paragraph>
        <UnorderedList>
          {startPage.unorderedListItem.items.map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </UnorderedList>
        <Paragraph>{startPage.paragraphTwo}</Paragraph>
        <Paragraph>{startPage.paragraphThree}</Paragraph>
        <Paragraph>{startPage.paragraphFour}</Paragraph>
        <StartLink to={`/section/${sections[0].id}`} />
      </Layout>
    );
  }
}

export default StartPage;
