'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Template from '../template/page'; 
import { getTheData } from '../data/linkdata'; 
import { User } from '../types'; 
import { Box } from '@chakra-ui/react';
import { type Doc, initJuno, setDoc, getDoc } from "@junobuild/core";  
import { signIn, signOut, authSubscribe } from "@junobuild/core";


const UserDetails = () => {
  const params = useParams();
  const id = params.id
  console.log({id})
  const [data, setData] = useState<User | undefined>(undefined);

  const signin = async() => {
    await signIn();
  }

  // useEffect(() => {
  //   (async () =>  
  //   await initJuno({
  //     satelliteId: "xqne3-5aaaa-aaaal-adcpq-cai",
  //   }))();
  //   if (id) {
  //     getTheData(id as string)
  //       .then((fetchedData) => {
  //         setData(fetchedData as User);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  //   console.log(data)
  //   console.log(id)
  //   signin();
  // }, [id, data]);


  useEffect(()=>{
    initJuno({
      satelliteId:"xqne3-5aaaa-aaaal-adcpq-cai"
    }).then(()=>{
      getTheData(id as string).then((fetchedData) => {
        setData(fetchedData as User);
      })
      .catch((error) => {
        console.error(error);
      });
    })
  },[])
 

  return (
    <Box>
      {data ? (
        <Template data={data} />
      ) : (
        <p>Data not found for the specified ID.</p>
      )}
    </Box>
  );
};

export default UserDetails;
