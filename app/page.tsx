"use client";

import { useEffect, useState } from "react";
import {renderToPipeableStream, renderToString} from 'react-dom/server';
import { type Doc, initJuno, setDoc, getDoc } from "@junobuild/core";  
import { v4 as uuidv4 } from 'uuid';
import { signIn, signOut, authSubscribe } from "@junobuild/core";
import Details from "./_component/details";
import { getTheData } from "./_component/linkdata";
import { Button, Text } from "@chakra-ui/react";
import {User} from "./types"
import Template from "./_component/template";     
import { Writable } from 'stream';

type Record = {
  name: string;
  github_url ?: string;
  linkedin_url ?: string;
  twitter_url ?: string;
  medium_url ?: string;
  district_url ?: string;
};

export default function Home() {
  const [data, setData] = useState<User>() ;

  useEffect(() => {
    (async () =>   
      await initJuno({
        satelliteId: "xqne3-5aaaa-aaaal-adcpq-cai",
      }))();
  }, []);

  const getData = async () => {
    // const fetchedData = await getTheData();
    // setData(fetchedData as User)
    // console.log(typeof(fetchedData));
    // console.log(fetchedData)

    // const templateHtml = new Promise((resolve, reject) => {
    //   let html = '';
    //   const writableStream = new Writable({
    //     write(chunk: any, encoding: any, callback: any) {
    //       html += chunk;
    //       callback();
    //     },
    //   });
    //   writableStream.on('finish', () => {
    //     resolve(html);
    //   });
    //   writableStream.on('error', reject);
    //   renderToPipeableStream(<Template data={data} />).pipe(writableStream);
    //  });

    if(!data){
      throw new Error("No data")
    }
    
    const templateHtml = renderToString(<Template data={data} />);
    console.log(templateHtml);
     
    //  console.log(templateHtml);
  }

  return (
    <>
      
      <Details />
      <Button onClick={getData}>get Data</Button>
      
      {data? (<Template data={data} />)
      :
      (<Text>Not Found</Text>)
     }
    </>
  );
}