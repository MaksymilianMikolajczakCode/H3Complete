"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";


import { VersionValidation } from "@/lib/validations/version";
import { createVersion } from "@/lib/actions/template.actions";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import Tiptap from "../Tiptap";

interface Props {
  userId: string;
  templateId: string;
}

function PostVersion({ userId, templateId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  // const [tiptapChanges, setTiptapChanges] = useState('');
  // const handleTiptapChange = (newContent) => {
  //   setTiptapChanges(newContent);
  //   console.log(newContent)
  // };
  const [files, setFiles] = useState<File[]>([]);
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  const form = useForm<z.infer<typeof VersionValidation>>({
    resolver: zodResolver(VersionValidation),
    defaultValues: {
      version: "",
      changes: "",
      image: "",
      download: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof VersionValidation>) => {

    await createVersion({
      version: values.version,
      templateId: templateId,
      changes: values.changes, // Use the most recent value
      image: values.image,
      download: values.download,
      path: pathname
    });
  
    router.push(`/templates/${templateId}`);
  };
  

  return (
    <Form {...form}>
      <form
        className='mt-10 mx-[calc(10vw)] w-[calc(80vw)] flex flex-col justify-start gap-10 mb-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='version'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Version
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Input {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              {/* <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )}
              </FormLabel> */}
              <FormLabel className='text-base-semibold text-light-2'>
                    Image
                </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add Version logo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='download'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                download
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Input {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='changes'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 prose'>
              <FormLabel className='text-base-semibold text-light-2'>
                Changes
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Tiptap content={field.name} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<button type='submit' className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded'>
        Post Version
    </button>
      </form>
    </Form>
  );
}

export default PostVersion;