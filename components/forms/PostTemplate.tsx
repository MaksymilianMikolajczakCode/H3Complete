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


import { TemplateValidation } from "@/lib/validations/template";
import { createTemplate } from "@/lib/actions/template.actions";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";
import Tiptap from "../Tiptap";


function PostTemplate() {
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");
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


  const form = useForm<z.infer<typeof TemplateValidation>>({
    resolver: zodResolver(TemplateValidation),
    defaultValues: {
        title: "",
        download: "",
        description: "",
        specification: "",
        // creator: "",
        settings: "",
        rules: "",
        image: "",
        trade: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof TemplateValidation>) => {
    // const blob = values.profile_photo;

    // const hasImageChanged = isBase64Image(blob);
    // if (hasImageChanged) {
    //   const imgRes = await startUpload(files);

    //   if (imgRes && imgRes[0].fileUrl) {
    //     values.profile_photo = imgRes[0].fileUrl;
    //   }
    // }

    await createTemplate({
        title: values.title,
        download: values.download,
        description: values.description,
        specification: values.specification,
        // creator: values.creator,
        settings: values.settings,
        rules: values.rules,
        image: values.image,
        trade: values.trade,
      path: pathname
    });
   router.push("/templates");
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 mx-[calc(10vw)] w-[calc(79vw)] flex flex-col justify-start gap-10 mb-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                  placeholder='Add profile photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Title
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
          name='description'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Description
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='specification'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 prose'>
              <FormLabel className='text-base-semibold text-light-2'>
                specification
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Tiptap content={field.name} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rules'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 prose'>
              <FormLabel className='text-base-semibold text-light-2'>
                rules
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Tiptap content={field.name} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='settings'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 prose'>
              <FormLabel className='text-base-semibold text-light-2'>
                settings
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Tiptap content={field.name} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
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
          name='trade'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 prose'>
              <FormLabel className='text-base-semibold text-light-2'>
                Trade
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Tiptap content={field.name} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type='submit' className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded'>
        Post Competition
    </button>
      </form>
    </Form>
  );
}

export default PostTemplate;