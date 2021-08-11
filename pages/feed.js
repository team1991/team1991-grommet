import Head from "next/head";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import React, {useState} from 'react'
import AppBar from '../components/AppBar'
import {
  Anchor,
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Collapsible,
  Footer,
  Heading,
  Image,
  InfiniteScroll,
  Grommet,
  Grid,
  Layer,
  ResponsiveContext,
  Text
} from 'grommet'
import {FormClose, Menu} from 'grommet-icons'
import Post from '../components/post'

const theme = {
  global: {
    colors: {
      brand: '#FF8210',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const feed = ({posts}) => {
    return (
      <Grommet theme={theme}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto"
          rel="stylesheet"
        />
      </Head>
      <AppBar pad='none'/>
        <Box  align='center' width='full' >
          <Grid 
          width='full'
          columns='500px'
          gap="small"
          pad={{
            'vertical': 'small',
            'horizontal': 'medium'}} 
            >
                <InfiniteScroll items={posts}>
                {(item) => (
                <Post postItem={item} />)}
                </InfiniteScroll>
          </Grid>
          <Footer pad='medium'>
            <Text size='small'> hi there </Text>
            <Anchor label='oop'></Anchor>
          </Footer>
        </Box> 
  </Grommet>
    )}

export async function getStaticProps(){
  let basePath = process.cwd()
  if(process.env.NODE_ENV === 'production'){
    basePath = path.join(process.cwd(), '.next/')
  }
  const files = fs.readdirSync(path.join(basePath, 'posts'))
  const posts = [];
  files.forEach(file => {
    const content = fs.readFileSync(path.join(basePath, 'posts', file), 'utf-8')
    posts.push(matter(content))
  })
  function comparePosts(a,b){
    var aDate = a.data.date
    var bDate = b.data.date
    if(aDate < bDate) return 1
    else if (aDate > bDate) return -1
    else return 0;
  }
  posts.sort(comparePosts)    
  return {
    props: {
      posts: posts
    }
  }
}

export default feed;