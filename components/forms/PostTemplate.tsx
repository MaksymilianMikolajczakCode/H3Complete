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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";


import { TemplateValidation } from "@/lib/validations/template";
import { createTemplate } from "@/lib/actions/template.actions";
import { editTemplate } from "@/lib/actions/template.actions";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import Tiptap from "../Tiptap";
import React from "react";

interface Props {
  type: string;
  template?: any;
  id?: string;
}

function PostTemplate({type, template, id }: Props) {

  const [state, setstate] = useState({
    image: template?.image ||'',
    title: template?.title ||'Tytuł Szablonu',
    download: template?.download ||'',
    description: template?.description ||'Opis Szablonu',
    specification: template?.specification ||'Specyfikacja Szablonu',
    settings: template?.settings ||'Polecane Ustawienia Szablonu',
    rules: template?.rules ||'Zasady Szablonu',
    trade: template?.trade ||'Licytacja',
    specificationLink: template?.specificationlink || '',
    changelog: template?.changelog || '',
    changelogLink: template?.changeloglink || '',
    category: template?.category || ''
})
console.log(state)
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
        title: state.title,
        download: state.download,
        description: state.description,
        specification: state.specification,
        // creator: "",
        settings: state.settings,
        rules: state.rules,
        image: state.image,
        trade: state.trade,
        specificationLink: state.specificationLink,
        changelog: state.changelog,
        changelogLink: state.changelogLink,
        category: state.category,
    },
  });

  const onSubmit = async (values: z.infer<typeof TemplateValidation>) => {
    const blob = values.image;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.image = imgRes[0].fileUrl;
      }
    }
    if(type === "create") {
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
        specificationLink: values.specificationLink,
        changelog: values.changelog,
        changelogLink: values.changelogLink,
        category: values.category,
      path: pathname
    });
   router.push("/templates");
    }
    if(type === "edit") {
      await editTemplate({
        id:id,
        title: values.title,
        download: values.download,
        description: values.description,
        specification: values.specification,
        // creator: values.creator,
        settings: values.settings,
        rules: values.rules,
        image: values.image,
        trade: values.trade,
        specificationLink: values.specificationLink,
        changelog: values.changelog,
        changelogLink: values.changelogLink,
        category: values.category,
      path: pathname
    });
    router.push(`/templates/${id}`);
    }
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
                    Wykres
                </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200 text-black'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add profile photo'
                  className=''
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
              Tytuł
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Input {...field} placeholder={state.title}/>
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
              Opis
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Textarea {...field} placeholder={state.description}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem className='flex w-full flex-col gap-3'>
      <FormLabel className='text-base-semibold text-light-2'>Kategoria</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl className='no-focus border border-dark-4 text-light-1 text-black'>
          <SelectTrigger>
            <SelectValue placeholder={field.value || "Wybierz kategorię"} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Klasyczne">Klasyczny</SelectItem>
          <SelectItem value="One-Hero">One-Hero</SelectItem>
          <SelectItem value="Egzotyka">Egzotyka</SelectItem>
          <SelectItem value="Jebusy">Jebus</SelectItem>
        </SelectContent>
      </Select>
    </FormItem>
  )}
/>


        <FormField
          control={form.control}
          name='settings'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Ustawienia
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Tiptap content={state.settings} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='specification'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Specyfikacja
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Tiptap content={state.specification} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='specificationLink'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Link do pelnej specyfikacji (opcjonalne)
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Input {...field} placeholder={state.specificationLink}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='changelog'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Changelog (opcjonalne)
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Tiptap content={state.changelog} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='changelogLink'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Link do changeloga (opcjonalne)
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Input {...field} placeholder={state.changelogLink}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rules'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Zasady
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Tiptap content={state.rules} onChange={field.onChange} />
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
                Link Do Pobrania (opcjonalne)
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Input {...field} placeholder={state.download}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='trade'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Licytacja
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Tiptap content={state.trade} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type='submit' className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded'>
        {type === "create" ? ( <div>Dodaj Szablon</div>) : ( <div>Edytuj Szablon</div>)}

    </button>
      </form>
    </Form>
  );
}

export default PostTemplate;