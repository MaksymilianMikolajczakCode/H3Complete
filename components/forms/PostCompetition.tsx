"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"


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

import { CompetitionValidation } from "@/lib/validations/competition";
import { createCompetition } from "@/lib/actions/competition.actions";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { ChangeEvent, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Tiptap from "../Tiptap";

interface Props {
  userId: string;
}

function PostCompetition({ userId }: Props) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const router = useRouter();
  const pathname = usePathname();
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
  const form = useForm<z.infer<typeof CompetitionValidation>>({
    resolver: zodResolver(CompetitionValidation),
    defaultValues: {
      title: "",
      details: "",
      regulations: "",
      regulationsLink: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CompetitionValidation>) => {
    await createCompetition({
      title: values.title,
      owner: userId,
      details: values.details,
      regulations: values.regulations,
      regulationsLink: values.regulationsLink,
      startDate: values.startDate,
      // type: values.type,
      image: values.image,
      path: pathname
    });
    // console.log(title, owner, details, regulations, regulationsLink, startDate, type)
    router.push("/competitions");
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 mx-[calc(10vw)] w-[calc(80vw)] flex flex-col justify-start gap-10 mb-6'
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
                  placeholder='Add competition logo'
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
          name='details'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Details
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name='regulations'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 prose'>
              <FormLabel className='text-base-semibold text-light-2'>
                regulations
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
          name='regulationsLink'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Link to regulations
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
          name='startDate'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                start date
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                type of competition
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]" >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="Swiss" >Swiss</SelectItem>
                    <SelectItem value="League">League</SelectItem>
                    <SelectItem value="Bracket">Bracket</SelectItem>
                    <SelectItem value="Basket Bracket">Basket Bracket</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

<button type='submit' className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded'>
        Post Competition
    </button>
      </form>
    </Form>
  );
}

export default PostCompetition;