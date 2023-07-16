import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Trpc from "./api/trpc/[trpc]";
import { date } from "zod";
import { Console } from "console";
import { useState } from "react";
import { ShoppingItem } from "@prisma/client";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const idk = api.item.getGreeting.useQuery({text: "yazan"});


  //const items = api.item.getAll.useQuery();


  //const[items, setItems] = useState<ShoppingItem[]>([])

  //const {} = api.item.createItem.useMutation({
  //  onSuccess: (item) => {
  //    setItems(prev => [...prev, item])
  //  }
  //});

  //const {mutate : add} = api.item.createItem.useMutation();
 

  const addItem = api.item.add.useMutation({
    async onSuccess() {
      console.log('DONE')
    },
  });

  return (
    <>
      <Head>
        <title>Shopping List</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto my-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">My Shopping List</h2>
        <button type="button" className="bg-violet-500 text-white text-sm p-2 rounded-md transition hover:bg-violet-600">
          Add shopping item
        </button>
        <p className="text-2xl text-black">
            {idk.data ? idk.data.greeting : "Loading tRPC query..."}
        </p>
        <button type="button" className="myButton" onClick={ async () =>
          {

            try {
              await addItem.mutateAsync({name: 'MY_NEW_ITEM'});
            } catch (cause) {
              console.error({ cause }, 'Failed to add item');
            }
          }
          }> 
        CLICK TO ADD
      </button>
      </main>
    </>
  );
}
